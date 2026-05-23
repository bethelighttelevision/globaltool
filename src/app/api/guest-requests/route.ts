import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const svcKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const keyUsed = svcKey ? 'SERVICE_ROLE' : 'ANON';

  try {
    const key = svcKey || anonKey;
    const res = await fetch(`${supabaseUrl}/rest/v1/guest_requests?order=created_at.desc&select=*`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });

    const body = await res.text();

    return NextResponse.json({
      keyUsed,
      svcKeyPresent: !!svcKey,
      anonKeyPresent: !!anonKey,
      status: res.status,
      body: body.slice(0, 500),
    });
  } catch (err) {
    return NextResponse.json({
      keyUsed,
      svcKeyPresent: !!svcKey,
      anonKeyPresent: !!anonKey,
      error: String(err),
    });
  }
}
