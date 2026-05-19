"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Helper for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateAICentent(prompt: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables. Please configure it in your Vercel Dashboard.");
  }

  const models = ["gemini-2.5-flash", "gemini-1.5-flash"];
  let lastError: any = null;

  // Try each model in sequence
  for (const modelName of models) {
    const model = genAI.getGenerativeModel({ model: modelName });
    
    // Try up to 3 times per model with exponential backoff
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        if (text && text.trim().length > 0) {
          return text;
        }
        throw new Error("AI returned an empty response.");
      } catch (error: any) {
        lastError = error;
        console.warn(`Attempt ${attempt} failed for model ${modelName}:`, error.message || error);
        
        // If it's a model not found or invalid model error, skip directly to the next model
        const errStr = String(error).toLowerCase();
        if (errStr.includes("modelnotfound") || errStr.includes("not found") || errStr.includes("404")) {
          break; // Break the attempt loop to try the next model
        }

        // Wait before retrying (backoff: 1s, 2s, 4s)
        if (attempt < 3) {
          await delay(attempt * 1000);
        }
      }
    }
  }

  // If all attempts and models failed
  console.error("Gemini AI failed all models and retry attempts. Last error:", lastError);
  const errorMessage = lastError?.message || "Unknown AI Error";
  throw new Error(`Gemini AI Error: ${errorMessage}. Please try again in a few seconds.`);
}
