import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const svcKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const keyUsed = svcKey ? 'SERVICE_ROLE' : anonKey ? 'ANON' : 'NONE';

  const svcKeyPreview = svcKey ? svcKey.substring(0, 10) + '...' : 'MISSING';
  const anonKeyPreview = anonKey ? anonKey.substring(0, 10) + '...' : 'MISSING';

  const result = { keyUsed, svcKeyPresent: !!svcKey, anonKeyPresent: !!anonKey, svcKeyPreview, anonKeyPreview, url: supabaseUrl };

  try {
    const key = svcKey || anonKey;
    const res = await fetch(`${supabaseUrl}/rest/v1/guest_requests?order=created_at.desc&select=*`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    const status = res.status;
    const body = await res.text();
    return NextResponse.json({ ...result, apiStatus: status, apiBody: body.substring(0, 300) });
  } catch (err) {
    return NextResponse.json({ ...result, apiError: String(err) });
  }
}
