import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function sanitizeJSON(str: string): string {
  let result = '', inString = false;
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c === '"' && (i === 0 || str[i - 1] !== '\\')) inString = !inString;
    if (inString && c === '\n') { result += '\\n'; continue; }
    if (inString && c === '\r') { result += '\\r'; continue; }
    result += c;
  }
  return result;
}

function extractJSON(raw: string): string {
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  const json = start >= 0 && end > start ? raw.slice(start, end + 1) : raw;
  return sanitizeJSON(json);
}

async function tryGroq(prompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY not set');
  const groq = new Groq({ apiKey });
  const models = ['llama-3.3-70b-versatile', 'llama3-8b-8192'];
  let lastErr: unknown = null;
  for (const model of models) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const completion = await groq.chat.completions.create({
          messages: [{ role: 'user', content: prompt }],
          model, temperature: 0.7, max_tokens: 2048,
        });
        const text = completion.choices[0]?.message?.content;
        if (text?.trim()) return text;
      } catch (e) {
        lastErr = e;
        const s = String(e).toLowerCase();
        if (s.includes('model') && (s.includes('not found') || s.includes('does not exist'))) break;
        if (attempt < 3) await delay(attempt * 800);
      }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('Groq failed');
}

async function tryGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set');
  const genAI = new GoogleGenerativeAI(apiKey);
  const models = ['gemini-2.0-flash', 'gemini-2.5-flash'];
  let lastErr: unknown = null;
  for (const name of models) {
    const model = genAI.getGenerativeModel({ model: name });
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        if (text?.trim()) return text;
      } catch (e) {
        lastErr = e;
        if (String(e).toLowerCase().includes('not found') || String(e).includes('404')) break;
        if (attempt < 2) await delay(1000);
      }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('Gemini failed');
}

export async function generateContent(prompt: string): Promise<string> {
  try { return await tryGroq(prompt); } catch (e) { console.warn('Groq fail:', e); }
  try { return await tryGemini(prompt); } catch (e) { console.warn('Gemini fail:', e); }
  throw new Error('Both Groq and Gemini failed');
}

export function parseJSON<T>(raw: string): T {
  return JSON.parse(extractJSON(raw));
}
