// app/api/admin/clients/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/admin/clients - Create new client
export async function POST(req) {
  try {
    const body = await req.json();

    console.log('📝 Create Client Request:', {
      body,
      color: body.color,
    });

    const { name, logo, color, position, published } = body;

    // Validate required fields
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Client name is required' },
        { status: 400 }
      );
    }

    // Create client with color field
    const newClient = await prisma.client.create({
      data: {
        name: name.trim(),
        logo: logo || null,
        color: color || null,
        position: position ? parseInt(position) : null,
        published: published === true,
      },
    });

    console.log('✅ Client Created:', {
      id: newClient.id,
      name: newClient.name,
      color: newClient.color,
    });

    return NextResponse.json({
      success: true,
      data: newClient,
    });
  } catch (err) {
    console.error('❌ Create client error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to create client' },
      { status: 500 }
    );
  }
}

// GET /api/admin/clients - List all clients (admin)
export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: [
        { position: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({
      success: true,
      data: clients,
    });
  } catch (err) {
    console.error('❌ Fetch admin clients error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}