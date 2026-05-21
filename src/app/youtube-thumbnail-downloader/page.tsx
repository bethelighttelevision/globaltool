"use client";

import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Download, Sparkles, Loader2, Play } from 'lucide-react';
import { getThumbnailUrls } from '../actions/youtube';
interface ThumbnailItem {
  url: string;
  label: string;
  width: number;
  height: number;
  filename: string;
}

interface ThumbnailResult {
  title: string;
  author: string;
  videoId: string;
  thumbnails: ThumbnailItem[];
}

export default function YoutubeThumbnailDownloaderPage() {

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ThumbnailResult | null>(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    if (!url.trim()) { setError("Please enter a YouTube video URL"); return; }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await getThumbnailUrls(url.trim());
      setResult(data as ThumbnailResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch thumbnails.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (imgUrl: string, filename: string) => {
    try {
      const res = await fetch(imgUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(imgUrl, '_blank');
    }
  };

  return (
    <ToolLayout
      icon={<Download size={44} />}
      title="YouTube Thumbnail Downloader"
      description="Download YouTube video thumbnails in all resolutions â€” from default to full HD."
      seo={{
        toolName: "YouTube Thumbnail Downloader",
        description: "Free YouTube thumbnail downloader. Download video thumbnails in all resolutions: HD, SD, HQ, MQ, and default.",
        url: "https://globalutilitytoolbox.com/youtube-thumbnail-downloader"
      }}
      currentPath="/youtube-thumbnail-downloader"
      results={result && (
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Play size={24} color="#ff0000" />
            <div style={{ flex: 1, minWidth: '150px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', margin: 0 }}>{result.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '2px 0 0' }}>{result.author}</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {result.thumbnails.map((thumb, i) => (
              <div key={i} className="glass-panel" style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000', marginBottom: '12px' }}>
                  <img src={thumb.url} alt={thumb.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${result.videoId}/hqdefault.jpg`; }} />
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>{thumb.label}</h4>
                <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 12px' }}>{thumb.width} x {thumb.height}</p>
                <button className="premium-button" onClick={() => handleDownload(thumb.url, `thumbnail-${result.videoId}-${thumb.filename}`)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 20px', fontSize: '13px' }}>
                  <Download size={14} /> Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input type="text" className="input-field" placeholder="Paste YouTube video URL..." value={url}
              onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
              style={{ flex: 1, minWidth: '200px' }} />
            <button className="premium-button" onClick={handleFetch} disabled={loading}
              style={{ minWidth: '140px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              {loading ? <Loader2 size={18} className="spin" /> : <Sparkles size={18} />}
              {loading ? 'Fetching...' : 'Get Thumbnails'}
            </button>
          </div>
          {error && <p style={{ color: '#ff3b30', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
        </div>
      </div>
    </ToolLayout>
  );
}

