// proxy.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'yzo_admin';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

export default async function proxy(req) {
  const { pathname } = req.nextUrl;

  // Allow login page
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // Protect all other /admin routes
  if (pathname.startsWith('/admin')) {
    const cookie = req.cookies.get(COOKIE_NAME);
    
    if (!cookie?.value) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    try {
      await jwtVerify(cookie.value, JWT_SECRET);
      return NextResponse.next();
    } catch (e) {
      console.error('JWT verification failed:', e.message);
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};