import { NextResponse } from 'next/server';

// Using the provided email as the admin email
const ADMIN_EMAIL = 'bethelighttelevision@gmail.com';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check if email matches
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (password !== adminPassword) {
       return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // If successful, set a secure HTTP-only cookie
    const response = NextResponse.json({ success: true });
    
    response.cookies.set({
      name: 'admin_session',
      value: 'authenticated',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
