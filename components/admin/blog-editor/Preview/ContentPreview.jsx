// components/admin/blog-editor/Preview/ContentPreview.jsx
'use client';

import { useEffect, useState } from 'react';

export default function ContentPreview({ editor, className = '' }) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (!editor) return;

    const updateHtml = () => {
      setHtml(editor.getHTML());
    };

    // Initial update
    updateHtml();

    // Listen to editor updates
    editor.on('update', updateHtml);

    return () => {
      editor.off('update', updateHtml);
    };
  }, [editor]);

  if (!editor) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-pulse w-8 h-8 rounded-full bg-slate-200"></div>
          <span className="text-sm">Loading preview...</span>
        </div>
      </div>
    );
  }

  if (!html || html === '<p></p>') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-8 py-12">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-6 shadow-inner">
          <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <p className="text-base font-semibold text-slate-600 mb-2">Nothing to preview yet</p>
        <p className="text-sm text-slate-400 max-w-xs">
          Start writing in the editor to see a live preview of your content here
        </p>
      </div>
    );
  }

  return (
    <div className={`h-full overflow-y-auto bg-white ${className}`}>
      <div className="max-w-3xl mx-auto px-8 py-6">
        {/* Preview Header */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">Live Preview</span>
          </div>
        </div>

        {/* Rendered Content with proper styling */}
        <article 
          className="content-preview"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        
        {/* Footer spacing */}
        <div className="h-12"></div>
      </div>
    </div>
  );
}