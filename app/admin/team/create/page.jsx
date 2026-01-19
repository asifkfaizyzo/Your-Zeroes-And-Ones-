'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayoutNew from '@/components/admin/AdminLayoutNew';
import { toastService } from '@/lib/toastConfig';

export default function CreateTeamMemberPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    linkedin: '',
    twitter: '',
    position: '',
    published: false,
  });

  const [imagePreview, setImagePreview] = useState(null);

  // ✅ Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview?.preview && !imagePreview?.isExisting) {
        URL.revokeObjectURL(imagePreview.preview);
      }
    };
  }, [imagePreview]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toastService.error('Please select a valid image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toastService.error('Image must be less than 5MB');
      return;
    }

    // ✅ Revoke previous preview if exists
    if (imagePreview?.preview && !imagePreview?.isExisting) {
      URL.revokeObjectURL(imagePreview.preview);
    }

    const preview = URL.createObjectURL(file);

    setImagePreview({
      file,
      preview,
      name: file.name,
      isExisting: false,
    });

    toastService.success('Image selected');
  };

  const removeImage = () => {
    if (imagePreview?.preview && !imagePreview?.isExisting) {
      URL.revokeObjectURL(imagePreview.preview);
    }
    setImagePreview(null);
    toastService.info('Image removed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      toastService.error('Please enter a name');
      return;
    }

    if (!formData.role.trim()) {
      toastService.error('Please enter a role');
      return;
    }

    setIsLoading(true);

    const createPromise = (async () => {
      // Upload image first if selected
      let uploadedImage = null;
      if (imagePreview?.file) {
        const formDataImg = new FormData();
        formDataImg.append('file', imagePreview.file);
        formDataImg.append('folder', 'team');

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formDataImg,
        });

        if (!uploadRes.ok) {
          const uploadError = await uploadRes.json().catch(() => ({}));
          throw new Error(uploadError?.error || 'Image upload failed');
        }
        const uploadData = await uploadRes.json();
        uploadedImage = uploadData.path;
      }

      const payload = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        image: uploadedImage,
        description: formData.description?.trim() || null,
        linkedin: formData.linkedin?.trim() || null,
        twitter: formData.twitter?.trim() || null,
        position: formData.position ? parseInt(formData.position, 10) : null,
        published: formData.published,
      };

      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Failed to create team member');
      }

      return data;
    })();

    try {
      await toastService.promise(createPromise, {
        pending: 'Creating team member...',
        success: 'Team member created successfully!',
        error: {
          render({ data }) {
            if (data instanceof Error) return data.message;
            if (typeof data === 'string') return data;
            return 'Failed to create team member';
          },
        },
      });

      router.push('/admin/team');
    } catch (err) {
      // Error already handled by toast.promise
      console.error('Submit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayoutNew>
      <div className="min-h-screen mt-0">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Add Team Member</h1>
            <p className="text-slate-600 mt-1">Add a new member to your team</p>
          </div>
          <Link href="/admin/team">
            <button 
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe"
                  className="w-full px-3 py-2 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                  Role / Position *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Developer"
                  className="w-full px-3 py-2 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description about the team member..."
                  rows={3}
                  className="w-full px-3 py-2 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-slate-700 mb-2">
                  Display Position (optional)
                </label>
                <input
                  type="number"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Leave empty for auto-ordering"
                  className="w-full px-3 py-2 border text-slate-900 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Lower numbers appear first
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Social Links (optional)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-slate-700 mb-2">
                  LinkedIn URL
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full pl-10 pr-3 py-2 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-slate-700 mb-2">
                  Twitter URL
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <input
                    type="url"
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/username"
                    className="w-full pl-10 pr-3 py-2 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Profile Photo</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Upload Photo (optional)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <svg className="w-12 h-12 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-slate-600 font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                </label>
              </div>

              {imagePreview && (
                <div className="mt-4 relative rounded-lg overflow-hidden bg-slate-100 max-w-[200px]">
                  <img
                    src={imagePreview.preview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
                    aria-label="Remove image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="bg-slate-800 bg-opacity-75 text-white text-xs px-3 py-1 absolute bottom-0 left-0 right-0 truncate">
                    {imagePreview.name}
                  </div>
                </div>
              )}

              <p className="text-xs text-slate-500 mt-3">
                💡 If no photo is uploaded, initials will be displayed
              </p>
            </div>
          </div>

          {/* Publishing Options */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-6">Publishing Options</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-slate-700">Publish this team member</span>
              </label>
              <p className="text-xs text-slate-500 ml-7">
                Published members will appear on your public about page
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end">
            <Link href="/admin/team">
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
                'Add Team Member'
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayoutNew>
  );
}