"use client";

import React, { useState } from 'react';
import { PlayCircle, Play, Copy, CheckCircle2, Search, Sparkles } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import { generateAICentent } from '../actions/ai';
export default function YoutubeSEOPage() {

  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ titles: string[]; description: string; tags: string[]; score: number } | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const calculateSEOScore = (data: { titles: string[]; description: string; tags: string[] }) => {
    let score = 0;
    if (data.titles[0].length > 40) score += 25;
    if (data.description.length > 200) score += 25;
    if (data.tags.length > 5) score += 25;
    if (topic.split(' ').length >= 3) score += 25;
    return score;
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);

    try {
      const prompt = `Generate YouTube SEO optimization data for a video about "${topic}".
      I need:
      1. 4 viral title options.
      2. A high-retention video description.
      3. 8-12 high-density keywords/tags.

      Format the output as a JSON object with keys "titles" (array), "description" (string), and "tags" (array).
      Only return the JSON.`;

      const response = await generateAICentent(prompt);
      const cleanJson = response.replace(/```json|```/g, '').trim();
      const data = JSON.parse(cleanJson);

      setResults({
        ...data,
        score: calculateSEOScore(data)
      });
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to generate SEO data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <ToolLayout
      icon={<PlayCircle size={48} strokeWidth={1.5} />}
      title="YouTube SEO Optimizer"
      description="Generate viral titles, descriptions, and high-density tags. Beat the algorithm with our 2026 SEO Searchability Score."
      seo={{
        toolName: "YouTube SEO Optimizer",
        description: "Generate viral titles, descriptions, and high-density tags. Beat the algorithm with our 2026 SEO Searchability Score.",
        url: "https://globalutilitytoolbox.com/youtube-seo"
      }}
      currentPath="/youtube-seo"
      results={results && (
        <div>
          <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Sparkles size={20} color="#ffcc00" />
                <span style={{ fontSize: '18px', fontWeight: '600' }}>Overall Searchability Score</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>
                Your SEO score is based on title strength, description depth, and tag density for high-search volume 2026 keywords.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: results.score > 70 ? 'var(--success)' : '#ffcc00', lineHeight: 1 }}>{results.score}/100</div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '8px' }}>Rank Potential</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Play size={20} color="#ff0000" /> Viral Title Options
              </h3>
              {results.titles.map((t: string, i: number) => (
                <div key={i} style={{ marginBottom: '16px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', fontWeight: '500', flex: 1, paddingRight: '12px' }}>{t}</span>
                  <button onClick={() => handleCopy(t, `title-${i}`)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
                    {copiedType === `title-${i}` ? <CheckCircle2 size={18} color="var(--success)" /> : <Copy size={18} />}
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-panel" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Optimized Video Tags</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                  {results.tags.map((tag: string, i: number) => (
                    <span key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', border: '1px solid var(--card-border)' }}>
                      #{tag.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleCopy(results.tags.join(', '), 'tags')}
                  className="premium-button"
                  style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', color: 'var(--foreground)', border: '1px solid var(--card-border)' }}
                >
                  {copiedType === 'tags' ? <CheckCircle2 size={18} color="var(--success)" /> : <Copy size={18} />}
                  &nbsp; {copiedType === 'tags' ? 'Tags Copied' : 'Copy All Tags'}
                </button>
              </div>

              <div className="glass-panel" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>AI Generated Description</h3>
                <textarea
                  readOnly
                  value={results.description}
                  style={{ width: '100%', height: '150px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '16px', color: 'var(--muted)', fontSize: '14px', marginBottom: '16px', resize: 'none' }}
                />
                <button
                  onClick={() => handleCopy(results.description, 'description')}
                  className="premium-button"
                  style={{ width: '100%', padding: '12px' }}
                >
                  {copiedType === 'description' ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  &nbsp; {copiedType === 'description' ? 'Description Copied' : 'Copy Description'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      contentSection={
        <div style={{ maxWidth: '900px', margin: '80px auto 0' }}>
          <article className="prose prose-invert lg:prose-xl">
            <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Mastering YouTube SEO in 2026</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              YouTube is the second largest search engine in the world, processing over three billion searches every single month. To get your videos noticed among the millions of uploads competing for attention daily, you need more than just great content â€” you need a data-driven SEO strategy that aligns with how the platform actually discovers and ranks videos. Our <strong>YouTube SEO Optimizer</strong> helps you craft viral-ready titles, high-retention descriptions, and strategic tags that align with the latest algorithm updates. Understanding the intricacies of YouTube SEO can feel overwhelming, especially as the platform continuously refines its ranking factors. However, by breaking down the core components into manageable strategies, any creator can improve their video visibility and grow their channel organically. The most successful YouTubers treat every video as an opportunity to be discovered through search, not just through recommendations. This fundamental shift in mindset is what separates channels that grow steadily from those that remain stagnant. By optimizing for search intent, you ensure that your content reaches viewers who are actively looking for information, entertainment, or solutions related to your niche, resulting in higher engagement and better retention rates.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>The Core Pillars of Video Ranking</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              The YouTube algorithm prioritizes two main factors: Click-Through Rate (CTR) and Watch Time. By using keywords that people are actually searching for, you increase your chances of appearing in the &quot;Suggested&quot; and &quot;Search&quot; results. Our tool analyzes your main topic to provide keywords that balance search volume with competition levels. Beyond these primary metrics, the algorithm also considers factors such as audience retention, session time, and viewer satisfaction signals like likes, comments, and shares. A video that keeps viewers watching until the end and encourages them to watch more content from your channel will receive preferential treatment in both search results and recommendation panels. This means that your SEO strategy should not end once someone clicks on your video. The content itself must deliver on the promise made by your title and thumbnail, providing value that keeps viewers engaged throughout the entire duration. Creating content that encourages binge-watching through playlist optimization and end-screen recommendations can further amplify your channel growth by increasing overall session time, which is one of the most heavily weighted signals in the YouTube ranking system.
            </p>

            <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #32d74b' }}>
              <h4 style={{ marginTop: 0, color: '#32d74b' }}>Pro Tip: The First 24 Hours</h4>
              <p style={{ marginBottom: 0, fontSize: '15px' }}>
                The first 24 hours of your video release are critical. Proper SEO setup ensures that the algorithm can instantly categorize your video and show it to the right audience, giving you that initial boost needed to go viral. During this window, YouTube evaluates your video performance against other recently uploaded content in the same niche, making it essential to drive as much early engagement as possible through your existing community and social media channels.
              </p>
            </div>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Optimizing Titles and Descriptions</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Your title should be a mix of &quot;Click Magnet&quot; phrases and searchable keywords. For descriptions, ensure the first 2-3 lines contain your primary keyword, as this is what shows up in Google search results. Our optimizer generates these elements in a way that feels natural to humans but is highly readable for AI bots. The title is arguably the most important SEO element of your video because it directly influences both click-through rate and search ranking. Including your primary keyword as close to the beginning of the title as possible signals relevance to the algorithm while also catching the eye of searchers. However, you must avoid keyword stuffing, as YouTube penalizes titles that appear spammy or misleading. A compelling title balances keyword inclusion with curiosity and value proposition, giving viewers a clear reason to click. Similarly, your video description should be treated as a landing page for your content. The first 200 to 300 characters are particularly important because they appear in search results and above the fold on your video page. Use this prime real estate to summarize your video content, include your primary keyword naturally, and incorporate relevant timestamps to improve user experience. A well-structured description with links to related videos, social media profiles, and affiliate products can significantly increase the overall value of your video beyond just the view count.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Strategic Keyword Research for YouTube</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Keyword research for YouTube differs significantly from traditional Google SEO because the platform has its own unique search behavior and autocomplete suggestions. YouTube users often search with different intent compared to Google users, favoring longer, more conversational queries that reflect how people actually speak. Tools like YouTube Search Suggest, Google Trends, and competitor analysis can reveal valuable keyword opportunities with high search volume and manageable competition. Our YouTube SEO Optimizer incorporates these research methodologies to suggest tags and keywords that are specifically tailored to your video topic and niche. When selecting keywords, focus on a mix of head terms with high search volume and long-tail keywords with lower competition but higher conversion potential. Long-tail keywords often represent viewers with specific intent, such as &quot;how to edit YouTube videos in Premiere Pro 2026&quot; rather than just &quot;video editing.&quot; These specific queries typically result in higher engagement rates because the content directly matches what the viewer is looking for. Additionally, analyzing the keywords your competitors are ranking for can reveal gaps in your own content strategy and help you identify underserved topics within your niche that offer significant growth potential.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>The Power of Thumbnails and Viewer Psychology</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              While technically separate from traditional SEO elements, your video thumbnail plays an integral role in how your content performs in search results and recommendations. A compelling thumbnail can dramatically increase your click-through rate, which in turn signals to the algorithm that your video is worth promoting. The most effective thumbnails feature high-contrast colors, close-up faces showing strong emotions, and minimal text that reinforces the title message. YouTube has confirmed that custom thumbnails can increase click-through rates by up to thirty percent compared to auto-generated options. Pairing an optimized thumbnail with a keyword-rich title creates a powerful combination that maximizes both visibility and desirability. Our YouTube SEO Optimizer provides guidance on thumbnail best practices as part of a comprehensive video optimization strategy, ensuring that every element of your content presentation works together to attract and retain viewers.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Advanced Tagging and Category Optimization</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Video tags remain an important, though often misunderstood, component of YouTube SEO. While their direct impact on rankings has diminished somewhat as YouTube improves its natural language processing capabilities, tags still help the algorithm understand the context and topic of your content, especially for newer channels with less established authority. Effective tag strategy involves using a hierarchy of tags ranging from broad category descriptions to highly specific phrases that directly describe your video content. Start with one or two broad tags that define your content category, followed by medium-specific tags that narrow down the topic, and finish with highly specific tags that capture the exact focus of your video. Including common misspellings and alternative phrasings can also help capture traffic from varied search queries. Additionally, selecting the most relevant video category for your content provides another contextual signal that helps YouTube understand where your video fits within the broader platform ecosystem. Our tool automates much of this research and analysis, providing you with a comprehensive tag set that maximizes your video discoverability potential across both search and recommendation surfaces on YouTube.
            </p>
          </article>
        </div>
      }
    >
      <div style={{ maxWidth: '700px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} size={20} />
          <input
            type="text"
            className="input-field"
            placeholder="Enter your video topic or main keyword..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            style={{ paddingLeft: '48px', fontSize: '17px' }}
          />
        </div>
        <button
          className="premium-button"
          onClick={handleGenerate}
          disabled={isLoading}
          style={{ width: '100%', padding: '16px', fontSize: '17px', background: 'var(--foreground)', color: 'var(--background)' }}
        >
          {isLoading ? 'Analyzing Algorithm...' : 'Optimize Video SEO'}
        </button>
      </div>
    </ToolLayout>
  );
}

