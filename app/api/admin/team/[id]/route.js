// app/api/admin/team/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/requireAuth';
import { sanitizeString, validateCUID, parseIntSafe } from '@/lib/validate';
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

// ==================== GET - Single Team Member ====================
export async function GET(request, { params }) {
  try {
    // 1. Authentication check
    const auth = await requireAuth(request);
    if (!auth) {
      return errorResponse('Unauthorized', 401);
    }

    // 2. Validate route params
    const { id } = await params;

    if (!id || typeof id !== 'string') {
      return errorResponse('Team member ID is required', 400);
    }

    if (!validateCUID(id)) {
      return errorResponse('Invalid team member ID format', 400);
    }

    // 3. Fetch team member
    const teamMember = await prisma.teamMember.findUnique({
      where: { id },
    });

    // 4. Check existence
    if (!teamMember) {
      return errorResponse('Team member not found', 404);
    }

    // 5. Success response
    return NextResponse.json({
      ok: true,
      data: teamMember,
      message: 'Team member retrieved successfully',
    });

  } catch (err) {
    console.error('GET /api/admin/team/[id] error:', err);

    // Handle Prisma errors
    if (err.code === 'P2025') {
      return errorResponse('Team member not found', 404);
    }
    if (err.code === 'P2021') {
      return errorResponse('Database table does not exist', 500);
    }

    return errorResponse('Failed to retrieve team member', 500);
  }
}

// ==================== PUT - Update Team Member ====================
export async function PUT(request, { params }) {
  try {
    // 1. Authentication check
    const auth = await requireAuth(request);
    if (!auth) {
      return errorResponse('Unauthorized', 401);
    }

    // 2. Validate route params
    const { id } = await params;

    if (!id || typeof id !== 'string') {
      return errorResponse('Team member ID is required', 400);
    }

    if (!validateCUID(id)) {
      return errorResponse('Invalid team member ID format', 400);
    }

    // 3. Safe JSON parsing
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return errorResponse('Invalid JSON in request body', 400);
    }

    // 4. Validate request body exists
    if (!body || typeof body !== 'object') {
      return errorResponse('Request body is required', 400);
    }

    // 5. Sanitize and validate fields
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

    // 6. Field-specific validation - Name
    if (!name || name.trim() === '') {
      return errorResponse('Name is required', 400);
    }

    if (name.length < 2) {
      return errorResponse('Name must be at least 2 characters', 400);
    }

    if (name.length > 100) {
      return errorResponse('Name must be less than 100 characters', 400);
    }

    // 7. Field-specific validation - Role
    if (!role || role.trim() === '') {
      return errorResponse('Role is required', 400);
    }

    if (role.length < 2) {
      return errorResponse('Role must be at least 2 characters', 400);
    }

    if (role.length > 100) {
      return errorResponse('Role must be less than 100 characters', 400);
    }

    // 8. Validate image URL
    if (image && image.trim() !== '') {
      if (!image.startsWith('/uploads/') && !image.startsWith('http://') && !image.startsWith('https://')) {
        return errorResponse('Image must be a valid upload path or URL', 400);
      }
      if (image.length > 500) {
        return errorResponse('Image URL is too long (max 500 characters)', 400);
      }
    }

    // 9. Validate description
    if (description && description.length > 2000) {
      return errorResponse('Description must be less than 2000 characters', 400);
    }

    // 10. Validate LinkedIn URL
    if (linkedin && linkedin.trim() !== '') {
      if (!linkedin.startsWith('http://') && !linkedin.startsWith('https://')) {
        return errorResponse('LinkedIn URL must be a valid URL', 400);
      }
      if (linkedin.length > 500) {
        return errorResponse('LinkedIn URL is too long (max 500 characters)', 400);
      }
    }

    // 11. Validate Twitter URL
    if (twitter && twitter.trim() !== '') {
      if (!twitter.startsWith('http://') && !twitter.startsWith('https://')) {
        return errorResponse('Twitter URL must be a valid URL', 400);
      }
      if (twitter.length > 500) {
        return errorResponse('Twitter URL is too long (max 500 characters)', 400);
      }
    }

    // 12. Validate position
    if (position !== null) {
      if (isNaN(Number(position)) || Number(position) < 1) {
        return errorResponse('Position must be a positive number', 400);
      }
      if (Number(position) > 999999) {
        return errorResponse('Position must be less than 1,000,000', 400);
      }
    }

    // 13. Check existence before update
    const existingMember = await prisma.teamMember.findUnique({
      where: { id },
      select: { image: true, name: true },
    });

    if (!existingMember) {
      return errorResponse('Team member not found', 404);
    }

    // 14. Delete old image if it changed
    const finalImage = image && image.trim() !== '' ? image : null;
    if (existingMember.image && existingMember.image !== finalImage) {
      await deleteUploadedFile(existingMember.image);
    }

    // 15. Update team member
    const teamMember = await prisma.teamMember.update({
      where: { id },
      data: {
        name: name.trim(),
        role: role.trim(),
        image: finalImage,
        description: description?.trim() || null,
        linkedin: linkedin?.trim() || null,
        twitter: twitter?.trim() || null,
        position,
        published,
      },
    });

    // 16. Success response
    return NextResponse.json({
      ok: true,
      data: teamMember,
      message: 'Team member updated successfully',
    });

  } catch (err) {
    console.error('PUT /api/admin/team/[id] error:', err);

    // Handle Prisma-specific errors
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0] || 'field';
      return errorResponse(`A team member with this ${field} already exists`, 409);
    }
    if (err.code === 'P2025') {
      return errorResponse('Team member not found', 404);
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

    return errorResponse('Failed to update team member', 500);
  }
}

// ==================== DELETE - Delete Team Member ====================
export async function DELETE(request, { params }) {
  try {
    // 1. Authentication check
    const auth = await requireAuth(request);
    if (!auth) {
      return errorResponse('Unauthorized', 401);
    }

    // 2. Validate route params
    const { id } = await params;

    if (!id || typeof id !== 'string') {
      return errorResponse('Team member ID is required', 400);
    }

    if (!validateCUID(id)) {
      return errorResponse('Invalid team member ID format', 400);
    }

    // 3. Check existence before delete
    const teamMember = await prisma.teamMember.findUnique({
      where: { id },
      select: { image: true, name: true },
    });

    if (!teamMember) {
      return errorResponse('Team member not found', 404);
    }

    // 4. Delete image file if exists
    if (teamMember.image) {
      await deleteUploadedFile(teamMember.image);
    }

    // 5. Delete database record
    await prisma.teamMember.delete({
      where: { id },
    });

    // 6. Success response
    return NextResponse.json({
      ok: true,
      data: { id, name: teamMember.name },
      message: 'Team member deleted successfully',
    });

  } catch (err) {
    console.error('DELETE /api/admin/team/[id] error:', err);

    // Handle Prisma-specific errors
    if (err.code === 'P2025') {
      return errorResponse('Team member not found', 404);
    }
    if (err.code === 'P2003') {
      return errorResponse('Cannot delete team member: it is referenced by other records', 400);
    }
    if (err.code === 'P2021') {
      return errorResponse('Database table does not exist', 500);
    }
    if (err.code === 'P2014') {
      return errorResponse('The change would violate a required relation', 400);
    }

    return errorResponse('Failed to delete team member', 500);
  }
}
