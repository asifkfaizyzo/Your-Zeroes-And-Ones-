// components/admin/blog-editor/Toolbar/RibbonToolbar.jsx
'use client';

import { useState } from 'react';
import HomeTab from './HomeTab';
import InsertTab from './InsertTab';
import ViewTab from './ViewTab';

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'insert', label: 'Insert' },
  { id: 'view', label: 'View' },
];

export default function RibbonToolbar({ 
  editor, 
  stats, 
  onImageUpload, 
  uploading,
  viewMode,
  onViewModeChange,
  isFullscreen,
  onFullscreenToggle,
  showOutline,
  onOutlineToggle,
}) {
  const [activeTab, setActiveTab] = useState('home');

  if (!editor) return null;

  return (
    <div className="bg-slate-50 border-b border-slate-200">
      {/* Tab Headers */}
      <div className="flex items-center justify-between border-b border-slate-200 px-2">
        <div className="flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>

        {/* Stats Display */}
        <div className="flex items-center gap-4 pr-2 text-xs text-slate-500">
          <span>{stats.characters.toLocaleString()} characters</span>
          <span className="text-slate-300">•</span>
          <span>{stats.words.toLocaleString()} words</span>
          <span className="text-slate-300">•</span>
          <span>{stats.readingTime}</span>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-2">
        {activeTab === 'home' && (
          <HomeTab editor={editor} />
        )}
        {activeTab === 'insert' && (
          <InsertTab 
            editor={editor} 
            onImageUpload={onImageUpload}
            uploading={uploading}
          />
        )}
        {activeTab === 'view' && (
          <ViewTab 
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            isFullscreen={isFullscreen}
            onFullscreenToggle={onFullscreenToggle}
            showOutline={showOutline}
            onOutlineToggle={onOutlineToggle}
          />
        )}
      </div>
    </div>
  );
}