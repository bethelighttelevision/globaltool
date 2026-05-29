"use server";

import { generateAICentent } from "./ai";

export interface ListingOptimizerResult {
  title: string;
  bulletPoints: string[];
  description: string;
  backendTerms: string;
}

export interface KeywordResult {
  highIntent: string[];
  longTail: string[];
  feature: string[];
  benefit: string[];
  related: string[];
}

export async function generateAmazonListing(
  productName: string,
  category: string,
  targetAudience: string,
  keyFeatures: string
): Promise<ListingOptimizerResult> {
  const featuresList = keyFeatures
    .split(",")
    .map((f) => f.trim())
    .filter(Boolean)
    .join(", ");

  const prompt = `You are an Amazon listing optimization specialist. Create an optimized product listing for the following product:

Product Name: ${productName}
Category: ${category}
Target Audience: ${targetAudience}
Key Features: ${featuresList}

Generate a complete Amazon product listing with:

1. **Title** — An Amazon-optimized product title under 200 characters. Include key product name, main features, and target audience. No keyword stuffing.

2. **Bullet Points** — 5 selling points in short paragraph form. Each bullet should highlight a feature and its benefit. Front-load with the most compelling points.

3. **Product Description** — A persuasive 100-150 word product description. Write in prose format. Include product benefits, use cases, and what makes it valuable.

4. **Backend Search Terms** — A comma-separated list of 15-20 relevant search terms Amazon buyers would use. Use relevant synonyms, misspellings, and related terms. Keep under 250 bytes total.

CRITICAL RULES:
- Do NOT make exaggerated claims or promises
- Do NOT use "guaranteed" or "best" superlatives
- Focus on factual feature-benefit descriptions
- Follow Amazon's style guidelines
- Keep language natural and readable
- Do NOT include pricing or promotional claims

Return valid JSON ONLY (no markdown, no code blocks):
{
  "title": "...",
  "bulletPoints": ["...", "...", "...", "...", "..."],
  "description": "...",
  "backendTerms": "term1, term2, term3, ..."
}`;

  const raw = await generateAICentent(prompt);
  const clean = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);

  return {
    title: parsed.title as string,
    bulletPoints: parsed.bulletPoints as string[],
    description: parsed.description as string,
    backendTerms: parsed.backendTerms as string,
  };
}

export async function generateAmazonKeywords(
  productName: string,
  niche: string
): Promise<KeywordResult> {
  const prompt = `You are an Amazon keyword research specialist. Generate relevant keyword ideas for the following product:

Product Name: ${productName}
Category / Niche: ${niche}

Generate keywords organized into these 5 categories:

1. **High-Intent Keywords** — 10-15 keywords with strong purchase intent (e.g., "buy X", "X for [use case]", "best X")
2. **Long-Tail Keywords** — 12-18 specific 3-5 word phrases people search when close to buying
3. **Feature Keywords** — 10-12 keywords based on specific product features or specifications
4. **Benefit Keywords** — 10-12 keywords focused on customer benefits and solutions
5. **Related Keywords** — 10-15 broader keywords in the same category that shoppers might also search

CRITICAL RULES:
- All keywords must be relevant to the product
- Do NOT include trademarked brand names unless related
- Focus on what real Amazon shoppers would type in search
- Keep keywords factual — no misleading terms
- Include a mix of head terms and long-tail

Return valid JSON ONLY (no markdown, no code blocks):
{
  "highIntent": ["keyword1", "keyword2", ...],
  "longTail": ["keyword1", "keyword2", ...],
  "feature": ["keyword1", "keyword2", ...],
  "benefit": ["keyword1", "keyword2", ...],
  "related": ["keyword1", "keyword2", ...]
}`;

  const raw = await generateAICentent(prompt);
  const clean = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(clean);

  return {
    highIntent: parsed.highIntent as string[],
    longTail: parsed.longTail as string[],
    feature: parsed.feature as string[],
    benefit: parsed.benefit as string[],
    related: parsed.related as string[],
  };
}
