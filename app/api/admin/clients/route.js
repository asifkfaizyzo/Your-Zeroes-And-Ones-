// app/api/admin/clients/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/requireAuth';
import { sanitizeString, parseIntSafe } from '@/lib/validate';

// ==================== ERROR RESPONSE HELPER ====================
function errorResponse(message, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

// ==================== GET - List All Clients ====================
export async function GET(req) {
  try {
    // 1. Check authentication (optional for GET)
    const auth = await requireAuth(req);

    // 2. Fetch clients with proper filtering
    const clients = await prisma.client.findMany({
      where: auth ? {} : { published: true },
      orderBy: [
        { position: 'asc' },
        { createdAt: 'desc' },
      ],
      select: {
        id: true,
        name: true,
        logo: true,
        position: true,
        published: auth ? true : undefined, // Only include for admins
        createdAt: auth ? true : undefined,
      },
    });

    // 3. Success response with message
    return NextResponse.json({
      ok: true,
      data: clients,
      message: 'Clients retrieved successfully',
    });

  } catch (err) {
    console.error('GET /api/admin/clients error:', err);

    // Handle Prisma errors
    if (err.code === 'P2021') {
      return errorResponse('Database table does not exist', 500);
    }
    if (err.code === 'P2010') {
      return errorResponse('Database query failed', 500);
    }

    return errorResponse('Failed to retrieve clients', 500);
  }
}

// ==================== POST - Create New Client ====================
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
    const name = sanitizeString(body.name, 200);
    const logo = sanitizeString(body.logo, 500);
    const position = body.position !== null && body.position !== undefined && body.position !== '' 
      ? parseIntSafe(body.position, null) 
      : null;
    const published = Boolean(body.published);

    // 5. Field-specific validation - Name
    if (!name || name.trim() === '') {
      return errorResponse('Client name is required', 400);
    }

    if (name.length < 2) {
      return errorResponse('Client name must be at least 2 characters', 400);
    }

    if (name.length > 200) {
      return errorResponse('Client name must be less than 200 characters', 400);
    }

    // 6. Field-specific validation - Logo
    if (logo && logo.trim() !== '') {
      if (!logo.startsWith('/uploads/') && !logo.startsWith('http://') && !logo.startsWith('https://')) {
        return errorResponse('Logo must be a valid upload path or URL', 400);
      }
      if (logo.length > 500) {
        return errorResponse('Logo URL is too long (max 500 characters)', 400);
      }
    }

    // 7. Field-specific validation - Position
    if (position !== null) {
      if (isNaN(Number(position)) || Number(position) < 1) {
        return errorResponse('Position must be a positive number', 400);
      }
      if (Number(position) > 999999) {
        return errorResponse('Position must be less than 1,000,000', 400);
      }
    }

    // 8. Check for duplicate name (optional business rule)
    const existingClient = await prisma.client.findFirst({
      where: { 
        name: {
          equals: name.trim(),
          mode: 'insensitive', // Case-insensitive comparison
        },
      },
    });

    if (existingClient) {
      return errorResponse('A client with this name already exists', 409);
    }

    // 9. Prepare final logo value
    const finalLogo = logo && logo.trim() !== '' ? logo : null;

    // 10. Create client
    const client = await prisma.client.create({
      data: {
        name: name.trim(),
        logo: finalLogo,
        position,
        published,
      },
    });

    // 11. Success response with message
    return NextResponse.json({
      ok: true,
      data: client,
      message: 'Client created successfully',
    }, { status: 201 });

  } catch (err) {
    console.error('POST /api/admin/clients error:', err);

    // Handle Prisma-specific errors
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0] || 'field';
      return errorResponse(`A client with this ${field} already exists`, 409);
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

    return errorResponse('Failed to create client', 500);
  }
}
