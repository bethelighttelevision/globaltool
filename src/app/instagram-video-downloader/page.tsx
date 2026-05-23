"use client";

import React, { useState } from 'react';
import ToolLayout from '../../components/ToolLayout';
import { Sparkles, Loader2, Download, ExternalLink, Camera } from 'lucide-react';
import { getVideoDownloadInfo } from '../actions/video';
interface VideoUrlItem {
  url: string;
}

interface VideoDownloadResult {
  title: string;
  thumbnailUrl: string;
  videoUrls: VideoUrlItem[];
}

export default function InstagramVideoDownloaderPage() {

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoDownloadResult | null>(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    if (!url.trim()) { setError("Please enter an Instagram URL"); return; }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await getVideoDownloadInfo(url.trim(), 'instagram');
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
      title="Instagram Video Downloader"
      description="Download Instagram videos, reels, and stories. Paste any URL and save instantly."
      seo={{
        toolName: "Instagram Video Downloader",
        description: "Free Instagram video downloader. Download videos, reels, and stories from Instagram. Paste any Instagram URL to save videos.",
        url: "https://toolsnappy.com/instagram-video-downloader"
      }}
      currentPath="/instagram-video-downloader"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Download Instagram Videos, Reels, and Stories</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Instagram has evolved into a powerful video-first platform where Reels, Stories, and IGTV content generate billions of daily views. Our free <strong>Instagram Video Downloader</strong> makes it simple to save any public Instagram video directly to your device. Unlike screen recording methods that degrade quality and include UI overlays, our tool fetches the original video file at its highest resolution. Whether you need to save an inspiring Reel for creative reference, archive your own content before deletion, or collect video assets for a project, our downloader provides a fast, secure, and reliable solution that works with all modern browsers.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Instagram Does Not Offer Built-In Downloads</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Instagram intentionally limits native download functionality to protect content ownership and encourage engagement within the platform. While this approach benefits Instagram&rsquo;s business model, it creates significant frustration for users who have legitimate reasons to save videos for offline viewing, educational reference, or content curation. Our downloader bridges this gap by providing a clean, legal pathway to save publicly available content. We do not bypass any authentication systems or access private content, making our tool suitable for legitimate personal and professional video archiving needs while respecting platform policies and creator rights.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Use the Instagram Video Downloader</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Open the Instagram app or website and navigate to the video, Reel, or Story you want to save. Tap the share button and select Copy Link, or copy the URL directly from your browser&rsquo;s address bar. Paste the copied URL into our downloader input field and click Get Video. Our tool processes the request and returns a download link for the video at its original quality. Click the download button to save the MP4 file to your device. The process works for Reels, feed videos, IGTV content, and archived Story highlights from public accounts.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Tips for Managing Downloaded Instagram Content</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Create a well-organized folder system sorted by date or topic to keep your downloaded content easily searchable. For Reels and short-form content, maintain original filenames or add descriptive titles that help you identify content later. If you are saving content for creative inspiration, consider creating a mood board or reference library organized by visual style or theme. Always credit original creators if you reference or share their content in any public context. Use our downloader responsibly to enhance your creative workflow while respecting the effort and artistry of Instagram content creators worldwide.
          </p>
        </article>
      }
      results={
        result && (
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {result.thumbnailUrl && (
                <img src={result.thumbnailUrl} alt={result.title}
                  style={{ width: '120px', height: '120px', borderRadius: '8px', objectFit: 'cover' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              )}
              <div style={{ flex: 1, minWidth: '150px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', margin: 0 }}>{result.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 0' }}>Instagram</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Download size={18} color="#cc2366" /> Download
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
                  <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Direct download not available. Open on Instagram.</p>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#cc2366', fontSize: '14px', marginTop: '8px' }}>
                    <ExternalLink size={14} /> Open on Instagram
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
            <Camera size={16} color="#cc2366" /> Instagram URL
          </h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input type="text" className="input-field" placeholder="https://instagram.com/p/... or /reel/..."
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

