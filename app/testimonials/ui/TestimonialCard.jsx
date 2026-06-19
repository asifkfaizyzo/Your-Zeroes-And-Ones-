// app/testimonials/ui/TestimonialCard.jsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const getStreamingUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/uploads/")) {
    const videoPath = url.slice(1);
    return `/api/stream/video?path=${encodeURIComponent(videoPath)}`;
  }
  return url;
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function TestimonialCard({ item, index = 0 }) {
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const videoRef = useRef(null);

  const name = item?.name || "Anonymous";
  const role = item?.role || "Client";
  const company = item?.company;
  const message = item?.message || "No testimonial provided.";
  const quoteExcerpt = item?.quoteExcerpt;
  const image = item?.image;
  const videoUrl = item?.videoUrl;
  const thumbnailUrl = item?.thumbnailUrl;
  const hasVideo = !!(videoUrl && thumbnailUrl);
  const rating = Math.min(5, Math.max(0, parseInt(item?.rating) || 5));
  const verified = item?.verified || false;

  const displayText = hasVideo && quoteExcerpt ? quoteExcerpt : message;
  const shouldTruncate = displayText.length > 280;
  const displayMessage = shouldTruncate
    ? `${displayText.slice(0, 280)}...`
    : displayText;

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovering) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovering]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
        setShowQuoteModal(false);
      }
    };
    if (isFullscreen || showQuoteModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isFullscreen, showQuoteModal]);

  return (
    <>
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
        className="group relative h-full"
      >
        {/* Glow on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5b8def]/20 to-[#2d5aa8]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300" />

        <div className="relative h-full rounded-2xl border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm hover:border-[#5b8def]/40 hover:bg-[#5b8def]/10 hover:shadow-lg hover:shadow-[#5b8def]/10 transition-all duration-300 overflow-hidden flex flex-col min-h-[320px]">

          {/* Verified Badge — quote-only cards */}
          {verified && !hasVideo && (
            <div className="absolute top-4 right-4 z-30">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1e3a6e] border border-[#5b8def]/40 text-[#5b8def] text-xs font-medium rounded-full">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          )}

          {/* Video Section */}
          {hasVideo && (
            <div
              className="relative aspect-video bg-[#060010] cursor-pointer overflow-hidden"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => setIsFullscreen(true)}
            >
              <img
                src={thumbnailUrl}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  isHovering ? "opacity-0 scale-105" : "opacity-100 scale-100"
                }`}
              />
              <video
                ref={videoRef}
                src={getStreamingUrl(videoUrl)}
                muted
                loop
                playsInline
                webkit-playsinline="true"
                preload="none"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  isHovering ? "opacity-100 scale-100" : "opacity-0 scale-100"
                }`}
              />

              {/* Verified on video */}
              {verified && (
                <div className="absolute top-3 left-3 z-20">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#1e3a6e]/90 backdrop-blur-sm border border-[#5b8def]/40 text-[#5b8def] text-xs font-medium rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              )}

              {/* Hover indicator */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovering ? "opacity-0" : "opacity-100"}`}>
                <div className="relative">
                  <div className="absolute inset-0 w-16 h-16 rounded-full bg-[#5b8def]/20 animate-ping" style={{ animationDuration: "2s" }} />
                  <div className="absolute inset-0 w-16 h-16 rounded-full bg-[#5b8def]/10 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
                  <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg">
                    <div className="flex flex-col items-center">
                      <svg className="w-5 h-5 text-[#5b8def]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                      <span className="text-[10px] font-medium text-[#5b8def] mt-0.5">Hover</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Playing indicator */}
              <div className={`absolute top-3 right-3 transition-all duration-300 ${isHovering ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                  <span className="flex gap-0.5">
                    <span className="w-1 h-3 bg-[#5b8def] rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                    <span className="w-1 h-3 bg-[#5b8def] rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-1 h-3 bg-[#5b8def] rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                  </span>
                  Playing
                </span>
              </div>

              {/* Hover controls */}
              <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 ${isHovering ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                      if (videoRef.current) videoRef.current.muted = !isMuted;
                    }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>
                  <span className="text-xs text-white/60">Click for full video</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-colors"
                    aria-label="Fullscreen"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Card Content */}
          <div className={`p-5 flex-1 flex flex-col ${!hasVideo ? "justify-center" : ""}`}>
            <div className={`${!hasVideo ? "flex-1 flex flex-col justify-center" : "flex-1"}`}>
              <div className={`relative ${!hasVideo ? "text-center" : ""}`}>
                {!hasVideo && (
                  <svg className="w-10 h-10 text-[#5b8def]/20 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                )}
                <p className={`text-white/60 leading-relaxed text-sm ${!hasVideo ? "text-center px-2" : ""}`}>
                  {displayMessage}
                </p>
                {shouldTruncate && (
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className={`mt-3 text-xs font-medium text-[#5b8def] hover:text-[#5b8def]/80 inline-flex items-center gap-1 ${!hasVideo ? "mx-auto" : ""}`}
                  >
                    Read full testimonial
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className={`mt-4 pt-4 border-t border-[#5b8def]/10 flex items-center gap-3 ${!hasVideo ? "justify-center" : ""}`}>
              <div className="relative flex-shrink-0">
                {image && !imageError ? (
                  <img
                    src={image}
                    alt={name}
                    onError={() => setImageError(true)}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#5b8def]/20"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#1e3a6e] border border-[#5b8def]/30 flex items-center justify-center ring-2 ring-[#5b8def]/10">
                    <span className="text-[#5b8def] font-semibold text-sm">{getInitials(name)}</span>
                  </div>
                )}
              </div>
              <div className={`${hasVideo ? "flex-1" : ""} min-w-0`}>
                <h4 className={`font-semibold text-white text-sm truncate ${!hasVideo ? "text-center" : ""}`}>{name}</h4>
                <p className={`text-xs text-white/40 truncate ${!hasVideo ? "text-center" : ""}`}>
                  {role}{company && ` · ${company}`}
                </p>
              </div>
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <svg className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-medium text-white/60">{rating}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quote Modal */}
      <AnimatePresence>
        {showQuoteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowQuoteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-lg max-h-[80vh] rounded-2xl border border-[#5b8def]/20 bg-[#060812] backdrop-blur-sm shadow-2xl shadow-[#5b8def]/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#060812] border-b border-[#5b8def]/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {image && !imageError ? (
                    <img src={image} alt={name} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#5b8def]/20" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#1e3a6e] border border-[#5b8def]/30 flex items-center justify-center ring-2 ring-[#5b8def]/10">
                      <span className="text-[#5b8def] font-semibold text-sm">{getInitials(name)}</span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-white text-sm flex items-center gap-2">
                      {name}
                      {verified && (
                        <svg className="w-4 h-4 text-[#5b8def]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </h4>
                    <p className="text-xs text-white/40">{role}{company && ` at ${company}`}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-5 overflow-y-auto max-h-[calc(80vh-140px)]">
                <div className="relative text-center">
                  <svg className="w-12 h-12 text-[#5b8def]/15 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-white/70 leading-relaxed text-base">{message}</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-[#060812] border-t border-[#5b8def]/10 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-white/10 fill-white/10"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm font-medium text-white/50 ml-1">{rating}.0</span>
                </div>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="px-4 py-2 bg-[#1e3a6e] border border-[#5b8def]/30 text-white text-sm font-medium rounded-lg hover:bg-[#2d5aa8] hover:border-[#5b8def]/60 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {isFullscreen && hasVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="absolute inset-0 overflow-y-auto">
              <div className="min-h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative w-full max-w-4xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors z-10"
                    aria-label="Close"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="rounded-xl overflow-hidden shadow-2xl shadow-[#5b8def]/10 bg-black border border-white/10">
                    <video
                      src={getStreamingUrl(videoUrl)}
                      poster={thumbnailUrl}
                      controls
                      autoPlay
                      playsInline
                      webkit-playsinline="true"
                      className="w-full"
                      style={{ maxHeight: "calc(100vh - 200px)" }}
                    >
                      Your browser does not support video.
                    </video>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-white">
                    <div className="flex items-center gap-3">
                      {image && !imageError ? (
                        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#5b8def]/20" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#1e3a6e] border border-[#5b8def]/30 flex items-center justify-center ring-2 ring-[#5b8def]/10">
                          <span className="text-[#5b8def] font-semibold">{getInitials(name)}</span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-lg text-white">{name}</h4>
                        <p className="text-white/50 text-sm">{role}{company && ` at ${company}`}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                      {verified && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1e3a6e] border border-[#5b8def]/40 text-[#5b8def] text-sm font-medium rounded-full">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      )}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-white/20 fill-white/20"}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>

                  {message && (
                    <div className="mt-4 p-4 rounded-xl border border-[#5b8def]/15 bg-[#5b8def]/5 backdrop-blur-sm">
                      <p className="text-white/60 text-sm leading-relaxed italic text-center">
                        "{message.length > 200 ? `${message.slice(0, 200)}...` : message}"
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}