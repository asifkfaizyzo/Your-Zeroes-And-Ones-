// app/api/admin/about/content/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/requireAuth';

// GET - Fetch About Content (Public access)
export async function GET(request) {
  try {
    // Get the first (and should be only) AboutContent record
    let content = await prisma.aboutContent.findFirst({
      orderBy: { createdAt: 'asc' }
    });

    // If no content exists, create default
    if (!content) {
      content = await prisma.aboutContent.create({
        data: {
          badge: 'Who We Are',
          title: 'Crafting Digital',
          highlightedText: 'Excellence',
          paragraph1: 'Your Zeros and Ones is a premier IT consulting and software development company dedicated to helping businesses thrive in the digital age. We combine technical expertise with business acumen to deliver innovative solutions that drive growth and efficiency.',
          paragraph2: 'Our team of passionate developers, designers, and strategists work collaboratively to transform complex challenges into elegant, user-friendly solutions.',
          media: '/images/about/about-company.png',
          mediaType: 'image',
          stats: [
            { value: '50+', label: 'Projects Completed', icon: 'CheckCircle' },
            { value: '15+', label: 'Years Experience', icon: 'Calendar' },
            { value: '30+', label: 'Happy Clients', icon: 'Users' },
            { value: '24/7', label: 'Support', icon: 'Clock' }
          ],
          published: true,
        }
      });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching about content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about content', details: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update About Content (Admin only)
export async function PUT(request) {
  try {
    // Check authentication - requireAuth returns payload on success, null on failure
    const user = await requireAuth(request);
    
    // If user is null, authentication failed
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login as admin' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const {
      badge,
      title,
      highlightedText,
      paragraph1,
      paragraph2,
      media,
      mediaType,
      stats,
      published
    } = body;

    // Validation
    if (!title || !paragraph1 || !paragraph2) {
      return NextResponse.json(
        { error: 'Title and paragraphs are required' },
        { status: 400 }
      );
    }

    if (stats && (!Array.isArray(stats) || stats.length !== 4)) {
      return NextResponse.json(
        { error: 'Exactly 4 stats are required' },
        { status: 400 }
      );
    }

    // Get existing content
    const existing = await prisma.aboutContent.findFirst();

    let content;
    if (existing) {
      // Update existing
      content = await prisma.aboutContent.update({
        where: { id: existing.id },
        data: {
          badge: badge || 'Who We Are',
          title,
          highlightedText: highlightedText || 'Excellence',
          paragraph1,
          paragraph2,
          media: media || existing.media,
          mediaType: mediaType || existing.mediaType,
          stats: stats || existing.stats,
          published: published !== undefined ? published : existing.published,
        }
      });
    } else {
      // Create new
      content = await prisma.aboutContent.create({
        data: {
          badge: badge || 'Who We Are',
          title,
          highlightedText: highlightedText || 'Excellence',
          paragraph1,
          paragraph2,
          media: media || '/images/about/about-company.png',
          mediaType: mediaType || 'image',
          stats: stats || [
            { value: '50+', label: 'Projects Completed', icon: 'CheckCircle' },
            { value: '15+', label: 'Years Experience', icon: 'Calendar' },
            { value: '30+', label: 'Happy Clients', icon: 'Users' },
            { value: '24/7', label: 'Support', icon: 'Clock' }
          ],
          published: published !== undefined ? published : true,
        }
      });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error updating about content:', error);
    return NextResponse.json(
      { error: 'Failed to update about content', details: error.message },
      { status: 500 }
    );
  }
}