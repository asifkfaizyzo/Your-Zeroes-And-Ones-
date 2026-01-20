// components/admin/blog-editor/modals/YouTubeModal.jsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function YouTubeModal({ isOpen, onClose, onInsert, editor }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const [width, setWidth] = useState(640);
  const [alignment, setAlignment] = useState('center');
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setUrl('');
      setError('');
      setPreview(null);
      setWidth(640);
      setAlignment('center');
    }
  }, [isOpen]);

  // Extract video ID and generate preview
  const extractVideoId = (inputUrl) => {
    if (!inputUrl) return null;

    const youtubePatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];

    const vimeoPatterns = [
      /vimeo\.com\/(\d+)/,
      /player\.vimeo\.com\/video\/(\d+)/,
    ];

    for (const pattern of youtubePatterns) {
      const match = inputUrl.match(pattern);
      if (match) {
        return { type: 'youtube', id: match[1] };
      }
    }

    for (const pattern of vimeoPatterns) {
      const match = inputUrl.match(pattern);
      if (match) {
        return { type: 'vimeo', id: match[1] };
      }
    }

    return null;
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setError('');

    const videoInfo = extractVideoId(newUrl);
    if (videoInfo) {
      setPreview(videoInfo);
    } else if (newUrl.trim()) {
      setPreview(null);
    }
  };

  const handleInsert = () => {
    if (!url.trim()) {
      setError('Please enter a video URL');
      return;
    }

    const videoInfo = extractVideoId(url);
    if (!videoInfo) {
      setError('Invalid YouTube or Vimeo URL');
      return;
    }

    if (editor) {
      editor.chain().focus().setYouTubeVideo({ 
        url, 
        width,
        alignment,
      }).run();
    } else if (onInsert) {
      onInsert(url, { ...videoInfo, width, alignment });
    }
    
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleInsert();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal - Wider for horizontal layout */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Embed Video</h3>
              <p className="text-sm text-slate-500">YouTube or Vimeo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body - Horizontal Layout */}
        <div className="px-6 py-5">
          <div className="flex gap-6">
            {/* Left Column - Controls */}
            <div className="flex-1 space-y-4">
              {/* URL Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Video URL
                </label>
                <input
                  ref={inputRef}
                  type="url"
                  value={url}
                  onChange={handleUrlChange}
                  onKeyDown={handleKeyDown}
                  placeholder="https://youtube.com/watch?v=..."
                  className={`w-full px-4 py-3 border rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    error ? 'border-red-300 bg-red-50' : 'border-slate-200'
                  }`}
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>

              {/* Size and Alignment in a row */}
              {preview && (
                <div className="flex gap-4">
                  {/* Size Selection */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Size
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Small', value: 400 },
                        { label: 'Medium', value: 560 },
                        { label: 'Large', value: 720 },
                        { label: 'Full', value: 900 },
                      ].map((size) => (
                        <button
                          key={size.value}
                          onClick={() => setWidth(size.value)}
                          className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                            width === size.value
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          {size.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Alignment Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Alignment
                    </label>
                    <div className="flex gap-1">
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
                          onClick={() => setAlignment(value)}
                          title={value.charAt(0).toUpperCase() + value.slice(1)}
                          className={`p-2.5 rounded-lg border transition-all ${
                            alignment === value
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Supported platforms */}
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
                  </svg>
                  Vimeo
                </span>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="w-80 flex-shrink-0">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preview
              </label>
              <div 
                className="relative overflow-hidden bg-slate-100 border border-slate-200 rounded-lg"
                style={{ aspectRatio: '16/9' }}
              >
                {preview ? (
                  <>
                    {preview.type === 'youtube' && (
                      <img
                        src={`https://img.youtube.com/vi/${preview.id}/maxresdefault.jpg`}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${preview.id}/hqdefault.jpg`;
                        }}
                      />
                    )}
                    {preview.type === 'vimeo' && (
                      <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-400 to-blue-600">
                        <div className="text-center text-white">
                          <svg className="w-10 h-10 mx-auto mb-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
                          </svg>
                          <span className="text-xs font-medium">Vimeo</span>
                        </div>
                      </div>
                    )}
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    {/* Platform badge */}
                    <div className={`absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-bold text-white ${
                      preview.type === 'youtube' ? 'bg-red-600' : 'bg-blue-500'
                    }`}>
                      {preview.type === 'youtube' ? 'YouTube' : 'Vimeo'}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">Paste a URL to preview</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            disabled={!preview}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Insert Video
          </button>
        </div>
      </div>
    </div>
  );
}