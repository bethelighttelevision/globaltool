import { NextResponse } from 'next/server';

const gradients = [
  ['#ff6b6b', '#ee5a24', '#f093fb'],
  ['#0c3483', '#a2b6df', '#6b8cce'],
  ['#11998e', '#38ef7d', '#1cd8d2'],
  ['#fc5c7d', '#6a82fb', '#fc5c7d'],
  ['#0f0c29', '#302b63', '#24243e'],
];

function generatePlaceholderSVG(prompt: string, index: number): string {
  const g = gradients[index % gradients.length];
  const text = prompt.length > 50 ? prompt.slice(0, 50) + '...' : prompt || 'Your Thumbnail';
  const lines = text.split(' ').reduce((acc: string[], word) => {
    const last = acc[acc.length - 1];
    if (!last || last.length + word.length > 12) acc.push(word);
    else acc[acc.length - 1] = last + ' ' + word;
    return acc;
  }, []);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    <defs>
      <linearGradient id="bg${index}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${g[0]}" />
        <stop offset="50%" style="stop-color:${g[1]}" />
        <stop offset="100%" style="stop-color:${g[2]}" />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.4)" />
      </filter>
    </defs>
    <rect width="1280" height="720" fill="url(#bg${index})" />
    <circle cx="200" cy="120" r="280" fill="rgba(255,255,255,0.03)" />
    <circle cx="1000" cy="550" r="350" fill="rgba(255,255,255,0.03)" />
    <circle cx="640" cy="360" r="500" fill="rgba(0,0,0,0.05)" />

    <!-- Tool badge -->
    <rect x="540" y="40" width="200" height="40" rx="20" fill="rgba(255,255,255,0.1)" />
    <text x="640" y="66" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="16" font-family="sans-serif" font-weight="600">TOOLSNAPPY AI</text>

    <!-- Main text -->
    <text x="640" y="340" text-anchor="middle" fill="white" font-size="72" font-family="sans-serif" font-weight="800" filter="url(#shadow)">
      ${lines.map((l, i) => `<tspan x="640" dy="${i === 0 ? 0 : 60}">${l.toUpperCase()}</tspan>`).join('')}
    </text>

    <!-- Bottom bar -->
    <rect x="0" y="650" width="1280" height="70" fill="rgba(0,0,0,0.4)" />
    <rect x="40" y="666" width="48" height="48" rx="8" fill="${g[0]}" />
    <text x="105" y="697" fill="rgba(255,255,255,0.8)" font-size="18" font-family="sans-serif" font-weight="600">Variant ${index + 1}</text>
  </svg>`;
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const images = Array.from({ length: 3 }, (_, i) => {
      const svg = generatePlaceholderSVG(prompt, i);
      return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
    });

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ error: 'Failed to generate' }, { status: 500 });
  }
}
