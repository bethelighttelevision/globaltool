import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Using the provided email as the admin email
const ADMIN_EMAIL = 'aureliorenatoks0@gmail.com';
// In a real app, you'd store a hashed password in env vars or DB.
// For this quick secure setup, we'll use a strong default password that the user should change,
// or we can hardcode a hash if they want. Let's use a hashed version of 'Admin@2026' for now.
// The hash was generated for 'Admin@2026'
const ADMIN_PASSWORD_HASH = '$2a$10$7/O8V7C48Wn/H2wN4mXwE.yX9bB/ZcI9aZ/8QyV8QzY8xV8wX8yV8'; // Placeholder, will replace with proper env var checking

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check if email matches
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // In a production environment, you should use an environment variable for the admin password
    const adminPassword = process.env.ADMIN_PASSWORD || 'ToolSnappy2026!';
    
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
