"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminLayoutNew from "@/components/admin/AdminLayoutNew";
import CategoryIcon from "@/components/CategoryIcon";
import {
  PORTFOLIO_CATEGORIES,
  SUBCATEGORIES_SIMPLE,
} from "@/lib/portfolio-categories";
import { toastService } from "@/lib/toastConfig";
import CustomSelect from "@/components/CustomSelect";
export default function CreatePortfolioPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    categories: [],
    tempCategory: "",
    tempSubCategory: "",
    featured: false,
    published: false,
    position: "",
    features: [""],
  });

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (mainImagePreview?.preview) {
        URL.revokeObjectURL(mainImagePreview.preview);
      }
      imagePreview.forEach((img) => {
        if (img.preview) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [mainImagePreview, imagePreview]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }
  };

  const handleAddCategory = () => {
  if (!formData.tempCategory || !formData.tempSubCategory) {
    toastService.error("Please select both category and service");
    return;
  }

  const isDuplicate = formData.categories.some(
    (cat) =>
      cat.category === formData.tempCategory &&
      cat.subCategory === formData.tempSubCategory
  );

  if (isDuplicate) {
    toastService.error("This category + service combination already exists");
    return;
  }

  setFormData((prev) => ({
    ...prev,
    categories: [
      ...prev.categories,
      {
        category: prev.tempCategory,
        subCategory: prev.tempSubCategory,
      },
    ],
    tempCategory: "",
    tempSubCategory: "",
  }));

  toastService.success("Category added");
};

  const handleRemoveCategory = (index) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index),
    }));
    toastService.info("Category removed");
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toastService.error("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toastService.error("Image must be less than 5MB");
      return;
    }

    if (mainImagePreview?.preview) {
      URL.revokeObjectURL(mainImagePreview.preview);
    }

    const preview = URL.createObjectURL(file);
    setMainImagePreview({
      file,
      preview,
      name: file.name,
    });
    toastService.success("Image selected");
  };

  const removeMainImage = () => {
    if (mainImagePreview?.preview) {
      URL.revokeObjectURL(mainImagePreview.preview);
    }
    setMainImagePreview(null);
    toastService.info("Image removed");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toastService.error(`${file.name} is not a valid image`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toastService.error(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    const previews = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    setImagePreview((prev) => [...prev, ...previews]);

    if (validFiles.length > 0) {
      toastService.success(`${validFiles.length} image(s) added`);
    }
  };

  const removeImage = (index) => {
    const img = imagePreview[index];
    if (img?.preview) {
      URL.revokeObjectURL(img.preview);
    }
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
    toastService.info("Image removed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toastService.error("Please enter a project title");
      return;
    }

    if (!formData.slug.trim()) {
      toastService.error("Please enter a slug");
      return;
    }

    if (formData.categories.length === 0) {
      toastService.error("Please add at least one category");
      return;
    }

    setIsLoading(true);

    const createPromise = (async () => {
      let uploadedMainImage = null;
      if (mainImagePreview?.file) {
        const formDataImg = new FormData();
        formDataImg.append("file", mainImagePreview.file);
        formDataImg.append("folder", "portfolio");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formDataImg,
        });

        if (!uploadRes.ok) {
          const uploadError = await uploadRes.json().catch(() => ({}));
          throw new Error(uploadError?.error || "Main image upload failed");
        }
        const uploadData = await uploadRes.json();
        uploadedMainImage = uploadData.url;
      }

      const uploadedImages = [];
      for (const img of imagePreview) {
        if (img.file) {
          const formDataImg = new FormData();
          formDataImg.append("file", img.file);
          formDataImg.append("folder", "portfolio");

          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formDataImg,
          });

          if (!uploadRes.ok) {
            const uploadError = await uploadRes.json().catch(() => ({}));
            throw new Error(
              uploadError?.error || "Gallery image upload failed",
            );
          }
          const uploadData = await uploadRes.json();
          uploadedImages.push(uploadData.url);
        }
      }

      const payload = {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        shortDescription: formData.shortDescription.trim(),
        fullDescription: formData.fullDescription.trim(),
        categories: formData.categories,
        image: uploadedMainImage,
        featured: formData.featured,
        published: formData.published,
        position: formData.position ? parseInt(formData.position, 10) : null,
        features: formData.features.filter((f) => f.trim()),
        images: uploadedImages.filter((img) => img != null),
      };

      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to create portfolio");
      }

      return data;
    })();

    try {
      await toastService.promise(createPromise, {
        pending: "Creating project...",
        success: "Project created successfully!",
        error: {
          render({ data }) {
            if (data instanceof Error) return data.message;
            if (typeof data === "string") return data;
            return "Failed to create project";
          },
        },
      });

      router.push("/admin/portfolio");
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayoutNew>
      <div className="min-h-screen mt-0">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Create Project
            </h1>
            <p className="text-slate-600 mt-1">Add a new portfolio project</p>
          </div>
          <Link href="/admin/portfolio">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
            >
              <svg
                className="w-5 h-5"
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
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., E-commerce Platform Redesign"
                    className="w-full px-3 text-slate-900 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Slug *
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="auto-generated"
                    className="w-full px-3 py-2 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="shortDescription"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Short Description *
                </label>
                <textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Brief project summary (1-2 sentences)"
                  rows={2}
                  className="w-full px-3 py-2 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="fullDescription"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Full Description *
                </label>
                <textarea
                  id="fullDescription"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  placeholder="Detailed project overview and context"
                  rows={4}
                  className="w-full px-3 py-2 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Categories & Services
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {formData.categories.length === 0
                    ? "Add at least one category to continue"
                    : `${formData.categories.length} ${formData.categories.length === 1 ? "category" : "categories"} selected`}
                </p>
              </div>
              {formData.categories.length > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {formData.categories.length} / 10
                </span>
              )}
            </div>

            {/* Selected Categories Display */}
            {formData.categories.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-sm font-semibold text-slate-700">
                    Selected Categories
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg border border-blue-100 p-4">
                  <div className="flex flex-wrap gap-2">
                    {formData.categories.map((cat, index) => (
                      <div
                        key={index}
                        className="group flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <CategoryIcon
                          icon={
                            PORTFOLIO_CATEGORIES.find(
                              (c) => c.category === cat.category,
                            )?.icon || "sparkles"
                          }
                          className="w-4 h-4 stroke-white"
                        />
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
                          <span className="font-semibold">{cat.category}</span>
                          <svg
                            className="w-3 h-3 hidden sm:block opacity-70"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          <span className="text-blue-100 sm:text-white text-xs sm:text-sm">
                            {cat.subCategory}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCategory(index)}
                          className="ml-2 hover:bg-blue-700 rounded-full p-1 transition-all duration-200 group-hover:rotate-90"
                          aria-label="Remove category"
                          title="Remove this category"
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
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Add New Category Form */}
            <div className="bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 p-5 hover:border-blue-300 transition-colors duration-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  Add New Category
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Category Select */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                      Category *
                    </label>
                    <CustomSelect
                      options={PORTFOLIO_CATEGORIES.map((cat) => ({
                        value: cat.category,
                        label: cat.category,
                      }))}
                      value={
                        formData.tempCategory
                          ? {
                              value: formData.tempCategory,
                              label: formData.tempCategory,
                            }
                          : null
                      }
                      onChange={(selected) =>
                        setFormData((prev) => ({
                          ...prev,
                          tempCategory: selected?.value || "",
                          tempSubCategory: "",
                        }))
                      }
                      placeholder="Choose a category..."
                      showIcon
                      iconMap={PORTFOLIO_CATEGORIES.reduce((acc, cat) => {
                        acc[cat.category] = cat.icon;
                        return acc;
                      }, {})}
                      isClearable
                    />
                  </div>

                  {/* Service Select */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                      Service *
                    </label>
                    <CustomSelect
                      options={
                        formData.tempCategory
                          ? (
                              SUBCATEGORIES_SIMPLE[formData.tempCategory] || []
                            ).map((sub) => ({
                              value: sub,
                              label: sub,
                            }))
                          : []
                      }
                      value={
                        formData.tempSubCategory
                          ? {
                              value: formData.tempSubCategory,
                              label: formData.tempSubCategory,
                            }
                          : null
                      }
                      onChange={(selected) =>
                        setFormData((prev) => ({
                          ...prev,
                          tempSubCategory: selected?.value || "",
                        }))
                      }
                      placeholder={
                        formData.tempCategory
                          ? "Choose a service..."
                          : "Select category first"
                      }
                      isDisabled={!formData.tempCategory}
                      isClearable
                    />
                    {!formData.tempCategory && (
                      <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Please select a category first
                      </p>
                    )}
                  </div>
                </div>

                {/* Add Button */}
                <button
                  type="button"
                  onClick={handleAddCategory}
                  disabled={!formData.tempCategory || !formData.tempSubCategory}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 disabled:hover:shadow-sm flex items-center justify-center gap-2 group"
                >
                  <svg
                    className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Category & Service
                </button>
              </div>
            </div>

            {/* Error Message */}
            {formData.categories.length === 0 && (
              <div className="mt-4 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <svg
                  className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-red-800">
                    Required Field
                  </p>
                  <p className="text-xs text-red-600 mt-0.5">
                    At least one category & service combination is required to
                    create a project
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Hero Image
            </h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Upload Main Project Image
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                  className="hidden"
                  id="main-image-upload"
                />
                <label htmlFor="main-image-upload" className="cursor-pointer">
                  <svg
                    className="w-12 h-12 text-slate-400 mx-auto mb-2"
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
                  <p className="text-slate-600 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </label>
              </div>

              {mainImagePreview && (
                <div className="mt-4 relative rounded-lg overflow-hidden bg-slate-100 max-w-xs">
                  <img
                    src={mainImagePreview.preview}
                    alt="Hero preview"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeMainImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
                    aria-label="Remove image"
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
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Gallery Images
            </h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Upload Images
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <svg
                    className="w-12 h-12 text-slate-400 mx-auto mb-2"
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
                  <p className="text-slate-600 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </label>
              </div>

              {imagePreview.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {imagePreview.map((img, index) => (
                    <div
                      key={index}
                      className="relative rounded-lg overflow-hidden bg-slate-100"
                    >
                      <img
                        src={img.preview}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded hover:bg-red-600"
                        aria-label="Remove image"
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
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Key Features
            </h2>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      handleArrayChange("features", index, e.target.value)
                    }
                    placeholder={`Feature ${index + 1}`}
                    className="flex-1 px-3 py-2 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("features", index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("features")}
                className="mt-2 px-4 py-2 text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg transition-colors"
              >
                + Add Feature
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Publishing Options
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-slate-700">
                  Publish this project
                </span>
              </label>

              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Display Position (optional)
                </label>
                <input
                  type="number"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Leave empty for auto-ordering"
                  className="w-full px-3 py-2 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Link href="/admin/portfolio">
              <button
                type="button"
                className="px-6 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayoutNew>
  );
}
