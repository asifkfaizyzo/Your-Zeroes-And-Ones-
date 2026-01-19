// app/admin/testimonials/create/page.jsx
'use client';

import AdminLayoutNew from '@/components/admin/AdminLayoutNew';
import TestimonialEditor from '@/components/admin/TestimonialEditor';
import Link from 'next/link';

export default function CreateTestimonialPage() {
  return (
    <AdminLayoutNew>
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link href="/admin/testimonials" className="hover:text-slate-700 transition-colors">
              Testimonials
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-900">Create New</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Create New Testimonial</h1>
            <p className="text-slate-600 mt-1">Add a new client testimonial or review</p>
          </div>
        </div>

        {/* Editor */}
        <TestimonialEditor />
      </div>
    </AdminLayoutNew>
  );
}
