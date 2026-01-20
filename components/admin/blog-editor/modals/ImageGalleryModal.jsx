// components/admin/blog-editor/modals/ImageGalleryModal.jsx
'use client';

import { useState, useRef, useCallback } from 'react';
import { toastService } from '@/lib/toastConfig';

export default function ImageGalleryModal({ isOpen, onClose, onInsert }) {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [columns, setColumns] = useState(2);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate files
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        toastService.error(`${file.name}: Invalid type`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toastService.error(`${file.name}: Too large (max 5MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setUploading(true);

    // Upload all files
    const uploadPromises = validFiles.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'blogs');

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const data = await res.json();
        return {
          id: Date.now() + Math.random(),
          url: data.url,
          alt: file.name.replace(/\.[^/.]+$/, ''),
          caption: '',
        };
      } catch (err) {
        console.error(err);
        return null;
      }
    });

    try {
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(Boolean);
      
      if (successfulUploads.length > 0) {
        setImages(prev => [...prev, ...successfulUploads]);
        toastService.success(`${successfulUploads.length} image(s) uploaded`);
      }
    } catch (err) {
      toastService.error('Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const updateImageAlt = (id, alt) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, alt } : img
    ));
  };

  const handleInsert = () => {
    if (images.length === 0) {
      toastService.error('Please add at least one image');
      return;
    }

    onInsert(images, columns);
    setImages([]);
    setColumns(2);
    onClose();
  };

  const handleClose = () => {
    setImages([]);
    setColumns(2);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" strokeWidth="2" rx="1"/>
                <rect x="14" y="3" width="7" height="7" strokeWidth="2" rx="1"/>
                <rect x="3" y="14" width="7" height="7" strokeWidth="2" rx="1"/>
                <rect x="14" y="14" width="7" height="7" strokeWidth="2" rx="1"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Image Gallery</h3>
              <p className="text-sm text-slate-500">Upload multiple images</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Upload Area */}
          <label 
            className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
              uploading 
                ? 'border-blue-300 bg-blue-50' 
                : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
          >
            {uploading ? (
              <>
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2" />
                <span className="text-sm text-blue-600 font-medium">Uploading...</span>
              </>
            ) : (
              <>
                <svg className="w-10 h-10 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-slate-600 font-medium">Click or drag images here</span>
                <span className="text-xs text-slate-400 mt-1">PNG, JPG, GIF, WebP up to 5MB each</span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              disabled={uploading}
            />
          </label>

          {/* Images Grid */}
          {images.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700">
                  {images.length} image{images.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Columns:</span>
                  <select
                    value={columns}
                    onChange={(e) => setColumns(Number(e.target.value))}
                    className="px-2 py-1 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </div>
              </div>

              <div className={`grid gap-3 ${
                columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-4'
              }`}>
                {images.map((img) => (
                  <div key={img.id} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                      <img
                        src={img.url}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Remove button */}
                    <button
                      onClick={() => removeImage(img.id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    {/* Alt text input */}
                    <input
                      type="text"
                      value={img.alt}
                      onChange={(e) => updateImageAlt(img.id, e.target.value)}
                      placeholder="Alt text"
                      className="mt-1 w-full px-2 py-1 text-xs border border-slate-200 rounded text-slate-700 focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            disabled={images.length === 0 || uploading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Insert Gallery
          </button>
        </div>
      </div>
    </div>
  );
}