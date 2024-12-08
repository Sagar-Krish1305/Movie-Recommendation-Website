import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";
dotenv.config();
const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY,
});

const prompt = ChatPromptTemplate.fromTemplate("You are a dark comedian. tell me a joke based on these words {inputWords}");

const chain = prompt.pipe(model);

const res = await chain.invoke({
    inputWords: "mom"
})

console.log(res.content)