"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

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

export async function extractTags(videoUrl: string) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) throw new Error("Invalid YouTube URL");

  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const oembedRes = await fetch(oembedUrl);
  const oembedData = await oembedRes.json();

  const pageUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const pageRes = await fetch(pageUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ToolSnappy/1.0)" },
  });
  const html = await pageRes.text();

  const keywordsMatch = html.match(/<meta\s+name="keywords"\s+content="([^"]+)"/i);
  const tags = keywordsMatch
    ? keywordsMatch[1].split(",").map((t: string) => t.trim()).filter(Boolean)
    : [];

  const descriptionMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  const description = descriptionMatch ? descriptionMatch[1] : oembedData.description || "";

  const hashtags: string[] = [];
  const hashtagRegex = /#(\w+)/g;
  let htMatch;
  while ((htMatch = hashtagRegex.exec(description)) !== null) {
    hashtags.push(htMatch[1]);
  }

  return {
    videoId,
    title: oembedData.title || "",
    author: oembedData.author_name || "",
    tags,
    hashtags: [...new Set(hashtags)],
    description: description.slice(0, 500),
    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  };
}

export async function analyzeThumbnail(videoUrl: string) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) throw new Error("Invalid YouTube URL");

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const imageResp = await fetch(thumbnailUrl);
    const imageBuffer = await imageResp.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");
    const mimeType = imageResp.headers.get("content-type") || "image/jpeg";

    const prompt = `Analyze this YouTube video thumbnail and provide structured feedback.

Return valid JSON only (no markdown):
{
  "overallScore": <number 1-10>,
  "composition": { "score": 1-10, "feedback": "..." },
  "colors": { "score": 1-10, "feedback": "..." },
  "textReadability": { "score": 1-10, "feedback": "..." },
  "emotionalAppeal": { "score": 1-10, "feedback": "..." },
  "faceDetection": { "hasFace": true/false, "score": 1-10, "feedback": "..." },
  "ctrEstimate": "Low / Medium / High",
  "improvements": ["tip 1", "tip 2", "tip 3"],
  "bestPractices": ["practice 1", "practice 2"]
}`;

    const result = await model.generateContent([
      { inlineData: { data: imageBase64, mimeType } },
      { text: prompt },
    ]);
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, "").trim();
    const analysis = JSON.parse(clean);

    return { videoId, thumbnailUrl, analysis };
  } catch (err) {
    return {
      videoId,
      thumbnailUrl,
      analysis: {
        overallScore: 5,
        composition: { score: 5, feedback: "Could not analyze via AI. Please check manually." },
        colors: { score: 5, feedback: "Could not analyze via AI." },
        textReadability: { score: 5, feedback: "Could not analyze via AI." },
        emotionalAppeal: { score: 5, feedback: "Could not analyze via AI." },
        faceDetection: { hasFace: false, score: 5, feedback: "Could not analyze via AI." },
        ctrEstimate: "Medium",
        improvements: ["Ensure high contrast between text and background", "Use close-up face shots for better CTR"],
        bestPractices: ["Keep text minimal (3-5 words max)", "Use bright, saturated colors"],
      },
    };
  }
}

export async function getThumbnailUrls(videoUrl: string) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) throw new Error("Invalid YouTube URL");

  const resolutions = [
    { label: "Default (120x90)", filename: "default.jpg", width: 120, height: 90 },
    { label: "Medium (320x180)", filename: "mqdefault.jpg", width: 320, height: 180 },
    { label: "High (480x360)", filename: "hqdefault.jpg", width: 480, height: 360 },
    { label: "SD (640x480)", filename: "sddefault.jpg", width: 640, height: 480 },
    { label: "HD (1280x720)", filename: "maxresdefault.jpg", width: 1280, height: 720 },
    { label: "Full HD (1920x1080)", filename: "maxresdefault.webp", width: 1920, height: 1080, webp: true },
  ];

  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const oembedRes = await fetch(oembedUrl);
  const oembedData = await oembedRes.json();

  const baseUrl = `https://img.youtube.com/vi/${videoId}/`;
  const webpBaseUrl = `https://i.ytimg.com/vi_webp/${videoId}/`;

  const results = await Promise.allSettled(
    resolutions.map(async (r) => {
      const url = r.webp
        ? `${webpBaseUrl}${r.filename}`
        : `${baseUrl}${r.filename}`;
      const headRes = await fetch(url, { method: 'HEAD' });
      return {
        label: r.label,
        filename: r.filename,
        width: r.width,
        height: r.height,
        url: headRes.ok ? url : `${baseUrl}maxresdefault.jpg`,
        available: headRes.ok,
      };
    })
  );

  const thumbnails = results
    .filter((r) => r.status === 'fulfilled')
    .map((r) => (r as PromiseFulfilledResult<{
      label: string; filename: string; width: number; height: number; url: string; available: boolean;
    }>).value)
    .filter((t) => t.available);

  if (thumbnails.length === 0) {
    thumbnails.push({
      label: "HD (1280x720)",
      filename: "maxresdefault.jpg",
      width: 1280,
      height: 720,
      url: `${baseUrl}maxresdefault.jpg`,
      available: true,
    });
  }

  return {
    videoId,
    title: oembedData.title || "Unknown Video",
    author: oembedData.author_name || "Unknown Creator",
    thumbnails,
  };
}

export async function getVideoInfo(videoUrl: string) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) throw new Error("Invalid YouTube URL");

  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const oembedRes = await fetch(oembedUrl);
  const oembedData = await oembedRes.json();

  return {
    videoId,
    title: oembedData.title || "Unknown Video",
    author: oembedData.author_name || "Unknown Creator",
    authorUrl: oembedData.author_url || "",
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  };
}

export async function getTranscript(videoUrl: string) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) throw new Error("Invalid YouTube URL");

  const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const oembedRes = await fetch(oembedUrl);
  const oembedData = await oembedRes.json();

  const pageUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const pageRes = await fetch(pageUrl, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
  });
  const html = await pageRes.text();

  const ytMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.*?});/);
  if (!ytMatch) throw new Error("Could not parse video data");

  const playerData = JSON.parse(ytMatch[1]);
  const captionTracks = playerData?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

  if (!captionTracks || captionTracks.length === 0) {
    return {
      videoId,
      title: oembedData.title || "Unknown Video",
      author: oembedData.author_name || "Unknown Creator",
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      transcript: [],
      rawText: "",
      error: "No captions available for this video. Try another video that has closed captions enabled.",
      segmentCount: 0,
    };
  }

  const enTrack = captionTracks.find((t: { languageCode?: string }) => t.languageCode?.startsWith("en")) || captionTracks[0];
  const baseUrl = enTrack.baseUrl;

  const captionsRes = await fetch(baseUrl);
  const captionsXml = await captionsRes.text();

  const textSegments: { text: string; offset: number; duration: number }[] = [];
  const textRegex = /<text\s+start="([^"]*)"\s+dur="([^"]*)"[^>]*>([\s\S]*?)<\/text>/g;
  let m;
  while ((m = textRegex.exec(captionsXml)) !== null) {
    textSegments.push({
      offset: parseFloat(m[1]),
      duration: parseFloat(m[2]),
      text: m[3].replace(/&amp;#39;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<[^>]*>/g, ""),
    });
  }

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  const segments = textSegments.map((s) => ({
    time: formatTime(s.offset),
    text: s.text,
    offset: s.offset,
    duration: s.duration,
  }));

  const rawText = textSegments.map((s) => s.text).join(" ");

  return {
    videoId,
    title: oembedData.title || "Unknown Video",
    author: oembedData.author_name || "Unknown Creator",
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    transcript: segments,
    rawText,
    error: "",
    segmentCount: segments.length,
  };
}

function extractChannelHandle(input: string): string | null {
  const patterns = [
    /(?:youtube\.com\/@|youtube\.com\/channel\/|youtube\.com\/c\/|youtube\.com\/user\/)?(@?[\w-]+)/i,
    /^@?([\w-]+)$/,
  ];
  for (const p of patterns) {
    const m = input.match(p);
    if (m && !m[1].match(/^(watch|playlist|channel|user|c|results|feed|account|about)$/i)) {
      return m[1].replace(/^@/, "");
    }
  }
  return null;
}

function extractChannelId(input: string): string | null {
  const m = input.match(/(?:youtube\.com\/channel\/)(UC[\w-]{22})/);
  return m ? m[1] : null;
}

export async function getChannelData(input: string) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) throw new Error("YouTube API key not configured");

  let channelId = extractChannelId(input);
  const handle = extractChannelHandle(input);
  const videoId = extractVideoId(input);

  if (!channelId && !handle && !videoId) {
    throw new Error("Could not parse YouTube URL or handle");
  }

  interface ApiItem { statistics?: Record<string, string>; snippet?: Record<string, unknown>; id?: string; }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let channelStats: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let channelSnippet: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let videoStats: any = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let videoSnippet: any = null;

  const oembedUrl = videoId
    ? `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    : null;
  const oembedRes = oembedUrl ? await fetch(oembedUrl).catch(() => null) : null;
  const oembedData = oembedRes?.ok ? await oembedRes.json() : null;

  if (channelId || handle) {
    const params = channelId
      ? `id=${channelId}`
      : `forHandle=${handle}`;
    const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&${params}&key=${apiKey}`;
    const apiRes = await fetch(apiUrl);
    const apiData = await apiRes.json();

    if (apiData.items && apiData.items.length > 0) {
      const item = apiData.items[0] as ApiItem;
      channelStats = item.statistics;
      channelSnippet = item.snippet;
      channelId = item.id || null;
    }
  }

  if (videoId && apiKey) {
    const videoApiUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${apiKey}`;
    const vRes = await fetch(videoApiUrl);
    const vData = await vRes.json();
    if (vData.items && vData.items.length > 0) {
      videoStats = vData.items[0].statistics;
      videoSnippet = vData.items[0].snippet;
      if (!channelId && videoSnippet?.channelId) {
        channelId = videoSnippet.channelId;
        const chUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`;
        const chRes = await fetch(chUrl);
        const chData = await chRes.json();
        if (chData.items && chData.items.length > 0) {
          channelStats = chData.items[0].statistics;
          channelSnippet = chData.items[0].snippet;
        }
      }
    }
  }

  return {
    channelId: channelId || null,
    handle: channelSnippet?.customUrl?.replace(/^@/, "") || handle || null,
    title: channelSnippet?.title || oembedData?.author_name || videoSnippet?.channelTitle || "Unknown",
    description: channelSnippet?.description || videoSnippet?.description || "",
    thumbnailUrl: channelSnippet?.thumbnails?.default?.url || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : ""),
    country: channelSnippet?.country || null,
    publishedAt: channelSnippet?.publishedAt || videoSnippet?.publishedAt || null,
    subscribers: channelStats ? parseInt(channelStats.subscriberCount) || 0 : 0,
    totalViews: channelStats ? parseInt(channelStats.viewCount) || 0 : 0,
    videoCount: channelStats ? parseInt(channelStats.videoCount) || 0 : 0,
    hiddenSubs: channelStats?.hiddenSubscriberCount === "true",
    videoId: videoId || null,
    videoTitle: videoSnippet?.title || oembedData?.title || null,
    videoViews: videoStats ? parseInt(videoStats.viewCount) || 0 : 0,
    videoLikes: videoStats ? parseInt(videoStats.likeCount) || 0 : 0,
    videoComments: videoStats ? parseInt(videoStats.commentCount) || 0 : 0,
  };
}
