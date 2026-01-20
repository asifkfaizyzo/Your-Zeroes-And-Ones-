// app/api/admin/portfolio/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/requireAuth";
import {
  sanitizeString,
  sanitizeSlug,
  validateInt,
  parseIntSafe,
} from "@/lib/validate";
import path from "path";
import fs from "fs";

// ==================== ERROR RESPONSE HELPER ====================
function errorResponse(message, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

// ==================== FILE DELETION HELPERS ====================
async function deleteUploadedFile(filePath) {
  if (!filePath || !filePath.startsWith("/uploads/")) {
    return false;
  }

  try {
    const fullPath = path.join(process.cwd(), "public", filePath);
    const resolvedPath = path.resolve(fullPath);
    const uploadsRoot = path.resolve(process.cwd(), "public", "uploads");

    // Security check: ensure path is within uploads directory
    if (!resolvedPath.startsWith(uploadsRoot)) {
      console.warn(
        "⚠️ Attempted to delete file outside uploads directory:",
        filePath,
      );
      return false;
    }

    if (fs.existsSync(resolvedPath)) {
      await fs.promises.unlink(resolvedPath);
      console.log("🗑️ Deleted file:", resolvedPath);
      return true;
    }
  } catch (err) {
    console.warn("⚠️ Could not delete file:", filePath, err.message);
  }

  return false;
}

async function deleteUploadedFiles(filePaths) {
  if (!Array.isArray(filePaths)) return;

  for (const filePath of filePaths) {
    await deleteUploadedFile(filePath);
  }
}

// ==================== GET - Single Portfolio Item ====================
export async function GET(req, { params }) {
  try {
    // 1. Validate route params
    const { id } = await params;

    if (!id || typeof id !== "string") {
      return errorResponse("Portfolio ID is required", 400);
    }

    if (!validateInt(id)) {
      return errorResponse("Invalid portfolio ID format", 400);
    }

    const portfolioId = parseInt(id);

    if (portfolioId < 1) {
      return errorResponse("Portfolio ID must be a positive number", 400);
    }

    // 2. Check authentication (optional for GET)
    const auth = await requireAuth(req);

    // 3. Fetch portfolio item
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId },
    });

    // 4. Check existence
    if (!portfolio) {
      return errorResponse("Portfolio item not found", 404);
    }

    // 5. Only show unpublished to admins
    if (!portfolio.published && !auth) {
      return errorResponse("Portfolio item not found", 404);
    }

    // 6. Success response
    return NextResponse.json({
      ok: true,
      data: portfolio,
      message: "Portfolio item retrieved successfully",
    });
  } catch (err) {
    console.error("GET /api/admin/portfolio/[id] error:", err);

    // Handle Prisma errors
    if (err.code === "P2025") {
      return errorResponse("Portfolio item not found", 404);
    }
    if (err.code === "P2021") {
      return errorResponse("Database table does not exist", 500);
    }

    return errorResponse("Failed to retrieve portfolio item", 500);
  }
}

// ==================== PUT - Update Portfolio Item ====================
export async function PUT(req, { params }) {
  try {
    // 1. Authentication check
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", 401);
    }

    // 2. Validate route params
    const { id } = await params;

    if (!id || typeof id !== "string") {
      return errorResponse("Portfolio ID is required", 400);
    }

    if (!validateInt(id)) {
      return errorResponse("Invalid portfolio ID format", 400);
    }

    const portfolioId = parseInt(id);

    if (portfolioId < 1) {
      return errorResponse("Portfolio ID must be a positive number", 400);
    }

    // 3. Safe JSON parsing
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return errorResponse("Invalid JSON in request body", 400);
    }

    // 4. Validate request body exists
    if (!body || typeof body !== "object") {
      return errorResponse("Request body is required", 400);
    }

    // 5. Sanitize and validate fields
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

    // 6. Field-specific validation - Title
    if (!title || title.trim() === "") {
      return errorResponse("Title is required", 400);
    }

    if (title.length < 3) {
      return errorResponse("Title must be at least 3 characters", 400);
    }

    if (title.length > 200) {
      return errorResponse("Title must be less than 200 characters", 400);
    }

    // 7. Field-specific validation - Slug
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

    // 8. Validate short description
    if (shortDescription && shortDescription.length > 500) {
      return errorResponse(
        "Short description must be less than 500 characters",
        400,
      );
    }

    // 9. Validate full description
    if (fullDescription && fullDescription.length > 10000) {
      return errorResponse(
        "Full description must be less than 10,000 characters",
        400,
      );
    }

    // 10. Validate image URL
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

    // 11. Validate position
    if (position !== null) {
      if (isNaN(Number(position)) || Number(position) < 1) {
        return errorResponse("Position must be a positive number", 400);
      }
      if (Number(position) > 999999) {
        return errorResponse("Position must be less than 1,000,000", 400);
      }
    }

    // 12. Validate and sanitize categories
    // 12. Validate and sanitize categories
    let categories = [];
    if (body.categories !== undefined) {
      if (!Array.isArray(body.categories)) {
        return errorResponse("Categories must be an array", 400);
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

      if (categories.length === 0) {
        return errorResponse("At least one valid category is required", 400);
      }

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

    // 13. Validate and sanitize features
    let features = [];
    if (body.features !== undefined) {
      if (!Array.isArray(body.features)) {
        return errorResponse("Features must be an array", 400);
      }

      features = body.features
        .filter((f) => typeof f === "string" && f.trim() !== "")
        .map((f) => sanitizeString(f, 200))
        .slice(0, 20);
    }

    // 14. Validate and sanitize images array
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

    // 15. Check existence before update
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId },
      select: { image: true, images: true, title: true },
    });

    if (!existingPortfolio) {
      return errorResponse("Portfolio item not found", 404);
    }

    // 16. Check slug uniqueness (excluding current item)
    const duplicateSlug = await prisma.portfolio.findFirst({
      where: {
        slug,
        NOT: { id: portfolioId },
      },
    });

    if (duplicateSlug) {
      return errorResponse(
        "A portfolio item with this slug already exists",
        409,
      );
    }

    // 17. Delete old main image if changed
    const finalImage = image && image.trim() !== "" ? image : null;
    if (existingPortfolio.image && existingPortfolio.image !== finalImage) {
      await deleteUploadedFile(existingPortfolio.image);
    }

    // 18. Delete removed gallery images
    if (Array.isArray(existingPortfolio.images)) {
      const removedImages = existingPortfolio.images.filter(
        (img) => !images.includes(img),
      );
      await deleteUploadedFiles(removedImages);
    }

    // 19. Update portfolio
    const portfolio = await prisma.portfolio.update({
      where: { id: portfolioId },
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

    // 20. Success response
    return NextResponse.json({
      ok: true,
      data: portfolio,
      message: "Portfolio item updated successfully",
    });
  } catch (err) {
    console.error("PUT /api/admin/portfolio/[id] error:", err);

    // Handle Prisma-specific errors
    if (err.code === "P2002") {
      const field = err.meta?.target?.[0] || "field";
      return errorResponse(
        `A portfolio item with this ${field} already exists`,
        409,
      );
    }
    if (err.code === "P2025") {
      return errorResponse("Portfolio item not found", 404);
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

    return errorResponse("Failed to update portfolio item", 500);
  }
}

// ==================== DELETE - Delete Portfolio Item ====================
export async function DELETE(req, { params }) {
  try {
    // 1. Authentication check
    const auth = await requireAuth(req);
    if (!auth) {
      return errorResponse("Unauthorized", 401);
    }

    // 2. Validate route params
    const { id } = await params;

    if (!id || typeof id !== "string") {
      return errorResponse("Portfolio ID is required", 400);
    }

    if (!validateInt(id)) {
      return errorResponse("Invalid portfolio ID format", 400);
    }

    const portfolioId = parseInt(id);

    if (portfolioId < 1) {
      return errorResponse("Portfolio ID must be a positive number", 400);
    }

    // 3. Check existence before delete
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId },
      select: { image: true, images: true, title: true },
    });

    if (!portfolio) {
      return errorResponse("Portfolio item not found", 404);
    }

    // 4. Delete main image if exists
    if (portfolio.image) {
      await deleteUploadedFile(portfolio.image);
    }

    // 5. Delete gallery images if exist
    if (Array.isArray(portfolio.images)) {
      await deleteUploadedFiles(portfolio.images);
    }

    // 6. Delete database record
    await prisma.portfolio.delete({
      where: { id: portfolioId },
    });

    // 7. Success response
    return NextResponse.json({
      ok: true,
      data: { id: portfolioId, title: portfolio.title },
      message: "Portfolio item deleted successfully",
    });
  } catch (err) {
    console.error("DELETE /api/admin/portfolio/[id] error:", err);

    // Handle Prisma-specific errors
    if (err.code === "P2025") {
      return errorResponse("Portfolio item not found", 404);
    }
    if (err.code === "P2003") {
      return errorResponse(
        "Cannot delete portfolio item: it is referenced by other records",
        400,
      );
    }
    if (err.code === "P2021") {
      return errorResponse("Database table does not exist", 500);
    }
    if (err.code === "P2014") {
      return errorResponse("The change would violate a required relation", 400);
    }

    return errorResponse("Failed to delete portfolio item", 500);
  }
}
