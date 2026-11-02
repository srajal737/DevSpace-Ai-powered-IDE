import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { graph } from "../Lgraph/graph.js";
import { disconnect } from "mongoose";
import { deductCredits, getCredits } from "../utils/creditdeduct.js";
import { calculateCost } from "../Lgraph/creditCalculate.js";


const sendEvent = (res, type, data) => {
    if (res.writableEnded || res.destroyed) {
        return false;
    }

    try {
        res.write(`event:${type}\n`);
        res.write(`data:${JSON.stringify(data || {})} \n\n`)
        return true;
    } catch (e) {
        console.log(`sse error ${e}`);
        return false;
    }
}

const buildHistory = (history) => {
    if (!Array.isArray(history)) {
        return [];
    }

    const recents = history.slice(-7);

    const final = recents.filter((recent) => recent?.content && (recent.role == 'user' || recent.role == 'assistant')).map((msg) => {
        if (msg.role == 'user') {
            return new HumanMessage(msg.content);
        }
        return new AIMessage(msg.content);
    })

    return final;
}

export const chatbot = async (req, res) => {
    let disconnected = false;
    let totalUsage = {
        input_tokens: 0,
        output_tokens: 0,
        total_tokens: 0
    };


    try {

        const { projectId, message, history = [] } = req.body;
        const userId = req.headers["x-user-id"];
        const credit = await getCredits({ userId });

        if (credit <= 0) {
            return res.status(403).json({
                success: false,
                message: "Insufficient credits. Please recharge."
            });
        }

        
        if (!projectId) {
            return res.status(400).json({
                message: "project Id not fount"
            })
        }
        if (!message) {
            return res.status(400).json({
                message: "message not found"
            })
        }

        //configure sse -->>server side events
        res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache, no-transform");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("X-Accel-Buffering", "no");

        res.flushHeaders?.()


        res.once("close", () => {
            disconnected = true;
            console.log("ai client disconnected")
        })

        sendEvent(res, "start", {
            success: true,
            message: "started AI"
        })

        const app = graph({ projectId, userId });

        const messages = buildHistory(history);
        messages.push(new HumanMessage(message.trim()));

        const stream = await app.stream({
            messages
        }, {
            streamMode: "updates",
            version: "v2",
            recursionLimit: 40  //it means that the loop between the agents and tools are streaming continuously so if any thing like mid messages changes so we use streammode updates and limit is 40 means in one time 40 updates can be read ===>>simple means accessing things/data in mid way like when working ...simple 
        })

        let finalMessage = "";
        for await (const chunk of stream) {
            if (disconnected || res.writableEnded || res.destroyed) {
                break;
            }
            const update = chunk?.data ? chunk.data : chunk;


            if (update?.agent?.usage) {

                const usage = update.agent.usage;

                totalUsage.input_tokens +=
                    usage.input_tokens || 0;

                totalUsage.output_tokens +=
                    usage.output_tokens || 0;

                totalUsage.total_tokens +=
                    usage.total_tokens || 0;

            }


            if (update?.agent) {
                const agentMessages = update?.agent?.messages
                const last = agentMessages[agentMessages.length - 1];
                if (!last) {
                    continue;
                }
                if (Array.isArray(last.tool_calls) && last.tool_calls.length) {
                    for (const tool of last.tool_calls) {
                        sendEvent(res, "tool_called", { name: tool.name, args: tool.args || {} })

                    }
                    continue;
                }

                let content = "";
                if (typeof last?.content == "string") {
                    content = last.content
                }
                else if (Array.isArray(last?.content)) {
                    content = last.content.filter((item) => item.type == "text").map((item) => item.text).join("");
                }

                if (content) {
                    finalMessage = content
                    sendEvent(res, "message", { content });
                }

            }


            if (update?.tools) {
                const toolMessages = update?.tools.messages || [];
                for (const mess of toolMessages) {
                    let toolResult = mess?.content;

                    try {
                        toolResult =
                            typeof toolResult === "string"
                                ? JSON.parse(toolResult)
                                : toolResult;
                    } catch (e) {
                        continue;
                    }

                    if (toolResult?.operation) {
                        sendEvent(res, toolResult.operation, toolResult);
                    }
                }
            }
        }


        const billing = calculateCost(totalUsage);
        if (billing.totalCredits > 0) {

            await deductCredits({
                userId,
                amount: billing.totalCredits
            });

        }

        if (!disconnected && !res.writableEnded) {
            if (!finalMessage.trim()) {
                sendEvent(res, "error", {
                    success: false,
                    message: "The AI finished without providing a response. Please try again."
                });
            } else {
                sendEvent(res, "done", {
                    success: true,
                    message: finalMessage
                });
            }

            res.end();

        }

    }
    catch (e) {
        console.log("ai streaming error", e);
        if (disconnected) {
            return
        }
        if (res.headersSent) {
            sendEvent(res, "error", { success: false, message: e?.message || "Ai Request failed" })
        }

        if (!res.writableEnded) {
            res.end();
            return;
        }


        return res.status(500).json({
            success: false,
            message: e.message || "ai request failed.."
        })
    }



}



