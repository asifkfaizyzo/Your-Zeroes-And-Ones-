// app/admin/about/timeline/create/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayoutNew from '@/components/admin/AdminLayoutNew';
import { toast } from 'react-hot-toast';

// Icon components
const Icons = {
  ArrowLeft: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  Info: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Calendar: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Eye: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Check: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Settings: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Clock: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Plus: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
};

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
    iconTheme: { primary: '#22c55e', secondary: '#fff' },
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
    iconTheme: { primary: '#ef4444', secondary: '#fff' },
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

const ICON_OPTIONS = [
  { value: 'Rocket', emoji: '🚀', label: 'Rocket' },
  { value: 'Users', emoji: '👥', label: 'Users' },
  { value: 'Award', emoji: '🏆', label: 'Award' },
  { value: 'Zap', emoji: '⚡', label: 'Zap' },
  { value: 'Target', emoji: '🎯', label: 'Target' },
  { value: 'TrendingUp', emoji: '📈', label: 'Trending Up' },
  { value: 'Star', emoji: '⭐', label: 'Star' },
  { value: 'Trophy', emoji: '🏅', label: 'Trophy' },
];

// Form Input Component
function FormInput({ label, required, hint, error, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

// Icon Selector Grid
function IconSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {ICON_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
            value === option.value
              ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/20'
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <div className="text-center">
            <span className="text-2xl block mb-1">{option.emoji}</span>
            <span className={`text-xs font-medium ${
              value === option.value ? 'text-indigo-700' : 'text-slate-600'
            }`}>
              {option.label}
            </span>
          </div>
          {value === option.value && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Icons.Check className="w-3 h-3 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

// Preview Card Component
function PreviewCard({ formData }) {
  const selectedIcon = ICON_OPTIONS.find(i => i.value === formData.icon);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-slate-200">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/25">
            {selectedIcon?.emoji || '📌'}
          </div>
          <div className="w-0.5 h-12 bg-gradient-to-b from-indigo-300 to-transparent mt-3"></div>
        </div>

        <div className="flex-1 pt-1">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-3 shadow-sm">
            <Icons.Calendar className="w-3.5 h-3.5" />
            {formData.year || '2024'}
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {formData.title || 'Your Milestone Title'}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {formData.description || 'Your milestone description will appear here.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CreateTimelinePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear().toString(),
    title: '',
    description: '',
    icon: 'Rocket',
    published: true,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleIconChange = (iconValue) => {
    setFormData(prev => ({ ...prev, icon: iconValue }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.year.trim()) {
      newErrors.year = 'Year is required';
    } else if (!/^\d{4}$/.test(formData.year)) {
      newErrors.year = 'Please enter a valid 4-digit year';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      customToast.error('Please fix the errors in the form');
      return;
    }

    setSaving(true);
    const saveToast = customToast.loading('Creating milestone...');

    try {
      const res = await fetch('/api/admin/about/timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to create timeline item');
      }

      toast.dismiss(saveToast);
      customToast.success('✅ Milestone created successfully!');
      router.push('/admin/about/timeline');
    } catch (error) {
      console.error('Create error:', error);
      toast.dismiss(saveToast);
      customToast.error('Failed to create milestone');
    } finally {
      setSaving(false);
    }
  };

  return (
     <AdminLayoutNew>
    <>
   
      {/* Header Card */}
      <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 p-4 sm:p-6">
          <div className="flex items-center gap-4">
            {/* <button
              onClick={() => router.push('/admin/about/timeline')}
              className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
              title="Back to Timeline"
            >
              <Icons.ArrowLeft className="w-5 h-5 text-slate-600" />
            </button> */}
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Icons.Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Add New Milestone</h1>
                <p className="text-slate-600 mt-1">Create a new entry for your company timeline</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b-2 border-slate-100 bg-slate-50/50">
                <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Icons.Info className="w-5 h-5 text-indigo-600" />
                  Basic Information
                </h2>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FormInput 
                    label="Year" 
                    required 
                    hint="Display year (e.g., 2024)"
                    error={errors.year}
                  >
                    <div className="relative">
                      <Icons.Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                      <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium ${
                          errors.year ? 'border-red-300 bg-red-50' : 'border-slate-200'
                        }`}
                        placeholder="2024"
                        maxLength={4}
                      />
                    </div>
                  </FormInput>

                  <div className="sm:col-span-2">
                    <FormInput label="Title" required error={errors.title}>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl text-black focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium ${
                          errors.title ? 'border-red-300 bg-red-50' : 'border-slate-200'
                        }`}
                        placeholder="e.g., Company Founded"
                      />
                    </FormInput>
                  </div>
                </div>

                <FormInput 
                  label="Description" 
                  required
                  hint={`${formData.description.length}/500 characters`}
                  error={errors.description}
                >
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    maxLength={500}
                    className={`w-full px-4 py-3 border-2 rounded-xl text-black focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none font-medium ${
                      errors.description ? 'border-red-300 bg-red-50' : 'border-slate-200'
                    }`}
                    placeholder="Describe this milestone in detail..."
                  />
                </FormInput>
              </div>
            </div>

            {/* Icon Selection Card */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b-2 border-slate-100 bg-slate-50/50">
                <h2 className="font-semibold text-black flex items-center gap-2">
                  <Icons.Sparkles className="w-5 h-5 text-indigo-600" />
                  Choose an Icon
                </h2>
              </div>
              
              <div className="p-6">
                <IconSelector value={formData.icon} onChange={handleIconChange} />
              </div>
            </div>

            {/* Publish Settings Card */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b-2 border-slate-100 bg-slate-50/50">
                <h2 className="font-semibold text-black flex items-center gap-2">
                  <Icons.Settings className="w-5 h-5 text-indigo-600" />
                  Publish Settings
                </h2>
              </div>
              
              <div className="p-6">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center pt-0.5">
                    <input
                      type="checkbox"
                      name="published"
                      checked={formData.published}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="w-12 h-7 bg-slate-200 peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600 after:shadow-md border-2 border-slate-200 peer-checked:border-indigo-600"></div>
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      Publish immediately
                    </span>
                    <p className="text-sm text-slate-500 mt-0.5">
                      When enabled, this milestone will be visible on your About page right away.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar - Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Live Preview Card */}
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-indigo-200 shadow-lg overflow-hidden">
                <div className="px-5 py-3 border-b-2 border-indigo-200 bg-white/60 backdrop-blur-sm">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-sm">
                    <Icons.Eye className="w-4 h-4 text-indigo-600" />
                    Live Preview
                  </h3>
                </div>
                
                <div className="p-5">
                  <PreviewCard formData={formData} />
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-amber-50 rounded-2xl border-2 border-amber-200 p-5 shadow-lg">
                <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <span className="text-lg">💡</span>
                  Tips for Great Milestones
                </h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    Use action-oriented titles
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    Keep descriptions concise
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    Choose matching icons
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar - NOT FIXED */}
        <div className="mt-8 bg-white rounded-2xl border-2 border-slate-200 p-4 sm:p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <Icons.Clock className="w-4 h-4" />
              <span>Changes are not saved automatically</span>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => router.push('/admin/about/timeline')}
                className="flex-1 sm:flex-none px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-400 font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Icons.Check className="w-5 h-5" />
                    Create Milestone
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
    </AdminLayoutNew>
  );
}