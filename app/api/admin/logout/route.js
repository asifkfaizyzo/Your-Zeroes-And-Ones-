// app/api/admin/logout/route.js
import { NextResponse } from 'next/server';

// ==================== CONFIGURATION ====================
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'yzo_admin';

// ==================== ERROR RESPONSE HELPER ====================
function errorResponse(message, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

// ==================== POST - Admin Logout ====================
export async function POST(req) {
  try {
    // 1. Get IP for logging (optional)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('x-real-ip') || 
               'unknown';

    // 2. Validate cookie configuration
    if (!COOKIE_NAME) {
      console.error('CRITICAL: JWT_COOKIE_NAME is not configured');
      return errorResponse('Server configuration error', 500);
    }

    // 3. Create response with success message
    const response = NextResponse.json({
      ok: true,
      message: 'Logged out successfully',
    });

    // 4. Clear the authentication cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // ✅ Consistent with login route
      path: '/',
      maxAge: 0, // Expire immediately
    });

    // 5. Log successful logout
    console.log('Logout: Successful logout from IP:', ip);

    return response;

  } catch (err) {
    // Catch-all for unexpected errors
    console.error('POST /api/admin/logout error:', err.message);
    
    // Don't expose internal error details to client
    return errorResponse('An unexpected error occurred', 500);
  }
}
