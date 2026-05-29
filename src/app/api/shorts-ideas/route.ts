import { NextResponse } from 'next/server';
import { generateContent, parseJSON } from '../../../lib/ai-provider';

export async function POST(request: Request) {
  try {
    const { niche, channelUrl } = await request.json();
    if (!niche?.trim()) {
      return NextResponse.json({ error: 'Niche is required.' }, { status: 400 });
    }

    const channelSection = channelUrl?.trim()
      ? `\nThe user also provided a YouTube channel URL: ${channelUrl}. Analyze this channel's content style, niche, and audience, then tailor ideas specifically for this channel's existing format.\n`
      : '';

    const prompt = `You are a YouTube Shorts strategy expert. Generate 10 viral Shorts video ideas for the niche: "${niche}".${channelSection}

For each idea, provide:
1. **title** — A click-worthy video title (under 60 chars)
2. **hook** — The first 1-2 seconds spoken line (under 15 words, designed to stop the scroll)
3. **script** — Full 30-60 second video script. Write in a conversational, retention-optimized style. Include visual cues in [brackets]. Keep it concise but complete.
4. **hashtags** — Array of 5 relevant hashtags (without the # symbol)
5. **thumbnailText** — Short overlay text for the thumbnail (under 5 words)
6. **viralScore** — Number 1-10 predicting viral potential
7. **format** — The Shorts format type: one of "Educational", "Storytelling", "Comparison", "Listicle", "Challenge", "Mistake/Fix", "Behind the Scenes", "React", "Transformation", "Debunk"

IMPORTANT RULES:
- Make hooks urgent, curiosity-driven, or value-promising
- Scripts must be fast-paced with a clear payoff
- Cover different formats (not all the same type)
- Focus on high-retention patterns
- Ensure ideas are actionable and easy to film

Return ONLY valid JSON with a single key "ideas" containing an array of objects with keys: title, hook, script, hashtags, thumbnailText, viralScore, format. No markdown, no code fences.`;

    const raw = await generateContent(prompt);
    const parsed = parseJSON<{ ideas: unknown[] }>(raw);

    return NextResponse.json({ niche, ideas: parsed.ideas });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('Shorts ideas error:', msg);
    return NextResponse.json({ error: 'Failed to generate ideas.' }, { status: 500 });
  }
}
