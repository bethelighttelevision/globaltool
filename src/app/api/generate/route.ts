import { NextResponse } from 'next/server';
import { generateContent } from '../../../lib/ai-provider';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    }
    const text = await generateContent(prompt);
    return NextResponse.json({ text });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Generate error:', msg);
    return NextResponse.json({ error: 'Failed to generate.' }, { status: 500 });
  }
}
