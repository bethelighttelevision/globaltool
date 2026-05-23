"use client";

import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Sparkles, Loader2, Download, ExternalLink, Globe, Play } from 'lucide-react';
import { getVideoDownloadInfo } from '../actions/video';

interface VideoUrlItem {
  url: string;
  quality: string;
  contentLength?: number;
  hasAudio?: boolean;
  httpHeaders?: Record<string, string>;
}

interface VideoDownloadResult {
  title: string;
  author: string;
  thumbnailUrl: string;
  videoUrls: VideoUrlItem[];
}

export default function FacebookVideoDownloaderPage() {

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [result, setResult] = useState<VideoDownloadResult | null>(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    if (!url.trim()) { setError("Please enter a Facebook video URL"); return; }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await getVideoDownloadInfo(url.trim(), 'facebook');
      setResult(data as VideoDownloadResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch video.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (v: VideoUrlItem, index: number) => {
    setDownloadingId(index);
    try {
      const res = await fetch('/api/proxy-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: v.url,
          platform: 'facebook',
          headers: v.httpHeaders || {},
          filename: (result?.title || 'facebook') + '.mp4',
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || `Download failed: ${res.statusText}`);
      }
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${result?.title || 'facebook'}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setDownloadingId(null);
    }
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return "";
    const mb = bytes / (1024 * 1024);
    return mb > 1 ? `(${mb.toFixed(1)} MB)` : `(${(bytes / 1024).toFixed(0)} KB)`;
  };

  return (
    <ToolLayout
      icon={<Download size={44} />}
      title="Facebook Video Downloader"
      description="Download Facebook videos in HD. Paste any video URL and get download links."
      seo={{
        toolName: "Facebook Video Downloader",
        description: "Free Facebook video downloader. Download videos from Facebook in HD quality. Paste any Facebook video URL to save.",
        url: "https://toolsnappy.com/facebook-video-downloader"
      }}
      currentPath="/facebook-video-downloader"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Download Facebook Videos Easily in 2026</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Facebook hosts billions of video views daily, from viral clips and educational content to live streams and promotional materials. Our free <strong>Facebook Video Downloader</strong> allows you to save any public Facebook video directly to your device with just a few clicks. Unlike browser-based workarounds that require inspecting page elements or recording your screen, our tool fetches the actual video file and provides a clean download link.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Download Facebook Videos</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Using our downloader is straightforward. Copy the URL of any public Facebook video from your browser address bar or the share menu on the Facebook app. Paste the URL into our input field and click Get Video. Our tool processes the request and returns a direct download link for the highest available quality version.
          </p>
        </article>
      }
      results={
        result && (
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {result.thumbnailUrl && (
                <img src={result.thumbnailUrl} alt={result.title}
                  style={{ width: '120px', height: '68px', borderRadius: '8px', objectFit: 'cover' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              )}
              <div style={{ flex: 1, minWidth: '150px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: 0 }}>{result.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>{result.author}</p>
              </div>
            </div>

            {result.videoUrls.length > 0 && (
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Download size={18} color="#1877f2" /> Download
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {result.videoUrls.map((v, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Play size={16} color="#1877f2" />
                        <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{v.quality}</span>
                        {v.contentLength && v.contentLength > 0 && (
                          <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{formatSize(v.contentLength)}</span>
                        )}
                      </div>
                      <button onClick={() => handleDownload(v, i)} disabled={downloadingId === i}
                        className="premium-button"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontSize: '13px', cursor: 'pointer', border: 'none' }}>
                        {downloadingId === i ? <Loader2 size={14} className="spin" /> : <Download size={14} />}
                        {downloadingId === i ? 'Downloading...' : 'Download'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.videoUrls.length === 0 && (
              <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Direct download not available. Open the video on Facebook.</p>
                <a href={url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#1877f2', fontSize: '14px', marginTop: '8px' }}>
                  <ExternalLink size={14} /> Open on Facebook
                </a>
              </div>
            )}
          </div>
        )
      }
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={16} color="#1877f2" /> Facebook Video URL
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input type="text" className="input-field" placeholder="https://facebook.com/watch/..."
              value={url} onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
              style={{ flex: 1, minWidth: '200px' }} />
            <button className="premium-button" onClick={handleFetch} disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 24px' }}>
              {loading ? <Loader2 size={16} className="spin" /> : <Sparkles size={16} />}
              {loading ? 'Fetching...' : 'Get Video'}
            </button>
          </div>
          {error && <p style={{ color: '#ff3b30', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
        </div>
      </div>
    </ToolLayout>
  );
}
