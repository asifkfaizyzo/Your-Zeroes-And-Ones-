// app/api/admin/blogs/route.js
import { NextResponse } from 'next/server';
import TurndownService from 'turndown';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/requireAuth';
import { sanitizeString, sanitizeSlug, sanitizeHtml } from '@/lib/validate';

// Consistent error response helper
function errorResponse(message, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

// GET - Fetch all blogs (admin view - includes drafts)
export async function GET(req) {
  try {
    // Check if admin is requesting (show all) or public (show published only)
    const auth = await requireAuth(req);
    
    const blogs = await prisma.blog.findMany({
      where: auth ? {} : { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        author: true,
        readTime: true,
        tags: true,
        image: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return NextResponse.json(blogs);
  } catch (err) {
    console.error('Fetch blogs error:', err);
    return errorResponse('Failed to fetch blogs', 500);
  }
}

// POST - Create new blog
export async function POST(req) {
  try {
    // Auth check first
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse('Unauthorized', 401);
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
    
    // Validate and sanitize inputs
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

    // Validate and sanitize tags array
    let tags = [];
    if (body.tags !== undefined) {
      if (!Array.isArray(body.tags)) {
        return errorResponse('Tags must be an array', 400);
      }
      tags = body.tags
        .filter(t => typeof t === 'string' && t.trim())
        .map(t => sanitizeString(t.trim(), 50))
        .slice(0, 20); // Max 20 tags
    }

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (existingBlog) {
      return errorResponse('A blog with this slug already exists', 409);
    }

    // Convert HTML to Markdown
    const turndown = new TurndownService({ headingStyle: 'atx' });
    const markdown = turndown.turndown(contentHtml);

    // Calculate read time
    const words = markdown.split(/\s+/).filter(Boolean).length;
    const readTime = `${Math.max(1, Math.round(words / 200))} min read`;

    // Create blog
    const blog = await prisma.blog.create({
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
      },
    });

    return NextResponse.json({ 
      ok: true, 
      blog,
      message: 'Blog created successfully' 
    });
  } catch (err) {
    console.error('Create blog error:', err);
    
    // Handle specific Prisma errors
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0] || 'field';
      return errorResponse(`A blog with this ${field} already exists`, 409);
    }
    
    return errorResponse('Failed to create blog', 500);
  }
}