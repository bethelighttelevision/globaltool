"use client";

import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Sparkles, Loader2, Download, ExternalLink, Music } from 'lucide-react';
import { getVideoDownloadInfo } from '../actions/video';
interface VideoUrlItem {
  url: string;
}

interface VideoDownloadResult {
  title: string;
  thumbnailUrl: string;
  videoUrls: VideoUrlItem[];
}

export default function TiktokVideoDownloaderPage() {

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoDownloadResult | null>(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    if (!url.trim()) { setError("Please enter a TikTok video URL"); return; }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await getVideoDownloadInfo(url.trim(), 'tiktok');
      setResult(data as VideoDownloadResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch video.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      icon={<Download size={44} />}
      title="TikTok Video Downloader"
      description="Download TikTok videos without watermark. Paste any TikTok URL and save instantly."
      seo={{
        toolName: "TikTok Video Downloader",
        description: "Free TikTok video downloader. Download videos without watermark. Paste any TikTok URL to save videos directly to your device.",
        url: "https://toolsnappy.com/tiktok-video-downloader"
      }}
      currentPath="/tiktok-video-downloader"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Download TikTok Videos Without Watermark</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            TikTok has become the dominant platform for short-form video content, with creators worldwide producing millions of videos daily across every imaginable category. Our free <strong>TikTok Video Downloader</strong> lets you save any public TikTok video to your device quickly and without the platform&rsquo;s standard watermark overlay. Clean, watermark-free downloads are essential for content curators, social media managers, educators, and creators who need to repurpose or reference TikTok content in presentations, compilations, and cross-platform sharing without distracting visual branding that detracts from the viewing experience.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Watermark-Free Downloads Matter</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            TikTok automatically adds a watermark to every downloaded video through its native save function, displaying the creator&rsquo;s username and TikTok logo throughout the playback. While this protects content attribution on TikTok, it limits how the video can be used in other contexts. Clean videos without watermarks are better suited for professional presentations, advertising creative testing, educational content that requires distraction-free viewing, and video editing projects where overlays would interfere with the final composition. Our tool provides high-quality downloads that preserve the original video quality while removing the TikTok watermark, giving you maximum flexibility for your projects.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Download TikTok Videos</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Open the TikTok app or website and navigate to the video you want to save. Tap the Share button and select Copy Link to copy the video URL to your clipboard. Paste the URL into our downloader input and click Get Video. Our tool processes the request and returns a clean download link. Click the download button to save the video file to your device in MP4 format. The tool works with all public TikTok videos, including those from both personal accounts and verified creator profiles. Processing typically completes within seconds for standard-length TikTok content.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Responsible Use of Downloaded TikTok Content</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Always credit original creators when using downloaded TikTok content in any public context, including presentations, social media posts, and video compilations. Respect content creators&rsquo; intellectual property rights and avoid claiming downloaded videos as your own work. Our tool is designed for personal reference, educational use, creative inspiration, and content curation purposes. If you plan to use downloaded TikTok videos in commercial projects, seek appropriate permissions from the original creators. Responsible use of download tools helps maintain a healthy creator ecosystem where everyone&rsquo;s work is respected and properly attributed.
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
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>TikTok Video</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download size={18} color="#00f2ea" /> Download
              </h3>
              {result.videoUrls.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {result.videoUrls.map((v, i) => (
                    <a key={i} href={v.url} target="_blank" rel="noopener noreferrer"
                      className="premium-button"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', textDecoration: 'none', fontSize: '15px' }}>
                      <Download size={18} /> Download Video
                    </a>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Direct download not available. Open on TikTok.</p>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#00f2ea', fontSize: '14px', marginTop: '8px' }}>
                    <ExternalLink size={14} /> Open on TikTok
                  </a>
                </div>
              )}
            </div>
          </div>
        )
      }
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Music size={16} color="#00f2ea" /> TikTok Video URL
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input type="text" className="input-field" placeholder="https://tiktok.com/@user/video/..."
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

