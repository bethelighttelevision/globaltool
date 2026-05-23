import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ success: false, error: 'Supabase not configured' }, { status: 500 });
  }

  try {
    if (type === 'count') {
      const res = await fetch(`${supabaseUrl}/rest/v1/guest_requests?select=id&status=eq.pending`, {
        headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      });
      if (!res.ok) {
        const errBody = await res.text();
        return NextResponse.json({ success: false, error: errBody, count: 0 });
      }
      const data = await res.json();
      return NextResponse.json({ success: true, count: data?.length || 0 });
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/guest_requests?order=created_at.desc`, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
    });

    if (!res.ok) {
      const errBody = await res.text();
      return NextResponse.json({ success: false, error: errBody, data: [] });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err), data: [] }, { status: 500 });
  }
}
