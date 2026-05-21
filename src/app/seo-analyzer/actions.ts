"use server";

import { generateAICentent } from '../actions/ai';

export async function analyzeSEOAction(targetUrl: string) {
  try {
    // ... existing logic ...
    let formattedUrl = targetUrl.trim();
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = `https://${formattedUrl}`;
    }
    
    const response = await fetch(formattedUrl, {
      headers: {
        'User-Agent': 'GlobalToolbox-SEO-Analyzer/1.0 (Professional Audit Bot 2026)',
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) throw new Error(`Failed to fetch site: ${response.statusText}`);
    const html = await response.text();
    
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'No Title Found';
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const description = descMatch ? descMatch[1].trim() : 'No Meta Description Found';
    const h1Matches = Array.from(html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)).map(m => m[1].trim().replace(/<[^>]*>/g, ''));
    const imgMatches = Array.from(html.matchAll(/<img[^>]*>/gi));
    const imgsWithoutAlt = imgMatches.filter(img => !/alt=["']([^"']*)["']/i.test(img[0])).length;
    const hasSsl = formattedUrl.startsWith('https');
    
    let score = 50;
    if (title !== 'No Title Found') score += 10;
    if (description !== 'No Meta Description Found') score += 10;
    if (h1Matches.length === 1) score += 10;
    if (imgsWithoutAlt === 0 && imgMatches.length > 0) score += 10;
    if (hasSsl) score += 10;

    const metrics = [
      { name: 'Meta Title', status: title !== 'No Title Found' ? 'pass' : 'fail', desc: title },
      { name: 'Meta Description', status: description !== 'No Meta Description Found' ? 'pass' : 'fail', desc: description },
      { name: 'H1 Heading', status: h1Matches.length === 1 ? 'pass' : 'warn', desc: `${h1Matches.length} H1 tags.` },
      { name: 'SSL Security', status: hasSsl ? 'pass' : 'fail', desc: hasSsl ? 'Secure' : 'Not Secure' }
    ];

    // Generate AI Advice
    let expertAdvice = "Keep optimizing your content for better rankings.";
    try {
      const prompt = `Act as an SEO expert. Analyze these metrics for ${formattedUrl}:
      Title: ${title}
      Description: ${description}
      H1 Count: ${h1Matches.length}
      Images without Alt: ${imgsWithoutAlt}
      
      Give me a 3-sentence professional advice to improve this site's SEO.`;
      expertAdvice = await generateAICentent(prompt);
    } catch (e) {
      console.error("AI Advice failed:", e);
    }

    return {
      success: true,
      score: Math.min(score, 100),
      metrics,
      expertAdvice,
      details: {
        title,
        description,
        headings: h1Matches.map(h => `H1: ${h}`).slice(0, 10)
      }
    };

    } catch {
      return { success: false, error: 'Failed to analyze URL' };
  }
}
