import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'ToolSnappy Contact <contact@toolsnappy.com>',
      replyTo: email,
      to: [process.env.CONTACT_EMAIL || 'aureliorenatoksa@gmail.com'],
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${message}</p>
        <hr>
        <p style="color: #888; font-size: 12px;">Sent from toolsnappy.com contact form</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }
}
