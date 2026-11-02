import apiconnector from "../utils/apiconnector";
const BASEURL = import.meta.env.VITE_BACKEND_URL;


//ssee normally I used axios for fetching but for streaming using sse i will use fetch as easy .

export const chatapi = async ({ projectId, message, history = [], onEvents }) => {
    try {
        const response = await fetch(BASEURL + '/api/ai/chat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "text/event-stream"
            },
            credentials: "include"
            ,
            body: JSON.stringify({
                projectId, message, history
            })
        }
        );

        if (!response.ok) {
            let msg = 'AI Request Failed';
            try {
                const data = await response.json();
                msg = data?.message || msg
            } catch (e) {

            }

            throw new Error(msg);
        }

        if (!response.body) {
            throw new Error("Ai streaming not supported");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    buffer += decoder.decode();
                    break;
                }
                buffer += decoder.decode(value, { stream: true });

                const events = buffer.split('\n\n');
                buffer = events.pop() || "";

                for (const text of events) {
                    if (!text.trim()) continue;

                    let eventType = 'message';
                    let datatext = "";

                    for (const item of text.split("\n")) {
                        if (item.startsWith("event:")) {
                            eventType = item.slice(6).trim();
                        }
                        if (item.startsWith("data:")) {
                            datatext += item.slice(5).trim();
                        }
                    }

                    if (!datatext) {
                        continue;
                    }

                    let data;
                    try {
                        data = JSON.parse(datatext);
                    } catch (e) {
                        data = {
                            content: datatext
                        }
                    }

                    onEvents(eventType, data);
                }
            }
        } finally {
            reader.releaseLock()
        }

    } catch (error) {
        console.error("ai chat error:", error);
        throw error;
    }
};
