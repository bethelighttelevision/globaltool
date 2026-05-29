import { NextResponse } from 'next/server';
import { generateContent, parseJSON } from '../../../lib/ai-provider';

export async function POST(request: Request) {
  try {
    const { productName, niche } = await request.json();

    if (!productName?.trim()) {
      return NextResponse.json({ error: 'Product name is required.' }, { status: 400 });
    }

    const prompt = `You are an Amazon keyword research specialist. Generate keyword ideas for:

Product: ${productName}
Category/Niche: ${niche || 'General'}

Generate keywords into 5 categories:
1. highIntent — 10-15 purchase-intent keywords (e.g. "buy X", "X for [use]")
2. longTail — 12-18 specific 3-5 word phrases
3. feature — 10-12 keywords based on product features
4. benefit — 10-12 keywords focused on customer benefits
5. related — 10-15 broader category keywords

Rules: Relevant only, no trademarked brands, factual, mix of head + long-tail.

Return ONLY valid JSON with keys: highIntent (array), longTail (array), feature (array), benefit (array), related (array). No markdown, no code fences.`;

    const raw = await generateContent(prompt);
    const parsed = parseJSON<Record<string, unknown>>(raw);

    return NextResponse.json({
      highIntent: parsed.highIntent,
      longTail: parsed.longTail,
      feature: parsed.feature,
      benefit: parsed.benefit,
      related: parsed.related,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Amazon keywords error:', msg);
    return NextResponse.json({ error: 'Failed to generate keywords.' }, { status: 500 });
  }
}
