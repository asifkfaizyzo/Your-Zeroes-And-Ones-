// app/api/testimonials/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // ✅ Use singleton

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: [
        { position: 'asc' },
        { createdAt: 'desc' }
      ],
      select: {
        id: true,
        name: true,
        role: true,
        company: true,
        message: true,
        image: true,
        rating: true,
        verified: true,
        createdAt: true,
      }
    });

    const formatted = testimonials.map(t => ({
      id: t.id,
      name: t.name,
      role: t.role,
      company: t.company,
      message: t.message,
      image: t.image || '/default-avatar.png',
      rating: t.rating,
      verified: t.verified,
      date: new Date(t.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching testimonials:', error.message);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}