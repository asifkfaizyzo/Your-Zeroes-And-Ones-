// components/admin/blog-editor/Toolbar/ViewTab.jsx
'use client';

function ToolbarButton({ onClick, active, disabled, title, children, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-md transition-all duration-150 flex items-center gap-2 ${
        active
          ? 'bg-blue-600 text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
      } ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

function ToolbarGroup({ label, children }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-slate-200 shadow-sm">
        {children}
      </div>
      <span className="text-[10px] text-slate-400 mt-1 font-medium">{label}</span>
    </div>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-8 bg-slate-200 mx-2" />;
}

export default function ViewTab({ 
  viewMode = 'edit', 
  onViewModeChange = () => {},
  isFullscreen = false,
  onFullscreenToggle = () => {},
  showOutline = false,
  onOutlineToggle = () => {},
}) {
  return (
    <div className="flex items-start gap-3 flex-wrap">
      {/* View Modes */}
      <ToolbarGroup label="Editor View">
        <ToolbarButton
          onClick={() => onViewModeChange('edit')}
          active={viewMode === 'edit'}
          title="Edit Mode - Write and format content"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span className="text-sm">Edit</span>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => onViewModeChange('preview')}
          active={viewMode === 'preview'}
          title="Preview Mode - See how it will look"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-sm">Preview</span>
        </ToolbarButton>

        <ToolbarButton
          onClick={() => onViewModeChange('split')}
          active={viewMode === 'split'}
          title="Split View - Edit and preview side by side"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
            <line x1="12" y1="3" x2="12" y2="21" strokeWidth="2"/>
          </svg>
          <span className="text-sm">Split</span>
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Layout Options */}
      <ToolbarGroup label="Panels">
        <ToolbarButton
          onClick={onOutlineToggle}
          active={showOutline}
          title="Document Outline - Show heading structure"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h10M4 18h10" />
          </svg>
          <span className="text-sm">Outline</span>
        </ToolbarButton>

        <ToolbarButton
          onClick={onFullscreenToggle}
          active={isFullscreen}
          title={isFullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen Mode"}
        >
          {isFullscreen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0v5m0-5h5m6 0l5-5m0 0v5m0-5h-5m-6 16l-5 5m0 0v-5m0 5h5m6 0l5 5m0 0v-5m0 5h-5" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          )}
          <span className="text-sm">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
        </ToolbarButton>
      </ToolbarGroup>

      <ToolbarDivider />

      {/* Keyboard Shortcuts Info */}
      <div className="flex items-center ml-auto">
        <div className="flex items-center gap-4 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-sm">Ctrl+S</kbd>
            <span>Save</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-sm">F11</kbd>
            <span>Fullscreen</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-sm">Esc</kbd>
            <span>Exit</span>
          </span>
        </div>
      </div>
    </div>
  );
}