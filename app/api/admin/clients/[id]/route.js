// app/api/admin/clients/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/requireAuth';
import { sanitizeString, validateUUID, parseIntSafe } from '@/lib/validate';
import path from 'path';
import fs from 'fs';

// ==================== ERROR RESPONSE HELPER ====================
function errorResponse(message, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

// ==================== FILE DELETION HELPER ====================
async function deleteUploadedFile(filePath) {
  if (!filePath || !filePath.startsWith('/uploads/')) {
    return false;
  }

  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    const resolvedPath = path.resolve(fullPath);
    const uploadsRoot = path.resolve(process.cwd(), 'public', 'uploads');

    // Security check: ensure path is within uploads directory
    if (!resolvedPath.startsWith(uploadsRoot)) {
      console.warn('⚠️ Attempted to delete file outside uploads directory:', filePath);
      return false;
    }

    if (fs.existsSync(resolvedPath)) {
      await fs.promises.unlink(resolvedPath);
      console.log('🗑️ Deleted file:', resolvedPath);
      return true;
    }
  } catch (err) {
    console.warn('⚠️ Could not delete file:', filePath, err.message);
  }

  return false;
}

// ==================== GET - Single Client ====================
export async function GET(req, { params }) {
  try {
    // 1. Authentication check
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse('Unauthorized', 401);
    }

    // 2. Validate route params
    const { id } = await params;
    
    if (!id || typeof id !== 'string') {
      return errorResponse('Client ID is required', 400);
    }

    if (!validateUUID(id)) {
      return errorResponse('Invalid client ID format', 400);
    }

    // 3. Fetch client
    const client = await prisma.client.findUnique({
      where: { id },
    });

    // 4. Check existence
    if (!client) {
      return errorResponse('Client not found', 404);
    }

    // 5. Success response with message
    return NextResponse.json({
      ok: true,
      data: client,
      message: 'Client retrieved successfully',
    });

  } catch (err) {
    console.error('GET /api/admin/clients/[id] error:', err);

    // Handle Prisma errors
    if (err.code === 'P2025') {
      return errorResponse('Client not found', 404);
    }
    if (err.code === 'P2021') {
      return errorResponse('Database table does not exist', 500);
    }

    return errorResponse('Failed to retrieve client', 500);
  }
}

// ==================== PUT - Update Client ====================
export async function PUT(req, { params }) {
  try {
    // 1. Authentication check
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse('Unauthorized', 401);
    }

    // 2. Validate route params
    const { id } = await params;
    
    if (!id || typeof id !== 'string') {
      return errorResponse('Client ID is required', 400);
    }

    if (!validateUUID(id)) {
      return errorResponse('Invalid client ID format', 400);
    }

    // 3. Safe JSON parsing
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return errorResponse('Invalid JSON in request body', 400);
    }

    // 4. Validate request body exists
    if (!body || typeof body !== 'object') {
      return errorResponse('Request body is required', 400);
    }

    // 5. Sanitize and validate fields
    const name = sanitizeString(body.name, 200);
    const logo = sanitizeString(body.logo, 500);
    const position = body.position !== null && body.position !== undefined && body.position !== '' 
      ? parseIntSafe(body.position, null) 
      : null;
    const published = Boolean(body.published);

    // 6. Field-specific validation
    if (!name || name.trim() === '') {
      return errorResponse('Client name is required', 400);
    }

    if (name.length < 2) {
      return errorResponse('Client name must be at least 2 characters', 400);
    }

    if (name.length > 200) {
      return errorResponse('Client name must be less than 200 characters', 400);
    }

    // Validate logo URL format if provided
    if (logo && logo.trim() !== '') {
      if (!logo.startsWith('/uploads/') && !logo.startsWith('http://') && !logo.startsWith('https://')) {
        return errorResponse('Logo must be a valid upload path or URL', 400);
      }
      if (logo.length > 500) {
        return errorResponse('Logo URL is too long (max 500 characters)', 400);
      }
    }

    // Validate position if provided
    if (position !== null) {
      if (isNaN(Number(position)) || Number(position) < 1) {
        return errorResponse('Position must be a positive number', 400);
      }
      if (Number(position) > 999999) {
        return errorResponse('Position must be less than 1,000,000', 400);
      }
    }

    // 7. Check existence before update
    const existingClient = await prisma.client.findUnique({
      where: { id },
      select: { logo: true, name: true },
    });

    if (!existingClient) {
      return errorResponse('Client not found', 404);
    }

    // 8. Delete old logo if it changed
    const finalLogo = logo && logo.trim() !== '' ? logo : null;
    if (existingClient.logo && existingClient.logo !== finalLogo && finalLogo !== existingClient.logo) {
      await deleteUploadedFile(existingClient.logo);
    }

    // 9. Update client
    const client = await prisma.client.update({
      where: { id },
      data: {
        name: name.trim(),
        logo: finalLogo,
        position,
        published,
      },
    });

    // 10. Success response with message
    return NextResponse.json({
      ok: true,
      data: client,
      message: 'Client updated successfully',
    });

  } catch (err) {
    console.error('PUT /api/admin/clients/[id] error:', err);

    // Handle Prisma-specific errors
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0] || 'field';
      return errorResponse(`A client with this ${field} already exists`, 409);
    }
    if (err.code === 'P2025') {
      return errorResponse('Client not found', 404);
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

    return errorResponse('Failed to update client', 500);
  }
}

// ==================== DELETE - Delete Client ====================
export async function DELETE(req, { params }) {
  try {
    // 1. Authentication check
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse('Unauthorized', 401);
    }

    // 2. Validate route params
    const { id } = await params;
    
    if (!id || typeof id !== 'string') {
      return errorResponse('Client ID is required', 400);
    }

    if (!validateUUID(id)) {
      return errorResponse('Invalid client ID format', 400);
    }

    // 3. Check existence before delete
    const client = await prisma.client.findUnique({
      where: { id },
      select: { logo: true, name: true },
    });

    if (!client) {
      return errorResponse('Client not found', 404);
    }

    // 4. Delete logo file if exists
    if (client.logo) {
      await deleteUploadedFile(client.logo);
    }

    // 5. Delete database record
    await prisma.client.delete({
      where: { id },
    });

    // 6. Success response with message
    return NextResponse.json({
      ok: true,
      data: { id, name: client.name },
      message: 'Client deleted successfully',
    });

  } catch (err) {
    console.error('DELETE /api/admin/clients/[id] error:', err);

    // Handle Prisma-specific errors
    if (err.code === 'P2025') {
      return errorResponse('Client not found', 404);
    }
    if (err.code === 'P2003') {
      return errorResponse('Cannot delete client: it is referenced by other records', 400);
    }
    if (err.code === 'P2021') {
      return errorResponse('Database table does not exist', 500);
    }
    if (err.code === 'P2014') {
      return errorResponse('The change would violate a required relation', 400);
    }

    return errorResponse('Failed to delete client', 500);
  }
}
