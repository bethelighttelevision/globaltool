import { NextResponse } from 'next/server';

const INDEXNOW_KEY = '2fffdaccce45494f9404c24501a16910';
const INDEXNOW_URL = 'https://api.indexnow.org/IndexNow';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid url' }, { status: 400 });
    }

    const body = {
      host: 'toolsnappy.com',
      key: INDEXNOW_KEY,
      keyLocation: `https://toolsnappy.com/${INDEXNOW_KEY}.txt`,
      urlList: [url],
    };

    const response = await fetch(INDEXNOW_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('IndexNow error:', response.status, text);
      return NextResponse.json({ error: 'IndexNow submission failed', details: text }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('IndexNow API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
