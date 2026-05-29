import { NextResponse } from 'next/server';
import { generateContent, parseJSON } from '../../../lib/ai-provider';

export async function POST(request: Request) {
  try {
    const { productName, category, targetAudience, keyFeatures } = await request.json();

    if (!productName?.trim()) {
      return NextResponse.json({ error: 'Product name is required.' }, { status: 400 });
    }

    const featuresList = (keyFeatures || '')
      .split(',')
      .map((f: string) => f.trim())
      .filter(Boolean)
      .join(', ');

    const prompt = `You are an Amazon listing optimization specialist. Create an optimized product listing:

Product: ${productName}
Category: ${category || 'General'}
Audience: ${targetAudience || 'General'}
Features: ${featuresList || 'Not specified'}

Generate:
1. Title — Under 200 characters, include product name, main features, target audience.
2. Bullet Points — 5 selling points, each highlighting feature + benefit.
3. Description — 100-150 word persuasive prose.
4. Backend Terms — 15-20 comma-separated search terms, under 250 bytes.

Rules: No exaggerated claims, no "guaranteed" or "best" superlatives. Factual feature-benefit only.

Return ONLY valid JSON with keys: title (string), bulletPoints (array of 5 strings), description (string), backendTerms (string). No markdown, no code fences.`;

    const raw = await generateContent(prompt);
    const parsed = parseJSON<Record<string, unknown>>(raw);

    return NextResponse.json({
      title: parsed.title,
      bulletPoints: parsed.bulletPoints,
      description: parsed.description,
      backendTerms: parsed.backendTerms,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Amazon listing error:', msg);
    return NextResponse.json({ error: 'Failed to generate listing.' }, { status: 500 });
  }
}
