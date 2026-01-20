// app/api/admin/portfolio/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/requireAuth";
import { sanitizeString, sanitizeSlug, parseIntSafe } from "@/lib/validate";

// ==================== ERROR RESPONSE HELPER ====================
function errorResponse(message, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

// ==================== GET - Fetch All Portfolio Items ====================
export async function GET(req) {
  try {
    // 1. Check authentication (optional for GET)
    const auth = await requireAuth(req);

    // 2. Fetch portfolio items with proper filtering
    const portfolio = await prisma.portfolio.findMany({
      where: auth ? {} : { published: true },
      orderBy: [{ position: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        slug: true,
        title: true,
        shortDescription: auth ? true : undefined,
        categories: true,
        image: true,
        featured: true,
        published: auth ? true : undefined,
        createdAt: true,
      },
    });

    // 3. Success response with message
    return NextResponse.json({
      ok: true,
      data: portfolio,
      message: "Portfolio items retrieved successfully",
    });
  } catch (err) {
    console.error("GET /api/admin/portfolio error:", err);

    // Handle Prisma errors
    if (err.code === "P2021") {
      return errorResponse("Database table does not exist", 500);
    }
    if (err.code === "P2010") {
      return errorResponse("Database query failed", 500);
    }

    return errorResponse("Failed to retrieve portfolio items", 500);
  }
}

// ==================== POST - Create New Portfolio Item ====================
export async function POST(req) {
  try {
    // 1. Authentication check
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", 401);
    }

    // 2. Safe JSON parsing
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return errorResponse("Invalid JSON in request body", 400);
    }

    // 3. Validate request body exists
    if (!body || typeof body !== "object") {
      return errorResponse("Request body is required", 400);
    }

    // 4. Sanitize and validate fields
    const title = sanitizeString(body.title, 200);
    const slug = sanitizeSlug(body.slug);
    const shortDescription = sanitizeString(body.shortDescription, 500);
    const fullDescription = sanitizeString(body.fullDescription, 10000);
    const image = sanitizeString(body.image, 500);
    const featured = Boolean(body.featured);
    const published = Boolean(body.published);
    const position =
      body.position !== null &&
      body.position !== undefined &&
      body.position !== ""
        ? parseIntSafe(body.position, null)
        : null;

    // 5. Field-specific validation - Title
    if (!title || title.trim() === "") {
      return errorResponse("Title is required", 400);
    }

    if (title.length < 3) {
      return errorResponse("Title must be at least 3 characters", 400);
    }

    if (title.length > 200) {
      return errorResponse("Title must be less than 200 characters", 400);
    }

    // 6. Field-specific validation - Slug
    if (!slug || slug.trim() === "") {
      return errorResponse("Slug is required", 400);
    }

    if (slug.length < 3) {
      return errorResponse("Slug must be at least 3 characters", 400);
    }

    if (slug.length > 200) {
      return errorResponse("Slug must be less than 200 characters", 400);
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return errorResponse(
        "Slug must contain only lowercase letters, numbers, and hyphens",
        400,
      );
    }

    // 7. Validate short description
    if (shortDescription && shortDescription.length > 500) {
      return errorResponse(
        "Short description must be less than 500 characters",
        400,
      );
    }

    // 8. Validate full description
    if (fullDescription && fullDescription.length > 10000) {
      return errorResponse(
        "Full description must be less than 10,000 characters",
        400,
      );
    }

    // 9. Validate image URL
    if (image && image.trim() !== "") {
      if (
        !image.startsWith("/uploads/") &&
        !image.startsWith("http://") &&
        !image.startsWith("https://")
      ) {
        return errorResponse("Image must be a valid upload path or URL", 400);
      }
      if (image.length > 500) {
        return errorResponse("Image URL is too long (max 500 characters)", 400);
      }
    }

    // 10. Validate position
    if (position !== null) {
      if (isNaN(Number(position)) || Number(position) < 1) {
        return errorResponse("Position must be a positive number", 400);
      }
      if (Number(position) > 999999) {
        return errorResponse("Position must be less than 1,000,000", 400);
      }
    }

    // 11. Validate and sanitize categories
    // 11. Validate and sanitize categories
    let categories = [];
    if (body.categories !== undefined) {
      if (!Array.isArray(body.categories)) {
        return errorResponse("Categories must be an array", 400);
      }

      if (body.categories.length === 0) {
        return errorResponse("At least one category is required", 400);
      }

      // First, validate ALL items before filtering
      const invalidCategories = body.categories.filter(
        (c) =>
          !c ||
          typeof c !== "object" ||
          !c.category ||
          !c.subCategory ||
          typeof c.category !== "string" ||
          typeof c.subCategory !== "string" ||
          c.category.trim() === "" ||
          c.subCategory.trim() === "",
      );

      if (invalidCategories.length > 0) {
        return errorResponse(
          "Some categories have invalid format (must have category and subCategory)",
          400,
        );
      }

      // Now sanitize and map (we know all items are valid)
      categories = body.categories.map((c) => ({
        category: sanitizeString(c.category, 100),
        subCategory: sanitizeString(c.subCategory, 100),
      }));

      // Validate category field lengths
      for (const cat of categories) {
        if (cat.category.length < 2) {
          return errorResponse(
            "Category name must be at least 2 characters",
            400,
          );
        }
        if (cat.subCategory.length < 2) {
          return errorResponse(
            "Sub-category name must be at least 2 characters",
            400,
          );
        }
      }
    } else {
      return errorResponse("Categories are required", 400);
    }

    // 12. Validate and sanitize features
    let features = [];
    if (body.features !== undefined) {
      if (!Array.isArray(body.features)) {
        return errorResponse("Features must be an array", 400);
      }

      features = body.features
        .filter((f) => typeof f === "string" && f.trim() !== "")
        .map((f) => sanitizeString(f, 200))
        .slice(0, 20);

      // Validate feature lengths
      for (const feature of features) {
        if (feature.length < 2) {
          return errorResponse(
            "Each feature must be at least 2 characters",
            400,
          );
        }
      }
    }

    // 13. Validate and sanitize images array
    let images = [];
    if (body.images !== undefined) {
      if (!Array.isArray(body.images)) {
        return errorResponse("Images must be an array", 400);
      }

      const invalidImages = body.images.filter(
        (img) =>
          typeof img !== "string" ||
          (!img.startsWith("/uploads/") &&
            !img.startsWith("http://") &&
            !img.startsWith("https://")),
      );

      if (invalidImages.length > 0) {
        return errorResponse(
          "All gallery images must be valid upload paths or URLs",
          400,
        );
      }

      images = body.images
        .filter((img) => typeof img === "string")
        .map((img) => sanitizeString(img, 500))
        .slice(0, 20);
    }

    // 14. Check slug uniqueness
    const existingSlug = await prisma.portfolio.findUnique({
      where: { slug },
    });

    if (existingSlug) {
      return errorResponse(
        "A portfolio item with this slug already exists",
        409,
      );
    }

    // 15. Prepare final image value
    const finalImage = image && image.trim() !== "" ? image : null;

    // 16. Create portfolio item
    const portfolio = await prisma.portfolio.create({
      data: {
        title: title.trim(),
        slug: slug.trim(),
        shortDescription: shortDescription?.trim() || null,
        fullDescription: fullDescription?.trim() || null,
        categories,
        image: finalImage,
        features,
        images,
        featured,
        published,
        position,
      },
    });

    // 17. Success response with message
    return NextResponse.json(
      {
        ok: true,
        data: portfolio,
        message: "Portfolio item created successfully",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/admin/portfolio error:", err);

    // Handle Prisma-specific errors
    if (err.code === "P2002") {
      const field = err.meta?.target?.[0] || "field";
      return errorResponse(
        `A portfolio item with this ${field} already exists`,
        409,
      );
    }
    if (err.code === "P2003") {
      return errorResponse("Related record not found", 400);
    }
    if (err.code === "P2021") {
      return errorResponse("Database table does not exist", 500);
    }
    if (err.code === "P2023") {
      return errorResponse("Inconsistent column data", 400);
    }
    if (err.code === "P2000") {
      return errorResponse("Value too long for the column", 400);
    }
    if (err.code === "P2011") {
      return errorResponse("Null constraint violation", 400);
    }

    return errorResponse("Failed to create portfolio item", 500);
  }
}
