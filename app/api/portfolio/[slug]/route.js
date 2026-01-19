// app/api/portfolio/[slug]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const portfolio = await prisma.portfolio.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        title: true,
        shortDescription: true,
        fullDescription: true,
        image: true,
        images: true,
        features: true,
        categories: true,
        featured: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    // Only return if published
    if (!portfolio.published) {
      return NextResponse.json(
        { error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Portfolio fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio item' },
      { status: 500 }
    );
  }
}
