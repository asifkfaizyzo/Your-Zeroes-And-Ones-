// app/api/admin/upload/video/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// At the top of route.js
export const maxDuration = 60;

// For body size, use next.config.js


// --- SECURITY CONFIGURATION ---

const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

// Common video MIME types
const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime', // .mov
  'video/x-msvideo', // .avi
  'video/x-matroska', // .mkv
];

const ALLOWED_VIDEO_EXTENSIONS = [
  '.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'
];

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'yzo_admin';

// --- HELPER FUNCTIONS ---

// Verify admin authentication
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

// Magic bytes validation for common video formats
function isValidVideoBuffer(buffer, mimeType) {
  if (buffer.length < 12) return false;

  const signatures = {
    'video/mp4': [
      [0x00, 0x00, 0x00, null, 0x66, 0x74, 0x79, 0x70], // ftyp
    ],
    'video/webm': [
      [0x1A, 0x45, 0xDF, 0xA3], // EBML header
    ],
    'video/ogg': [
      [0x4F, 0x67, 0x67, 0x53], // OggS
    ],
    'video/quicktime': [
      [0x00, 0x00, 0x00, null, 0x66, 0x74, 0x79, 0x70, 0x71, 0x74], // ftyp qt
      [0x00, 0x00, 0x00, null, 0x6D, 0x6F, 0x6F, 0x76], // moov
    ],
    'video/x-msvideo': [
      [0x52, 0x49, 0x46, 0x46], // RIFF (AVI container)
    ],
    'video/x-matroska': [
      [0x1A, 0x45, 0xDF, 0xA3], // EBML (same as WebM)
    ],
  };

  const sigs = signatures[mimeType];
  if (!sigs) return false;

  return sigs.some(sig => 
    sig.every((byte, i) => byte === null || buffer[i] === byte)
  );
}

// Sanitize filename
function sanitizeFilename(filename) {
  return filename
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-._]/g, '')
    .substring(0, 100);
}

// --- MAIN ROUTE HANDLER ---

export async function POST(req) {
  try {
    // 1. Authentication check
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Validate content type
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ 
        error: 'Expected multipart/form-data' 
      }, { status: 400 });
    }

    // 3. Parse form data
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ 
        error: 'No video file provided' 
      }, { status: 400 });
    }

    // 4. Validate file size
    if (file.size > MAX_VIDEO_SIZE) {
      return NextResponse.json({ 
        error: `Video too large. Maximum size is ${MAX_VIDEO_SIZE / 1024 / 1024}MB` 
      }, { status: 413 });
    }

    if (file.size === 0) {
      return NextResponse.json({ 
        error: 'Video file is empty' 
      }, { status: 400 });
    }

    // 5. Validate MIME type
    if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: `Invalid video type. Allowed: ${ALLOWED_VIDEO_TYPES.join(', ')}` 
      }, { status: 400 });
    }

    // 6. Validate file extension
    const originalName = file.name || `video-${Date.now()}.mp4`;
    const ext = path.extname(originalName).toLowerCase();
    
    if (!ALLOWED_VIDEO_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ 
        error: `Invalid video extension. Allowed: ${ALLOWED_VIDEO_EXTENSIONS.join(', ')}` 
      }, { status: 400 });
    }

    // 7. Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 8. Validate file content (magic bytes)
    if (!isValidVideoBuffer(buffer, file.type)) {
      return NextResponse.json({ 
        error: 'Invalid video file format (magic bytes mismatch)' 
      }, { status: 400 });
    }

    // 9. Create safe filename
    const safeName = sanitizeFilename(originalName);
    const filename = `${Date.now()}-${safeName}`;

    // 10. Create upload directory
    const videoDir = path.join(
      process.cwd(), 
      'public', 
      'uploads', 
      'testimonials', 
      'videos'
    );

    if (!fs.existsSync(videoDir)) {
      fs.mkdirSync(videoDir, { recursive: true });
    }

    const filepath = path.join(videoDir, filename);

    // 11. Security check: prevent path traversal
    const resolvedPath = path.resolve(filepath);
    const uploadsRoot = path.resolve(process.cwd(), 'public', 'uploads');
    
    if (!resolvedPath.startsWith(uploadsRoot)) {
      return NextResponse.json({ 
        error: 'Invalid file path (security check failed)' 
      }, { status: 400 });
    }

    // 12. Write file to disk
    await fs.promises.writeFile(filepath, buffer, { mode: 0o644 });

    const url = `/uploads/testimonials/videos/${filename}`;
    
    console.log('✅ Video uploaded:', url, `(${(file.size / 1024 / 1024).toFixed(2)}MB)`);

    // 13. Return success response
    return NextResponse.json({
      success: true,
      url,
      filename,
      size: file.size,
      type: file.type,
      sizeFormatted: `${(file.size / 1024 / 1024).toFixed(2)} MB`
    });

  } catch (err) {
    console.error('❌ Video upload error:', err);

    // Handle specific errors
    if (err.code === 'ENOSPC') {
      return NextResponse.json({ 
        error: 'Server storage full' 
      }, { status: 507 });
    }

    if (err.code === 'EACCES') {
      return NextResponse.json({ 
        error: 'Server permission denied' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      error: 'Video upload failed' 
    }, { status: 500 });
  }
}