// app/api/clients/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/clients
// Public: list only published clients
export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      where: { published: true },
      orderBy: [
        { position: 'asc' },
        { createdAt: 'desc' },
      ],
      select: {
        id: true,
        name: true,
        logo: true,
        color: true, // ✅ Added color field
      },
    });

    return NextResponse.json(clients);
  } catch (err) {
    console.error('Fetch public clients error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 },
    );
  }
}
