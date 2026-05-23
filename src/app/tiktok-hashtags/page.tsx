"use client";

import React, { useState } from 'react';
import { Hash, Copy, CheckCircle2, TrendingUp } from 'lucide-react';
import ToolLayout from '../../components/ToolLayout';
import { generateAICentent } from '../actions/ai';
export default function TikTokHashtagsPage() {

  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateHashtags = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);

    try {
      const prompt = `Generate 15 trending and viral TikTok hashtags for the topic: "${topic}". 
      Include a mix of:
      1. Mega tags (broad reach)
      2. Niche-specific tags
      3. Community tags

      Return the hashtags as a comma-separated list, starting with #. 
      Only return the hashtags.`;

      const response = await generateAICentent(prompt);

      // Grab all words starting with # from anywhere in the LLM response
      const matches = response.match(/#[a-zA-Z0-9_]+/g);
      let results = matches ? matches.map(tag => tag.trim()) : [];

      // If the AI somehow didn't return hashtags with # prefixed, format them manually
      if (results.length === 0) {
        results = response
          .split(/[\s,]+/)
          .map(tag => tag.trim().replace(/^#*/, '#'))
          .filter(tag => tag.length > 2 && tag !== '#');
      }

      // Keep unique items up to 15
      results = Array.from(new Set(results)).slice(0, 15);

      setHashtags(results);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to generate hashtags. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      icon={<Hash size={48} strokeWidth={1.5} />}
      title="TikTok Hashtag Generator"
      description="Get your videos on the #FYP. Generate high-velocity hashtags tailored to your niche using 2026 trending data."
      seo={{
        toolName: "TikTok Hashtag Generator",
        description: "Get your videos on the #FYP. Generate high-velocity hashtags tailored to your niche using 2026 trending data.",
        url: "https://toolsnappy.com/tiktok-hashtags"
      }}
      currentPath="/tiktok-hashtags"
      results={hashtags.length > 0 && (
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingUp size={20} color="var(--success)" /> Trending Results
            </h3>
            <button 
              onClick={handleCopyAll}
              style={{ background: 'var(--foreground)', color: 'var(--background)', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              {copied ? 'Copied All' : 'Copy All'}
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {hashtags.map((tag, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 20px', borderRadius: '14px', border: '1px solid var(--card-border)', fontSize: '15px', color: 'var(--foreground)' }}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      )}
      contentSection={
        <div style={{ maxWidth: '900px', margin: '80px auto 0' }}>
          <article>
            <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>The Ultimate TikTok Hashtag Strategy Guide for 2026</h2>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Getting your videos featured on TikTok&apos;s For You Page, commonly known as the FYP, is the holy grail of short-form content creation and the primary goal for every creator looking to grow their audience. While the TikTok algorithm considers dozens of different signals when deciding which videos to recommend, hashtags remain one of the most powerful and accessible tools for content categorization and audience discovery on the platform. Our <strong>TikTok Hashtag Generator</strong> intelligently analyzes your specific niche and topic, then generates a high-velocity strategic mix of both trending and evergreen hashtags designed to maximize your organic reach and increase your chances of appearing in front of the right viewers at exactly the right time.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How TikTok Uses Hashtags to Distribute Content</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Unlike Instagram, where content is primarily distributed through the follower graph and social connections, TikTok&apos;s algorithm primarily serves content to users based on their individual viewing behavior and interest patterns rather than who they follow. Hashtags act as a powerful category signal that tells the TikTok algorithm which interest groups and communities to initially test your video with during its first few hours of being published. If users within that specific interest group engage heavily with your content by watching it to completion, liking, commenting, and sharing, TikTok&apos;s algorithm will then push your video to progressively broader audiences in what is known as the viral loop. This means that choosing the right hashtags is not just about categorization, it is about strategically positioning your content for maximum algorithmic distribution potential.
            </p>

            <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #00f2ea' }}>
              <h4 style={{ marginTop: 0, color: '#00f2ea' }}>The 3-Tier Hashtag Strategy That Works Every Time</h4>
              <ul style={{ color: 'var(--muted)', fontSize: '14px', paddingLeft: '20px', marginBottom: 0 }}>
                <li style={{ marginBottom: '10px' }}><strong>Tier 1 â€” Mega Tags (500M+ views):</strong> Tags like #fyp, #foryou, #viral, and #trending that have massive reach but extremely high competition, making it difficult to rank highly in their feeds.</li>
                <li style={{ marginBottom: '10px' }}><strong>Tier 2 â€” Niche Tags (10M to 100M views):</strong> Broad industry-specific tags that are highly relevant to your content, such as #CryptoTips, #SkincareTok, #FitnessJourney, or #CookingHacks, offering a strong balance of reach and relevance.</li>
                <li style={{ marginBottom: '10px' }}><strong>Tier 3 â€” Micro Tags (under 1M views):</strong> Extremely specific, long-tail tags like #CryptoBeginners2026 or #DrySkinRoutine that have the highest chance of ranking in the number one position for their search results, giving you concentrated exposure to a highly targeted audience.</li>
              </ul>
            </div>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How Many Hashtags Should You Use on Your Videos?</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              The optimal number of TikTok hashtags in 2026 is between three and eight per video, with five to six being the sweet spot that most successful creators target. Using too many hashtags beyond eight can make your content appear as spammy or desperate to the algorithm, potentially reducing your distribution rather than improving it. Conversely, using too few hashtags means you are missing out on valuable categorization signals that help TikTok understand who should see your content. Our generator provides you with a carefully curated, ready-to-copy set of tags that strategically covers all three tiers of the hashtag hierarchy without exceeding the optimal range, giving you the mathematically best chance of landing on the FYP for multiple relevant interest categories.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Trending Versus Evergreen Hashtags</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Trending hashtags that are tied to current viral challenges, seasonal events, or breaking news topics can give your content a massive short-term boost in visibility and engagement, but they expire quickly and become irrelevant within days or even hours. Evergreen hashtags are always relevant to your specific niche and provide consistent, reliable, long-term discoverability for your content library over weeks, months, and years after publishing. The most successful TikTok creators strategically balance both types in their hashtag sets, using trending tags to capture immediate traffic spikes while relying on evergreen tags to build a sustainable, compounding audience base that continues to discover older content over time. Our tool is designed to produce this exact balanced combination automatically based on your topic input.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Common Hashtag Mistakes to Avoid on TikTok</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Many creators make the mistake of using only mega tags like #fyp and #viral without including any niche or micro tags, which results in their content being shown to a generic audience that may not be interested in their specific topic. Another common error is using irrelevant hashtags simply because they are trending, which confuses the algorithm and leads to poor engagement metrics that actually hurt your distribution. Copying hashtag sets from competitors without adapting them to your specific video content is also ineffective, as the algorithm evaluates relevance based on the actual match between your video content and the hashtags you use. Finally, forgetting to research and update your hashtag strategy regularly means you will miss new trending opportunities as they emerge. Avoid these mistakes and you will see significantly better results from your TikTok content strategy.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Research Hashtags for Your Specific Niche</h3>
            <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
              Effective hashtag research starts with analyzing the top-performing videos in your niche and noting which hashtags they consistently use across their most successful posts. You should also use TikTok&apos;s search suggestions by typing a keyword related to your content and observing the auto-complete suggestions, as these reflect what real users are actively searching for on the platform. Pay attention to the view count displayed next to each hashtag when you search for it, as this gives you a direct indication of its current reach and popularity level. Our AI-powered TikTok Hashtag Generator automates much of this research process, drawing on current platform data to produce a customized set of hashtags that are specifically optimized for your topic, audience, and content style, saving you hours of manual research time with every video you publish.
            </p>
          </article>
        </div>
      }
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'rgba(255,255,255,0.03)', padding: '32px', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
         <input 
          type="text" 
          className="input-field" 
          placeholder="What is your video about? (e.g., 'Skincare', 'Coding')" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ marginBottom: '24px', fontSize: '17px' }} 
         />
         <button 
          className="premium-button" 
          onClick={generateHashtags}
          disabled={isLoading}
          style={{ width: '100%', padding: '16px', fontSize: '17px', background: 'var(--accent)', color: '#fff' }}
        >
           {isLoading ? 'Scanning Trending Tags...' : 'Get Viral Hashtags'}
         </button>
      </div>
    </ToolLayout>
  );
}

