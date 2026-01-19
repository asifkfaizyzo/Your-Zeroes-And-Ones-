// app/api/upload/route.js - SECURED VERSION
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export const runtime = 'nodejs';

// Security constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// ✅ ADD 'team' TO THIS ARRAY
const ALLOWED_FOLDERS = ['blogs', 'portfolio', 'clients', 'testimonials', 'general', 'team'];

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const COOKIE_NAME = process.env.JWT_COOKIE_NAME || 'yzo_admin';

// ✅ Verify admin authentication
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

export async function POST(req) {
  try {
    // ✅ 1. Authentication check
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
    const folder = formData.get('folder') || 'general';

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // ✅ 2. Validate folder (prevent path traversal)
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9-_]/g, '');
    if (!ALLOWED_FOLDERS.includes(sanitizedFolder)) {
      return NextResponse.json({ error: 'Invalid folder' }, { status: 400 });
    }

    // ✅ 3. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` 
      }, { status: 400 });
    }

    // ✅ 4. Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG' 
      }, { status: 400 });
    }

    // ✅ 5. Validate file extension
    const originalName = file.name || `upload-${Date.now()}`;
    const ext = path.extname(originalName).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: 'Invalid file extension' }, { status: 400 });
    }

    // ✅ 6. Validate file content (magic bytes check)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    if (!isValidImageBuffer(buffer, file.type)) {
      return NextResponse.json({ error: 'Invalid file content' }, { status: 400 });
    }

    // ✅ 7. Create safe filename
    const safeName = originalName
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-._]/g, '')
      .substring(0, 100); // Limit filename length
    const filename = `${Date.now()}-${safeName}`;
    
    // ✅ 8. Safe directory creation
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', sanitizedFolder);
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filepath = path.join(uploadsDir, filename);

    // ✅ 9. Verify final path is within uploads directory
    const resolvedPath = path.resolve(filepath);
    const uploadsRoot = path.resolve(process.cwd(), 'public', 'uploads');
    if (!resolvedPath.startsWith(uploadsRoot)) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    await fs.promises.writeFile(filepath, buffer, { mode: 0o644 });

    const url = `/uploads/${sanitizedFolder}/${filename}`;
    console.log('✅ File uploaded:', url);

    return NextResponse.json({ url, path: url });

  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// ✅ Magic bytes validation
function isValidImageBuffer(buffer, mimeType) {
  if (buffer.length < 4) return false;

  const signatures = {
    'image/jpeg': [[0xFF, 0xD8, 0xFF]],
    'image/png': [[0x89, 0x50, 0x4E, 0x47]],
    'image/gif': [[0x47, 0x49, 0x46, 0x38]],
    'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF header
    'image/svg+xml': null, // Text-based, check differently
  };

  // SVG check (text-based)
  if (mimeType === 'image/svg+xml') {
    const text = buffer.toString('utf8', 0, Math.min(buffer.length, 1000));
    return text.includes('<svg') || text.includes('<?xml');
  }

  const sigs = signatures[mimeType];
  if (!sigs) return false;

  return sigs.some(sig => 
    sig.every((byte, i) => buffer[i] === byte)
  );
}
