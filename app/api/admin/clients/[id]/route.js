// app/api/admin/clients/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/clients/:id - Get single client
export async function GET(req, { params }) {
  try {
    // ✅ Await params in Next.js 15+
    const { id } = await params;

    console.log('📖 Fetching client with ID:', id);

    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    console.log('✅ Fetched Client:', {
      id: client.id,
      name: client.name,
      color: client.color,
    });

    return NextResponse.json({
      success: true,
      data: client,
    });
  } catch (err) {
    console.error('❌ Get client error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/clients/:id - Update client
export async function PUT(req, { params }) {
  try {
    // ✅ Await params in Next.js 15+
    const { id } = await params;
    const body = await req.json();

    console.log('📝 Update Client Request:', {
      id,
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

    // Update client with color field
    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        name: name.trim(),
        logo: logo || null,
        color: color || null,
        position: position ? parseInt(position) : null,
        published: published === true,
      },
    });

    console.log('✅ Client Updated:', {
      id: updatedClient.id,
      name: updatedClient.name,
      color: updatedClient.color,
    });

    return NextResponse.json({
      success: true,
      data: updatedClient,
    });
  } catch (err) {
    console.error('❌ Update client error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to update client' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/clients/:id
export async function DELETE(req, { params }) {
  try {
    // ✅ Await params in Next.js 15+
    const { id } = await params;

    await prisma.client.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (err) {
    console.error('❌ Delete client error:', err);
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    );
  }
}