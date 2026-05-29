import { NextResponse } from 'next/server';
import { generateContent, parseJSON } from '../../../lib/ai-provider';

export async function POST(request: Request) {
  try {
    const { content, tone } = await request.json();
    if (!content?.trim()) {
      return NextResponse.json({ error: 'Content is required.' }, { status: 400 });
    }

    const toneGuide: Record<string, string> = {
      professional: 'Professional, authoritative tone for B2B audiences.',
      casual: 'Friendly, conversational tone like talking to a colleague.',
      storytelling: 'Narrative-driven tone with stories and personal experience.',
      persuasive: 'Persuasive, opinion-driven tone that challenges assumptions.',
    };

    const prompt = `You are a content repurposing expert. Convert the blog post into 4 platform formats.

BLOG:
"""
${content.trim()}
"""

TONE: ${toneGuide[tone] || toneGuide.professional}

Output for each platform:
1. TWITTER — 3-6 numbered tweets (e.g. "1/5 tweet text\\n\\n2/5 next tweet"), each under 240 chars. Hook first, action last.
2. LINKEDIN — Professional, 150-200 words, opening + bullets + CTA question.
3. INSTAGRAM — Bold hook, 3-4 value tips, engagement CTA, 5 hashtags.
4. NEWSLETTER — Subject line, greeting, 2-3 paragraphs, CTA, sign-off.

Critical: Each value must be a single string (not an array). Preserve original message. Adapt tone per platform. No AI disclaimers.

Return ONLY valid JSON with keys: twitter, linkedin, instagram, newsletter. No markdown, no code fences, no extra text.`;

    const raw = await generateContent(prompt);
    const parsed = parseJSON<Record<string, unknown>>(raw);

    const toStr = (v: unknown): string =>
      Array.isArray(v) ? v.join('\n\n') : String(v ?? '');
    const text = (key: string) => toStr(parsed[key]);

    return NextResponse.json({
      twitter: text('twitter'),
      linkedin: text('linkedin'),
      instagram: text('instagram'),
      newsletter: text('newsletter'),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Repurpose API error:', msg);
    return NextResponse.json({ error: 'Failed: ' + msg }, { status: 500 });
  }
}
