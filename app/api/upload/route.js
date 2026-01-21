// app/api/upload/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export const runtime = 'nodejs';

// --- SECURITY CONFIGURATION ---

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;   // 5MB for images
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;  // 100MB for videos

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];

const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime', // .mov files
];

const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
const ALLOWED_VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov'];
const ALLOWED_EXTENSIONS = [...ALLOWED_IMAGE_EXTENSIONS, ...ALLOWED_VIDEO_EXTENSIONS];

// Merged allowed folders from both versions
const ALLOWED_FOLDERS = [
  'blogs', 
  'blog',        // Added for compatibility
  'portfolio', 
  'clients', 
  'testimonials', 
  'general', 
  'team', 
  'about'
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

// Check if file is a video type
function isVideoType(mimeType) {
  return ALLOWED_VIDEO_TYPES.includes(mimeType);
}

// Magic bytes validation for images and videos
function isValidFileBuffer(buffer, mimeType) {
  if (buffer.length < 4) return false;

  // Image signatures
  const imageSignatures = {
    'image/jpeg': [[0xFF, 0xD8, 0xFF]],
    'image/png': [[0x89, 0x50, 0x4E, 0x47]],
    'image/gif': [[0x47, 0x49, 0x46, 0x38]],
    'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF header
    'image/svg+xml': null, // Text-based, check differently
  };

  // Video signatures
  const videoSignatures = {
    'video/mp4': null,      // Complex, check separately
    'video/webm': [[0x1A, 0x45, 0xDF, 0xA3]],
    'video/ogg': [[0x4F, 0x67, 0x67, 0x53]],
    'video/quicktime': null, // Complex, check separately
  };

  // SVG check (text-based)
  if (mimeType === 'image/svg+xml') {
    const text = buffer.toString('utf8', 0, Math.min(buffer.length, 1000));
    return text.includes('<svg') || text.includes('<?xml');
  }

  // MP4/MOV check (ftyp box)
  if (mimeType === 'video/mp4' || mimeType === 'video/quicktime') {
    if (buffer.length < 12) return false;
    const ftypCheck = buffer.slice(4, 8).toString('ascii');
    return ftypCheck === 'ftyp';
  }

  // Check image signatures
  const imgSigs = imageSignatures[mimeType];
  if (imgSigs) {
    return imgSigs.some(sig => 
      sig.every((byte, i) => buffer[i] === byte)
    );
  }

  // Check video signatures
  const vidSigs = videoSignatures[mimeType];
  if (vidSigs) {
    return vidSigs.some(sig => 
      sig.every((byte, i) => buffer[i] === byte)
    );
  }

  return false;
}

// --- MAIN ROUTE HANDLER ---

export async function POST(req) {
  try {
    // 1. Authentication check
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Expected multipart/form-data' }, { status: 400 });
    }

    const formData = await req.formData();
    const file = formData.get('file');
    
    // Accept either 'folder' (new) or 'section' (old) parameter
    const folderParam = formData.get('folder') || formData.get('section') || 'general';

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 2. Validate folder (prevent path traversal)
    const sanitizedFolder = folderParam.replace(/[^a-zA-Z0-9-_]/g, '');
    if (!ALLOWED_FOLDERS.includes(sanitizedFolder)) {
      return NextResponse.json({ 
        error: `Invalid folder/section. Allowed: ${ALLOWED_FOLDERS.join(', ')}` 
      }, { status: 400 });
    }

    // 3. Validate file type first (to determine size limit)
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG, MP4, WebM, OGG, MOV' 
      }, { status: 400 });
    }

    // 4. Validate file size (different limits for images vs videos)
    const isVideo = isVideoType(file.type);
    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    
    if (file.size > maxSize) {
      const maxMB = maxSize / 1024 / 1024;
      return NextResponse.json({ 
        error: `File too large. Maximum size is ${maxMB}MB for ${isVideo ? 'videos' : 'images'}` 
      }, { status: 400 });
    }

    // 5. Validate file extension
    const originalName = file.name || `upload-${Date.now()}`;
    const ext = path.extname(originalName).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: 'Invalid file extension' }, { status: 400 });
    }

    // 6. Read file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 7. Validate file content (magic bytes check)
    if (!isValidFileBuffer(buffer, file.type)) {
      return NextResponse.json({ error: 'Invalid file content (Magic Bytes mismatch)' }, { status: 400 });
    }

    // 8. Create safe filename
    const safeName = originalName
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-._]/g, '')
      .substring(0, 100); // Limit filename length
    const filename = `${Date.now()}-${safeName}`;
    
    // 9. Safe directory creation
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', sanitizedFolder);
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filepath = path.join(uploadsDir, filename);

    // 10. Verify final path is within uploads directory (Anti-Path Traversal)
    const resolvedPath = path.resolve(filepath);
    const uploadsRoot = path.resolve(process.cwd(), 'public', 'uploads');
    if (!resolvedPath.startsWith(uploadsRoot)) {
      return NextResponse.json({ error: 'Invalid file path security check' }, { status: 400 });
    }

    // 11. Write File
    await fs.promises.writeFile(filepath, buffer, { mode: 0o644 });

    const url = `/uploads/${sanitizedFolder}/${filename}`;
    console.log(`✅ ${isVideo ? 'Video' : 'Image'} uploaded:`, url);

    // Return combined response (supports both frontend structures)
    return NextResponse.json({
      success: true,
      url,
      path: url,       // Kept for compatibility
      filename,
      size: file.size,
      type: file.type,
      isVideo,         // Helps frontend know the file type
    });

  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}