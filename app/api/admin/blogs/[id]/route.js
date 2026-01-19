// app/api/admin/blogs/[id]/route.js
import { NextResponse } from 'next/server';
import TurndownService from 'turndown';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/requireAuth';
import { sanitizeString, sanitizeSlug, sanitizeHtml, validateUUID } from '@/lib/validate';
import path from 'path';
import fs from 'fs';

// Helper function to safely delete uploaded file
async function deleteUploadedFile(filePath) {
  if (!filePath || typeof filePath !== 'string' || !filePath.startsWith('/uploads/')) {
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

// Helper to extract image URLs from HTML content
function extractImagesFromHtml(html) {
  if (!html || typeof html !== 'string') return [];
  
  const images = [];
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  
  while ((match = imgRegex.exec(html)) !== null) {
    if (match[1] && match[1].startsWith('/uploads/')) {
      images.push(match[1]);
    }
  }
  
  return images;
}

// Consistent error response helper
function errorResponse(message, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

// GET - Fetch single blog
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    // Validate ID format
    if (!id || typeof id !== 'string') {
      return errorResponse('Blog ID is required', 400);
    }

    if (!validateUUID(id)) {
      return errorResponse('Invalid blog ID format', 400);
    }

    const auth = await requireAuth(req);

    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return errorResponse('Blog not found', 404);
    }

    // Only allow unpublished blogs for authenticated admins
    if (!blog.published && !auth) {
      return errorResponse('Blog not found', 404);
    }

    return NextResponse.json(blog);
  } catch (err) {
    console.error('Fetch blog error:', err);
    return errorResponse('Failed to fetch blog', 500);
  }
}

// PUT - Update blog
export async function PUT(req, { params }) {
  try {
    // Auth check first
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse('Unauthorized', 401);
    }

    const { id } = await params;

    // Validate ID
    if (!id || typeof id !== 'string') {
      return errorResponse('Blog ID is required', 400);
    }

    if (!validateUUID(id)) {
      return errorResponse('Invalid blog ID format', 400);
    }

    // Safely parse JSON body
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return errorResponse('Invalid JSON in request body', 400);
    }

    // Check if body exists
    if (!body || typeof body !== 'object') {
      return errorResponse('Request body is required', 400);
    }

    // Validate and sanitize
    const title = sanitizeString(body.title, 200);
    const slug = sanitizeSlug(body.slug);
    const excerpt = sanitizeString(body.excerpt, 500);
    const contentHtml = sanitizeHtml(body.contentHtml || '');
    const featuredImage = body.featuredImage ? sanitizeString(body.featuredImage, 500) : null;
    const published = Boolean(body.published);

    // Validate required fields with specific messages
    if (!title) {
      return errorResponse('Title is required', 400);
    }

    if (!slug) {
      return errorResponse('Slug is required', 400);
    }

    if (!contentHtml) {
      return errorResponse('Content is required', 400);
    }

    // Validate slug format
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return errorResponse('Slug must contain only lowercase letters, numbers, and hyphens', 400);
    }

    // Validate featured image URL format if provided
    if (featuredImage && !featuredImage.startsWith('/uploads/') && !featuredImage.startsWith('http')) {
      return errorResponse('Invalid image URL format', 400);
    }

    // Validate and sanitize tags
    let tags = [];
    if (body.tags !== undefined) {
      if (!Array.isArray(body.tags)) {
        return errorResponse('Tags must be an array', 400);
      }
      tags = body.tags
        .filter(t => typeof t === 'string' && t.trim())
        .map(t => sanitizeString(t.trim(), 50))
        .slice(0, 20);
    }

    // Check if blog exists
    const currentBlog = await prisma.blog.findUnique({
      where: { id },
      select: { id: true, image: true, content_html: true },
    });

    if (!currentBlog) {
      return errorResponse('Blog not found', 404);
    }

    // Check slug uniqueness (excluding current blog)
    const existingSlug = await prisma.blog.findFirst({
      where: {
        slug,
        NOT: { id },
      },
      select: { id: true },
    });

    if (existingSlug) {
      return errorResponse('A blog with this slug already exists', 409);
    }

    // Delete old featured image if changed
    if (currentBlog.image && currentBlog.image !== featuredImage) {
      await deleteUploadedFile(currentBlog.image);
    }

    // Find and delete removed content images
    if (currentBlog.content_html) {
      const oldImages = extractImagesFromHtml(currentBlog.content_html);
      const newImages = extractImagesFromHtml(contentHtml);
      const removedImages = oldImages.filter(img => !newImages.includes(img));
      
      for (const img of removedImages) {
        await deleteUploadedFile(img);
      }
    }

    // Convert HTML to Markdown
    const turndown = new TurndownService({ headingStyle: 'atx' });
    const markdown = turndown.turndown(contentHtml);

    // Calculate read time
    const words = markdown.split(/\s+/).filter(Boolean).length;
    const readTime = `${Math.max(1, Math.round(words / 200))} min read`;

    // Update blog
    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content: markdown,
        content_html: contentHtml,
        image: featuredImage,
        tags,
        readTime,
        published,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ 
      ok: true, 
      blog,
      message: 'Blog updated successfully' 
    });
  } catch (err) {
    console.error('Update blog error:', err);
    
    // Handle specific Prisma errors
    if (err.code === 'P2025') {
      return errorResponse('Blog not found', 404);
    }
    if (err.code === 'P2002') {
      return errorResponse('A blog with this slug already exists', 409);
    }
    
    return errorResponse('Failed to update blog', 500);
  }
}

// DELETE - Delete blog
export async function DELETE(req, { params }) {
  try {
    // Auth check first
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse('Unauthorized', 401);
    }

    const { id } = await params;

    // Validate ID
    if (!id || typeof id !== 'string') {
      return errorResponse('Blog ID is required', 400);
    }

    if (!validateUUID(id)) {
      return errorResponse('Invalid blog ID format', 400);
    }

    // Fetch blog to get image paths
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: { id: true, title: true, image: true, content_html: true },
    });

    if (!blog) {
      return errorResponse('Blog not found', 404);
    }

    // Delete featured image if exists
    if (blog.image) {
      await deleteUploadedFile(blog.image);
    }

    // Delete content images if exist
    if (blog.content_html) {
      const contentImages = extractImagesFromHtml(blog.content_html);
      for (const img of contentImages) {
        await deleteUploadedFile(img);
      }
    }

    // Delete database record
    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({
      ok: true,
      message: `Blog "${blog.title}" deleted successfully`,
    });
  } catch (err) {
    console.error('Delete blog error:', err);
    
    if (err.code === 'P2025') {
      return errorResponse('Blog not found', 404);
    }
    
    return errorResponse('Failed to delete blog', 500);
  }
}