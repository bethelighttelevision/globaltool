import { NextResponse } from 'next/server';
import axios from 'axios';
import FormData from 'form-data';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert base64 Data URL to Buffer
    const base64Data = image.split(',')[1];
    if (!base64Data) {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
    }
    const buffer = Buffer.from(base64Data, 'base64');

    // Create form data using the 'form-data' package which is more reliable for Stability AI
    const form = new FormData();
    form.append('image', buffer, { filename: 'image.png' });

    const apiKey = process.env.STABILITY_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key not configured on server' }, { status: 500 });
    }

    // Call Stability AI's NEWEST and most reliable Upscale API (V2 Fast)
    const stabilityRes = await axios.post('https://api.stability.ai/v2beta/stable-image/upscale/fast', form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      },
      // Ensure we don't hit response size limits for base64 images
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    if (stabilityRes.status !== 200) {
      return NextResponse.json({ error: 'AI processing failed' }, { status: stabilityRes.status });
    }

    // The V2 API returns 'image' (base64) in the JSON response
    if (!stabilityRes.data.image) {
       return NextResponse.json({ error: 'No image returned from AI' }, { status: 500 });
    }

    const base64Image = `data:image/png;base64,${stabilityRes.data.image}`;
    return NextResponse.json({ output_url: base64Image });

  } catch (error: any) {
    const errorMsg = error.response?.data?.errors?.[0] || error.response?.data?.message || error.message;
    console.error("Upscale API Error:", errorMsg);
    
    // Check if the error is about image dimensions
    if (errorMsg.includes('must be at least')) {
        return NextResponse.json({ error: 'Image is too small. Please upload an image with at least 1024x1024 total pixels (e.g. 512x2) for HD upscaling.' }, { status: 400 });
    }

    return NextResponse.json({ error: errorMsg || 'Internal server error' }, { status: 500 });
  }
}
