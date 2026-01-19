// lib/requireAuth.js
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'yzo_admin';

export async function requireAuth(req) {
  try {
    // Method 1: From request headers (API routes)
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader
      .split(';')
      .map(s => s.trim())
      .find(s => s.startsWith(`${COOKIE_NAME}=`));

    if (!match) return null;

    const token = match.split('=')[1];
    if (!token) return null;

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (e) {
    // Don't log sensitive error details in production
    if (process.env.NODE_ENV !== 'production') {
      console.log('Auth error:', e.message);
    }
    return null;
  }
}

export async function requireAuthOrFail(req) {
  const auth = await requireAuth(req);
  if (!auth) {
    throw new AuthError('Unauthorized');
  }
  return auth;
}

export class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
  }
}