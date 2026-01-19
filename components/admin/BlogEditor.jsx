//Q:\PROJECTS\YourZeroesAndOnes\YZO_Main\components\admin\BlogEditor.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TiptapLink from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { toastService } from '@/lib/toastConfig';

export default function BlogEditor({ initialData = null, onContentChange = () => {} }) {
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TiptapLink.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: 'Start writing your blog content here...',
      }),
    ],
    content: initialData?.content_html || '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] px-4 py-3',
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  // Upload image
  const uploadImage = useCallback(
    async (file) => {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toastService.error('Invalid file type. Allowed: JPEG, PNG, GIF, WebP');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toastService.error('File too large. Maximum size is 5MB');
        return;
      }

      setUploading(true);

      const uploadPromise = (async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'blogs');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.error || 'Failed to upload image');
        }

        const json = await res.json();

        if (!json?.url) {
          throw new Error('No URL returned from upload');
        }

        return json;
      })();

      toastService
        .promise(uploadPromise, {
          pending: 'Uploading image...',
          success: 'Image inserted successfully!',
          error: {
            render({ data }) {
              if (data instanceof Error) return data.message;
              if (typeof data === 'string') return data;
              return 'Failed to upload image';
            },
          },
        })
        .then((json) => {
          if (json?.url && editor) {
            editor.chain().focus().setImage({ src: json.url }).run();
          }
        })
        .catch((err) => {
          console.error('Upload error:', err);
        })
        .finally(() => {
          setUploading(false);
        });
    },
    [editor]
  );

  // Handle drop and paste for images
  useEffect(() => {
    if (!editor) return;

    const dom = editor.view.dom;

    const onDrop = (e) => {
      const files = Array.from(e.dataTransfer?.files || []);
      const images = files.filter(f => f.type.startsWith('image/'));
      if (!images.length) return;
      e.preventDefault();
      images.forEach(uploadImage);
    };

    const onPaste = (e) => {
      const items = e.clipboardData?.items || [];
      for (let item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) uploadImage(file);
        }
      }
    };

    dom.addEventListener('drop', onDrop);
    dom.addEventListener('paste', onPaste);

    return () => {
      dom.removeEventListener('drop', onDrop);
      dom.removeEventListener('paste', onPaste);
    };
  }, [editor, uploadImage]);

  if (!editor) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex flex-wrap gap-2">
        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
          ariaLabel="Bold"
        >
          <strong>B</strong>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
          ariaLabel="Italic"
        >
          <em>I</em>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title="Strikethrough"
          ariaLabel="Strikethrough"
        >
          <s>S</s>
        </ToolbarButton>

        <div className="w-px h-6 bg-slate-300" />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
          ariaLabel="Heading 2"
        >
          H2
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
          ariaLabel="Heading 3"
        >
          H3
        </ToolbarButton>

        <div className="w-px h-6 bg-slate-300" />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Bullet List"
          ariaLabel="Bullet list"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Numbered List"
          ariaLabel="Numbered list"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
        </ToolbarButton>

        <div className="w-px h-6 bg-slate-300" />

        {/* Block Elements */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="Quote"
          ariaLabel="Blockquote"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          title="Code Block"
          ariaLabel="Code block"
        >
          {'</>'}
        </ToolbarButton>

        <div className="w-px h-6 bg-slate-300" />

        {/* Image Upload */}
        <label
          className={`px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors flex items-center gap-2 ${
            uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          title="Insert Image"
        >
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium text-slate-600">
            {uploading ? 'Uploading...' : 'Image'}
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadImage(file);
              e.target.value = '';
            }}
            disabled={uploading}
            aria-label="Upload image"
          />
        </label>
      </div>

      {/* Editor Content Area */}
      <div className="p-6">
        <EditorContent editor={editor} />
      </div>

      {/* Helper Text */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-xs text-slate-500">
        💡 Tip: Drag & drop images, paste content, or use the toolbar above to format your content
      </div>
    </div>
  );
}

function ToolbarButton({ onClick, active, title, ariaLabel, children, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
        active
          ? 'bg-blue-600 text-white border-blue-600'
          : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}
