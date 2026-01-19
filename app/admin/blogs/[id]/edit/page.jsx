'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayoutNew from '@/components/admin/AdminLayoutNew';
import BlogEditorWrapper from '@/components/admin/BlogEditorWrapper';
import Link from 'next/link';
import { toastService } from '@/lib/toastConfig';

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchBlog = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/blogs/${params.id}`);
      
      if (res.status === 404) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to fetch blog');
      }
      
      const data = await res.json();
      setBlog(data);
    } catch (err) {
      console.error('Fetch error:', err);
      toastService.error(err.message || 'Failed to load blog');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      fetchBlog();
    }
  }, [params.id, fetchBlog]);

  const handleDelete = async () => {
    setDeleting(true);

    const deletePromise = (async () => {
      const res = await fetch(`/api/admin/blogs/${params.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to delete blog');
      }

      return await res.json();
    })();

    toastService.promise(deletePromise, {
      pending: 'Deleting blog...',
      success: 'Blog deleted successfully!',
      error: {
        render({ data }) {
          if (data instanceof Error) return data.message;
          if (typeof data === 'string') return data;
          return 'Failed to delete blog';
        },
      },
    })
      .then(() => {
        router.push('/admin/blogs');
      })
      .catch((err) => {
        console.error('Delete error:', err);
        setDeleting(false);
        setDeleteConfirm(false);
      });
  };

  if (loading) {
    return (
      <AdminLayoutNew>
        <div className="flex items-center justify-center py-32">
          <div className="inline-flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-slate-600">Loading blog...</span>
          </div>
        </div>
      </AdminLayoutNew>
    );
  }

  if (notFound) {
    return (
      <AdminLayoutNew>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-32">
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
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Blog Not Found</h2>
              <p className="text-slate-600 mb-6">
                The blog you're looking for doesn't exist or has been deleted.
              </p>
              <Link
                href="/admin/blogs"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Blogs
              </Link>
            </div>
          </div>
        </div>
      </AdminLayoutNew>
    );
  }

  return (
    <AdminLayoutNew>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link href="/admin/blogs" className="hover:text-slate-700 transition-colors">
              Blogs
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-900 truncate max-w-[200px]">{blog?.title || 'Edit Blog'}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Edit Blog</h1>
              <p className="text-slate-600 mt-1">Update your blog post content and settings</p>
            </div>
            <button
              type="button"
              onClick={() => setDeleteConfirm(true)}
              aria-label="Delete blog"
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-red-600 border border-red-200 rounded-lg font-medium hover:bg-red-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="hidden sm:inline">Delete Blog</span>
              <span className="sm:hidden">Delete</span>
            </button>
          </div>
        </div>

        {/* Editor */}
        {blog && <BlogEditorWrapper initialData={blog} isEdit={true} blogId={params.id} />}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
          onClick={() => !deleting && setDeleteConfirm(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 transform transition-all duration-200 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mx-auto mb-5">
              <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 text-center mb-2">Delete Blog</h3>
            <p className="text-slate-500 text-center mb-6 text-sm">
              Are you sure you want to delete this blog? This action cannot be undone.
            </p>
            
            {/* Blog preview */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200">
              <p className="font-medium text-slate-800 text-sm line-clamp-1">
                {blog?.title}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {blog?.slug}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayoutNew>
  );
}
