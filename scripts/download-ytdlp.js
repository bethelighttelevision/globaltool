const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const BIN_DIR = path.join(__dirname, '..', 'bin');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      file.close();
      fs.unlinkSync(dest, () => {});
      reject(err);
    });
  });
}

(async () => {
  try {
    fs.mkdirSync(BIN_DIR, { recursive: true });

    const isWin = process.platform === 'win32';
    const binaryName = isWin ? 'yt-dlp.exe' : 'yt-dlp-linux';
    const binaryPath = path.join(BIN_DIR, binaryName);

    if (fs.existsSync(binaryPath)) {
      console.log(`yt-dlp binary already exists at ${binaryPath}`);
      process.exit(0);
    }

    const isVercel = !!process.env.VERCEL;

    let url;
    if (isWin) {
      url = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe';
    } else if (isVercel || process.platform === 'linux') {
      url = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux';
    } else if (process.platform === 'darwin') {
      url = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos';
    } else {
      url = 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp';
    }

    console.log(`Downloading yt-dlp from ${url}...`);
    await download(url, binaryPath);

    if (!isWin) {
      execSync(`chmod +x "${binaryPath}"`);
    }

    const size = fs.statSync(binaryPath).size;
    console.log(`yt-dlp downloaded successfully (${(size / 1024 / 1024).toFixed(1)} MB)`);
  } catch (err) {
    console.error('Failed to download yt-dlp:', err.message);
    process.exit(1);
  }
})();
