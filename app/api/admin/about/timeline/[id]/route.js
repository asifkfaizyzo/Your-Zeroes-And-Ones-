// app/api/admin/about/timeline/[id]/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/requireAuth';

// Custom toast-compatible responses
const jsonResponse = (data, status = 200) => {
  return NextResponse.json(data, {
    status,
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

// GET - Fetch single timeline item
export async function GET(request, context) {
  try {
    // ✅ Await params in Next.js 15
    const { id } = await context.params;

    if (!id) {
      return jsonResponse({ error: 'Timeline ID is required' }, 400);
    }

    const item = await prisma.timeline.findUnique({
      where: { id: String(id) }
    });

    if (!item) {
      return jsonResponse({ error: 'Timeline item not found' }, 404);
    }

    return jsonResponse(item);
  } catch (error) {
    console.error('Error fetching timeline item:', error);
    return jsonResponse(
      { error: 'Failed to fetch timeline item', details: error.message },
      500
    );
  }
}

// PUT - Update timeline item (Admin only)
export async function PUT(request, context) {
  try {
    // Check authentication
    const user = await requireAuth(request);
    if (!user) {
      return jsonResponse(
        { error: 'Unauthorized - Please login as admin' },
        401
      );
    }

    // ✅ Await params in Next.js 15
    const { id } = await context.params;
    
    if (!id) {
      return jsonResponse({ error: 'Timeline ID is required' }, 400);
    }

    const body = await request.json();
    const { year, title, description, icon, position, published } = body;

    // Validation
    if (!year || !title || !description) {
      return jsonResponse(
        { error: 'Year, title, and description are required' },
        400
      );
    }

    // Check if item exists
    const existing = await prisma.timeline.findUnique({
      where: { id: String(id) }
    });

    if (!existing) {
      return jsonResponse({ error: 'Timeline item not found' }, 404);
    }

    // Handle position changes
    if (position !== undefined && position !== existing.position) {
      if (position > existing.position) {
        await prisma.timeline.updateMany({
          where: {
            position: {
              gt: existing.position,
              lte: position
            }
          },
          data: {
            position: {
              decrement: 1
            }
          }
        });
      } else {
        await prisma.timeline.updateMany({
          where: {
            position: {
              gte: position,
              lt: existing.position
            }
          },
          data: {
            position: {
              increment: 1
            }
          }
        });
      }
    }

    const item = await prisma.timeline.update({
      where: { id: String(id) },
      data: {
        year: String(year),
        title: String(title),
        description: String(description),
        icon: icon || existing.icon,
        position: position !== undefined ? parseInt(position) : existing.position,
        published: published !== undefined ? Boolean(published) : existing.published,
      }
    });

    return jsonResponse(item);
  } catch (error) {
    console.error('Error updating timeline item:', error);
    return jsonResponse(
      { error: 'Failed to update timeline item', details: error.message },
      500
    );
  }
}

// DELETE - Delete timeline item (Admin only)
export async function DELETE(request, context) {
  try {
    // Check authentication
    const user = await requireAuth(request);
    if (!user) {
      return jsonResponse(
        { error: 'Unauthorized - Please login as admin' },
        401
      );
    }

    // ✅ Await params in Next.js 15
    const { id } = await context.params;

    if (!id) {
      return jsonResponse({ error: 'Timeline ID is required' }, 400);
    }

    const item = await prisma.timeline.findUnique({
      where: { id: String(id) }
    });

    if (!item) {
      return jsonResponse({ error: 'Timeline item not found' }, 404);
    }

    // Delete the item
    await prisma.timeline.delete({
      where: { id: String(id) }
    });

    // Reorder remaining items
    await prisma.timeline.updateMany({
      where: {
        position: { gt: item.position }
      },
      data: {
        position: { decrement: 1 }
      }
    });

    return jsonResponse(
      { 
        success: true,
        message: 'Timeline item deleted successfully',
        deletedItem: { id: item.id, title: item.title }
      },
      200
    );
  } catch (error) {
    console.error('Error deleting timeline item:', error);
    return jsonResponse(
      { error: 'Failed to delete timeline item', details: error.message },
      500
    );
  }
}