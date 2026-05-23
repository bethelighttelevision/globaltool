"use client";

import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Hash, Sparkles, Copy, Check, Loader2, Tag, User, FileText, List } from 'lucide-react';
import { extractTags } from '../actions/youtube';
interface TagExtractResult {
  title: string;
  author: string;
  thumbnail: string;
  tags: string[];
  hashtags: string[];
  description: string;
}

export default function YoutubeTagExtractorPage() {

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TagExtractResult | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const handleExtract = async () => {
    if (!url.trim()) { setError("Please enter a YouTube video URL"); return; }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await extractTags(url.trim());
      setResult(data as TagExtractResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to extract tags.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ToolLayout
      icon={<Hash size={44} />}
      title="YouTube Tag Extractor"
      description="Extract all tags, hashtags, and keywords from any YouTube video instantly."
      seo={{
        toolName: "YouTube Tag Extractor",
        description: "Free tool to extract tags, hashtags, and keywords from YouTube videos.",
        url: "https://toolsnappy.com/youtube-tag-extractor"
      }}
      currentPath="/youtube-tag-extractor"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>How to Extract YouTube Tags for Better Video SEO</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Tags are one of the most important yet often overlooked elements of YouTube video optimization. Our free <strong>YouTube Tag Extractor</strong> lets you instantly pull every tag, hashtag, and keyword from any public YouTube video, giving you valuable insights into what successful creators in your niche are targeting. Understanding the tagging strategies of top-performing videos is one of the fastest ways to improve your own content&rsquo;s discoverability on both YouTube search and Google video results. Whether you are a new creator trying to grow your channel or an experienced marketer optimizing a content pipeline, access to competitor tag data is a powerful strategic advantage that should not be overlooked.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why YouTube Tags Still Matter in 2026</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Despite ongoing debates in the creator community about the declining importance of tags, YouTube&rsquo;s algorithm continues to use tag data as one of many signals for understanding video content and context. Tags help YouTube categorize your video correctly, suggest it alongside related content, and surface it in search results for relevant queries. Well-researched tags that match actual search terms give your video a meaningful ranking boost, especially for long-tail keywords where competition is lower. Our extractor tool reveals exactly which tags your competitors are using so you can identify high-value keyword opportunities and gaps in your own tagging strategy that could be holding back your video performance.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Use Extracted Tags for Your SEO Strategy</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            After extracting tags from top-performing videos in your niche, group them into categories: broad topic tags that define your video category, specific keyword tags that target exact search queries, related topic tags that connect your content to adjacent subjects, and branded tags that include channel or series names. Look for patterns across multiple successful videos to identify consistently used tags that correlate with high view counts. Incorporate these insights into your own video metadata while adding unique tags specific to your content. Avoid the common mistake of stuffing irrelevant popular tags, as YouTube penalizes misleading metadata that does not accurately represent the video content.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Best Practices for YouTube Tag Optimization</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Start with two to three highly specific tags that exactly match your video topic, then add broader category tags that help YouTube understand your content&rsquo;s context. Include variations of your target keywords, including common misspellings and synonyms that users might search for. Use all available tag characters (approximately five hundred) without resorting to keyword stuffing. Monitor which tags drive the most impressions through YouTube Studio analytics and adjust your strategy accordingly. Our Tag Extractor makes this research process instant and effortless, transforming what used to be a manual inspection task into a one-click competitive analysis that fits seamlessly into your content workflow.
          </p>
        </article>
      }
      results={result && (
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={result.thumbnail} alt="Video thumbnail preview" style={{ width: '80px', height: '45px', borderRadius: '8px', objectFit: 'cover' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: 0 }}>{result.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}><User size={12} style={{ display: 'inline', marginRight: 4 }} />{result.author}</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Tag size={20} color="#0071e3" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>Video Tags ({result.tags.length})</h3>
              <button className="premium-button" style={{ marginLeft: 'auto', padding: '6px 14px', fontSize: '12px', background: 'rgba(0,113,227,0.15)', color: '#0071e3' }}
                onClick={() => handleCopy(result.tags.join(', '), 'all-tags')}>
                {copied === 'all-tags' ? <Check size={14} /> : <Copy size={14} />} {copied === 'all-tags' ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {result.tags.map((tag, i) => (
                <div key={i} style={{ background: 'rgba(0,113,227,0.1)', border: '1px solid rgba(0,113,227,0.2)', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', color: '#0071e3', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{tag}</span>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#0071e3', opacity: 0.6 }}
                    onClick={() => handleCopy(tag, `tag-${i}`)}>
                    {copied === `tag-${i}` ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
              ))}
              {result.tags.length === 0 && <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No tags found in video metadata.</p>}
            </div>
          </div>

          {result.hashtags.length > 0 && (
            <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <List size={20} color="#32d74b" />
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>Hashtags ({result.hashtags.length})</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {result.hashtags.map((tag, i) => (
                  <span key={i} style={{ background: 'rgba(50,215,75,0.1)', border: '1px solid rgba(50,215,75,0.2)', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', color: '#32d74b' }}>#{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <FileText size={20} color="#ffcc00" />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0 }}>Description</h3>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>{result.description || "No description."}</p>
          </div>
        </div>
      )}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input type="text" className="input-field" placeholder="Paste YouTube video URL..." value={url}
              onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleExtract()}
              style={{ flex: 1, minWidth: '200px' }} />
            <button className="premium-button" onClick={handleExtract} disabled={loading}
              style={{ minWidth: '140px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              {loading ? <Loader2 size={18} className="spin" /> : <Sparkles size={18} />}
              {loading ? 'Extracting...' : 'Extract Tags'}
            </button>
          </div>
          {error && <p style={{ color: '#ff3b30', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
        </div>
      </div>
    </ToolLayout>
  );
}

