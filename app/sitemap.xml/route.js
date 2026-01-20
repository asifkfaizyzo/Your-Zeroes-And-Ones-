// app/sitemap.xml/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const DOMAIN = 'https://yourzerosandones.com';

// Static pages with priority and change frequency
const staticPages = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/about', priority: 0.8, changefreq: 'monthly' },
  { url: '/services', priority: 0.9, changefreq: 'weekly' },
  { url: '/portfolio', priority: 0.9, changefreq: 'weekly' },
  { url: '/blog', priority: 0.9, changefreq: 'daily' },
  { url: '/clients', priority: 0.7, changefreq: 'monthly' },
  { url: '/contact', priority: 0.8, changefreq: 'monthly' },
  { url: '/testimonials', priority: 0.7, changefreq: 'monthly' },
  { url: '/privacy-policy', priority: 0.5, changefreq: 'yearly' },
  
  // Branding & Design services
  { url: '/services/branding-design', priority: 0.8, changefreq: 'monthly' },
  { url: '/services/branding-design/brand-consulting', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/branding-design/logo-design', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/branding-design/graphic-design', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/branding-design/2d-3d-visualization', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/branding-design/video-production', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/branding-design/audio-production', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/branding-design/ai-video-production', priority: 0.7, changefreq: 'monthly' },
  
  // Digital Marketing services
  { url: '/services/digital-marketing', priority: 0.8, changefreq: 'monthly' },
  { url: '/services/digital-marketing/seo', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/digital-marketing/social-media-management', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/digital-marketing/performance-marketing', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/digital-marketing/content-marketing', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/digital-marketing/marketing-automation', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/digital-marketing/analytics', priority: 0.7, changefreq: 'monthly' },
  
  // Technology services
  { url: '/services/technology', priority: 0.8, changefreq: 'monthly' },
  { url: '/services/technology/ai-ml', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/technology/devops-consulting', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/technology/web-development', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/technology/mobile-app-development', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/technology/ecommerce', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/technology/qa-testing', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/technology/cloud-services', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/technology/data-analytics', priority: 0.7, changefreq: 'monthly' },
  { url: '/services/technology/cyber-security', priority: 0.7, changefreq: 'monthly' },
];

function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

export async function GET() {
  try {
    // Fetch dynamic content from database
    const [blogs, portfolios] = await Promise.all([
      prisma.blog.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.portfolio.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    // Build XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    for (const page of staticPages) {
      xml += '  <url>\n';
      xml += `    <loc>${DOMAIN}${page.url}</loc>\n`;
      xml += `    <lastmod>${formatDate(new Date())}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n';
    }

    // Add blog posts
    for (const blog of blogs) {
      xml += '  <url>\n';
      xml += `    <loc>${DOMAIN}/blog/${blog.slug}</loc>\n`;
      xml += `    <lastmod>${formatDate(blog.updatedAt)}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += '  </url>\n';
    }

    // Add portfolio projects
    for (const project of portfolios) {
      xml += '  <url>\n';
      xml += `    <loc>${DOMAIN}/portfolio/${project.slug}</loc>\n`;
      xml += `    <lastmod>${formatDate(project.updatedAt)}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += '  </url>\n';
    }

    xml += '</urlset>';

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}