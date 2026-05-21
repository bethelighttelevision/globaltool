"use server";

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export async function getVideoDownloadInfo(videoUrl: string, platform: string) {
  if (platform === 'youtube') {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) throw new Error("Invalid YouTube URL");

    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const oembedRes = await fetch(oembedUrl);
    const oembedData = await oembedRes.json();

    const pageUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const pageRes = await fetch(pageUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    });
    const html = await pageRes.text();

    interface FormatItem { mimeType?: string; qualityLabel?: string; quality?: string; url?: string; contentLength?: string; }
    let formats: FormatItem[] = [];
    const ytMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.*?});/);
    if (ytMatch) {
      try {
        const playerData = JSON.parse(ytMatch[1]);
        formats = playerData?.streamingData?.formats || [];
        const adaptive = playerData?.streamingData?.adaptiveFormats || [];
        formats = [...formats, ...adaptive];
      } catch {}
    }

    const videoUrls = formats
      .filter((f: FormatItem) => f.mimeType?.includes("video/mp4"))
      .map((f: FormatItem) => ({
        quality: f.qualityLabel || f.quality || "Unknown",
        url: f.url || "",
        hasAudio: f.mimeType?.includes("mp4a") || !f.url?.includes("audio"),
        contentLength: f.contentLength ? parseInt(f.contentLength) : 0,
      }))
      .filter((f: { url: string }) => f.url)
      .slice(0, 5);

    return {
      videoId,
      title: oembedData.title || "YouTube Video",
      author: oembedData.author_name || "",
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      videoUrls,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      platform: 'youtube',
    };
  }

  if (platform === 'facebook') {
    const pageRes = await fetch(videoUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    });
    const html = await pageRes.text();

    const titleMatch = html.match(/<meta\s+(?:property|name)="(?:og:title|title)"\s+content="([^"]+)"/i);
    const imgMatch = html.match(/<meta\s+(?:property|name)="og:image"\s+content="([^"]+)"/i);
    const videoMatch = html.match(/<meta\s+(?:property|name)="og:video"\s+content="([^"]+)"/i);

    return {
      videoId: videoUrl.split("/").pop() || "",
      title: titleMatch?.[1] || "Facebook Video",
      author: "Facebook",
      thumbnailUrl: imgMatch?.[1] || "",
      videoUrls: videoMatch?.[1] ? [{ quality: "SD", url: videoMatch[1], hasAudio: true, contentLength: 0 }] : [],
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}`,
      platform: 'facebook',
    };
  }

  if (platform === 'instagram') {
    const pageRes = await fetch(videoUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    });
    const html = await pageRes.text();

    const titleMatch = html.match(/<meta\s+(?:property|name)="og:title"\s+content="([^"]+)"/i);
    const imgMatch = html.match(/<meta\s+(?:property|name)="og:image"\s+content="([^"]+)"/i);
    const videoMatch = html.match(/"video_url":"([^"]+)"/);

    return {
      videoId: videoUrl.split("/p/")[1]?.split("/")[0] || videoUrl.split("/reel/")[1]?.split("/")[0] || "",
      title: titleMatch?.[1] || "Instagram Video",
      author: "Instagram",
      thumbnailUrl: imgMatch?.[1] || "",
      videoUrls: videoMatch?.[1] ? [{ quality: "HD", url: videoMatch[1].replace(/\\u0026/g, "&"), hasAudio: true, contentLength: 0 }] : [],
      embedUrl: `https://www.instagram.com/p/${videoUrl.split("/p/")[1]?.split("/")[0] || videoUrl.split("/reel/")[1]?.split("/")[0] || ""}/embed`,
      platform: 'instagram',
    };
  }

  if (platform === 'tiktok') {
    const pageRes = await fetch(videoUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    });
    const html = await pageRes.text();

    const titleMatch = html.match(/<meta\s+(?:property|name)="og:title"\s+content="([^"]+)"/i);
    const imgMatch = html.match(/<meta\s+(?:property|name)="og:image"\s+content="([^"]+)"/i);
    const videoMatch = html.match(/"downloadAddr":"([^"]+)"/) || html.match(/"playAddr":"([^"]+)"/);

    return {
      videoId: videoUrl.split("/video/")[1]?.split("?")[0] || "",
      title: titleMatch?.[1] || "TikTok Video",
      author: "TikTok",
      thumbnailUrl: imgMatch?.[1] || "",
      videoUrls: videoMatch?.[1] ? [{ quality: "HD", url: videoMatch[1].replace(/\\u0026/g, "&"), hasAudio: true, contentLength: 0 }] : [],
      embedUrl: `https://www.tiktok.com/embed/v2/${videoUrl.split("/video/")[1]?.split("?")[0] || ""}`,
      platform: 'tiktok',
    };
  }

  throw new Error("Unsupported platform");
}
