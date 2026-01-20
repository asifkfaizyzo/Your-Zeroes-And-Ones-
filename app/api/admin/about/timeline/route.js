// app/api/admin/about/timeline/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/requireAuth';

// Custom response helper
const jsonResponse = (data, status = 200) => {
  return NextResponse.json(data, {
    status,
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

// GET - Fetch all timeline items
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';

    const where = publishedOnly ? { published: true } : {};

    const items = await prisma.timeline.findMany({
      where,
      orderBy: { position: 'asc' }
    });

    return jsonResponse(items);
  } catch (error) {
    console.error('Error fetching timeline items:', error);
    return jsonResponse(
      { error: 'Failed to fetch timeline items', details: error.message },
      500
    );
  }
}

// POST - Create new timeline item (Admin only)
export async function POST(request) {
  try {
    // Check authentication
    const user = await requireAuth(request);
    if (!user) {
      return jsonResponse(
        { error: 'Unauthorized - Please login as admin' },
        401
      );
    }

    const body = await request.json();
    const { year, title, description, icon, published } = body;

    // Validation
    if (!year || !title || !description) {
      return jsonResponse(
        { error: 'Year, title, and description are required' },
        400
      );
    }

    // Get the highest position and increment
    const maxPosition = await prisma.timeline.findFirst({
      orderBy: { position: 'desc' },
      select: { position: true }
    });

    const newPosition = (maxPosition?.position || 0) + 1;

    const item = await prisma.timeline.create({
      data: {
        year: String(year),
        title: String(title),
        description: String(description),
        icon: icon || 'Rocket',
        position: newPosition,
        published: published !== undefined ? Boolean(published) : true,
      }
    });

    return jsonResponse(item, 201);
  } catch (error) {
    console.error('Error creating timeline item:', error);
    return jsonResponse(
      { error: 'Failed to create timeline item', details: error.message },
      500
    );
  }
}