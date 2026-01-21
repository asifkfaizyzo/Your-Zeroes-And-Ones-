// app/api/admin/upload/thumbnail/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export const runtime = 'nodejs';

// --- SECURITY CONFIGURATION ---

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'yzo_admin';

// --- HELPER FUNCTIONS ---

async function verifyAdmin(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

function isValidImageBuffer(buffer, mimeType) {
  if (buffer.length < 4) return false;

  const signatures = {
    'image/jpeg': [[0xFF, 0xD8, 0xFF]],
    'image/png': [[0x89, 0x50, 0x4E, 0x47]],
    'image/gif': [[0x47, 0x49, 0x46, 0x38]],
    'image/webp': [[0x52, 0x49, 0x46, 0x46]],
  };

  const sigs = signatures[mimeType];
  if (!sigs) return false;

  return sigs.some(sig => 
    sig.every((byte, i) => buffer[i] === byte)
  );
}

function sanitizeFilename(filename) {
  return filename
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-._]/g, '')
    .substring(0, 100);
}

// --- MAIN ROUTE HANDLER ---

export async function POST(req) {
  try {
    // 1. Authentication
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Validate content type
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Expected multipart/form-data' }, { status: 400 });
    }

    // 3. Parse form data
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No thumbnail provided' }, { status: 400 });
    }

    // 4. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` 
      }, { status: 400 });
    }

    // 5. Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP' 
      }, { status: 400 });
    }

    // 6. Validate extension
    const originalName = file.name || `thumbnail-${Date.now()}.jpg`;
    const ext = path.extname(originalName).toLowerCase();
    
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: 'Invalid file extension' }, { status: 400 });
    }

    // 7. Read buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 8. Validate content
    if (!isValidImageBuffer(buffer, file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file content (magic bytes mismatch)' 
      }, { status: 400 });
    }

    // 9. Create filename
    const safeName = sanitizeFilename(originalName);
    const filename = `thumb-${Date.now()}-${safeName}`;

    // 10. Create directory
    const thumbDir = path.join(
      process.cwd(), 
      'public', 
      'uploads', 
      'testimonials', 
      'thumbnails'
    );

    if (!fs.existsSync(thumbDir)) {
      fs.mkdirSync(thumbDir, { recursive: true });
    }

    const filepath = path.join(thumbDir, filename);

    // 11. Security check
    const resolvedPath = path.resolve(filepath);
    const uploadsRoot = path.resolve(process.cwd(), 'public', 'uploads');
    
    if (!resolvedPath.startsWith(uploadsRoot)) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    // 12. Write file
    await fs.promises.writeFile(filepath, buffer, { mode: 0o644 });

    const url = `/uploads/testimonials/thumbnails/${filename}`;
    
    console.log('✅ Thumbnail uploaded:', url);

    return NextResponse.json({
      success: true,
      url,
      filename,
      size: file.size,
      type: file.type
    });

  } catch (err) {
    console.error('❌ Thumbnail upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}