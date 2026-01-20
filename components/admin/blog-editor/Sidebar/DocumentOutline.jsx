// components/admin/blog-editor/Sidebar/DocumentOutline.jsx
'use client';

import { useState, useEffect } from 'react';

export default function DocumentOutline({ editor, isVisible, onClose }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState(null);

  // Extract headings from editor content
  useEffect(() => {
    if (!editor) return;

    const updateHeadings = () => {
      const doc = editor.state.doc;
      const extractedHeadings = [];
      let counter = 0;

      doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          counter++;
          extractedHeadings.push({
            id: `heading-${counter}`,
            level: node.attrs.level,
            text: node.textContent || `Heading ${counter}`,
            pos: pos,
          });
        }
      });

      setHeadings(extractedHeadings);
    };

    // Initial extraction
    updateHeadings();

    // Listen to editor updates
    editor.on('update', updateHeadings);

    return () => {
      editor.off('update', updateHeadings);
    };
  }, [editor]);

  // Scroll to heading in editor
  const scrollToHeading = (pos) => {
    if (!editor) return;
    
    editor.chain().focus().setTextSelection(pos).run();
    
    // Scroll the editor view
    const { view } = editor;
    const coords = view.coordsAtPos(pos);
    const editorElement = view.dom.closest('.overflow-y-auto');
    
    if (editorElement && coords) {
      const editorRect = editorElement.getBoundingClientRect();
      const scrollTop = coords.top - editorRect.top + editorElement.scrollTop - 100;
      editorElement.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }

    setActiveId(`heading-${headings.findIndex(h => h.pos === pos) + 1}`);
  };

  // Get indent level based on heading level
  const getIndentClass = (level) => {
    const indents = {
      1: 'pl-0',
      2: 'pl-3',
      3: 'pl-6',
      4: 'pl-9',
      5: 'pl-12',
      6: 'pl-14',
    };
    return indents[level] || 'pl-0';
  };

  // Get heading style based on level
  const getHeadingStyle = (level) => {
    const styles = {
      1: 'text-sm font-bold text-slate-900',
      2: 'text-sm font-semibold text-slate-800',
      3: 'text-sm font-medium text-slate-700',
      4: 'text-xs font-medium text-slate-600',
      5: 'text-xs text-slate-500',
      6: 'text-xs text-slate-400',
    };
    return styles[level] || 'text-sm text-slate-600';
  };

  if (!isVisible) return null;

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <span className="text-sm font-semibold text-slate-700">Outline</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          title="Close outline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3">
        {headings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-600 mb-1">No headings yet</p>
            <p className="text-xs text-slate-400">
              Add headings (H1-H6) to see the document structure
            </p>
          </div>
        ) : (
          <nav className="space-y-1">
            {headings.map((heading, index) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.pos)}
                className={`w-full text-left py-1.5 px-2 rounded-md transition-colors ${getIndentClass(heading.level)} ${
                  activeId === heading.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className={`flex-shrink-0 w-6 h-5 flex items-center justify-center rounded text-[10px] font-bold ${
                    activeId === heading.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    H{heading.level}
                  </span>
                  <span className={`${getHeadingStyle(heading.level)} truncate leading-5`}>
                    {heading.text || 'Untitled'}
                  </span>
                </div>
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{headings.length} heading{headings.length !== 1 ? 's' : ''}</span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono">Click</kbd>
            to jump
          </span>
        </div>
      </div>
    </div>
  );
}