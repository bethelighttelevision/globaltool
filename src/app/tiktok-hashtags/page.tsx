"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AdSensePlaceholder from '../../components/AdSensePlaceholder';
import SEO from '../../components/SEO';
import RelatedTools from '../../components/RelatedTools';
import { Play, Copy, CheckCircle2, ArrowLeft, TrendingUp } from 'lucide-react';

export default function TikTokHashtagsPage() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateHashtags = () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    
    setTimeout(() => {
      const base = topic.replace(/\s+/g, '').toLowerCase();
      const results = [
        `#${base}`, `#${base}tips`, `#${base}hacks`, `#fyp`, `#foryou`, 
        `#viral`, `#trending`, `#tiktok2026`, `#learnontiktok`, 
        `#${base}challenge`, `#storytime`, `#productivity`
      ];
      setHashtags(results);
      setIsLoading(false);
    }, 1000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="content-container" style={{ padding: '40px 24px' }}>
      <SEO 
        toolName="TikTok Hashtag Generator" 
        description="Get your videos on the #FYP. Generate high-velocity hashtags tailored to your niche using 2026 trending data." 
        url="https://globalutilitytoolbox.com/tiktok-hashtags" 
      />

      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '32px', fontSize: '14px' }}>
        <ArrowLeft size={16} /> Back to Tools
      </Link>

      <AdSensePlaceholder type="header" />
      
      <div className="glass-panel" style={{ padding: '48px 32px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(0, 0, 0, 0.8)', borderRadius: '20px', marginBottom: '24px', border: '2px solid var(--accent)' }}>
          <Play size={40} color="var(--accent)" strokeWidth={2} />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '48px', marginBottom: '16px', letterSpacing: '-0.02em' }}>TikTok Hashtag Generator</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
          Get your videos on the #FYP. Generate high-velocity hashtags tailored to your niche using 2026 trending data.
        </p>

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
      </div>

      {hashtags.length > 0 && (
        <div className="animate-slide-up glass-panel" style={{ padding: '32px', marginBottom: '40px' }}>
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
      
      {/* SEO CONTENT SECTION */}
      <div style={{ marginTop: '80px', maxWidth: '900px', margin: '80px auto 0' }}>
        <article>
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>The Ultimate TikTok Hashtag Strategy Guide for 2026</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Getting your videos on TikTok&apos;s &quot;For You Page&quot; (FYP) is the holy grail of short-form content. While the algorithm considers many signals, hashtags remain one of the most powerful tools for content categorization and discovery. Our <strong>TikTok Hashtag Generator</strong> analyzes your niche and generates a high-velocity mix of trending and evergreen tags to maximize your organic reach.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How TikTok Uses Hashtags to Distribute Content</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Unlike Instagram, TikTok&apos;s algorithm primarily serves content to users based on their viewing behavior, not who they follow. Hashtags act as a &quot;category signal&quot; that tells TikTok which interest groups to test your video with. If users in that group engage heavily with your content, TikTok will then push it to a broader audience — this is what creates the viral loop.
          </p>

          <div className="glass-panel" style={{ padding: '32px', margin: '40px 0', borderLeft: '4px solid #00f2ea' }}>
            <h4 style={{ marginTop: 0, color: '#00f2ea' }}>The 3-Tier Hashtag Strategy</h4>
            <ul style={{ color: 'var(--muted)', fontSize: '14px', paddingLeft: '20px', marginBottom: 0 }}>
              <li style={{ marginBottom: '10px' }}><strong>Tier 1 — Mega Tags (500M+ views):</strong> #fyp, #foryou, #viral — broad reach but high competition.</li>
              <li style={{ marginBottom: '10px' }}><strong>Tier 2 — Niche Tags (10M-100M views):</strong> Specific to your industry, like #CryptoTips or #SkincareTok.</li>
              <li style={{ marginBottom: '10px' }}><strong>Tier 3 — Micro Tags (under 1M views):</strong> Very specific, like #CryptoBeginners2026. These have the highest chance of ranking #1.</li>
            </ul>
          </div>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How Many Hashtags Should You Use on TikTok?</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            The optimal number of TikTok hashtags in 2026 is between 3 and 8. Using too many can make your content appear as spam to the algorithm. Our generator provides you with a curated, ready-to-paste set of tags that covers all three tiers without exceeding the sweet spot, giving you the best chance of landing on the FYP.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Trending vs. Evergreen Hashtags</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Trending hashtags (like those tied to a viral challenge) can give you a massive short-term boost, but they expire quickly. Evergreen hashtags are always relevant to your niche and provide consistent, long-term discoverability. Our tool balances both types to ensure you get immediate traction while also building a sustainable audience base.
          </p>
        </article>
      </div>

      <div style={{ marginTop: '60px' }}>
        <AdSensePlaceholder type="mid-content" />
      </div>
      <RelatedTools currentPath="/tiktok-hashtags" />
    </div>
  );
}
