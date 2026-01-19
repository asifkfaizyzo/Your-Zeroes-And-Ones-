// app/api/projects/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit')) || 10));
    const page = Math.max(1, parseInt(searchParams.get('page')) || 1);
    const featured = searchParams.get('featured');

    // Fetch from database
    const allProjects = await prisma.portfolio.findMany({
      where: {
        published: true,
        ...(featured === 'true' && { featured: true }),
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

    // Filter by category/subcategory in memory (JSON field)
    let filteredProjects = allProjects;

    if (category || subcategory) {
      filteredProjects = allProjects.filter((project) => {
        const categories = typeof project.categories === 'string' 
          ? JSON.parse(project.categories) 
          : project.categories;

        if (!Array.isArray(categories)) return false;

        return categories.some((cat) => {
          const categoryMatch = category 
            ? cat.category?.toLowerCase().includes(category.toLowerCase()) ||
              cat.category?.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
            : true;
          const subCategoryMatch = subcategory 
            ? cat.subCategory?.toLowerCase().includes(subcategory.toLowerCase()) ||
              cat.subCategory?.toLowerCase().replace(/\s+/g, '-') === subcategory.toLowerCase()
            : true;
          
          return categoryMatch && subCategoryMatch;
        });
      });
    }

    // Pagination
    const total = filteredProjects.length;
    const skip = (page - 1) * limit;
    const paginatedProjects = filteredProjects.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      projects: paginatedProjects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching projects:', error.message);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects', projects: [] },
      { status: 500 }
    );
  }
}