import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect the /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Check if we are already on the login page to avoid infinite redirects
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    const authCookie = request.cookies.get('admin_session');
    
    // If no valid auth cookie, redirect to the custom admin login page
    if (!authCookie || authCookie.value !== 'authenticated') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
