// components/admin/TestimonialEditor.jsx
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toastService } from '@/lib/toastConfig';

export default function TestimonialEditor({ initialData = null, isEdit = false, testimonialId = null }) {
  const router = useRouter();
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    company: initialData?.company || '',
    message: initialData?.message || '',
    quoteExcerpt: initialData?.quoteExcerpt || '',
    image: initialData?.image || '',
    videoUrl: initialData?.videoUrl || '',
    thumbnailUrl: initialData?.thumbnailUrl || '',
    rating: initialData?.rating || 5,
    verified: initialData?.verified || false,
    position: initialData?.position || '',
    published: initialData?.published || false,
  });

  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');
  const [videoPreview, setVideoPreview] = useState(initialData?.videoUrl || '');
  const [thumbnailPreview, setThumbnailPreview] = useState(initialData?.thumbnailUrl || '');
  const [errors, setErrors] = useState({});
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

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

  // ==================== PROFILE IMAGE UPLOAD ====================
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
        if (imageInputRef.current) {
          imageInputRef.current.value = '';
        }
      });
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setImagePreview('');
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    toastService.info('Image removed');
  };

  // ==================== VIDEO UPLOAD WITH PROGRESS ====================
  const handleVideoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
    if (!validVideoTypes.includes(file.type)) {
      toastService.error('Please upload a valid video file (MP4, WebM, OGG, MOV)');
      e.target.value = '';
      return;
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toastService.error('Video size should be less than 100MB');
      e.target.value = '';
      return;
    }

    setUploadingVideo(true);
    setVideoUploadProgress(0);

    const formDataVideo = new FormData();
    formDataVideo.append('file', file);

    // Use XMLHttpRequest for progress tracking
    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = Math.round((e.loaded / e.total) * 100);
        setVideoUploadProgress(percentComplete);
      }
    });

    // Handle completion
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (data.success && data.url) {
            setFormData(prev => ({ ...prev, videoUrl: data.url }));
            setVideoPreview(data.url);
            toastService.success(`Video uploaded successfully! (${data.sizeFormatted})`);
          } else {
            throw new Error(data?.error || 'Upload failed');
          }
        } catch (err) {
          toastService.error('Failed to parse upload response');
          console.error('Parse error:', err);
        }
      } else {
        try {
          const data = JSON.parse(xhr.responseText);
          toastService.error(data?.error || 'Video upload failed');
        } catch {
          toastService.error('Video upload failed');
        }
      }
      setUploadingVideo(false);
      setVideoUploadProgress(0);
      if (videoInputRef.current) {
        videoInputRef.current.value = '';
      }
    });

    // Handle errors
    xhr.addEventListener('error', () => {
      toastService.error('Network error during video upload');
      setUploadingVideo(false);
      setVideoUploadProgress(0);
      if (videoInputRef.current) {
        videoInputRef.current.value = '';
      }
    });

    // Handle abort
    xhr.addEventListener('abort', () => {
      toastService.info('Video upload cancelled');
      setUploadingVideo(false);
      setVideoUploadProgress(0);
      if (videoInputRef.current) {
        videoInputRef.current.value = '';
      }
    });

    // Send request
    xhr.open('POST', '/api/admin/upload/video');
    xhr.send(formDataVideo);
  };

  const removeVideo = () => {
    setFormData(prev => ({ ...prev, videoUrl: '' }));
    setVideoPreview('');
    setShowVideoPlayer(false);
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
    toastService.info('Video removed');
  };

  // ==================== THUMBNAIL UPLOAD ====================
  const handleThumbnailUpload = async (e) => {
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
      toastService.error('Thumbnail size should be less than 5MB');
      e.target.value = '';
      return;
    }

    setUploadingThumbnail(true);

    const uploadPromise = (async () => {
      const formDataThumb = new FormData();
      formDataThumb.append('file', file);

      const res = await fetch('/api/admin/upload/thumbnail', {
        method: 'POST',
        body: formDataThumb,
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
      pending: 'Uploading thumbnail...',
      success: 'Thumbnail uploaded successfully!',
      error: {
        render({ data }) {
          if (data instanceof Error) return data.message;
          if (typeof data === 'string') return data;
          return 'Failed to upload thumbnail';
        },
      },
    })
      .then((data) => {
        setFormData(prev => ({ ...prev, thumbnailUrl: data.url }));
        setThumbnailPreview(data.url);
      })
      .catch((error) => {
        console.error('Upload error:', error);
      })
      .finally(() => {
        setUploadingThumbnail(false);
        if (thumbnailInputRef.current) {
          thumbnailInputRef.current.value = '';
        }
      });
  };

  const removeThumbnail = () => {
    setFormData(prev => ({ ...prev, thumbnailUrl: '' }));
    setThumbnailPreview('');
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
    toastService.info('Thumbnail removed');
  };

  // ==================== FORM VALIDATION ====================
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

    // Video testimonial validation
    if (formData.videoUrl && !formData.thumbnailUrl) {
      newErrors.thumbnailUrl = 'Thumbnail is required for video testimonials';
    }

    if (formData.quoteExcerpt && formData.quoteExcerpt.length > 300) {
      newErrors.quoteExcerpt = 'Quote excerpt must be less than 300 characters';
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

  // ==================== FORM SUBMISSION ====================
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
          quoteExcerpt: formData.quoteExcerpt.trim(),
          image: formData.image.trim(),
          videoUrl: formData.videoUrl.trim(),
          thumbnailUrl: formData.thumbnailUrl.trim(),
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

  // ==================== STAR RATING COMPONENT ====================
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

  // Auto-generate excerpt from message if empty
  const handleGenerateExcerpt = () => {
    if (!formData.message.trim()) {
      toastService.error('Please write a message first');
      return;
    }

    const excerpt = formData.message.trim().substring(0, 150);
    const lastSpaceIndex = excerpt.lastIndexOf(' ');
    const finalExcerpt = lastSpaceIndex > 100 ? excerpt.substring(0, lastSpaceIndex) + '...' : excerpt;
    
    setFormData(prev => ({ ...prev, quoteExcerpt: finalExcerpt }));
    toastService.success('Excerpt generated from message');
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
              placeholder="Write the full testimonial message here..."
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

          {/* Quote Excerpt (for video testimonials) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="quoteExcerpt" className="block text-sm font-medium text-slate-700">
                Short Quote Excerpt <span className="text-slate-400 text-xs">(Optional - for video cards)</span>
              </label>
              <button
                type="button"
                onClick={handleGenerateExcerpt}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Generate from message
              </button>
            </div>
            <textarea
              id="quoteExcerpt"
              name="quoteExcerpt"
              value={formData.quoteExcerpt}
              onChange={handleChange}
              rows={2}
              placeholder="A short excerpt (1-3 lines) to display with video thumbnail..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 text-slate-900 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${
                errors.quoteExcerpt ? 'border-red-300 bg-red-50' : 'border-slate-200'
              }`}
            />
            {errors.quoteExcerpt && <p className="mt-1 text-sm text-red-600">{errors.quoteExcerpt}</p>}
            <p className="mt-1 text-xs text-slate-500">
              {formData.quoteExcerpt.length}/300 characters
              {formData.videoUrl && ' • Displayed alongside video'}
            </p>
          </div>

          {/* Profile Image Upload */}
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
                  <p className="text-sm text-slate-600 mb-2">Profile image uploaded</p>
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
                  ref={imageInputRef}
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
                      <span className="text-sm text-slate-600 font-medium">Click to upload profile image</span>
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

      {/* Video Testimonial Section */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Video Testimonial</h2>
            <p className="text-sm text-slate-600">Add video to create a more engaging testimonial</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Video File <span className="text-slate-400 text-xs">(Optional)</span>
            </label>
            
            {videoPreview ? (
              <div className="space-y-4">
                {/* Video Preview */}
                <div className="relative rounded-lg overflow-hidden bg-black">
                  {showVideoPlayer ? (
                    <video 
                      src={videoPreview} 
                      controls 
                      className="w-full max-h-96"
                      onEnded={() => setShowVideoPlayer(false)}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div 
                      className="relative w-full h-64 flex items-center justify-center cursor-pointer group"
                      onClick={() => setShowVideoPlayer(true)}
                    >
                      {thumbnailPreview ? (
                        <img 
                          src={thumbnailPreview} 
                          alt="Video thumbnail" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                          <svg className="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                        <div className="w-20 h-20 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 flex items-center justify-center transition-all shadow-lg">
                          <svg className="w-10 h-10 text-purple-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Info & Actions */}
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Video uploaded successfully</p>
                      <p className="text-xs text-slate-500">Click preview to play</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Remove Video
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/ogg,video/quicktime"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                  disabled={uploadingVideo}
                />
                <label
                  htmlFor="video-upload"
                  className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg transition-all ${
                    uploadingVideo
                      ? 'border-purple-400 bg-purple-50 cursor-not-allowed'
                      : 'border-purple-300 hover:border-purple-400 hover:bg-purple-50/50 cursor-pointer'
                  }`}
                >
                  {uploadingVideo ? (
                    <div className="flex flex-col items-center gap-3 w-full px-8">
                      <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                      <div className="w-full max-w-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-purple-700 font-medium">Uploading video...</span>
                          <span className="text-sm text-purple-600 font-bold">{videoUploadProgress}%</span>
                        </div>
                        <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-purple-600 h-full transition-all duration-300 ease-out"
                            style={{ width: `${videoUploadProgress}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-purple-600">Please wait, this may take a while...</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-700 font-medium">Click to upload video</span>
                      <span className="text-xs text-slate-500 mt-1">MP4, WebM, MOV up to 100MB</span>
                    </>
                  )}
                </label>
              </div>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Video Thumbnail <span className="text-slate-400 text-xs">(Required if video is added)</span>
            </label>
            
            {thumbnailPreview ? (
              <div className="flex items-center gap-4">
                <div className="relative w-40 h-24 rounded-lg overflow-hidden border-2 border-slate-200">
                  <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-2">Thumbnail uploaded</p>
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Remove Thumbnail
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                  id="thumbnail-upload"
                  disabled={uploadingThumbnail}
                />
                <label
                  htmlFor="thumbnail-upload"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-all ${
                    uploadingThumbnail
                      ? 'border-purple-400 bg-purple-50 cursor-not-allowed'
                      : 'border-purple-300 hover:border-purple-400 hover:bg-purple-50/50 cursor-pointer'
                  } ${errors.thumbnailUrl ? 'border-red-300 bg-red-50' : ''}`}
                >
                  {uploadingThumbnail ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm text-purple-600 font-medium">Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-10 h-10 text-purple-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-slate-600 font-medium">Click to upload thumbnail</span>
                      <span className="text-xs text-slate-400 mt-1">16:9 or 4:3 recommended • PNG, JPG up to 5MB</span>
                    </>
                  )}
                </label>
                {errors.thumbnailUrl && <p className="mt-2 text-sm text-red-600">{errors.thumbnailUrl}</p>}
              </div>
            )}
          </div>

          {/* Help Text */}
          {videoPreview && (
            <div className="flex items-start gap-3 p-4 bg-purple-100 border border-purple-200 rounded-lg">
              <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-purple-800">
                <p className="font-medium mb-1">Video testimonial active</p>
                <p className="text-purple-700">This will display as a video card with the thumbnail, play button, and optional quote excerpt.</p>
              </div>
            </div>
          )}
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
          disabled={saving || uploading || uploadingVideo || uploadingThumbnail}
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
            disabled={saving || uploading || uploadingVideo || uploadingThumbnail}
            className="px-6 py-3 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save as Draft
          </button>
          
          <button
            type="submit"
            disabled={saving || uploading || uploadingVideo || uploadingThumbnail}
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