// app/api/team/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/team
// Public: list only published team members
export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: [
        { position: 'asc' },
        { createdAt: 'desc' },
      ],
      select: {
        id: true,
        name: true,
        role: true,
        image: true,
        description: true,
        linkedin: true,
        twitter: true,
      },
    });

    return NextResponse.json(teamMembers);
  } catch (err) {
    console.error('Fetch public team members error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}