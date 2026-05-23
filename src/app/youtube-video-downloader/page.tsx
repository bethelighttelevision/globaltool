"use client";

import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Play, Sparkles, Loader2, Download, ExternalLink, Music, Film, Headphones } from 'lucide-react';
import { getVideoDownloadInfo } from '../actions/video';
interface VideoUrlItem {
  url: string;
  quality: string;
  contentLength: number;
  hasAudio: boolean;
  fps?: number;
}

interface AudioUrlItem {
  url: string;
  quality: string;
  contentLength: number;
  audioBitrate: number;
  mimeType: string;
}

interface VideoDownloadResult {
  title: string;
  author: string;
  thumbnailUrl: string;
  videoUrls: VideoUrlItem[];
  audioUrls: AudioUrlItem[];
  embedUrl: string;
}

export default function YoutubeVideoDownloaderPage() {

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoDownloadResult | null>(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    if (!url.trim()) { setError("Please enter a YouTube video URL"); return; }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await getVideoDownloadInfo(url.trim(), 'youtube');
      setResult(data as VideoDownloadResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch video.");
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return "Unknown";
    const mb = bytes / (1024 * 1024);
    return mb > 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
  };

  const getQualityIcon = (quality: string) => {
    const num = parseInt(quality);
    if (num >= 2160) return "🔥";
    if (num >= 1080) return "✅";
    if (num >= 720) return "👍";
    return "";
  };

  return (
    <ToolLayout
      icon={<Download size={44} />}
      title="YouTube Video Downloader"
      description="Download any YouTube video in HD quality up to 4K. Paste a URL and get direct download links."
      seo={{
        toolName: "YouTube Video Downloader",
        description: "Free YouTube video downloader. Download videos in HD quality. Paste any YouTube URL to get direct download links.",
        url: "https://toolsnappy.com/youtube-video-downloader"
      }}
      currentPath="/youtube-video-downloader"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>How to Download YouTube Videos in HD Quality</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Having offline access to YouTube videos is essential for content creators, educators, marketers, and anyone who needs to reference video content without a reliable internet connection. Our free <strong>YouTube Video Downloader</strong> at ToolSnappy fetches direct download links for any public YouTube video in multiple quality options, from standard definition up to full 4K Ultra HD quality.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Available Video Quality Options</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Our downloader fetches all available quality tiers for the requested video, including 2160p 4K Ultra HD, 1440p Quad HD, 1080p Full HD, 720p High Definition, 480p Standard Definition, and 360p lowest quality. Higher resolution downloads produce larger file sizes with better visual fidelity. Lower resolution options are useful for mobile devices with limited storage or slow internet connections.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Use Our YouTube Downloader</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Simply paste any YouTube video URL into the input field and click Get Video. Our tool processes the request and returns a list of available download links organized by quality level. Click any download button to save the video file directly to your device.
          </p>
        </article>
      }
      results={
        result && (
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <img src={result.thumbnailUrl} alt={result.title}
                style={{ width: '120px', height: '68px', borderRadius: '8px', objectFit: 'cover' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div style={{ flex: 1, minWidth: '150px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.3 }}>{result.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>{result.author}</p>
              </div>
            </div>

            {result.videoUrls.length > 0 && (
              <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Film size={18} color="#ff0000" /> Video Downloads
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {result.videoUrls.map((v, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Play size={16} color="#ff0000" />
                        <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>{v.quality}</span>
                        {v.hasAudio ? (
                          <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(52,199,89,0.15)', color: '#34c759' }}>video+audio</span>
                        ) : (
                          <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,149,0,0.15)', color: '#ff9500' }}>video only</span>
                        )}
                        {v.contentLength > 0 && <span style={{ color: 'var(--muted)', fontSize: '12px' }}>({formatSize(v.contentLength)})</span>}
                      </div>
                      <a href={v.url} target="_blank" rel="noopener noreferrer"
                        className="premium-button"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontSize: '13px', textDecoration: 'none' }}>
                        <Download size={14} /> Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.audioUrls.length > 0 && (
              <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Headphones size={18} color="#34c759" /> Audio Downloads
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {result.audioUrls.map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Music size={16} color="#34c759" />
                        <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>MP3 - {a.quality}</span>
                        {a.contentLength > 0 && <span style={{ color: 'var(--muted)', fontSize: '12px' }}>({formatSize(a.contentLength)})</span>}
                      </div>
                      <a href={a.url} target="_blank" rel="noopener noreferrer"
                        className="premium-button"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontSize: '13px', textDecoration: 'none', background: 'linear-gradient(135deg, #34c759, #28a745)' }}>
                        <Download size={14} /> Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.videoUrls.length === 0 && result.audioUrls.length === 0 && (
              <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
                <div style={{ padding: '20px' }}>
                  <p style={{ color: 'var(--muted)', fontSize: '14px' }}>No download links available for this video.</p>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0071e3', fontSize: '14px', marginTop: '8px' }}>
                    <ExternalLink size={14} /> Open on YouTube
                  </a>
                </div>
              </div>
            )}

            {result.embedUrl && (
              <div className="glass-panel" style={{ padding: '16px', marginTop: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>Video Preview</h4>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
                  <iframe src={result.embedUrl} title={result.title}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
                    allowFullScreen />
                </div>
              </div>
            )}
          </div>
        )
      }
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Play size={16} color="#ff0000" /> YouTube Video URL
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input type="text" className="input-field" placeholder="https://youtube.com/watch?v=..."
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
