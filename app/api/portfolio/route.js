// app/api/portfolio/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function sanitizeParam(param, maxLength = 100) {
  if (typeof param !== 'string') return null;
  return param.trim().substring(0, maxLength).replace(/[<>"']/g, '');
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryName = sanitizeParam(searchParams.get('category'));
    const subCategoryName = sanitizeParam(searchParams.get('subcategory'));

    const allProjects = await prisma.portfolio.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        shortDescription: true,
        image: true,
        categories: true,
        featured: true,
        createdAt: true,
      },
      orderBy: [
        { featured: 'desc' },
        { position: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    let filteredProjects = allProjects;

    if (categoryName || subCategoryName) {
      filteredProjects = allProjects.filter((project) => {
        const categories = typeof project.categories === 'string' 
          ? JSON.parse(project.categories) 
          : project.categories;

        if (!Array.isArray(categories)) return false;

        return categories.some((cat) => {
          const categoryMatch = categoryName 
            ? cat.category === categoryName 
            : true;
          const subCategoryMatch = subCategoryName 
            ? cat.subCategory === subCategoryName 
            : true;
          
          return categoryMatch && subCategoryMatch;
        });
      });
    }

    return NextResponse.json(filteredProjects);
  } catch (error) {
    console.error('Portfolio fetch error:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}