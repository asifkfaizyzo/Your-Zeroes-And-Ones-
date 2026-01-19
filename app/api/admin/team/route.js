// app/api/admin/team/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/requireAuth';
import { sanitizeString, parseIntSafe } from '@/lib/validate';

// ==================== ERROR RESPONSE HELPER ====================
function errorResponse(message, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

// ==================== GET - List All Team Members ====================
export async function GET(request) {
  try {
    // 1. Check authentication (optional for GET - can show published to public)
    const auth = await requireAuth(request);

    // 2. Fetch team members with proper filtering
    const teamMembers = await prisma.teamMember.findMany({
      where: auth ? {} : { published: true },
      orderBy: [
        { position: 'asc' },
        { createdAt: 'desc' },
      ],
      select: {
        id: true,
        name: true,
        role: true,
        image: true,
        description: auth ? true : undefined,
        linkedin: auth ? true : undefined,
        twitter: auth ? true : undefined,
        position: auth ? true : undefined,
        published: auth ? true : undefined,
        createdAt: auth ? true : undefined,
      },
    });

    // 3. Success response with message
    return NextResponse.json({
      ok: true,
      data: teamMembers,
      message: 'Team members retrieved successfully',
    });

  } catch (err) {
    console.error('GET /api/admin/team error:', err);

    // Handle Prisma errors
    if (err.code === 'P2021') {
      return errorResponse('Database table does not exist', 500);
    }
    if (err.code === 'P2010') {
      return errorResponse('Database query failed', 500);
    }

    return errorResponse('Failed to retrieve team members', 500);
  }
}

// ==================== POST - Create New Team Member ====================
export async function POST(request) {
  try {
    // 1. Authentication check
    const auth = await requireAuth(request);
    if (!auth) {
      return errorResponse('Unauthorized', 401);
    }

    // 2. Safe JSON parsing
    let body;
    try {
      body = await request.json();
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
    const image = sanitizeString(body.image, 500);
    const description = sanitizeString(body.description, 2000);
    const linkedin = sanitizeString(body.linkedin, 500);
    const twitter = sanitizeString(body.twitter, 500);
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

    // 7. Validate image URL
    if (image && image.trim() !== '') {
      if (!image.startsWith('/uploads/') && !image.startsWith('http://') && !image.startsWith('https://')) {
        return errorResponse('Image must be a valid upload path or URL', 400);
      }
      if (image.length > 500) {
        return errorResponse('Image URL is too long (max 500 characters)', 400);
      }
    }

    // 8. Validate description
    if (description && description.length > 2000) {
      return errorResponse('Description must be less than 2000 characters', 400);
    }

    // 9. Validate LinkedIn URL
    if (linkedin && linkedin.trim() !== '') {
      if (!linkedin.startsWith('http://') && !linkedin.startsWith('https://')) {
        return errorResponse('LinkedIn URL must be a valid URL', 400);
      }
      if (linkedin.length > 500) {
        return errorResponse('LinkedIn URL is too long (max 500 characters)', 400);
      }
    }

    // 10. Validate Twitter URL
    if (twitter && twitter.trim() !== '') {
      if (!twitter.startsWith('http://') && !twitter.startsWith('https://')) {
        return errorResponse('Twitter URL must be a valid URL', 400);
      }
      if (twitter.length > 500) {
        return errorResponse('Twitter URL is too long (max 500 characters)', 400);
      }
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

    // 12. Check for duplicate name (optional business rule)
    const existingMember = await prisma.teamMember.findFirst({
      where: { 
        name: {
          equals: name.trim(),
          mode: 'insensitive', // Case-insensitive comparison
        },
      },
    });

    if (existingMember) {
      return errorResponse('A team member with this name already exists', 409);
    }

    // 13. Prepare final values
    const finalImage = image && image.trim() !== '' ? image : null;
    const finalDescription = description && description.trim() !== '' ? description : null;
    const finalLinkedin = linkedin && linkedin.trim() !== '' ? linkedin : null;
    const finalTwitter = twitter && twitter.trim() !== '' ? twitter : null;

    // 14. Create team member
    const teamMember = await prisma.teamMember.create({
      data: {
        name: name.trim(),
        role: role.trim(),
        image: finalImage,
        description: finalDescription,
        linkedin: finalLinkedin,
        twitter: finalTwitter,
        position,
        published,
      },
    });

    // 15. Success response with message
    return NextResponse.json({
      ok: true,
      data: teamMember,
      message: 'Team member created successfully',
    }, { status: 201 });

  } catch (err) {
    console.error('POST /api/admin/team error:', err);

    // Handle Prisma-specific errors
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0] || 'field';
      return errorResponse(`A team member with this ${field} already exists`, 409);
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

    return errorResponse('Failed to create team member', 500);
  }
}
