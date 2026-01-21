// app/api/admin/testimonials/[id]/route.js
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
  if (!filePath || (!filePath.startsWith('/uploads/'))) {
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

// ==================== GET - Single Testimonial ====================
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
      return errorResponse('Testimonial ID is required', 400);
    }

    if (!validateUUID(id)) {
      return errorResponse('Invalid testimonial ID format', 400);
    }

    // 3. Fetch testimonial
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    // 4. Check existence
    if (!testimonial) {
      return errorResponse('Testimonial not found', 404);
    }

    // 5. Success response
    return NextResponse.json({
      ok: true,
      data: testimonial,
      message: 'Testimonial retrieved successfully',
    });

  } catch (err) {
    console.error('GET /api/admin/testimonials/[id] error:', err);

    // Handle Prisma errors
    if (err.code === 'P2025') {
      return errorResponse('Testimonial not found', 404);
    }
    if (err.code === 'P2021') {
      return errorResponse('Database table does not exist', 500);
    }

    return errorResponse('Failed to retrieve testimonial', 500);
  }
}

// ==================== PUT - Update Testimonial ====================
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
      return errorResponse('Testimonial ID is required', 400);
    }

    if (!validateUUID(id)) {
      return errorResponse('Invalid testimonial ID format', 400);
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
    const name = sanitizeString(body.name, 100);
    const role = sanitizeString(body.role, 100);
    const company = sanitizeString(body.company, 100);
    const message = sanitizeString(body.message, 2000);
    const quoteExcerpt = sanitizeString(body.quoteExcerpt, 300);
    const image = sanitizeString(body.image, 500);
    const videoUrl = sanitizeString(body.videoUrl, 500);
    const thumbnailUrl = sanitizeString(body.thumbnailUrl, 500);
    const rating = body.rating !== null && body.rating !== undefined 
      ? Math.min(5, Math.max(1, parseIntSafe(body.rating, 5))) 
      : 5;
    const verified = Boolean(body.verified);
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

    // 8. Validate company (optional)
    if (company && company.length > 100) {
      return errorResponse('Company name must be less than 100 characters', 400);
    }

    // 9. Field-specific validation - Message
    if (!message || message.trim() === '') {
      return errorResponse('Message is required', 400);
    }

    if (message.length < 20) {
      return errorResponse('Message must be at least 20 characters', 400);
    }

    if (message.length > 2000) {
      return errorResponse('Message must be less than 2000 characters', 400);
    }

    // 10. Validate quote excerpt (optional)
    if (quoteExcerpt && quoteExcerpt.length > 300) {
      return errorResponse('Quote excerpt must be less than 300 characters', 400);
    }

    // 11. Validate profile image URL (optional)
    if (image && image.trim() !== '') {
      if (!image.startsWith('/uploads/') && !image.startsWith('http://') && !image.startsWith('https://')) {
        return errorResponse('Profile image must be a valid upload path or URL', 400);
      }
      if (image.length > 500) {
        return errorResponse('Profile image URL is too long (max 500 characters)', 400);
      }
    }

    // 12. Validate video URL (optional)
    if (videoUrl && videoUrl.trim() !== '') {
      if (!videoUrl.startsWith('/uploads/testimonials/videos/') && 
          !videoUrl.startsWith('http://') && 
          !videoUrl.startsWith('https://')) {
        return errorResponse('Video URL must be a valid upload path', 400);
      }
      if (videoUrl.length > 500) {
        return errorResponse('Video URL is too long (max 500 characters)', 400);
      }
    }

    // 13. Validate thumbnail URL (optional)
    if (thumbnailUrl && thumbnailUrl.trim() !== '') {
      if (!thumbnailUrl.startsWith('/uploads/testimonials/thumbnails/') && 
          !thumbnailUrl.startsWith('/uploads/') &&
          !thumbnailUrl.startsWith('http://') && 
          !thumbnailUrl.startsWith('https://')) {
        return errorResponse('Thumbnail URL must be a valid upload path', 400);
      }
      if (thumbnailUrl.length > 500) {
        return errorResponse('Thumbnail URL is too long (max 500 characters)', 400);
      }
    }

    // 14. Video testimonial validation: if video exists, thumbnail is required
    const hasVideo = videoUrl && videoUrl.trim() !== '';
    const hasThumbnail = thumbnailUrl && thumbnailUrl.trim() !== '';

    if (hasVideo && !hasThumbnail) {
      return errorResponse('Thumbnail is required for video testimonials', 400);
    }

    // 15. Validate rating
    if (rating < 1 || rating > 5) {
      return errorResponse('Rating must be between 1 and 5', 400);
    }

    // 16. Validate position
    if (position !== null) {
      if (isNaN(Number(position)) || Number(position) < 1) {
        return errorResponse('Position must be a positive number', 400);
      }
      if (Number(position) > 999999) {
        return errorResponse('Position must be less than 1,000,000', 400);
      }
    }

    // 17. Check existence before update
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
      select: { 
        image: true, 
        videoUrl: true, 
        thumbnailUrl: true,
        name: true 
      },
    });

    if (!existingTestimonial) {
      return errorResponse('Testimonial not found', 404);
    }

    // 18. Delete old files if they changed
    const finalImage = image && image.trim() !== '' ? image.trim() : null;
    const finalVideoUrl = videoUrl && videoUrl.trim() !== '' ? videoUrl.trim() : null;
    const finalThumbnailUrl = thumbnailUrl && thumbnailUrl.trim() !== '' ? thumbnailUrl.trim() : null;

    // Delete old profile image if changed
    if (existingTestimonial.image && existingTestimonial.image !== finalImage) {
      await deleteUploadedFile(existingTestimonial.image);
    }

    // Delete old video if changed
    if (existingTestimonial.videoUrl && existingTestimonial.videoUrl !== finalVideoUrl) {
      await deleteUploadedFile(existingTestimonial.videoUrl);
    }

    // Delete old thumbnail if changed
    if (existingTestimonial.thumbnailUrl && existingTestimonial.thumbnailUrl !== finalThumbnailUrl) {
      await deleteUploadedFile(existingTestimonial.thumbnailUrl);
    }

    // 19. Update testimonial
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name: name.trim(),
        role: role.trim(),
        company: company?.trim() || null,
        message: message.trim(),
        quoteExcerpt: quoteExcerpt?.trim() || null,
        image: finalImage,
        videoUrl: finalVideoUrl,
        thumbnailUrl: finalThumbnailUrl,
        rating,
        verified,
        position,
        published,
      },
    });

    // 20. Success response
    return NextResponse.json({
      ok: true,
      data: testimonial,
      message: 'Testimonial updated successfully',
    });

  } catch (err) {
    console.error('PUT /api/admin/testimonials/[id] error:', err);

    // Handle Prisma-specific errors
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0] || 'field';
      return errorResponse(`A testimonial with this ${field} already exists`, 409);
    }
    if (err.code === 'P2025') {
      return errorResponse('Testimonial not found', 404);
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

    return errorResponse('Failed to update testimonial', 500);
  }
}

// ==================== DELETE - Delete Testimonial ====================
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
      return errorResponse('Testimonial ID is required', 400);
    }

    if (!validateUUID(id)) {
      return errorResponse('Invalid testimonial ID format', 400);
    }

    // 3. Check existence before delete
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
      select: { 
        image: true, 
        videoUrl: true, 
        thumbnailUrl: true,
        name: true 
      },
    });

    if (!testimonial) {
      return errorResponse('Testimonial not found', 404);
    }

    // 4. Delete all associated files
    if (testimonial.image) {
      await deleteUploadedFile(testimonial.image);
    }

    if (testimonial.videoUrl) {
      await deleteUploadedFile(testimonial.videoUrl);
    }

    if (testimonial.thumbnailUrl) {
      await deleteUploadedFile(testimonial.thumbnailUrl);
    }

    // 5. Delete database record
    await prisma.testimonial.delete({
      where: { id },
    });

    // 6. Success response
    return NextResponse.json({
      ok: true,
      data: { id, name: testimonial.name },
      message: 'Testimonial deleted successfully',
    });

  } catch (err) {
    console.error('DELETE /api/admin/testimonials/[id] error:', err);

    // Handle Prisma-specific errors
    if (err.code === 'P2025') {
      return errorResponse('Testimonial not found', 404);
    }
    if (err.code === 'P2003') {
      return errorResponse('Cannot delete testimonial: it is referenced by other records', 400);
    }
    if (err.code === 'P2021') {
      return errorResponse('Database table does not exist', 500);
    }
    if (err.code === 'P2014') {
      return errorResponse('The change would violate a required relation', 400);
    }

    return errorResponse('Failed to delete testimonial', 500);
  }
}