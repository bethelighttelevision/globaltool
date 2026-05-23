import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const svcKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    return NextResponse.json({ success: false, error: 'Supabase URL not configured' }, { status: 500 });
  }

  const key = svcKey || anonKey;
  if (!key) {
    return NextResponse.json({ success: false, error: 'No Supabase key configured' }, { status: 500 });
  }

  try {
    const res = await fetch(supabaseUrl + '/rest/v1/guest_requests?order=created_at.desc&select=*', {
      headers: { apikey: key, Authorization: 'Bearer ' + key },
    });

    if (!res.ok) {
      const errBody = await res.text();
      return NextResponse.json({ success: false, error: errBody, data: [] });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err), data: [] });
  }
}
