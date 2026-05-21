"use client";

import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Eye, Sparkles, Loader2, Search, Monitor, LayoutGrid, Image } from 'lucide-react';
import { getVideoInfo } from '../actions/youtube';
import { usePageMeta } from '../../hooks/usePageMeta';

interface VideoInfoResult {
  title: string;
  author: string;
  videoId: string;
  thumbnailUrl: string;
}

const VIEWS = [
  { id: 'search', label: 'Search Results', icon: <Search size={16} /> },
  { id: 'suggested', label: 'Suggested Videos', icon: <Monitor size={16} /> },
  { id: 'home', label: 'Home Page', icon: <LayoutGrid size={16} /> },
];

export default function YoutubeThumbnailTesterPage() {
  usePageMeta("Free YouTube Thumbnail Tester | ToolSnappy", "Preview your thumbnail in search results, suggested videos, and home page mockups.");
  const [url, setUrl] = useState('');
  const [customThumbnail, setCustomThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoInfoResult | null>(null);
  const [error, setError] = useState('');
  const [activeView, setActiveView] = useState('search');

  const handleLoad = async () => {
    if (!url.trim()) { setError("Please enter a YouTube video URL"); return; }
    setLoading(true);
    setError('');
    try {
      const data = await getVideoInfo(url.trim());
      setResult(data as VideoInfoResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load video.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setCustomThumbnail(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const displayThumbnail = customThumbnail || result?.thumbnailUrl || '';

  return (
    <ToolLayout
      icon={<Eye size={44} />}
      title="YouTube Thumbnail Tester"
      description="Preview your thumbnail in YouTube search, suggested, and home page mockups."
      seo={{
        toolName: "YouTube Thumbnail Tester",
        description: "Free YouTube thumbnail tester. Upload a thumbnail and preview it in YouTube search results, suggested videos, and home page.",
        url: "https://globalutilitytoolbox.com/youtube-thumbnail-tester"
      }}
      currentPath="/youtube-thumbnail-tester"
      results={result && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {VIEWS.map((v) => (
              <button key={v.id} onClick={() => setActiveView(v.id)} style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '10px', border: 'none',
                cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                background: activeView === v.id ? 'rgba(0,113,227,0.2)' : 'rgba(255,255,255,0.05)',
                color: activeView === v.id ? '#0071e3' : 'var(--muted)',
              }}>
                {v.icon} {v.label}
              </button>
            ))}
          </div>

          {activeView === 'search' && (
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ flex: '0 0 246px' }}>
                  <div style={{ width: '246px', height: '138px', borderRadius: '8px', overflow: 'hidden', background: '#000', position: 'relative' }}>
                    <img src={displayThumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${result.videoId}/hqdefault.jpg`; }} />
                    <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '11px', padding: '1px 4px', borderRadius: '2px' }}>12:34</div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', margin: '0 0 4px', lineHeight: 1.3 }}>{result.title}</h3>
                  <p style={{ fontSize: '12px', color: '#aaa', margin: '0 0 4px' }}>{result.author} · 123K views · 1 week ago</p>
                  <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                </div>
              </div>
            </div>
          )}

          {activeView === 'suggested' && (
            <div className="glass-panel" style={{ padding: '24px', maxWidth: '400px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: '0 0 168px' }}>
                  <div style={{ width: '168px', height: '94px', borderRadius: '6px', overflow: 'hidden', background: '#000', position: 'relative' }}>
                    <img src={displayThumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${result.videoId}/hqdefault.jpg`; }} />
                    <div style={{ position: 'absolute', bottom: '3px', right: '3px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '10px', padding: '1px 3px', borderRadius: '2px' }}>8:45</div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: '0 0 2px', lineHeight: 1.3 }}>{result.title}</h4>
                  <p style={{ fontSize: '11px', color: '#aaa', margin: 0 }}>{result.author}</p>
                  <p style={{ fontSize: '11px', color: '#aaa', margin: 0 }}>45K views</p>
                </div>
              </div>
            </div>
          )}

          {activeView === 'home' && (
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ width: '320px' }}>
                <div style={{ width: '320px', height: '180px', borderRadius: '10px', overflow: 'hidden', background: '#000', marginBottom: '10px', position: 'relative' }}>
                  <img src={displayThumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${result.videoId}/hqdefault.jpg`; }} />
                  <div style={{ position: 'absolute', bottom: '6px', right: '6px', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '12px', padding: '2px 5px', borderRadius: '3px' }}>15:22</div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#333', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#fff', fontWeight: 600 }}>{result.author[0]}</div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: '0 0 2px', lineHeight: 1.3 }}>{result.title}</h4>
                    <p style={{ fontSize: '12px', color: '#aaa', margin: 0 }}>{result.author} · 234K views · 3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <input type="text" className="input-field" placeholder="Paste YouTube video URL..." value={url}
              onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLoad()}
              style={{ flex: 1, minWidth: '200px' }} />
            <button className="premium-button" onClick={handleLoad} disabled={loading}
              style={{ minWidth: '120px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              {loading ? <Loader2 size={18} className="spin" /> : <Sparkles size={18} />}
              {loading ? 'Loading...' : 'Load'}
            </button>
          </div>
          <div>
            <label className="premium-button" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'rgba(0,113,227,0.1)', color: '#0071e3', border: '1px dashed rgba(0,113,227,0.3)' }}>
              <Image size={16} /> Upload Thumbnail
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
            {customThumbnail && (
              <button onClick={() => setCustomThumbnail(null)} style={{ marginLeft: '10px', background: 'none', border: '1px solid rgba(255,59,48,0.3)', color: '#ff3b30', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px' }}>
                Reset
              </button>
            )}
          </div>
          {error && <p style={{ color: '#ff3b30', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
        </div>
      </div>
    </ToolLayout>
  );
}
