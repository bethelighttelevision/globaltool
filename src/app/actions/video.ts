"use server";

import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { writeFileSync, mkdirSync } from 'fs';
import { tmpdir } from 'os';

const execFileAsync = promisify(execFile);

function getYtDlpPath(): string {
  const isWin = process.platform === 'win32';
  return path.join(process.cwd(), 'bin', isWin ? 'yt-dlp.exe' : 'yt-dlp-linux');
}

const COOKIES_CONTENT = `# Netscape HTTP Cookie File
.youtube.com\tTRUE\t/\tFALSE\t1735689600\tCONSENT\tYES+cb.20250524-13-p0.en+FX+937`;

function getCookiePath(): string {
  const dir = path.join(tmpdir(), 'toolsnappy-ytdlp');
  try { mkdirSync(dir, { recursive: true }); } catch {}
  const cookieFile = path.join(dir, 'cookies.txt');
  writeFileSync(cookieFile, COOKIES_CONTENT, 'utf-8');
  return cookieFile;
}

async function fetchWithYtDlp(url: string): Promise<{ data?: any; error?: string }> {
  try {
    const ytDlpPath = getYtDlpPath();
    const { stdout } = await execFileAsync(ytDlpPath, ['-j', '--skip-download', url], { timeout: 30000, maxBuffer: 10 * 1024 * 1024 });
    return { data: JSON.parse(stdout) };
  } catch (err: any) {
    return { error: err.stderr || err.message };
  }
}

export async function getVideoDownloadInfo(videoUrl: string, platform: string) {
  if (platform === 'youtube') {
    const videoId = videoUrl.match(/(?:watch\?v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/)?.[1] || videoUrl.match(/^([a-zA-Z0-9_-]{11})$/)?.[1];
    if (!videoId) throw new Error("Invalid YouTube URL");

    const ytDlpPath = getYtDlpPath();
    const cookiePath = getCookiePath();

    const { stdout } = await execFileAsync(ytDlpPath, [
      '-j', '--cookies', cookiePath, '--skip-download',
      `https://www.youtube.com/watch?v=${videoId}`,
    ], { timeout: 30000, maxBuffer: 10 * 1024 * 1024 });

    const data = JSON.parse(stdout);
    const formats = data.formats || [];

    const videoUrls = formats
      .filter((f: any) => f.vcodec && f.vcodec !== 'none' && f.url)
      .map((f: any) => ({
        url: f.url,
        quality: f.format_note || (f.height ? `${f.height}p` : "Unknown"),
        contentLength: f.filesize || 0,
        hasAudio: !!(f.acodec && f.acodec !== 'none'),
        fps: f.fps || 30,
      }))
      .sort((a: any, b: any) => {
        const q = ['144p', '240p', '360p', '480p', '720p', '1080p', '1440p', '2160p', '4320p'];
        return (q.findIndex(x => b.quality.includes(x)) - q.findIndex(x => a.quality.includes(x)));
      });

    const audioUrls = formats
      .filter((f: any) => f.acodec && f.acodec !== 'none' && (!f.vcodec || f.vcodec === 'none') && f.url && f.abr)
      .map((f: any) => ({
        url: f.url,
        quality: `${f.abr || 128}kbps`,
        contentLength: f.filesize || 0,
        audioBitrate: f.abr || 128,
        mimeType: `audio/${f.ext || 'mp4'}`,
      }))
      .sort((a: any, b: any) => b.audioBitrate - a.audioBitrate);

    let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    try {
      const thumbRes = await fetch(thumbnailUrl, { method: 'HEAD' });
      if (!thumbRes.ok) thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } catch { thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }

    return {
      videoId, platform: 'youtube',
      title: data.title || "YouTube Video",
      author: data.channel || data.uploader || "",
      thumbnailUrl,
      videoUrls, audioUrls,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    };
  }

  if (platform === 'tiktok') {
    const { data, error } = await fetchWithYtDlp(videoUrl);
    if (error) throw new Error(error);

    const formats = data.formats || [];

    const videoUrls = formats
      .filter((f: any) => f.vcodec && f.vcodec !== 'none' && f.url)
      .map((f: any) => {
        const fn = (f.format_note || (f.format || '')).toLowerCase();
        const isExplicitlyClean = fn.includes('without') || fn.includes('no watermark');
        const isWatermarked = !isExplicitlyClean && (fn.includes('watermark') || fn.includes('watermarked'));
        return {
          url: f.url,
          quality: `${f.height || 720}p`,
          contentLength: f.filesize || 0,
          hasAudio: true,
          noWatermark: !isWatermarked,
          httpHeaders: f.http_headers || {},
        };
      })
      .sort((a: any, b: any) => (a.noWatermark === b.noWatermark ? 0 : a.noWatermark ? -1 : 1));

    return {
      videoId: data.id || "",
      platform: 'tiktok',
      title: data.title || "TikTok Video",
      author: data.uploader || data.channel || "TikTok",
      thumbnailUrl: data.thumbnail || "",
      videoUrls,
      audioUrls: [],
      embedUrl: data.webpage_url || videoUrl,
    };
  }

  if (platform === 'instagram') {
    const { data, error } = await fetchWithYtDlp(videoUrl);
    if (error) {
      const pageRes = await fetch(videoUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      });
      const html = await pageRes.text();
      const titleMatch = html.match(/<meta\s+(?:property|name)="og:title"\s+content="([^"]+)"/i);
      const imgMatch = html.match(/<meta\s+(?:property|name)="og:image"\s+content="([^"]+)"/i);
      const videoMatch = html.match(/"video_url":"([^"]+)"/);
      const postId = videoUrl.split("/p/")[1]?.split("/")[0] || videoUrl.split("/reel/")[1]?.split("/")[0] || "";
      return {
        videoId: postId, platform: 'instagram',
        title: titleMatch?.[1] || "Instagram Video",
        author: "Instagram",
        thumbnailUrl: imgMatch?.[1] || "",
        videoUrls: videoMatch?.[1] ? [{ url: videoMatch[1].replace(/\\u0026/g, "&"), quality: "HD", hasAudio: true, contentLength: 0 }] : [],
        audioUrls: [],
        embedUrl: `https://www.instagram.com/p/${postId}/embed`,
      };
    }

    const formats = data.formats || [];
    const videoUrls = formats
      .filter((f: any) => f.vcodec && f.vcodec !== 'none' && f.url)
      .map((f: any) => ({
        url: f.url,
        quality: f.format_note || (f.height ? `${f.height}p` : "HD"),
        contentLength: f.filesize || 0,
        hasAudio: !!(f.acodec && f.acodec !== 'none'),
        httpHeaders: f.http_headers || {},
      }));

    return {
      videoId: data.id || "", platform: 'instagram',
      title: data.title || "Instagram Video",
      author: data.uploader || data.channel || "Instagram",
      thumbnailUrl: data.thumbnail || "",
      videoUrls,
      audioUrls: [],
      embedUrl: data.webpage_url || videoUrl,
    };
  }

  if (platform === 'facebook') {
    const { data, error } = await fetchWithYtDlp(videoUrl);
    if (error) {
      const pageRes = await fetch(videoUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
      });
      const html = await pageRes.text();
      const titleMatch = html.match(/<meta\s+(?:property|name)="(?:og:title|title)"\s+content="([^"]+)"/i);
      const imgMatch = html.match(/<meta\s+(?:property|name)="og:image"\s+content="([^"]+)"/i);
      const videoMatch = html.match(/<meta\s+(?:property|name)="og:video"\s+content="([^"]+)"/i);
      return {
        videoId: videoUrl.split("/").pop() || "", platform: 'facebook',
        title: titleMatch?.[1] || "Facebook Video",
        author: "Facebook",
        thumbnailUrl: imgMatch?.[1] || "",
        videoUrls: videoMatch?.[1] ? [{ url: videoMatch[1], quality: "SD", hasAudio: true, contentLength: 0 }] : [],
        audioUrls: [],
        embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}`,
      };
    }

    const formats = data.formats || [];
    const videoUrls = formats
      .filter((f: any) => f.vcodec && f.vcodec !== 'none' && f.url)
      .map((f: any) => ({
        url: f.url,
        quality: f.format_note || (f.height ? `${f.height}p` : "HD"),
        contentLength: f.filesize || 0,
        hasAudio: !!(f.acodec && f.acodec !== 'none'),
        httpHeaders: f.http_headers || {},
      }));

    return {
      videoId: data.id || "", platform: 'facebook',
      title: data.title || "Facebook Video",
      author: data.uploader || data.channel || "Facebook",
      thumbnailUrl: data.thumbnail || "",
      videoUrls,
      audioUrls: [],
      embedUrl: data.webpage_url || videoUrl,
    };
  }

  throw new Error("Unsupported platform");
}
