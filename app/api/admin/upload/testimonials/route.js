// app/api/admin/upload/testimonials/route.js
import { NextResponse } from 'next/server';
import { writeFile, mkdir, access } from 'fs/promises';
import path from 'path';
import { requireAuth } from '@/lib/requireAuth';

// ==================== CONFIGURATION ====================
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB for testimonial images
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const UPLOAD_SUBDIR = 'testimonials';

// ==================== ERROR RESPONSE HELPER ====================
function errorResponse(message, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

// ==================== MAGIC BYTES VALIDATION ====================
function isValidImage(buffer, mimeType) {
  if (!buffer || buffer.length < 4) {
    return false;
  }

  const signatures = {
    'image/jpeg': [[0xFF, 0xD8, 0xFF]],
    'image/png': [[0x89, 0x50, 0x4E, 0x47]],
    'image/webp': [[0x52, 0x49, 0x46, 0x46]],
  };

  const sigs = signatures[mimeType];
  if (!sigs) return false;

  return sigs.some(sig => 
    sig.every((byte, i) => buffer[i] === byte)
  );
}

// ==================== FILENAME SANITIZATION ====================
function sanitizeFilename(filename) {
  if (!filename || typeof filename !== 'string') {
    return `upload-${Date.now()}.jpg`;
  }

  return filename
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^a-zA-Z0-9-._]/g, '') // Remove special characters
    .replace(/\.+/g, '.')            // Replace multiple dots with single dot
    .replace(/-+/g, '-')             // Replace multiple hyphens with single hyphen
    .substring(0, 100);              // Limit length
}

// ==================== POST - Upload Testimonial Image ====================
export async function POST(req) {
  try {
    // 1. Authentication check
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse('Unauthorized', 401);
    }

    // 2. Safe formData parsing
    let formData;
    try {
      formData = await req.formData();
    } catch (e) {
      return errorResponse('Invalid form data', 400);
    }

    // 3. Validate formData exists
    if (!formData) {
      return errorResponse('Form data is required', 400);
    }

    // 4. Extract file from formData
    const file = formData.get('file');

    // 5. Validate file presence
    if (!file) {
      return errorResponse('No file provided', 400);
    }

    // 6. Validate file is not a string (actual File object)
    if (typeof file === 'string') {
      return errorResponse('Invalid file format', 400);
    }

    // 7. Validate file is a File/Blob object
    if (!file.size || !file.type) {
      return errorResponse('Invalid file object', 400);
    }

    // 8. Validate file is not empty
    if (file.size === 0) {
      return errorResponse('File is empty', 400);
    }

    // 9. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      const maxSizeMB = MAX_FILE_SIZE / 1024 / 1024;
      return errorResponse(`File too large. Maximum size is ${maxSizeMB}MB`, 400);
    }

    // 10. Validate minimum file size (prevent 1-byte files)
    const MIN_FILE_SIZE = 100; // 100 bytes minimum
    if (file.size < MIN_FILE_SIZE) {
      return errorResponse('File is too small to be a valid image', 400);
    }

    // 11. Validate file type
    if (!file.type) {
      return errorResponse('File type is missing', 400);
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return errorResponse('Invalid file type. Only JPEG, PNG, and WebP images are allowed', 400);
    }

    // 12. Validate filename and extension
    const originalName = file.name || `upload-${Date.now()}.jpg`;
    
    if (!originalName || typeof originalName !== 'string') {
      return errorResponse('Invalid filename', 400);
    }

    const ext = path.extname(originalName).toLowerCase();
    
    if (!ext) {
      return errorResponse('File must have an extension', 400);
    }

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return errorResponse('Invalid file extension. Allowed: .jpg, .jpeg, .png, .webp', 400);
    }

    // 13. Validate extension matches MIME type
    const typeExtMap = {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    };

    if (!typeExtMap[file.type]?.includes(ext)) {
      return errorResponse('File extension does not match file type', 400);
    }

    // 14. Read file buffer
    let bytes;
    try {
      bytes = await file.arrayBuffer();
    } catch (e) {
      return errorResponse('Failed to read file data', 400);
    }

    if (!bytes || bytes.byteLength === 0) {
      return errorResponse('File data is empty', 400);
    }

    const buffer = Buffer.from(bytes);

    // 15. Validate magic bytes (file signature)
    if (!isValidImage(buffer, file.type)) {
      return errorResponse('File content does not match the declared file type', 400);
    }

    // 16. Create safe filename
    const safeName = sanitizeFilename(originalName);
    
    if (!safeName || safeName === '' || safeName === '.') {
      return errorResponse('Invalid filename after sanitization', 400);
    }

    const timestamp = Date.now();
    const filename = `${timestamp}-${safeName}`;

    // Validate final filename length
    if (filename.length > 255) {
      return errorResponse('Filename is too long', 400);
    }

    // 17. Prepare upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', UPLOAD_SUBDIR);
    const uploadsRoot = path.resolve(process.cwd(), 'public', 'uploads');

    // 18. Create directory if it doesn't exist
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      console.error('Failed to create upload directory:', e);
      return errorResponse('Failed to create upload directory', 500);
    }

    // 19. Verify directory was created
    try {
      await access(uploadDir);
    } catch (e) {
      console.error('Upload directory not accessible:', e);
      return errorResponse('Upload directory is not accessible', 500);
    }

    // 20. Construct and validate file path
    const filepath = path.join(uploadDir, filename);
    const resolvedPath = path.resolve(filepath);
    const resolvedUploadDir = path.resolve(uploadDir);

    // Security check: ensure path is within uploads directory
    if (!resolvedPath.startsWith(uploadsRoot)) {
      console.error('Security: Attempted path traversal:', resolvedPath);
      return errorResponse('Invalid file path', 400);
    }

    if (!resolvedPath.startsWith(resolvedUploadDir)) {
      console.error('Security: File path outside upload directory:', resolvedPath);
      return errorResponse('Invalid file path', 400);
    }

    // 21. Check if file already exists (prevent overwrite)
    try {
      await access(filepath);
      // File exists, this shouldn't happen with timestamp, but handle it
      return errorResponse('A file with this name already exists', 409);
    } catch (e) {
      // File doesn't exist, good to proceed
    }

    // 22. Write file to disk
    try {
      await writeFile(filepath, buffer);
    } catch (e) {
      console.error('Failed to write file:', e);
      return errorResponse('Failed to save file', 500);
    }

    // 23. Verify file was written
    try {
      await access(filepath);
    } catch (e) {
      console.error('File not found after write:', e);
      return errorResponse('File was not saved successfully', 500);
    }

    // 24. Construct public URL
    const url = `/uploads/${UPLOAD_SUBDIR}/${filename}`;

    // 25. Log success
    console.log('✅ File uploaded successfully:', url);

    // 26. Success response
    return NextResponse.json({
      ok: true,
      data: {
        url,
        filename,
        size: file.size,
        type: file.type,
      },
      message: 'File uploaded successfully',
    });

  } catch (err) {
    console.error('POST /api/admin/upload/testimonials error:', err);

    // Handle specific errors
    if (err.code === 'ENOSPC') {
      return errorResponse('Server storage is full', 500);
    }
    if (err.code === 'EACCES' || err.code === 'EPERM') {
      return errorResponse('Server permission denied', 500);
    }
    if (err.code === 'ENAMETOOLONG') {
      return errorResponse('Filename is too long', 400);
    }

    return errorResponse('Failed to upload file', 500);
  }
}
