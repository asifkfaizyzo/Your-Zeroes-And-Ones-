// components/admin/BlogEditorWrapper.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BlogEditor from "./blog-editor/BlogEditor";
import { toastService } from "@/lib/toastConfig";

export default function BlogEditorWrapper({
  initialData = null,
  isEdit = false,
  blogId = null,
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    tags: [],
    featuredImage: "",
    contentHtml: "",
    published: false,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        excerpt: initialData.excerpt || "",
        tags: initialData.tags || [],
        featuredImage: initialData.image || "",
        contentHtml: initialData.content_html || "",
        published: initialData.published || false,
      });
      setTagsInput((initialData.tags || []).join(", "));
    }
  }, [initialData]);

  // Auto-generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 200);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug:
        prev.slug === "" || prev.slug === generateSlug(prev.title)
          ? generateSlug(newTitle)
          : prev.slug,
    }));
  };

  const handleSave = async (published) => {
    // Validation
    if (!formData.title.trim()) {
      toastService.error("Title is required");
      return;
    }
    if (formData.title.trim().length < 3) {
      toastService.error("Title must be at least 3 characters");
      return;
    }
    if (!formData.slug.trim()) {
      toastService.error("Slug is required");
      return;
    }
    if (formData.slug.trim().length < 3) {
      toastService.error("Slug must be at least 3 characters");
      return;
    }
    if (!formData.contentHtml.trim() || formData.contentHtml === "<p></p>") {
      toastService.error("Content is required");
      return;
    }
    if (formData.contentHtml.trim().length < 10) {
      toastService.error("Content is too short");
      return;
    }

    setSaving(true);

    const savePromise = (async () => {
      const url = isEdit ? `/api/admin/blogs/${blogId}` : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: formData.title.trim(),
          slug: formData.slug.trim(),
          excerpt: formData.excerpt.trim(),
          tags: formData.tags,
          featuredImage: formData.featuredImage.trim(),
          contentHtml: formData.contentHtml,
          published,
        }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Failed to save blog (${res.status})`);
      }

      return await res.json();
    })();

    toastService
      .promise(savePromise, {
        pending: isEdit ? "Updating blog..." : "Creating blog...",
        success: isEdit
          ? "Blog updated successfully!"
          : "Blog created successfully!",
        error: {
          render({ data }) {
            if (data instanceof Error) return data.message;
            if (typeof data === "string") return data;
            return "Failed to save blog";
          },
        },
      })
      .then(() => {
        setTimeout(() => {
          router.push("/admin/blogs");
        }, 1000);
      })
      .catch((err) => {
        console.error("Save error:", err);
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toastService.error("Invalid file type. Allowed: JPEG, PNG, GIF, WebP");
      e.target.value = "";
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toastService.error("File too large. Maximum size is 5MB");
      e.target.value = "";
      return;
    }

    setUploading(true);

    const uploadPromise = (async () => {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("folder", "blogs");

      const res = await fetch("/api/upload", {
        method: "POST",
        credentials: "include",
        body: uploadData,
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Upload failed: ${res.status}`);
      }

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || "Upload failed");
      }

      const json = await res.json();

      if (!json?.url) {
        throw new Error("No URL returned from upload");
      }

      return json;
    })();

    toastService
      .promise(uploadPromise, {
        pending: "Uploading image...",
        success: "Image uploaded successfully!",
        error: {
          render({ data }) {
            if (data instanceof Error) return data.message;
            if (typeof data === "string") return data;
            return "Failed to upload image";
          },
        },
      })
      .then((json) => {
        setFormData((prev) => ({
          ...prev,
          featuredImage: json.url,
        }));
      })
      .catch((err) => {
        console.error("Upload error:", err);
      })
      .finally(() => {
        setUploading(false);
        e.target.value = "";
      });
  };

  return (
    <div className="space-y-6">
      {/* Form Fields */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Enter blog title"
            maxLength={200}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) =>
              setFormData({ ...formData, slug: generateSlug(e.target.value) })
            }
            placeholder="blog-slug-url"
            maxLength={200}
            className="w-full px-4 py-3 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <p className="text-xs text-slate-500 mt-1">
            Used in the URL: /blog/{formData.slug || "your-slug"}
          </p>
        </div>

        {/* Two Column Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              placeholder="Brief summary of the blog post"
              rows="3"
              maxLength={500}
              className="w-full px-4 py-3 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
            <p className="text-xs text-slate-500 mt-1">
              {formData.excerpt.length}/500 characters
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              onBlur={(e) => {
                const tags = e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .slice(0, 20);
                setFormData({ ...formData, tags });
                setTagsInput(tags.join(", "));
              }}
              placeholder="react, nextjs, javascript"
              className="w-full px-4 py-3 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs text-slate-500 mt-1">
              Separate tags with commas (max 20 tags)
            </p>
          </div>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Featured Image
          </label>

          {formData.featuredImage ? (
            <div className="relative mb-4">
              <img
                src={formData.featuredImage}
                alt="Featured"
                className="w-full h-48 object-cover rounded-lg border border-slate-200"
                onError={(e) => {
                  e.target.src = "/placeholder-image.png";
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, featuredImage: "" });
                  toastService.info("Featured image removed");
                }}
                aria-label="Remove featured image"
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <label
              className={`flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all mb-4 ${
                uploading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {uploading ? (
                <>
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
                  <span className="text-sm text-slate-600 font-medium">
                    Uploading...
                  </span>
                </>
              ) : (
                <>
                  <svg
                    className="w-12 h-12 text-slate-300 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-slate-600 font-medium">
                    Click to upload image
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    PNG, JPG, GIF, WebP up to 5MB
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Or paste URL:
            </label>
            <input
              type="text"
              value={formData.featuredImage}
              onChange={(e) =>
                setFormData({ ...formData, featuredImage: e.target.value })
              }
              placeholder="/uploads/blogs/image.jpg or https://example.com/image.jpg"
              maxLength={500}
              className="w-full px-4 py-3 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs text-slate-500">
              Local path (e.g., /uploads/blogs/image.jpg) or external URL
            </p>
          </div>
        </div>
      </div>

      {/* Editor */}
      <BlogEditor
        initialData={initialData}
        onContentChange={(html) =>
          setFormData({ ...formData, contentHtml: html })
        }
      />

      {/* Publish Status & Actions */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-5 h-5 accent-blue-600"
              />
              <span className="font-medium text-slate-900">
                Publish immediately
              </span>
            </label>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                formData.published
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {formData.published ? "Published" : "Draft"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={saving || uploading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSave(false)}
              className="px-6 py-2 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={saving || uploading}
            >
              {saving && !formData.published && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Save as Draft
            </button>
            <button
              type="button"
              onClick={() => handleSave(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={saving || uploading}
            >
              {saving && formData.published && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
