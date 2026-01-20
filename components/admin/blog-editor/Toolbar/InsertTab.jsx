// components/admin/blog-editor/Toolbar/InsertTab.jsx
"use client";

import { useState } from "react";
import YouTubeModal from "../modals/YouTubeModal";
import ImageGalleryModal from "../modals/ImageGalleryModal";

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-md transition-all duration-150 flex items-center gap-2 ${
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""} ${className}`}
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
      <span className="text-[10px] text-slate-400 mt-1 font-medium">
        {label}
      </span>
    </div>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-8 bg-slate-200 mx-2" />;
}

export default function InsertTab({ editor, onImageUpload, uploading }) {
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  if (!editor) return null;

  const handleYouTubeInsert = (url, videoInfo) => {
    if (videoInfo.type === "youtube") {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    } else {
      // For Vimeo, insert as an iframe manually
      const vimeoEmbed = `<div class="vimeo-embed"><iframe src="https://player.vimeo.com/video/${videoInfo.id}" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
      editor.chain().focus().insertContent(vimeoEmbed).run();
    }
  };

  const handleGalleryInsert = (images, columns) => {
    // Create HTML for the gallery
    const galleryHtml = `
      <div class="image-gallery image-gallery-${columns}" data-columns="${columns}">
        ${images
          .map(
            (img) => `
          <figure class="gallery-item">
            <img src="${img.url}" alt="${img.alt || ""}" />
            ${img.alt ? `<figcaption>${img.alt}</figcaption>` : ""}
          </figure>
        `,
          )
          .join("")}
      </div>
    `;

    editor.chain().focus().insertContent(galleryHtml).run();
  };

  return (
    <>
      <div className="flex items-start gap-3 flex-wrap">
        {/* Media Group */}
        <ToolbarGroup label="Media">
          {/* Single Image Upload */}
          <label
            className={`p-2 rounded-md transition-all duration-150 flex items-center gap-2 cursor-pointer ${
              uploading
                ? "opacity-40 cursor-not-allowed bg-slate-100"
                : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }`}
            title="Insert Image"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <path strokeWidth="2" d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-sm">
              {uploading ? "Uploading..." : "Image"}
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && onImageUpload) onImageUpload(file);
                e.target.value = "";
              }}
              disabled={uploading}
            />
          </label>

          {/* Gallery */}
          <ToolbarButton
            onClick={() => setShowGalleryModal(true)}
            title="Image Gallery"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="3" width="7" height="7" strokeWidth="2" rx="1" />
              <rect x="14" y="3" width="7" height="7" strokeWidth="2" rx="1" />
              <rect x="3" y="14" width="7" height="7" strokeWidth="2" rx="1" />
              <rect x="14" y="14" width="7" height="7" strokeWidth="2" rx="1" />
            </svg>
            <span className="text-sm">Gallery</span>
          </ToolbarButton>

          {/* Video Embed */}
          <ToolbarButton
            onClick={() => setShowYouTubeModal(true)}
            title="Embed YouTube/Vimeo"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2" />
              <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
            </svg>
            <span className="text-sm">Video</span>
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Blocks Group */}
        <ToolbarGroup label="Blocks">
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Divider"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
            <span className="text-sm">Divider</span>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Quote Block"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <span className="text-sm">Quote</span>
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Code Block"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="16,18 22,12 16,6" />
              <polyline points="8,6 2,12 8,18" />
            </svg>
            <span className="text-sm">Code</span>
          </ToolbarButton>
        </ToolbarGroup>

        {/* Tip */}
        <div className="flex items-center ml-auto px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
          <svg
            className="w-4 h-4 text-green-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-xs text-green-700">
            Select an image to resize, align, or add caption
          </span>
        </div>
      </div>

      {/* Modals */}
      <YouTubeModal
        isOpen={showYouTubeModal}
        onClose={() => setShowYouTubeModal(false)}
        editor={editor} // Pass the editor here
        onInsert={(url, videoInfo) => {
          // This is now optional since the modal uses editor directly
        }}
      />

      <ImageGalleryModal
        isOpen={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
        onInsert={handleGalleryInsert}
      />
    </>
  );
}
