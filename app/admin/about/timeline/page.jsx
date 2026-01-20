// app/admin/about/timeline/page.jsx
'use client';

import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import AdminLayoutNew from '@/components/admin/AdminLayoutNew';

// Icon components for cleaner code
const Icons = {
  ArrowLeft: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
  Check: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Warning: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Edit: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Trash: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Eye: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  EyeOff: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ),
  Calendar: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  X: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  AlertTriangle: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Grip: ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <circle cx="9" cy="6" r="1.5" />
      <circle cx="15" cy="6" r="1.5" />
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="9" cy="18" r="1.5" />
      <circle cx="15" cy="18" r="1.5" />
    </svg>
  ),
  Sparkles: ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

// Icon mapping for display
const iconMap = {
  Rocket: '🚀',
  Users: '👥',
  Award: '🏆',
  Zap: '⚡',
  Target: '🎯',
  TrendingUp: '📈',
  Star: '⭐',
  Trophy: '🏅',
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

// Horizontal Slide Panel Component
function SlidePanel({ isOpen, onClose, title, children }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-2xl">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                      <Dialog.Title className="text-lg font-semibold text-slate-900">
                        {title}
                      </Dialog.Title>
                      <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Icons.X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

// Delete Confirmation Panel Content
function DeleteConfirmation({ item, onConfirm, onCancel, isLoading }) {
  return (
    <div className="p-6">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icons.AlertTriangle className="w-8 h-8 text-red-600" />
      </div>

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Timeline Item</h3>
        <p className="text-slate-600">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
      </div>

      {item && (
        <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{iconMap[item.icon] || '📌'}</span>
            <div>
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="text-sm text-slate-500">{item.year}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <Icons.Trash className="w-4 h-4" />
              Delete Item
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Stats Card Component
function StatCard({ icon: Icon, label, value, color, bgGradient }) {
  return (
    <div className="relative overflow-hidden bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgGradient} flex items-center justify-center text-white shadow-lg`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${bgGradient} opacity-5 rounded-full group-hover:opacity-10 transition-opacity`} />
    </div>
  );
}

// Timeline Item Row Component
function TimelineItemRow({ item, onDelete, onTogglePublish }) {
  return (
    <tr className="group hover:bg-slate-50/80 transition-colors">
      <td className="py-4 pl-4 pr-2">
        <div className="flex items-center gap-2">
          <button className="p-1 text-slate-300 hover:text-slate-500 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity">
            <Icons.Grip className="w-4 h-4" />
          </button>
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm">
            {item.position}
          </div>
        </div>
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-2 text-slate-600">
          <Icons.Calendar className="w-4 h-4 text-slate-400" />
          <span className="font-semibold">{item.year}</span>
        </div>
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xl">
            {iconMap[item.icon] || '📌'}
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-slate-900 truncate max-w-xs">{item.title}</h4>
            <p className="text-sm text-slate-500 truncate max-w-xs">{item.description}</p>
          </div>
        </div>
      </td>

      <td className="py-4 px-4">
        <button
          onClick={() => onTogglePublish(item.id, item.published)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            item.published
              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${item.published ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          {item.published ? 'Published' : 'Draft'}
        </button>
      </td>

      <td className="py-4 px-4">
        <span className="text-sm text-slate-500">
          {new Date(item.updatedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </td>

      <td className="py-4 pl-4 pr-6">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => onTogglePublish(item.id, item.published)}
            className={`p-2 rounded-lg transition-all ${
              item.published
                ? 'text-emerald-600 hover:bg-emerald-100'
                : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
            }`}
            title={item.published ? 'Unpublish' : 'Publish'}
          >
            {item.published ? <Icons.Eye className="w-4 h-4" /> : <Icons.EyeOff className="w-4 h-4" />}
          </button>

          <Link
            href={`/admin/about/timeline/${item.id}/edit`}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Edit"
          >
            <Icons.Edit className="w-4 h-4" />
          </Link>

          <button
            onClick={() => onDelete(item)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Delete"
          >
            <Icons.Trash className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Icons.Clock className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">No Timeline Items Yet</h3>
      <p className="text-slate-500 mb-8 max-w-sm mx-auto">
        Start building your company's story by adding your first milestone.
      </p>
      <Link
        href="/admin/about/timeline/create"
        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        <Icons.Plus className="w-5 h-5" />
        Add First Milestone
      </Link>
    </div>
  );
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <AdminLayoutNew>
      <div className="min-h-screen">
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-200 rounded-xl animate-pulse" />
            <div>
              <div className="w-48 h-7 bg-slate-200 rounded-lg animate-pulse mb-2" />
              <div className="w-32 h-4 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse">
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-16 h-4 bg-slate-200 rounded mb-2" />
                  <div className="w-12 h-8 bg-slate-200 rounded" />
                </div>
                <div className="w-12 h-12 bg-slate-200 rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <div className="w-24 h-4 bg-slate-200 rounded animate-pulse" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-slate-100">
              <div className="w-9 h-9 bg-slate-200 rounded-lg animate-pulse" />
              <div className="w-16 h-4 bg-slate-200 rounded animate-pulse" />
              <div className="flex-1">
                <div className="w-48 h-4 bg-slate-200 rounded animate-pulse mb-2" />
                <div className="w-64 h-3 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="w-20 h-6 bg-slate-200 rounded-full animate-pulse" />
              <div className="w-24 h-4 bg-slate-200 rounded animate-pulse" />
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse" />
                <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse" />
                <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayoutNew>
  );
}

// Main Page Component
export default function TimelinePage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/admin/about/timeline');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      } else {
        customToast.error('Failed to load timeline items');
      }
    } catch (error) {
      console.error('Error fetching timeline:', error);
      customToast.error('Failed to load timeline items');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;

    setDeleting(true);
    const deleteToast = customToast.loading('Deleting timeline item...');

    try {
      const res = await fetch(`/api/admin/about/timeline/${deleteItem.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.dismiss(deleteToast);
        customToast.success('✅ Timeline item deleted successfully!');
        setItems(items.filter((item) => item.id !== deleteItem.id));
        setDeleteItem(null);
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.dismiss(deleteToast);
      customToast.error('Failed to delete timeline item');
    } finally {
      setDeleting(false);
    }
  };

  const togglePublished = async (id, currentStatus) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const updateToast = customToast.loading('Updating status...');

    try {
      const res = await fetch(`/api/admin/about/timeline/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...item,
          published: !currentStatus,
        }),
      });

      if (res.ok) {
        toast.dismiss(updateToast);
        customToast.success(currentStatus ? '✅ Item unpublished!' : '✅ Item published!');
        fetchItems();
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.dismiss(updateToast);
      customToast.error('Failed to update status');
    }
  };

  const stats = [
    {
      icon: Icons.Clock,
      label: 'Total Items',
      value: items.length,
      bgGradient: 'from-blue-500 to-blue-600',
    },
    {
      icon: Icons.Check,
      label: 'Published',
      value: items.filter((i) => i.published).length,
      bgGradient: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Icons.Warning,
      label: 'Drafts',
      value: items.filter((i) => !i.published).length,
      bgGradient: 'from-slate-500 to-slate-600',
    },
  ];

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <AdminLayoutNew>
      <div className="min-h-screen">
        {/* Page Header */}
        <div className="mb-8 mt-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                title="Back to Dashboard"
              >
                <Icons.ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Timeline Management</h1>
                <p className="text-slate-600 mt-1 text-sm sm:text-base">Manage your company milestones</p>
              </div>
            </div>
            <Link
              href="/admin/about/timeline/create"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 text-sm sm:text-base"
            >
              <Icons.Plus className="w-5 h-5" />
              Add Milestone
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        {items.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                bgGradient={stat.bgGradient}
              />
            ))}
          </div>
        )}

        {/* Timeline Items Table */}
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Icons.Clock className="w-5 h-5 text-blue-600" />
                  All Milestones
                </h2>
                <span className="text-sm text-slate-500 font-medium">{items.length} items</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="py-3 pl-4 pr-2 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Year</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Milestone</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Updated</th>
                    <th className="py-3 pl-4 pr-6 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <TimelineItemRow
                      key={item.id}
                      item={item}
                      onDelete={(item) => setDeleteItem(item)}
                      onTogglePublish={togglePublished}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Delete Confirmation Slide Panel */}
        <SlidePanel isOpen={!!deleteItem} onClose={() => setDeleteItem(null)} title="Confirm Deletion">
          <DeleteConfirmation
            item={deleteItem}
            onConfirm={handleDelete}
            onCancel={() => setDeleteItem(null)}
            isLoading={deleting}
          />
        </SlidePanel>
      </div>
    </AdminLayoutNew>
  );
}