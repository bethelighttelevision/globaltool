import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { authorName, authorEmail, website, topic, outline, message } = body;

    if (!authorName || !authorEmail || !topic || !outline) {
      return NextResponse.json({ error: 'Name, email, topic, and outline are required.' }, { status: 400 });
    }

    if (!authorEmail.includes('@') || !authorEmail.includes('.')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // Save to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from('guest_requests').insert({
        author_name: authorName,
        author_email: authorEmail,
        website: website || null,
        topic,
        outline,
        message: message || null,
        status: 'pending',
      });
    }

    // Send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #111; margin-bottom: 20px;">New Guest Post Request</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #666; width: 120px;">Name</td><td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: 600;">${authorName}</td></tr>
            <tr><td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #666;">Email</td><td style="padding: 10px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${authorEmail}" style="color: #2997ff;">${authorEmail}</a></td></tr>
            ${website ? `<tr><td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #666;">Website</td><td style="padding: 10px 12px; border-bottom: 1px solid #eee;"><a href="${website}" style="color: #2997ff;">${website}</a></td></tr>` : ''}
            <tr><td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #666;">Topic</td><td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: 600;">${topic}</td></tr>
          </table>
          <h3 style="color: #111; margin-bottom: 10px;">Outline</h3>
          <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; color: #333; line-height: 1.6; margin-bottom: 20px; white-space: pre-wrap;">${outline}</div>
          ${message ? `<h3 style="color: #111; margin-bottom: 10px;">Additional Message</h3><div style="background: #f5f5f5; padding: 16px; border-radius: 8px; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</div>` : ''}
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #999; font-size: 12px;">Submitted via toolsnappy.com/write-for-us</p>
        </div>
      `;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'contact@toolsnappy.com',
          to: 'aureliorenatoksa@gmail.com',
          subject: `New Guest Post Request: ${topic} - from ${authorName}`,
          html: emailHtml,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Guest post submission error:', err);
    return NextResponse.json({ error: 'Internal server error. Please try again later.' }, { status: 500 });
  }
}
