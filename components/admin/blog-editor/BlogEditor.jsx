// components/admin/blog-editor/BlogEditor.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapLink from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import TextAlign from '@tiptap/extension-text-align'; 
import { toastService } from '@/lib/toastConfig';

// Import our custom components
import RibbonToolbar from './Toolbar/RibbonToolbar';
import SelectionMenu from './BubbleMenu/SelectionMenu';
import ImageMenu from './BubbleMenu/ImageMenu';
import YouTubeMenu from './BubbleMenu/YouTubeMenu';
import DocumentOutline from './Sidebar/DocumentOutline';
import ContentPreview from './Preview/ContentPreview';
import { useEditorStats } from './hooks/useEditorStats';
import { ImageExtension } from './extensions/ImageExtension';
import { YouTubeExtension } from './extensions/YouTubeExtension';

export default function BlogEditor({ initialData = null, onContentChange = () => {} }) {
  const [uploading, setUploading] = useState(false);
  
  // View mode state
  const [viewMode, setViewMode] = useState('edit');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOutline, setShowOutline] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      TiptapLink.configure({ 
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog content here...',
      }),
      Underline,
      CharacterCount,
      YouTubeExtension,
    ],
    content: initialData?.content_html || '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] px-6 py-4',
      },
      handleKeyDown: (view, event) => {
        if (event.key === 'Tab') {
          const { state } = view;
          const { $from } = state.selection;
          
          const listItem = $from.node(-1);
          if (listItem?.type.name === 'listItem') {
            event.preventDefault();
            
            if (event.shiftKey) {
              editor.chain().focus().liftListItem('listItem').run();
            } else {
              editor.chain().focus().sinkListItem('listItem').run();
            }
            return true;
          }
        }
        return false;
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  // Get editor stats
  const stats = useEditorStats(editor);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F11') {
        e.preventDefault();
        setIsFullscreen(prev => !prev);
      }
      
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
      
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setViewMode(prev => prev === 'preview' ? 'edit' : 'preview');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Handle body scroll lock in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Upload image
  const uploadImage = useCallback(
    async (file) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toastService.error('Invalid file type. Allowed: JPEG, PNG, GIF, WebP');
        return;
      }

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
            editor.chain().focus().setImage({ 
              src: json.url,
              alignment: 'center',
            }).run();
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
      <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-slate-200">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          <span className="text-sm text-slate-500">Loading editor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 ${
      isFullscreen 
        ? 'fixed inset-0 z-50 rounded-none flex flex-col' 
        : ''
    }`}>
      {/* Ribbon Toolbar */}
      <RibbonToolbar 
        editor={editor}
        stats={stats}
        onImageUpload={uploadImage}
        uploading={uploading}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isFullscreen={isFullscreen}
        onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
        showOutline={showOutline}
        onOutlineToggle={() => setShowOutline(!showOutline)}
      />

      {/* Selection Menu - This one can stay outside */}
      <SelectionMenu editor={editor} />

      {/* Main Content Area */}
      <div className={`flex ${isFullscreen ? 'flex-1 overflow-hidden' : ''}`}>
        {/* Document Outline Sidebar */}
        <DocumentOutline 
          editor={editor} 
          isVisible={showOutline} 
          onClose={() => setShowOutline(false)}
        />

        {/* Editor/Preview Area */}
        <div className={`flex-1 flex ${isFullscreen ? 'overflow-hidden' : ''}`}>
          {/* Editor */}
          <div className={`relative transition-all duration-300 ${
            viewMode === 'preview' 
              ? 'hidden' 
              : viewMode === 'split' 
                ? 'w-1/2 border-r border-slate-200' 
                : 'w-full'
          } ${isFullscreen ? 'overflow-y-auto' : ''}`}>
            {/* Image & YouTube menus INSIDE the editor container */}
            <ImageMenu editor={editor} />
            <YouTubeMenu editor={editor} />
            
            <EditorContent 
              editor={editor} 
              className={`${isFullscreen ? 'min-h-full' : 'min-h-[500px] max-h-[70vh] overflow-y-auto'}`}
            />
          </div>

          {/* Preview */}
          <div className={`transition-all duration-300 bg-white ${
            viewMode === 'edit' 
              ? 'hidden' 
              : viewMode === 'split' 
                ? 'w-1/2' 
                : 'w-full'
          } ${isFullscreen ? 'overflow-y-auto' : 'min-h-[500px] max-h-[70vh] overflow-y-auto'}`}>
            <ContentPreview editor={editor} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${
              viewMode === 'edit' ? 'bg-blue-500' : 
              viewMode === 'preview' ? 'bg-green-500' : 
              'bg-purple-500'
            }`}></span>
            <span className="font-medium capitalize">{viewMode} Mode</span>
          </div>

          <span className="text-slate-300">|</span>

          <span>
            <span className="font-medium">Tip:</span> Select text for formatting • Click images/videos to edit • 
            <kbd className="mx-1 px-1 py-0.5 bg-slate-200 rounded text-[10px] font-mono">F11</kbd> 
            for fullscreen
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>{stats.characters.toLocaleString()} chars</span>
          <span>•</span>
          <span>{stats.words.toLocaleString()} words</span>
          <span>•</span>
          <span>{stats.readingTime}</span>
        </div>
      </div>
    </div>
  );
}