// components/admin/TestimonialEditor.jsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toastService } from '@/lib/toastConfig';

export default function TestimonialEditor({ initialData = null, isEdit = false, testimonialId = null }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    company: initialData?.company || '',
    message: initialData?.message || '',
    image: initialData?.image || '',
    rating: initialData?.rating || 5,
    verified: initialData?.verified || false,
    position: initialData?.position || '',
    published: initialData?.published || false,
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toastService.error('Please upload an image file');
      e.target.value = '';
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toastService.error('Image size should be less than 5MB');
      e.target.value = '';
      return;
    }

    setUploading(true);

    const uploadPromise = (async () => {
      const formDataImg = new FormData();
      formDataImg.append('file', file);
      formDataImg.append('folder', 'testimonials');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataImg,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Upload failed');
      }

      const data = await res.json();
      
      if (!data?.url) {
        throw new Error('No URL returned from upload');
      }

      return data;
    })();

    toastService.promise(uploadPromise, {
      pending: 'Uploading image...',
      success: 'Image uploaded successfully!',
      error: {
        render({ data }) {
          if (data instanceof Error) return data.message;
          if (typeof data === 'string') return data;
          return 'Failed to upload image';
        },
      },
    })
      .then((data) => {
        setFormData(prev => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
      })
      .catch((error) => {
        console.error('Upload error:', error);
      })
      .finally(() => {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      });
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toastService.info('Image removed');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    } else if (formData.role.trim().length < 2) {
      newErrors.role = 'Role must be at least 2 characters';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message should be at least 20 characters';
    }
    
    if (formData.position && (isNaN(formData.position) || formData.position < 1)) {
      newErrors.position = 'Position must be a positive number';
    }

    setErrors(newErrors);
    
    // Show toast for first error
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toastService.error(firstError);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);

    const savePromise = (async () => {
      const url = isEdit 
        ? `/api/admin/testimonials/${testimonialId}`
        : '/api/admin/testimonials';
      
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          role: formData.role.trim(),
          company: formData.company.trim(),
          message: formData.message.trim(),
          image: formData.image.trim(),
          rating: formData.rating,
          verified: formData.verified,
          position: formData.position ? parseInt(formData.position) : null,
          published: formData.published,
        }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error?.error || 'Failed to save testimonial');
      }

      return await res.json();
    })();

    toastService.promise(savePromise, {
      pending: isEdit ? 'Updating testimonial...' : 'Creating testimonial...',
      success: isEdit ? 'Testimonial updated successfully!' : 'Testimonial created successfully!',
      error: {
        render({ data }) {
          if (data instanceof Error) return data.message;
          if (typeof data === 'string') return data;
          return 'Failed to save testimonial';
        },
      },
    })
      .then(() => {
        setTimeout(() => {
          router.push('/admin/testimonials');
        }, 1000);
      })
      .catch((error) => {
        console.error('Save error:', error);
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const StarRating = () => {
    return (
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
            aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <svg
              className={`w-8 h-8 ${
                star <= formData.rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 fill-gray-300'
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm font-medium text-slate-600">
          {formData.rating} {formData.rating === 1 ? 'star' : 'stars'}
        </span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Main Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Testimonial Details</h2>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 focus:border-transparent outline-none transition-all ${
                errors.name ? 'border-red-300 bg-red-50' : 'border-slate-200'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
              Role / Position <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., CEO, Product Manager, Developer"
              className={`w-full px-4 py-3 border text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                errors.role ? 'border-red-300 bg-red-50' : 'border-slate-200'
              }`}
            />
            {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
          </div>

          {/* Company (Optional) */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
              Company <span className="text-slate-400 text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., Tech Corp Inc."
              className="w-full px-4 py-3 border border-slate-200 text-slate-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
              Testimonial Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Write the testimonial message here..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 text-slate-900 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${
                errors.message ? 'border-red-300 bg-red-50' : 'border-slate-200'
              }`}
            />
            <div className="mt-1 flex items-center justify-between">
              {errors.message ? (
                <p className="text-sm text-red-600">{errors.message}</p>
              ) : (
                <p className="text-sm text-slate-500">
                  {formData.message.length} characters
                </p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Profile Image <span className="text-slate-400 text-xs">(Optional)</span>
            </label>
            
            {imagePreview ? (
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-2">Image uploaded successfully</p>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Remove Image
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="image-upload"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-all ${
                    uploading
                      ? 'border-blue-400 bg-blue-50 cursor-not-allowed'
                      : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50 cursor-pointer'
                  }`}
                >
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm text-blue-600 font-medium">Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-10 h-10 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span className="text-sm text-slate-600 font-medium">Click to upload image</span>
                      <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                    </>
                  )}
                </label>
              </div>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Rating <span className="text-red-500">*</span>
            </label>
            <StarRating />
          </div>
        </div>
      </div>

      {/* Settings Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Settings</h2>

        <div className="space-y-5">
          {/* Display Position */}
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-slate-700 mb-2">
              Display Position <span className="text-slate-400 text-xs">(Optional)</span>
            </label>
            <input
              type="number"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              min="1"
              placeholder="Leave empty for automatic ordering"
              className={`w-full px-4 py-3 border rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                errors.position ? 'border-red-300 bg-red-50' : 'border-slate-200'
              }`}
            />
            {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
            <p className="mt-2 text-xs text-slate-500">
              💡 Specify a custom position (e.g., 1, 2, 3) to control the display order. Leave empty for automatic ordering by date.
            </p>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            {/* Verified */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  name="verified"
                  checked={formData.verified}
                  onChange={handleChange}
                  className="w-5 h-5 border-2 border-slate-300 rounded checked:bg-green-600 checked:border-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  Mark as Verified
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Show a verified badge on this testimonial
                </p>
              </div>
            </label>

            {/* Published */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="w-5 h-5 border-2 border-slate-300 rounded checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                  Publish Testimonial
                </span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Make this testimonial visible on your website
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4 sticky bottom-4 bg-white rounded-xl border border-slate-200 p-4 shadow-lg">
        <button
          type="button"
          onClick={() => router.push('/admin/testimonials')}
          disabled={saving || uploading}
          className="px-6 py-3 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              setFormData(prev => ({ ...prev, published: false }));
              setTimeout(() => handleSubmit(e), 10);
            }}
            disabled={saving || uploading}
            className="px-6 py-3 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save as Draft
          </button>
          
          <button
            type="submit"
            disabled={saving || uploading}
            className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {saving ? 'Saving...' : (isEdit ? 'Update Testimonial' : 'Create Testimonial')}
          </button>
        </div>
      </div>
    </form>
  );
}
