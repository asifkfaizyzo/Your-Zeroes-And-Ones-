// components/admin/blog-editor/BubbleMenu/ImageMenu.jsx
'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { NodeSelection } from '@tiptap/pm/state';

export default function ImageMenu({ editor }) {
  const [isVisible, setIsVisible] = useState(false);
  const [attrs, setAttrs] = useState({ width: '', alignment: 'center', caption: '' });
  const [menuPosition, setMenuPosition] = useState({ top: 0 });
  const menuRef = useRef(null);

  // Check if an image is currently selected
  const getSelectedImage = useCallback(() => {
    if (!editor) return null;

    const { state } = editor;
    const { selection } = state;

    // Check NodeSelection
    if (selection instanceof NodeSelection && selection.node?.type.name === 'image') {
      return { node: selection.node, pos: selection.from };
    }

    // Check if cursor is on an image node
    try {
      const node = state.doc.nodeAt(selection.from);
      if (node?.type.name === 'image') {
        return { node, pos: selection.from };
      }
    } catch (e) {
      // Ignore
    }

    // Check isActive as fallback
    if (editor.isActive('image')) {
      const imageAttrs = editor.getAttributes('image');
      if (imageAttrs?.src) {
        return { attrs: imageAttrs, pos: selection.from };
      }
    }

    return null;
  }, [editor]);

  // Update menu state based on selection
  const updateMenuState = useCallback(() => {
    if (!editor) {
      setIsVisible(false);
      return;
    }

    const selectedImage = getSelectedImage();
    
    if (selectedImage) {
      const imageAttrs = selectedImage.node?.attrs || selectedImage.attrs || editor.getAttributes('image');
      
      setAttrs({
        width: imageAttrs.width ? String(imageAttrs.width) : '',
        alignment: imageAttrs.alignment || 'center',
        caption: imageAttrs.caption || '',
      });

      // Calculate position
      try {
        const { view } = editor;
        const pos = selectedImage.pos;
        const domNode = view.nodeDOM(pos);
        
        if (domNode) {
          const figure = domNode.tagName === 'FIGURE' ? domNode : domNode.closest('figure');
          const element = figure || domNode;
          const rect = element.getBoundingClientRect();
          
          // Get the editor container (the relative parent)
          const editorContainer = view.dom.closest('.relative') || view.dom.parentElement;
          const containerRect = editorContainer?.getBoundingClientRect();
          
          if (containerRect) {
            const top = rect.top - containerRect.top - 50;
            setMenuPosition({ top: Math.max(10, top) });
          }
        }
      } catch (e) {
        // Default position if calculation fails
        setMenuPosition({ top: 10 });
      }

      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [editor, getSelectedImage]);

  // Listen to editor changes
  useEffect(() => {
    if (!editor) return;

    // Initial check
    updateMenuState();

    // Subscribe to editor events
    const handleUpdate = () => {
      // Use setTimeout to ensure DOM is updated
      setTimeout(updateMenuState, 0);
    };

    editor.on('selectionUpdate', handleUpdate);
    editor.on('transaction', handleUpdate);

    return () => {
      editor.off('selectionUpdate', handleUpdate);
      editor.off('transaction', handleUpdate);
    };
  }, [editor, updateMenuState]);

  // Apply changes to editor
  const updateImage = useCallback((newAttrs) => {
    if (!editor) return;
    
    const updates = {};
    
    if (newAttrs.alignment !== undefined) {
      updates.alignment = newAttrs.alignment;
    }
    if (newAttrs.width !== undefined) {
      updates.width = newAttrs.width === '' ? null : parseInt(newAttrs.width) || null;
    }
    if (newAttrs.caption !== undefined) {
      updates.caption = newAttrs.caption;
    }
    
    if (Object.keys(updates).length > 0) {
      editor.chain().focus().updateAttributes('image', updates).run();
    }
  }, [editor]);

  const handleAlignment = (align) => {
    setAttrs(prev => ({ ...prev, alignment: align }));
    updateImage({ alignment: align });
  };

  const handleWidthChange = (value) => {
    setAttrs(prev => ({ ...prev, width: value }));
  };

  const applyWidth = () => {
    updateImage({ width: attrs.width });
  };

  const handleCaptionChange = (value) => {
    setAttrs(prev => ({ ...prev, caption: value }));
  };

  const applyCaption = () => {
    updateImage({ caption: attrs.caption });
  };

  const setWidthPreset = (w) => {
    setAttrs(prev => ({ ...prev, width: String(w) }));
    updateImage({ width: w });
  };

  const clearWidth = () => {
    setAttrs(prev => ({ ...prev, width: '' }));
    updateImage({ width: null });
  };

  const deleteImage = () => {
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
      ref={menuRef}
      className="absolute z-50 left-0 right-0 flex justify-center pointer-events-none"
      style={{ top: `${menuPosition.top}px` }}
    >
      <div className="pointer-events-auto bg-white rounded-lg shadow-xl border border-slate-200 p-2 flex items-center gap-2 flex-wrap max-w-[520px]">
        
        {/* Alignment Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          {[
            { value: 'left', icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h16" />
              </svg>
            )},
            { value: 'center', icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" />
              </svg>
            )},
            { value: 'right', icon: (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M12 12h8M4 18h16" />
              </svg>
            )},
          ].map(({ value, icon }) => (
            <button
              key={value}
              onClick={() => handleAlignment(value)}
              title={`Align ${value}`}
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
            placeholder="Auto"
            min="50"
            className="w-16 px-2 py-1 text-xs border border-slate-200 rounded text-slate-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <span className="text-xs text-slate-400">px</span>
        </div>

        {/* Width Presets */}
        <div className="flex items-center gap-0.5">
          {[
            { label: 'S', value: 200 },
            { label: 'M', value: 350 },
            { label: 'L', value: 500 },
          ].map(({ label, value }) => (
            <button
              key={label}
              onClick={() => setWidthPreset(value)}
              className={`px-1.5 py-1 text-xs rounded transition-all ${
                parseInt(attrs.width) === value
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
              title={`${value}px`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={clearWidth}
            className="px-1.5 py-1 text-xs text-slate-400 hover:bg-slate-100 rounded"
            title="Auto width"
          >
            ✕
          </button>
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
          placeholder="Caption..."
          className="w-24 px-2 py-1 text-xs border border-slate-200 rounded text-slate-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Delete Button */}
        <button
          onClick={deleteImage}
          className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
          title="Delete image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}