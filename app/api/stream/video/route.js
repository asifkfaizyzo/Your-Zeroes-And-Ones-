// app/api/stream/video/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoPath = searchParams.get('path');

    if (!videoPath) {
      return NextResponse.json({ error: 'No video path provided' }, { status: 400 });
    }

    // Security: Sanitize and validate path
    const safePath = decodeURIComponent(videoPath)
      .replace(/\.\./g, '')
      .replace(/^\/+/, '');

    // Only allow specific video directories
    const allowedPaths = [
      'uploads/testimonials/videos/',
      'uploads/about/',
      'uploads/portfolio/',
      'uploads/blogs/',
      'uploads/general/',
    ];

    const isAllowed = allowedPaths.some(allowed => safePath.startsWith(allowed));
    if (!isAllowed) {
      console.error('❌ Blocked video path:', safePath);
      return NextResponse.json({ error: 'Invalid video path' }, { status: 403 });
    }

    const fullPath = path.join(process.cwd(), 'public', safePath);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.error('❌ Video not found:', fullPath);
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const stat = fs.statSync(fullPath);
    const fileSize = stat.size;

    // Determine content type
    const ext = path.extname(fullPath).toLowerCase();
    const mimeTypes = {
      '.mp4': 'video/mp4',
      '.webm': 'video/webm',
      '.ogg': 'video/ogg',
      '.mov': 'video/quicktime',
    };
    const contentType = mimeTypes[ext] || 'video/mp4';

    // Get range header (iOS Safari REQUIRES this!)
    const range = request.headers.get('range');

    if (range) {
      // === RANGE REQUEST (Required for iOS) ===
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      // Validate range
      if (start >= fileSize) {
        return new NextResponse(null, {
          status: 416,
          headers: { 'Content-Range': `bytes */${fileSize}` },
        });
      }

      const chunkSize = end - start + 1;
      const stream = fs.createReadStream(fullPath, { start, end });

      const webStream = new ReadableStream({
        start(controller) {
          stream.on('data', (chunk) => controller.enqueue(new Uint8Array(chunk)));
          stream.on('end', () => controller.close());
          stream.on('error', (err) => controller.error(err));
        },
        cancel() {
          stream.destroy();
        },
      });

      console.log(`✅ Streaming video (range ${start}-${end}): ${safePath}`);

      return new NextResponse(webStream, {
        status: 206, // Partial Content - iOS needs this!
        headers: {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize.toString(),
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } else {
      // === FULL FILE REQUEST ===
      const stream = fs.createReadStream(fullPath);

      const webStream = new ReadableStream({
        start(controller) {
          stream.on('data', (chunk) => controller.enqueue(new Uint8Array(chunk)));
          stream.on('end', () => controller.close());
          stream.on('error', (err) => controller.error(err));
        },
        cancel() {
          stream.destroy();
        },
      });

      console.log(`✅ Streaming full video: ${safePath}`);

      return new NextResponse(webStream, {
        status: 200,
        headers: {
          'Content-Length': fileSize.toString(),
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes', // Tell browser we support ranges
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
  } catch (error) {
    console.error('❌ Video streaming error:', error);
    return NextResponse.json({ error: 'Failed to stream video' }, { status: 500 });
  }
}