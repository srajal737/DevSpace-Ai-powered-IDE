import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import 'dotenv/config'

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash-lite",
    temperature: 0,
    maxRetries: 2,
    // other params...
})



export default llm;