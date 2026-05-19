"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// Helper for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateAICentent(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables. Please configure it in your Vercel Dashboard.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const models = ["gemini-2.5-flash", "gemini-2.0-flash"];
  let lastError: any = null;

  // Helper to parse and classify errors into human-friendly messages
  const classifyError = (error: any): string | null => {
    const errStr = String(error).toLowerCase();
    if (errStr.includes("429") || errStr.includes("quota") || errStr.includes("rate-limits") || errStr.includes("limit exceeded")) {
      return "Gemini API Quota Exceeded (429 Too Many Requests). You have used up your free tier limit for today. Please check your Google AI Studio plan, wait a minute, or upgrade your billing details.";
    }
    if (errStr.includes("api key") || errStr.includes("key not valid") || errStr.includes("invalid key") || errStr.includes("403") || errStr.includes("api_key")) {
      return "Invalid Gemini API Key. Please verify that the GEMINI_API_KEY inside your .env.local (or Vercel environment variables) is correct and active.";
    }
    return null;
  };

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
        
        // If it's a quota exceeded or auth error, throw a clean message immediately
        // because trying other models or retrying will fail with the exact same quota/auth limit.
        const cleanMessage = classifyError(error);
        if (cleanMessage) {
          throw new Error(cleanMessage);
        }

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
  
  // Return classified error or general fallback
  const finalCleanMessage = classifyError(lastError);
  if (finalCleanMessage) {
    throw new Error(finalCleanMessage);
  }
  
  const errorMessage = lastError?.message || String(lastError);
  throw new Error(`Gemini AI Error: ${errorMessage}. Please check your API configuration or try again in a few seconds.`);
}
