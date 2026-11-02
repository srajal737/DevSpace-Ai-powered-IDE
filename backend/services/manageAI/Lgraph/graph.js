import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import llm from "./llm.js";
import { fileTools } from "./tools.js"
import { Annotation, MessagesAnnotation, StateGraph } from '@langchain/langgraph'
import { ToolNode } from "@langchain/langgraph/prebuilt"
import { getRecentMessages, system_prompt } from "./parameter.js";


export const graph =({projectId , userId})=>{


    const tools = fileTools({projectId , userId});
    const model = llm.bindTools(tools);

    const emptyUsage = {
    input_tokens: 0,
    output_tokens: 0,
    total_tokens: 0
};


    const agent = async (state)=>{ //llm calling
        
     const messages = state.messages || []
      const recent = getRecentMessages({ messages});

      const finalMessage = [
         new SystemMessage(system_prompt),
        ...recent
      ]


       const response = await model.invoke(finalMessage);
       const usage = response.usage_metadata || {};

    const currentUsage = {
        input_tokens: usage.input_tokens || 0,
        output_tokens: usage.output_tokens || 0,
        total_tokens: usage.total_tokens || 0
    };
     return {
        messages: [response],
         usage: currentUsage
    };

    }

      




    const wheretoGo = (state)=>{
        const lastmess = state.messages?.[state.messages.length-1];
        if( lastmess instanceof AIMessage && lastmess.tool_calls?.length){
            return "tools";
        }
        return "__end__";
    }




    //custom state for graph 

    const graphState = Annotation.Root({
        ...MessagesAnnotation.spec ,
        usage : Annotation({
            reducer: (current, next) => ({
            input_tokens:
                (current?.input_tokens || 0) +
                (next?.input_tokens || 0),

            output_tokens:
                (current?.output_tokens || 0) +
                (next?.output_tokens || 0),

            total_tokens:
                (current?.total_tokens || 0) +
                (next?.total_tokens || 0)
        }),

         default: () => ({
            input_tokens: 0,
            output_tokens: 0,
            total_tokens: 0
        })

        })
    })





    const toolNode  = new ToolNode(tools);
    return new StateGraph(graphState).addNode("agent" , agent).addNode("tools",toolNode)
    .addEdge("__start__" , "agent")
    .addEdge("tools","agent")
    .addConditionalEdges("agent",wheretoGo).compile()
}


//"I built a conversational AI agent using LangGraph. To manage token consumption, I retain a limited window of recent messages and summarize older conversation history. I also preserve the initial user message to retain the original request. The agent can invoke file-related tools, execute them through a ToolNode, and return to the agent to process their results."

// If the interviewer asks about a limitation, you can add:
// "One improvement would be to trim message history while preserving complete tool-call and tool-result sequences. I would also use checkpointing to maintain conversation state across requests."