import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { writeFileSync, mkdirSync, readFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';

const execFileAsync = promisify(execFile);

function getYtDlpPath(): string {
  const isWin = process.platform === 'win32';
  return path.join(process.cwd(), 'bin', isWin ? 'yt-dlp.exe' : 'yt-dlp-linux');
}

const COOKIES_CONTENT = `# Netscape HTTP Cookie File
.tiktok.com\tTRUE\t/\tTRUE\t1735689600\tCONSENT\tYES+cb.20250524-13-p0.en+FX+937`;

function getCookiePath(): string {
  const dir = path.join(tmpdir(), 'toolsnappy-ytdlp');
  try { mkdirSync(dir, { recursive: true }); } catch {}
  const cookieFile = path.join(dir, 'cookies.txt');
  writeFileSync(cookieFile, COOKIES_CONTENT, 'utf-8');
  return cookieFile;
}

export async function POST(request: NextRequest) {
  try {
    const { url, platform, headers: extraHeaders, filename } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    }

    const safeName = (filename || 'video.mp4').replace(/[^a-zA-Z0-9._-]/g, '_');

    // For TikTok, use yt-dlp to download to temp file then serve
    if (platform === 'tiktok') {
      const ytDlpPath = getYtDlpPath();
      const cookiePath = getCookiePath();
      const tmpDir = path.join(tmpdir(), 'toolsnappy-downloads');
      mkdirSync(tmpDir, { recursive: true });
      const tmpFile = path.join(tmpDir, `tiktok_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.mp4`);
      await execFileAsync(ytDlpPath, [
        '-o', tmpFile, '--no-part', '--cookies', cookiePath,
        '--remux-video', 'mp4',
        '--fixup', 'force',
        '--no-mtime',
        '-S', 'vcodec:h264',
        url,
      ], { timeout: 30000, maxBuffer: 50 * 1024 * 1024 });
      const buf = readFileSync(tmpFile);
      try { unlinkSync(tmpFile); } catch {}
      return new NextResponse(buf, {
        headers: {
          'Content-Type': 'video/mp4',
          'Content-Disposition': `attachment; filename="${safeName}"`,
          'Content-Length': buf.length.toString(),
          'Cache-Control': 'no-cache',
        },
      });
    }

    // For Instagram/Facebook: fetch CDN URL with proper headers
    const fetchHeaders: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Sec-Fetch-Site': 'cross-site',
      'Sec-Fetch-Mode': 'no-cors',
      'Sec-Fetch-Dest': 'video',
      'Origin': platform === 'instagram' ? 'https://www.instagram.com' :
                platform === 'facebook' ? 'https://www.facebook.com' : 'https://www.instagram.com',
      'Referer': platform === 'instagram' ? 'https://www.instagram.com/' :
                 platform === 'facebook' ? 'https://www.facebook.com/' : 'https://www.instagram.com/',
    };

    if (extraHeaders && typeof extraHeaders === 'object') {
      Object.assign(fetchHeaders, extraHeaders);
    }

    const response = await fetch(url, { headers: fetchHeaders });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Download failed: ${response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('Content-Type') || 'video/mp4';
    const contentLength = response.headers.get('Content-Length');

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${safeName}"`,
        ...(contentLength ? { 'Content-Length': contentLength } : {}),
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.stderr || err.message || 'Download failed' },
      { status: 500 }
    );
  }
}
