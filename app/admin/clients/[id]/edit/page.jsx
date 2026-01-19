// app/admin/clients/[id]/edit/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import AdminLayoutNew from "@/components/admin/AdminLayoutNew";
import { toastService } from "@/lib/toastConfig";

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    published: false,
  });

  const [logoPreview, setLogoPreview] = useState(null);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (logoPreview?.preview && !logoPreview.isExisting) {
        URL.revokeObjectURL(logoPreview.preview);
      }
    };
  }, [logoPreview]);

  // Fetch existing client
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/admin/clients/${params.id}`);

        if (res.status === 404) {
          setNotFound(true);
          setIsLoading(false);
          return;
        }

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error || "Failed to fetch client");
        }

        const data = await res.json();
        const client = data.data;
        // Set existing logo if available
        if (client.logo) {
          setLogoPreview({
            preview: client.logo,
            name: client.logo.split("/").pop(),
            isExisting: true,
          });
        }

        // Set form data
        setFormData({
          name: client.name || "",
          position: client.position || "",
          published: client.published || false,
        });
      } catch (err) {
        console.error("Fetch error:", err);
        toastService.error(err.message || "Failed to load client");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchClient();
    }
  }, [params.id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toastService.error("File size must be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toastService.error("Please upload a valid image file");
        return;
      }

      // Cleanup previous preview if it exists
      if (logoPreview?.preview && !logoPreview.isExisting) {
        URL.revokeObjectURL(logoPreview.preview);
      }

      const preview = URL.createObjectURL(file);
      setLogoPreview({
        file,
        preview,
        name: file.name,
        isExisting: false,
      });
      toastService.success("Logo selected successfully");
    }
  };

  const removeLogo = () => {
    if (logoPreview?.preview && !logoPreview.isExisting) {
      URL.revokeObjectURL(logoPreview.preview);
    }
    setLogoPreview(null);
    toastService.info("Logo removed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.name.trim()) {
      toastService.error("Client name is required");
      return;
    }

    if (formData.name.trim().length < 2) {
      toastService.error("Client name must be at least 2 characters");
      return;
    }

    setIsSaving(true);

    const submitPromise = (async () => {
      // Upload new logo if selected
      let uploadedLogo = null;

      if (logoPreview?.file && !logoPreview.isExisting) {
        // New logo uploaded
        const formDataImg = new FormData();
        formDataImg.append("file", logoPreview.file);
        formDataImg.append("folder", "clients");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formDataImg,
        });

        if (!uploadRes.ok) {
          const data = await uploadRes.json().catch(() => ({}));
          throw new Error(data?.error || "Logo upload failed");
        }

        const uploadData = await uploadRes.json();
        uploadedLogo = uploadData.path;
      } else if (logoPreview?.isExisting) {
        // Keep existing logo
        uploadedLogo = logoPreview.preview;
      }
      // else: logoPreview is null → logo will be set to null

      const payload = {
        name: formData.name.trim(),
        logo: uploadedLogo,
        position: formData.position ? parseInt(formData.position) : null,
        published: formData.published,
      };

      const res = await fetch(`/api/admin/clients/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to update client");
      }

      return await res.json();
    })();

    toastService
      .promise(submitPromise, {
        pending: "Updating client...",
        success: "Client updated successfully!",
        error: {
          render({ data }) {
            if (data instanceof Error) return data.message;
            if (typeof data === "string") return data;
            return "Failed to update client";
          },
        },
      })
      .then(() => {
        router.push("/admin/clients");
      })
      .catch((err) => {
        console.error("Submit error:", err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  if (isLoading) {
    return (
      <AdminLayoutNew>
        <div className="min-h-screen flex items-center justify-center">
          <div className="inline-flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
            <div
              className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
          <p className="text-slate-500 ml-4">Loading client...</p>
        </div>
      </AdminLayoutNew>
    );
  }

  if (notFound) {
    return (
      <AdminLayoutNew>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-red-600"
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
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Client Not Found
            </h2>
            <p className="text-slate-600 mb-6">
              The client you're looking for doesn't exist or has been deleted.
            </p>
            <Link href="/admin/clients">
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Back to Clients
              </button>
            </Link>
          </div>
        </div>
      </AdminLayoutNew>
    );
  }

  return (
    <AdminLayoutNew>
      <div className="min-h-screen mt-0">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Edit Client</h1>
            <p className="text-slate-600 mt-1">
              Update client logo and details
            </p>
          </div>
          <Link href="/admin/clients">
            <button
              type="button"
              aria-label="Close"
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., TechCorp Solutions"
                  className="w-full px-3 py-2 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  This will be displayed on your clients page
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Display Position (optional)
                </label>
                <input
                  type="number"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Leave empty for auto-ordering"
                  className="w-full px-3 py-2 border text-slate-900 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Lower numbers appear first. Leave empty to sort by creation
                  date
                </p>
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Client Logo
            </h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Upload Logo (optional)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
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

              {logoPreview && (
                <div className="mt-4 relative rounded-lg overflow-hidden bg-slate-100 max-w-xs">
                  <img
                    src={logoPreview.preview}
                    alt="Logo preview"
                    className="w-full h-48 object-contain p-4"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    aria-label="Remove logo"
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
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
                  <div className="bg-slate-800 bg-opacity-75 text-white text-xs px-3 py-1 absolute bottom-0 left-0 right-0 truncate">
                    {logoPreview.name}
                  </div>
                </div>
              )}

              <p className="text-xs text-slate-500 mt-3">
                💡 If no logo is uploaded, initials from the client name will be
                displayed
              </p>
            </div>
          </div>

          {/* Publishing Options */}
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
                  Publish this client
                </span>
              </label>
              <p className="text-xs text-slate-500 ml-7">
                Published clients will appear on your public clients page
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end">
            <Link href="/admin/clients">
              <button
                type="button"
                className="px-6 py-2.5 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayoutNew>
  );
}
