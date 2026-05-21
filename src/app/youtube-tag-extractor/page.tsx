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
        url: "https://globalutilitytoolbox.com/youtube-tag-extractor"
      }}
      currentPath="/youtube-tag-extractor"
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

