// app/admin/about/content/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AdminLayoutNew from '@/components/admin/AdminLayoutNew';
import { toast } from 'react-hot-toast';
import { 
  Camera, 
  FileText, 
  BarChart3, 
  Eye, 
  Save, 
  X, 
  Upload, 
  Trash2,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Monitor,
  AlertCircle,
  Video
} from 'lucide-react';

// Icon options for stats
const STAT_ICONS = [
  { value: 'CheckCircle', label: '✓ Check Circle', color: 'text-green-600' },
  { value: 'Calendar', label: '📅 Calendar', color: 'text-blue-600' },
  { value: 'Users', label: '👥 Users', color: 'text-purple-600' },
  { value: 'Clock', label: '⏰ Clock', color: 'text-orange-600' },
  { value: 'Award', label: '🏆 Award', color: 'text-yellow-600' },
  { value: 'Briefcase', label: '💼 Briefcase', color: 'text-indigo-600' },
  { value: 'Heart', label: '❤️ Heart', color: 'text-red-600' },
  { value: 'Shield', label: '🛡️ Shield', color: 'text-cyan-600' },
  { value: 'Star', label: '⭐ Star', color: 'text-amber-600' },
  { value: 'Target', label: '🎯 Target', color: 'text-pink-600' },
];

// Custom toast styles
const customToast = {
  success: (message) => toast.success(message, {
    duration: 4000,
    style: {
      background: '#fff',
      color: '#000',
      padding: '16px',
      borderRadius: '12px',
      border: '2px solid #22c55e',
      fontWeight: '600',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    },
    iconTheme: {
      primary: '#22c55e',
      secondary: '#fff',
    },
  }),
  error: (message) => toast.error(message, {
    duration: 4000,
    style: {
      background: '#fff',
      color: '#000',
      padding: '16px',
      borderRadius: '12px',
      border: '2px solid #ef4444',
      fontWeight: '600',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    },
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
  }),
  loading: (message) => toast.loading(message, {
    style: {
      background: '#fff',
      color: '#000',
      padding: '16px',
      borderRadius: '12px',
      border: '2px solid #3b82f6',
      fontWeight: '600',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    },
  }),
};

export default function AboutContentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  const [formData, setFormData] = useState({
    badge: 'Who We Are',
    title: 'Crafting Digital',
    highlightedText: 'Excellence',
    paragraph1: '',
    paragraph2: '',
    media: '',
    mediaType: 'image',
    published: true,
    stats: [
      { value: '50+', label: 'Projects Completed', icon: 'CheckCircle' },
      { value: '15+', label: 'Years Experience', icon: 'Calendar' },
      { value: '30+', label: 'Happy Clients', icon: 'Users' },
      { value: '24/7', label: 'Support', icon: 'Clock' },
    ],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/admin/about/content');
      if (res.ok) {
        const data = await res.json();
        const contentData = {
          badge: data.badge || 'Who We Are',
          title: data.title || 'Crafting Digital',
          highlightedText: data.highlightedText || 'Excellence',
          paragraph1: data.paragraph1 || '',
          paragraph2: data.paragraph2 || '',
          media: data.media || '',
          mediaType: data.mediaType || 'image',
          published: data.published !== undefined ? data.published : true,
          stats: Array.isArray(data.stats) ? data.stats : [
            { value: '50+', label: 'Projects Completed', icon: 'CheckCircle' },
            { value: '15+', label: 'Years Experience', icon: 'Calendar' },
            { value: '30+', label: 'Happy Clients', icon: 'Users' },
            { value: '24/7', label: 'Support', icon: 'Clock' },
          ],
        };
        setFormData(contentData);
        setOriginalData(JSON.parse(JSON.stringify(contentData)));
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      customToast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = () => {
    if (!originalData) return false;
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData(prev => ({ ...prev, stats: newStats }));
  };

  // ✅ UPDATED handleFileUpload with video support
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Allowed types (images + videos)
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
    const allValidTypes = [...validImageTypes, ...validVideoTypes];

    if (!allValidTypes.includes(file.type)) {
      customToast.error('Invalid file type. Please upload an image or video.');
      return;
    }

    // Different size limits
    const isVideo = validVideoTypes.includes(file.type);
    const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024; // 50MB video, 5MB image
    
    if (file.size > maxSize) {
      const maxMB = maxSize / 1024 / 1024;
      customToast.error(`File size must be less than ${maxMB}MB for ${isVideo ? 'videos' : 'images'}`);
      return;
    }

    setUploading(true);
    const uploadToast = customToast.loading(`Uploading ${isVideo ? 'video' : 'image'}...`);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('section', 'about');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      if (!data.url) {
        throw new Error('No URL returned from upload');
      }
      
      setFormData(prev => ({
        ...prev,
        media: data.url,
        mediaType: isVideo ? 'video' : 'image'
      }));

      toast.dismiss(uploadToast);
      customToast.success(`${isVideo ? 'Video' : 'Image'} uploaded successfully!`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.dismiss(uploadToast);
      customToast.error(error.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveMedia = () => {
    setFormData(prev => ({ ...prev, media: '', mediaType: 'image' }));
    customToast.success('Media removed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.paragraph1 || !formData.paragraph2) {
      customToast.error('Please fill in all required fields');
      return;
    }

    const invalidStat = formData.stats.find(stat => !stat.value || !stat.label || !stat.icon);
    if (invalidStat) {
      customToast.error('Please fill in all stat fields');
      return;
    }

    setSaving(true);
    const saveToast = customToast.loading('Saving changes...');

    try {
      const res = await fetch('/api/admin/about/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get('content-type');
      let data = null;
      
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      }

      if (!res.ok) {
        const errorMessage = data?.error || data?.details || `Server error: ${res.status}`;
        throw new Error(errorMessage);
      }

      toast.dismiss(saveToast);
      customToast.success('✅ Content updated successfully!');
      
      setOriginalData(JSON.parse(JSON.stringify(formData)));
      
      setTimeout(() => fetchContent(), 500);
    } catch (error) {
      console.error('Save error:', error);
      toast.dismiss(saveToast);
      customToast.error(error.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayoutNew>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-700 font-medium">Loading content...</p>
          </div>
        </div>
      </AdminLayoutNew>
    );
  }

  const changesDetected = hasChanges();

  return (
    <AdminLayoutNew>
      <div className="min-h-screen">
        {/* Page Header */}
        <div className="mb-8 mt-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Who We Are Section</h1>
                <p className="text-slate-600 mt-1 text-sm sm:text-base">Manage your About page content</p>
              </div>
            </div>

            {/* Publish Toggle */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-slate-200 rounded-full peer-checked:bg-green-500 transition-colors"></div>
                <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-6"></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">Published</span>
                  {formData.published ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>
            </label>
          </div>

          {/* Changes Indicator */}
          {changesDetected && (
            <div className="mt-4 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-900">You have unsaved changes</span>
            </div>
          )}
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            {/* LEFT COLUMN - Form Fields */}
            <div className="space-y-6">
              
              {/* Badge & Title */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Header Content</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      name="badge"
                      value={formData.badge}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900"
                      placeholder="Who We Are"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Main Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900"
                        placeholder="Crafting Digital"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Highlighted Text
                      </label>
                      <input
                        type="text"
                        name="highlightedText"
                        value={formData.highlightedText}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900"
                        placeholder="Excellence"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Description</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Paragraph 1 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="paragraph1"
                      value={formData.paragraph1}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-slate-900"
                      placeholder="Describe your company..."
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1">{formData.paragraph1.length} characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Paragraph 2 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="paragraph2"
                      value={formData.paragraph2}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-slate-900"
                      placeholder="Add more details..."
                      required
                    />
                    <p className="text-xs text-slate-500 mt-1">{formData.paragraph2.length} characters</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN - Media & Preview */}
            <div className="space-y-6">
              
              {/* ✅ UPDATED Media Upload Section with Video Support */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    {formData.mediaType === 'video' ? (
                      <Video className="w-5 h-5 text-green-600" />
                    ) : (
                      <Camera className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Featured Media</h2>
                  {formData.media && (
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      formData.mediaType === 'video' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {formData.mediaType === 'video' ? 'VIDEO' : 'IMAGE'}
                    </span>
                  )}
                </div>

                {formData.media ? (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden bg-slate-100 border-2 border-slate-200">
                      {formData.mediaType === 'video' ? (
                        <video
                          src={formData.media}
                          controls
                          className="w-full h-96 object-cover"
                        />
                      ) : (
                        <div className="relative w-full h-96">
                          <Image
                            src={formData.media}
                            alt="Featured media"
                            fill
                            priority
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={handleRemoveMedia}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                      <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold cursor-pointer">
                        <Upload className="w-4 h-4" />
                        Replace
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml,video/mp4,video/webm,video/ogg,video/quicktime"
                          onChange={handleFileUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all bg-slate-50">
                      {uploading ? (
                        <div className="flex flex-col items-center gap-3">
                          <div className="relative w-12 h-12">
                            <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-pulse"></div>
                            <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
                          </div>
                          <p className="text-slate-700 font-semibold">Uploading...</p>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                          <p className="text-slate-700 font-semibold mb-1">Upload Image or Video</p>
                          <p className="text-xs text-slate-500">
                            Images: JPEG, PNG, GIF, WebP, SVG (max 5MB)
                          </p>
                          <p className="text-xs text-slate-500">
                            Videos: MP4, WebM, OGG, MOV (max 50MB)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml,video/mp4,video/webm,video/ogg,video/quicktime"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                )}

                {/* Preview Badge */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-bold text-slate-900">Live Preview</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Changes will appear on the About page once saved
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Action Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {changesDetected ? (
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-semibold">You have unsaved changes</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-semibold">All changes saved</span>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.push('/admin/dashboard')}
                  className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading || !changesDetected}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-blue-600 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  title={!changesDetected ? 'No changes to save' : ''}
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : !changesDetected ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      No Changes
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

      </div>
    </AdminLayoutNew>
  );
}