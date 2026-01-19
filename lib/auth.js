// lib/auth.js
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'yzo_admin';
const JWT_SECRET = process.env.JWT_ACCESS_SECRET;
const EXPIRES_SECONDS = 60 * 60 * 24 * 7; // 7 days

export function signJwt(payload) {
  if (!JWT_SECRET) {
    throw new Error('JWT_ACCESS_SECRET is not configured');
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJwt(token) {
  if (!JWT_SECRET) {
    throw new Error('JWT_ACCESS_SECRET is not configured');
  }
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function setAuthCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: EXPIRES_SECONDS,
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || null;
}

export async function verifyAuth() {
  const token = await getAuthToken();
  if (!token) return null;
  return verifyJwt(token);
}