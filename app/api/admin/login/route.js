// app/api/admin/login/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginLimiter } from '@/lib/rateLimit';

// ==================== CONFIGURATION ====================
const JWT_SECRET = process.env.JWT_ACCESS_SECRET;
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'yzo_admin';
const EXPIRES_SECONDS = 60 * 60 * 24 * 7; // 7 days

// ==================== ERROR RESPONSE HELPER ====================
function errorResponse(message, status = 500, headers = {}) {
  return NextResponse.json({ error: message }, { status, headers });
}

// ==================== POST - Admin Login ====================
export async function POST(req) {
  try {
    // 1. Validate JWT secret configuration
    if (!JWT_SECRET) {
      console.error('CRITICAL: JWT_ACCESS_SECRET is not configured');
      return errorResponse('Server configuration error', 500);
    }

    // 2. Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('x-real-ip') || 
               'unknown';
    
    const { success, remaining } = loginLimiter.check(ip);
    
    if (!success) {
      return errorResponse(
        'Too many login attempts. Please try again in 15 minutes.',
        429,
        {
          'Retry-After': '900', // 15 minutes in seconds
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 900),
        }
      );
    }

    // 3. Safe JSON parsing
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.warn('Login: Invalid JSON from IP:', ip);
      return errorResponse('Invalid request format', 400);
    }

    // 4. Validate request body exists
    if (!body || typeof body !== 'object') {
      return errorResponse('Request body is required', 400);
    }

    // 5. Extract and validate credentials
    const { username, password } = body;

    // Field presence validation
    if (!username && !password) {
      return errorResponse('Username and password are required', 400);
    }
    if (!username) {
      return errorResponse('Username is required', 400);
    }
    if (!password) {
      return errorResponse('Password is required', 400);
    }

    // Type validation
    if (typeof username !== 'string') {
      return errorResponse('Username must be a string', 400);
    }
    if (typeof password !== 'string') {
      return errorResponse('Password must be a string', 400);
    }

    // Empty string validation
    if (username.trim() === '') {
      return errorResponse('Username cannot be empty', 400);
    }
    if (password.trim() === '') {
      return errorResponse('Password cannot be empty', 400);
    }

    // Length validation
    if (username.length < 3) {
      return errorResponse('Username must be at least 3 characters', 400);
    }
    if (username.length > 100) {
      return errorResponse('Username is too long (max 100 characters)', 400);
    }
    if (password.length < 6) {
      return errorResponse('Password must be at least 6 characters', 400);
    }
    if (password.length > 200) {
      return errorResponse('Password is too long (max 200 characters)', 400);
    }

    // Format validation - username should not contain special characters
    const usernameRegex = /^[a-zA-Z0-9._@-]+$/;
    if (!usernameRegex.test(username)) {
      return errorResponse('Username contains invalid characters', 400);
    }

    // 6. Sanitize username
    const sanitizedUsername = username.trim().toLowerCase();

    // 7. Fetch admin user
    let admin;
    try {
      admin = await prisma.admin.findUnique({ 
        where: { username: sanitizedUsername },
        select: {
          id: true,
          username: true,
          passwordHash: true,
        },
      });
    } catch (dbErr) {
      console.error('Login: Database error:', dbErr.code || dbErr.message);
      
      // Handle specific Prisma errors
      if (dbErr.code === 'P2021') {
        return errorResponse('Database configuration error', 500);
      }
      if (dbErr.code === 'P2024') {
        return errorResponse('Database connection timeout', 500);
      }
      
      return errorResponse('Database error occurred', 500);
    }

    // 8. Timing-safe password comparison
    // Always compare even if user not found (prevents timing attacks)
    const dummyHash = '$2b$10$N9qo8uLOickgx2ZMRZoMy.MQDv.qOW6hK1xPBJlM9R9H8x7q1.G9m';
    const hashToCompare = admin?.passwordHash || dummyHash;
    
    let passwordValid = false;
    try {
      passwordValid = await bcrypt.compare(password, hashToCompare);
    } catch (bcryptErr) {
      console.error('Login: bcrypt error:', bcryptErr.message);
      return errorResponse('Authentication error', 500);
    }

    // 9. Verify credentials
    if (!admin || !passwordValid) {
      // Generic error message - don't reveal if user exists
      console.warn('Login: Failed attempt for username:', sanitizedUsername, 'from IP:', ip);
      return errorResponse('Invalid username or password', 401);
    }

    // 10. Generate JWT token
    let token;
    try {
      token = jwt.sign(
        { 
          sub: admin.id, 
          username: admin.username,
          iat: Math.floor(Date.now() / 1000),
        },
        JWT_SECRET,
        { 
          expiresIn: '7d',
          algorithm: 'HS256',
        }
      );
    } catch (jwtErr) {
      console.error('Login: JWT generation error:', jwtErr.message);
      return errorResponse('Failed to generate authentication token', 500);
    }

    // 11. Set cookie and return success
    const response = NextResponse.json({
      ok: true,
      data: {
        username: admin.username,
        expiresIn: EXPIRES_SECONDS,
      },
      message: 'Login successful',
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: EXPIRES_SECONDS,
    });

    console.log('Login: Successful login for:', admin.username, 'from IP:', ip);

    return response;

  } catch (err) {
    // Catch-all for unexpected errors
    console.error('POST /api/admin/login error:', err.message);
    
    // Don't expose internal error details to client
    return errorResponse('An unexpected error occurred', 500);
  }
}
