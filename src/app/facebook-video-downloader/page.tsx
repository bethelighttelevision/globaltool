"use client";

import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Sparkles, Loader2, Download, ExternalLink, Globe } from 'lucide-react';
import { getVideoDownloadInfo } from '../actions/video';
interface VideoUrlItem {
  url: string;
}

interface VideoDownloadResult {
  title: string;
  thumbnailUrl: string;
  videoUrls: VideoUrlItem[];
}

export default function FacebookVideoDownloaderPage() {

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
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
            Facebook hosts billions of video views daily, from viral clips and educational content to live streams and promotional materials. Our free <strong>Facebook Video Downloader</strong> allows you to save any public Facebook video directly to your device with just a few clicks. Unlike browser-based workarounds that require inspecting page elements or recording your screen, our tool fetches the actual video file and provides a clean download link. Whether you are saving an inspiring talk for offline viewing, collecting video assets for a project, or archiving your own uploaded content, our downloader handles the entire process securely and efficiently.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why You Need a Reliable Facebook Video Downloader</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Facebook does not provide a built-in download option for most videos on its platform, making it frustratingly difficult to save content for offline access. Many third-party websites claim to offer Facebook video downloading but deliver poor results with intrusive advertising, misleading download buttons, and potential security risks. Our tool provides a clean, ad-free experience that respects your privacy and delivers working download links every time. The ability to save videos locally is especially valuable for educators compiling resource libraries, marketers analyzing competitor campaigns, and users in areas with unreliable internet connectivity who need offline access to important content.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Download Facebook Videos</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Using our downloader is straightforward. Copy the URL of any public Facebook video from your browser address bar or the share menu on the Facebook app. Paste the URL into our input field and click Get Video. Our tool processes the request and returns a direct download link for the highest available quality version. Click the download button to save the MP4 video file to your device. The entire process takes just seconds and works across all major browsers and operating systems including Windows, macOS, iOS, and Android devices.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Supported Facebook Video Types</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Our downloader works with a wide range of Facebook video formats including standard timeline videos, Facebook Watch episodes, live stream recordings, uploaded video files in Pages and Groups, and shared videos from connected sources. Most public videos can be downloaded successfully, though some privacy-restricted content and videos from locked accounts may not be accessible. We recommend always respecting content creators&rsquo; rights and using downloaded videos for personal reference rather than redistribution. Bookmark our tool for quick access whenever you encounter a video worth saving for later viewing or reference purposes.
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
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>Facebook Video</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download size={18} color="#1877f2" /> Download
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
                  <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Direct download not available. Open the video on Facebook.</p>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#1877f2', fontSize: '14px', marginTop: '8px' }}>
                    <ExternalLink size={14} /> Open on Facebook
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

