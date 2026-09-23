import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from '@/lib/session';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define routes that require authentication
  // All admin paths except login and registration routes are protected.
  const isProtectedRoute = pathname === '/admin' || (
    pathname.startsWith('/admin/') && 
    pathname !== '/admin/login' && 
    pathname !== '/admin/register' &&
    pathname !== '/admin/verify-otp' &&
    pathname !== '/admin/send-otp'
  );
  
  if (isProtectedRoute) {
    const sessionCookie = request.cookies.get('portfolio_admin_session');
    let isAuthenticated = false;
    
    if (sessionCookie && sessionCookie.value) {
      const username = await verifySessionToken(sessionCookie.value);
      if (username) {
        isAuthenticated = true;
      }
    }
    
    if (!isAuthenticated) {
      // Redirect unauthenticated user to the admin login page
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  // Apply proxy checks to the admin routes
  matcher: ['/admin', '/admin/:path*'],
};