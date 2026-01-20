// components/admin/blog-editor/BubbleMenu/YouTubeMenu.jsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { NodeSelection } from '@tiptap/pm/state';

export default function YouTubeMenu({ editor }) {
  const [isVisible, setIsVisible] = useState(false);
  const [attrs, setAttrs] = useState({ width: 640, alignment: 'center', caption: '' });
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  // Check if YouTube node is selected
  const checkYouTubeSelection = useCallback(() => {
    if (!editor) return false;

    const { state } = editor;
    const { selection } = state;

    // Method 1: NodeSelection
    if (selection instanceof NodeSelection) {
      const node = selection.node;
      if (node?.type.name === 'youtube') {
        return true;
      }
    }

    // Method 2: isActive
    if (editor.isActive('youtube')) {
      return true;
    }

    // Method 3: Check node at position
    try {
      const { from } = selection;
      const node = state.doc.nodeAt(from);
      if (node?.type.name === 'youtube') {
        return true;
      }
    } catch (e) {
      // Ignore
    }

    return false;
  }, [editor]);

  // Get YouTube attributes
  const getYouTubeAttrs = useCallback(() => {
    if (!editor) return null;

    const { state } = editor;
    const { selection } = state;

    if (selection instanceof NodeSelection && selection.node?.type.name === 'youtube') {
      return selection.node.attrs;
    }

    return editor.getAttributes('youtube');
  }, [editor]);

  // Sync state
  const syncState = useCallback(() => {
    if (!editor) return;
    
    const isSelected = checkYouTubeSelection();
    setIsVisible(isSelected);
    
    if (isSelected) {
      const videoAttrs = getYouTubeAttrs();
      if (videoAttrs) {
        setAttrs({
          width: videoAttrs.width ? String(videoAttrs.width) : '640',
          alignment: videoAttrs.alignment || 'center',
          caption: videoAttrs.caption || '',
        });
      }

      // Get position
      try {
        const { view, state } = editor;
        const { from } = state.selection;
        
        let domNode = view.nodeDOM(from);
        
        if (domNode) {
          const wrapper = domNode.classList?.contains('video-wrapper') 
            ? domNode 
            : domNode.closest('.video-wrapper');
            
          if (wrapper) {
            const rect = wrapper.getBoundingClientRect();
            const editorContainer = view.dom.closest('.overflow-y-auto') || view.dom.parentElement;
            const editorRect = editorContainer?.getBoundingClientRect() || view.dom.getBoundingClientRect();
            
            setPosition({
              top: rect.top - editorRect.top + (editorContainer?.scrollTop || 0) - 60,
              left: rect.left - editorRect.left,
              width: rect.width,
            });
          }
        }
      } catch (e) {
        console.log('Position error:', e);
      }
    }
  }, [editor, checkYouTubeSelection, getYouTubeAttrs]);

  useEffect(() => {
    if (!editor) return;
    
    syncState();
    
    editor.on('selectionUpdate', syncState);
    editor.on('transaction', syncState);
    
    return () => {
      editor.off('selectionUpdate', syncState);
      editor.off('transaction', syncState);
    };
  }, [editor, syncState]);

  // Update video attributes
  const updateVideo = useCallback((newAttrs) => {
    if (!editor) return;
    
    const updates = {};
    
    if (newAttrs.alignment !== undefined) {
      updates.alignment = newAttrs.alignment;
    }
    if (newAttrs.width !== undefined) {
      updates.width = newAttrs.width === '' ? 640 : parseInt(newAttrs.width) || 640;
    }
    if (newAttrs.caption !== undefined) {
      updates.caption = newAttrs.caption;
    }
    
    if (Object.keys(updates).length > 0) {
      editor.chain().focus().updateAttributes('youtube', updates).run();
    }
  }, [editor]);

  // Handlers
  const handleAlignment = (align) => {
    setAttrs(prev => ({ ...prev, alignment: align }));
    updateVideo({ alignment: align });
  };

  const handleWidthChange = (value) => {
    setAttrs(prev => ({ ...prev, width: value }));
  };

  const applyWidth = () => {
    updateVideo({ width: attrs.width });
  };

  const handleCaptionChange = (value) => {
    setAttrs(prev => ({ ...prev, caption: value }));
  };

  const applyCaption = () => {
    updateVideo({ caption: attrs.caption });
  };

  const setWidthPreset = (w) => {
    setAttrs(prev => ({ ...prev, width: String(w) }));
    updateVideo({ width: w });
  };

  const deleteVideo = () => {
    editor?.chain().focus().deleteSelection().run();
  };

  const handleKeyDown = (e, applyFn) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyFn();
      e.target.blur();
    }
    if (e.key === 'Escape') {
      e.target.blur();
    }
  };

  if (!editor || !isVisible) return null;

  return (
    <div 
      className="absolute z-50 left-0 right-0 flex justify-center pointer-events-none"
      style={{ top: `${Math.max(10, position.top)}px` }}
    >
      <div className="pointer-events-auto bg-white rounded-lg shadow-xl border border-slate-200 p-2 flex items-center gap-2 flex-wrap max-w-[560px]">
        
        {/* Video Type Badge */}
        <div className="flex items-center gap-1.5 px-2 py-1 bg-red-50 rounded-md">
          <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span className="text-xs font-medium text-red-700">Video</span>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Alignment Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          {[
            { value: 'left', label: 'Left', icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h16" />
              </svg>
            )},
            { value: 'center', label: 'Center', icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" />
              </svg>
            )},
            { value: 'right', label: 'Right', icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M12 12h8M4 18h16" />
              </svg>
            )},
          ].map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => handleAlignment(value)}
              title={`Align ${label}`}
              className={`p-1.5 rounded transition-all ${
                attrs.alignment === value
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Width Input */}
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={attrs.width}
            onChange={(e) => handleWidthChange(e.target.value)}
            onBlur={applyWidth}
            onKeyDown={(e) => handleKeyDown(e, applyWidth)}
            placeholder="640"
            min="200"
            max="1200"
            className="w-16 px-2 py-1 text-xs border border-slate-200 rounded text-slate-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <span className="text-xs text-slate-400">px</span>
        </div>

        {/* Width Presets */}
        <div className="flex items-center gap-0.5">
          {[
            { label: 'S', value: 400, title: '400px (Small)' },
            { label: 'M', value: 560, title: '560px (Medium)' },
            { label: 'L', value: 720, title: '720px (Large)' },
            { label: 'XL', value: 900, title: '900px (Extra Large)' },
          ].map(({ label, value, title }) => (
            <button
              key={label}
              onClick={() => setWidthPreset(value)}
              className={`px-1.5 py-1 text-xs rounded transition-all ${
                parseInt(attrs.width) === value
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
              title={title}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Caption Input */}
        <input
          type="text"
          value={attrs.caption}
          onChange={(e) => handleCaptionChange(e.target.value)}
          onBlur={applyCaption}
          onKeyDown={(e) => handleKeyDown(e, applyCaption)}
          placeholder="Add caption..."
          className="w-28 px-2 py-1 text-xs border border-slate-200 rounded text-slate-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Delete Button */}
        <button
          onClick={deleteVideo}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
          title="Delete video"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}