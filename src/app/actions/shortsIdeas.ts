"use server";

import { generateAICentent } from "./ai";

export interface ShortsIdea {
  title: string;
  hook: string;
  script: string;
  hashtags: string[];
  thumbnailText: string;
  viralScore: number;
  format: string;
}

export interface ShortsIdeasResult {
  niche: string;
  ideas: ShortsIdea[];
}

export async function generateShortsIdeas(niche: string, channelUrl?: string): Promise<ShortsIdeasResult> {
  const channelSection = channelUrl?.trim()
    ? `\nThe user also provided a YouTube channel URL: ${channelUrl}. Analyze this channel's content style, niche, and audience, then tailor ideas specifically for this channel's existing format.\n`
    : "";

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

Return valid JSON ONLY (no markdown, no code blocks):
{
  "ideas": [
    {
      "title": "...",
      "hook": "...",
      "script": "...",
      "hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
      "thumbnailText": "...",
      "viralScore": 8,
      "format": "Educational"
    }
  ]
}`;

  const raw = await generateAICentent(prompt);
  const clean = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);

  return { niche, ideas: parsed.ideas as ShortsIdea[] };
}
