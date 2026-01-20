// components/admin/blog-editor/Toolbar/HomeTab.jsx
'use client';

import { useState, useRef, useEffect } from 'react';

// Reusable toolbar button component
function ToolbarButton({ onClick, active, disabled, title, children, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-md transition-all duration-150 ${
        active
          ? 'bg-blue-600 text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

// Toolbar group with label
function ToolbarGroup({ label, children }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-0.5 p-1 bg-white rounded-lg border border-slate-200 shadow-sm">
        {children}
      </div>
      <span className="text-[10px] text-slate-400 mt-1 font-medium">{label}</span>
    </div>
  );
}

// Divider between groups
function ToolbarDivider() {
  return <div className="w-px h-8 bg-slate-200 mx-2" />;
}

// Heading dropdown component
function HeadingDropdown({ editor }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const headingLevels = [
    { level: 1, label: 'H1', desc: 'Main Title' },
    { level: 2, label: 'H2', desc: 'Section' },
    { level: 3, label: 'H3', desc: 'Subsection' },
    { level: 4, label: 'H4', desc: 'Group' },
    { level: 5, label: 'H5', desc: 'Detail' },
    { level: 6, label: 'H6', desc: 'Minor' },
  ];

  // Get current heading level
  const getCurrentHeading = () => {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive('heading', { level: i })) {
        return `H${i}`;
      }
    }
    return 'P';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (level) => {
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-all ${
          isOpen ? 'bg-slate-200' : 'hover:bg-slate-100'
        } text-slate-700 font-medium text-sm min-w-[70px] justify-between`}
      >
        <span>{getCurrentHeading()}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 min-w-[140px]">
          {/* Paragraph option */}
          <button
            type="button"
            onClick={() => handleSelect(0)}
            className={`w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-3 ${
              !editor.isActive('heading') ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
            }`}
          >
            <span className="font-medium text-sm w-8">P</span>
            <span className="text-xs text-slate-500">Paragraph</span>
          </button>

          <div className="h-px bg-slate-100 my-1" />

          {/* Heading options */}
          {headingLevels.map(({ level, label, desc }) => (
            <button
              key={level}
              type="button"
              onClick={() => handleSelect(level)}
              className={`w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-3 ${
                editor.isActive('heading', { level }) ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              <span 
                className="font-bold w-8"
                style={{ fontSize: `${18 - level * 1.5}px` }}
              >
                {label}
              </span>
              <span className="text-xs text-slate-500">{desc}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomeTab({ editor }) {
  if (!editor) return null;

  // List indent/outdent handlers
  const handleIndent = () => {
    if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
      // Sink list item (indent)
      editor.chain().focus().sinkListItem('listItem').run();
    }
  };

  const handleOutdent = () => {
    if (editor.isActive('bulletList') || editor.isActive('orderedList')) {
      // Lift list item (outdent)
      editor.chain().focus().liftListItem('listItem').run();
    }
  };

  const canIndent = editor.can().sinkListItem('listItem');
  const canOutdent = editor.can().liftListItem('listItem');

  return (
    <div className="flex items-start gap-3 flex-wrap">
      {/* History Group */}
      <ToolbarGroup label="History">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a5 5 0 015 5v2M3 10l4-4m-4 4l4 4" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a5 5 0 00-5 5v2M21 10l-4-4m4 4l-4 4" />
          </svg>
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Text Formatting Group */}
      <ToolbarGroup label="Format">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h6a4 4 0 014 4 4 4 0 01-4 4H6V4zm0 8h7a4 4 0 014 4 4 4 0 01-4 4H6v-8z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="4" x2="10" y2="4" />
            <line x1="14" y1="20" x2="5" y2="20" />
            <line x1="15" y1="4" x2="9" y2="20" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="Underline (Ctrl+U)"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3" />
            <line x1="4" y1="21" x2="20" y2="21" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
          title="Strikethrough"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <path d="M16 6H8a4 4 0 100 8" />
            <path d="M8 18h8a4 4 0 000-8" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive('code')}
          title="Inline Code"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16,18 22,12 16,6" />
            <polyline points="8,6 2,12 8,18" />
          </svg>
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Heading/Paragraph Group */}
      <ToolbarGroup label="Styles">
        <HeadingDropdown editor={editor} />
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Lists Group */}
      <ToolbarGroup label="Lists">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h.01M8 6h12M4 12h.01M8 12h12M4 18h.01M8 18h12" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="10" y1="6" x2="21" y2="6" />
            <line x1="10" y1="12" x2="21" y2="12" />
            <line x1="10" y1="18" x2="21" y2="18" />
            <text x="4" y="7" fontSize="6" fill="currentColor" stroke="none">1</text>
            <text x="4" y="13" fontSize="6" fill="currentColor" stroke="none">2</text>
            <text x="4" y="19" fontSize="6" fill="currentColor" stroke="none">3</text>
          </svg>
        </ToolbarButton>

        {/* Divider within group */}
        <div className="w-px h-6 bg-slate-200 mx-0.5" />

        {/* Indent/Outdent */}
        <ToolbarButton
          onClick={handleOutdent}
          disabled={!canOutdent}
          title="Decrease Indent (Shift+Tab)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 5v14" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={handleIndent}
          disabled={!canIndent}
          title="Increase Indent (Tab)"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5v14" />
          </svg>
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Block Elements Group */}
      <ToolbarGroup label="Blocks">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="Quote Block"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive('codeBlock')}
          title="Code Block"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <polyline points="8,10 5,12 8,14" />
            <polyline points="16,10 19,12 16,14" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Divider"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
          </svg>
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Clear Formatting */}
      <ToolbarGroup label="Clear">
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          title="Clear Formatting"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h11M9 4v16M18 4l-6 6m6 0l-6-6" />
          </svg>
        </ToolbarButton>
      </ToolbarGroup>
    </div>
  );
}