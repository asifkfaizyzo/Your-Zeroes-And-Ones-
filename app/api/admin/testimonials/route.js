// app/api/admin/testimonials/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/requireAuth';
import { sanitizeString, parseIntSafe } from '@/lib/validate';

// ==================== ERROR RESPONSE HELPER ====================
function errorResponse(message, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

// ==================== GET - List All Testimonials ====================
export async function GET(req) {
  try {
    // 1. Authentication check
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse('Unauthorized', 401);
    }

    // 2. Fetch all testimonials
    const testimonials = await prisma.testimonial.findMany({
      orderBy: [
        { position: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    // 3. Success response with message
    return NextResponse.json({
      ok: true,
      data: testimonials,
      message: 'Testimonials retrieved successfully',
    });

  } catch (err) {
    console.error('GET /api/admin/testimonials error:', err);

    // Handle Prisma errors
    if (err.code === 'P2021') {
      return errorResponse('Database table does not exist', 500);
    }
    if (err.code === 'P2010') {
      return errorResponse('Database query failed', 500);
    }

    return errorResponse('Failed to retrieve testimonials', 500);
  }
}

// ==================== POST - Create New Testimonial ====================
export async function POST(req) {
  try {
    // 1. Authentication check
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse('Unauthorized', 401);
    }

    // 2. Safe JSON parsing
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return errorResponse('Invalid JSON in request body', 400);
    }

    // 3. Validate request body exists
    if (!body || typeof body !== 'object') {
      return errorResponse('Request body is required', 400);
    }

    // 4. Sanitize and validate fields
    const name = sanitizeString(body.name, 100);
    const role = sanitizeString(body.role, 100);
    const company = sanitizeString(body.company, 100);
    const message = sanitizeString(body.message, 2000);
    const image = sanitizeString(body.image, 500);
    const rating = body.rating !== null && body.rating !== undefined 
      ? Math.min(5, Math.max(1, parseIntSafe(body.rating, 5))) 
      : 5;
    const verified = Boolean(body.verified);
    const position = body.position !== null && body.position !== undefined && body.position !== '' 
      ? parseIntSafe(body.position, null) 
      : null;
    const published = Boolean(body.published);

    // 5. Field-specific validation - Name
    if (!name || name.trim() === '') {
      return errorResponse('Name is required', 400);
    }

    if (name.length < 2) {
      return errorResponse('Name must be at least 2 characters', 400);
    }

    if (name.length > 100) {
      return errorResponse('Name must be less than 100 characters', 400);
    }

    // 6. Field-specific validation - Role
    if (!role || role.trim() === '') {
      return errorResponse('Role is required', 400);
    }

    if (role.length < 2) {
      return errorResponse('Role must be at least 2 characters', 400);
    }

    if (role.length > 100) {
      return errorResponse('Role must be less than 100 characters', 400);
    }

    // 7. Validate company (optional)
    if (company && company.length > 100) {
      return errorResponse('Company name must be less than 100 characters', 400);
    }

    // 8. Field-specific validation - Message
    if (!message || message.trim() === '') {
      return errorResponse('Message is required', 400);
    }

    if (message.length < 20) {
      return errorResponse('Message must be at least 20 characters', 400);
    }

    if (message.length > 2000) {
      return errorResponse('Message must be less than 2000 characters', 400);
    }

    // 9. Validate image URL
    if (image && image.trim() !== '') {
      if (!image.startsWith('/uploads/') && !image.startsWith('http://') && !image.startsWith('https://')) {
        return errorResponse('Image must be a valid upload path or URL', 400);
      }
      if (image.length > 500) {
        return errorResponse('Image URL is too long (max 500 characters)', 400);
      }
    }

    // 10. Validate rating
    if (rating < 1 || rating > 5) {
      return errorResponse('Rating must be between 1 and 5', 400);
    }

    // 11. Validate position
    if (position !== null) {
      if (isNaN(Number(position)) || Number(position) < 1) {
        return errorResponse('Position must be a positive number', 400);
      }
      if (Number(position) > 999999) {
        return errorResponse('Position must be less than 1,000,000', 400);
      }
    }

    // 12. Prepare final values
    const finalImage = image && image.trim() !== '' ? image : null;
    const finalCompany = company && company.trim() !== '' ? company : null;

    // 13. Create testimonial
    const testimonial = await prisma.testimonial.create({
      data: {
        name: name.trim(),
        role: role.trim(),
        company: finalCompany,
        message: message.trim(),
        image: finalImage,
        rating,
        verified,
        position,
        published,
      },
    });

    // 14. Success response with message
    return NextResponse.json({
      ok: true,
      data: testimonial,
      message: 'Testimonial created successfully',
    }, { status: 201 });

  } catch (err) {
    console.error('POST /api/admin/testimonials error:', err);

    // Handle Prisma-specific errors
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0] || 'field';
      return errorResponse(`A testimonial with this ${field} already exists`, 409);
    }
    if (err.code === 'P2003') {
      return errorResponse('Related record not found', 400);
    }
    if (err.code === 'P2021') {
      return errorResponse('Database table does not exist', 500);
    }
    if (err.code === 'P2023') {
      return errorResponse('Inconsistent column data', 400);
    }
    if (err.code === 'P2000') {
      return errorResponse('Value too long for the column', 400);
    }
    if (err.code === 'P2011') {
      return errorResponse('Null constraint violation', 400);
    }

    return errorResponse('Failed to create testimonial', 500);
  }
}
