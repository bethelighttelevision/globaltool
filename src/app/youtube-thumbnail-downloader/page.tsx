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
        url: "https://toolsnappy.com/youtube-thumbnail-downloader"
      }}
      currentPath="/youtube-thumbnail-downloader"
      contentSection={
        <article className="prose prose-invert lg:prose-xl">
          <h2 style={{ fontSize: '32px', marginBottom: '24px' }}>Download YouTube Thumbnails in Every Resolution</h2>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            YouTube generates multiple thumbnail versions for every uploaded video, ranging from small default previews up to full HD resolution suitable for desktop wallpapers and presentation slides. Our free <strong>YouTube Thumbnail Downloader</strong> gives you direct access to all available thumbnail sizes from any public YouTube video with a single click. Whether you are a content creator backing up your own assets, a marketer analyzing competitor visual strategies, or a designer looking for high-quality reference images, having instant access to every thumbnail resolution saves valuable time and eliminates the need for manual screenshotting or third-party websites with intrusive ads and limited functionality.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Available Thumbnail Resolutions and Their Uses</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            YouTube provides thumbnails in several standard resolutions. The maximum resolution thumbnail at 1280 by 720 pixels is ideal for presentations, social media sharing, and detailed visual analysis. The high-quality variant at 480 by 360 pixels works well for blog posts and article illustrations. Standard definition at 320 by 180 pixels is suitable for thumbnail grids and comparison tools. The default resolution at 120 by 90 pixels serves as a small preview for database entries and quick reference purposes. Our tool automatically detects and displays all available resolutions for each video, handling the complex URL construction and resolution mapping so you do not have to remember YouTube&rsquo;s image naming conventions.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How to Use Downloaded Thumbnails Effectively</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Content creators can use the downloader to archive their own thumbnail files separately from YouTube, providing a backup in case of accidental deletion or channel issues. Marketers can collect competitor thumbnails for visual benchmarking and trend analysis across their industry. Designers can study color schemes, composition techniques, and typography choices used by top creators in any niche to inspire their own thumbnail designs. Bloggers and journalists can include high-quality video thumbnails in their articles to increase engagement and provide visual context for embedded YouTube content. Each download includes the correct filename format for easy organization and reference.
          </p>

          <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Tips for Thumbnail Download Management</h3>
          <p style={{ color: 'var(--muted)', lineHeight: '1.8', marginBottom: '20px' }}>
            Always download the maximum resolution version first, as smaller sizes can be generated from it through standard image resizing while preserving quality. Create an organized folder structure by channel name or topic category for easy retrieval of downloaded thumbnails. Use the filename information provided by our tool to maintain consistent naming conventions that include the video ID and resolution details. Remember that downloaded thumbnails are for personal reference and analysis purposes only, and respect copyright when using other creators&rsquo; visual assets. Our downloader handles all technical aspects of fetching and naming your files so you can focus on creative and strategic work.
          </p>
        </article>
      }
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

