"use server";

import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Helper for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Error Classifier ────────────────────────────────────────────────────────
const classifyError = (error: unknown): string | null => {
  const errStr = String(error).toLowerCase();
  if (
    errStr.includes("429") ||
    errStr.includes("quota") ||
    errStr.includes("rate_limit") ||
    errStr.includes("rate limit") ||
    errStr.includes("limit exceeded") ||
    errStr.includes("too many requests")
  ) {
    return "API Quota Exceeded (429 Too Many Requests). The daily free limit has been reached. Please wait a few minutes and try again.";
  }
  if (
    errStr.includes("api key") ||
    errStr.includes("key not valid") ||
    errStr.includes("invalid key") ||
    errStr.includes("unauthorized") ||
    errStr.includes("403") ||
    errStr.includes("api_key") ||
    errStr.includes("authentication")
  ) {
    return "Invalid API Key. Please verify that the API key inside your environment variables is correct and active.";
  }
  return null;
};

// ─── Groq Primary Handler ─────────────────────────────────────────────────────
async function generateWithGroq(prompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not set.");

  const groq = new Groq({ apiKey });

  // Models in priority order (both are free on Groq)
  const models = ["llama-3.3-70b-versatile", "llama3-8b-8192"];

  let lastError: unknown = null;

  for (const model of models) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const completion = await groq.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model,
          temperature: 0.7,
          max_tokens: 2048,
        });

        const text = completion.choices[0]?.message?.content;
        if (text && text.trim().length > 0) {
          return text;
        }
        throw new Error("Groq returned an empty response.");
      } catch (error) {
        lastError = error;
        console.warn(`[Groq] Attempt ${attempt} failed on model ${model}:`, error instanceof Error ? error.message : error);

        const cleanMessage = classifyError(error);
        if (cleanMessage) throw new Error(cleanMessage);

        const errStr = String(error).toLowerCase();
        // Model not found — skip to next model immediately
        if (errStr.includes("model") && (errStr.includes("not found") || errStr.includes("does not exist"))) {
          break;
        }

        if (attempt < 3) await delay(attempt * 800);
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Groq failed all retries.");
}

// ─── Gemini Fallback Handler ──────────────────────────────────────────────────
async function generateWithGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set.");

  const genAI = new GoogleGenerativeAI(apiKey);
  const models = ["gemini-2.0-flash", "gemini-2.5-flash"];
  let lastError: unknown = null;

  for (const modelName of models) {
    const model = genAI.getGenerativeModel({ model: modelName });
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        if (text && text.trim().length > 0) return text;
        throw new Error("Gemini returned an empty response.");
      } catch (error) {
        lastError = error;
        console.warn(`[Gemini] Attempt ${attempt} on ${modelName}:`, error instanceof Error ? error.message : error);

        const cleanMessage = classifyError(error);
        if (cleanMessage) throw new Error(cleanMessage);

        const errStr = String(error).toLowerCase();
        if (errStr.includes("not found") || errStr.includes("404")) break;

        if (attempt < 2) await delay(1000);
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Gemini failed all retries.");
}

// ─── Main Export: Groq First, Gemini as Safety Net ───────────────────────────
export async function generateAICentent(prompt: string): Promise<string> {
  // 1. Try Groq first (generous free quota: 14,400 req/day)
  try {
    const result = await generateWithGroq(prompt);
    console.log("[AI] Response from: Groq");
    return result;
  } catch (groqError) {
    const groqMsg = groqError instanceof Error ? groqError.message : String(groqError);
    console.warn("[AI] Groq failed, attempting Gemini fallback:", groqMsg);

    // If it was a quota/auth error from Groq, still try Gemini before giving up
    // But if Gemini is also not configured, return groq's error directly
    if (!process.env.GEMINI_API_KEY) {
      throw groqError;
    }
  }

  // 2. Gemini fallback
  try {
    const result = await generateWithGemini(prompt);
    console.log("[AI] Response from: Gemini (fallback)");
    return result;
  } catch (geminiError) {
    console.error("[AI] Both Groq and Gemini failed.");
    const cleanMessage = classifyError(geminiError);
    if (cleanMessage) throw new Error(cleanMessage);

    throw new Error(
      `AI Error: Both Groq and Gemini APIs failed. Please check your API keys or try again shortly. Details: ${geminiError instanceof Error ? geminiError.message : String(geminiError)}`
    );
  }
}
