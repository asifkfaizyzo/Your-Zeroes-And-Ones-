// components/home/TestimonialsSection/VideoTestimonialCard.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TestimonialAvatar from "./TestimonialAvatar";

export default function VideoTestimonialCard({ testimonial, isMobile }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isMobilePlaying, setIsMobilePlaying] = useState(false);
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const fullscreenVideoRef = useRef(null);

  const hasVideo = !!(testimonial.videoUrl && testimonial.thumbnailUrl);

  // Desktop hover behavior
  useEffect(() => {
    if (videoRef.current && !isMobile) {
      if (isHovering) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovering, isMobile]);

  // Desktop fullscreen handling
  useEffect(() => {
    if (isFullscreen && fullscreenVideoRef.current) {
      const video = fullscreenVideoRef.current;
      setIsVideoLoading(true);

      const timer = setTimeout(() => {
        video.play().catch((err) => {
          console.log("Autoplay prevented, user can tap to play:", err);
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isFullscreen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    if (isFullscreen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  if (!hasVideo) return null;

  // Mobile: Toggle play/pause on click
  const handleMobileClick = () => {
    if (mobileVideoRef.current) {
      if (isMobilePlaying) {
        mobileVideoRef.current.pause();
      } else {
        mobileVideoRef.current.play().catch((err) => {
          console.log("Mobile play prevented:", err);
        });
      }
    }
  };

  const rating = Math.min(5, Math.max(0, parseInt(testimonial?.rating) || 5));
  const displayText = testimonial.quoteExcerpt || testimonial.message;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl overflow-hidden h-full flex flex-col"
      >
        {/* Video Section */}
        <div
          className="relative cursor-pointer overflow-hidden"
          style={{ height: "180px" }}
          onMouseEnter={() => !isMobile && setIsHovering(true)}
          onMouseLeave={() => !isMobile && setIsHovering(false)}
          onClick={() => (isMobile ? handleMobileClick() : setIsFullscreen(true))}
        >
          {/* Thumbnail */}
          <img
            src={testimonial.thumbnailUrl}
            alt=""
            loading="eager"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              (isHovering && !isMobile) || (isMobile && isMobilePlaying) ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
          />

          {/* Mobile: Click-to-play video */}
          {isMobile && (
            <video
              ref={mobileVideoRef}
              src={testimonial.videoUrl}
              muted
              loop
              playsInline
              webkit-playsinline="true"
              preload="metadata"
              onPlay={() => setIsMobilePlaying(true)}
              onPause={() => setIsMobilePlaying(false)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isMobilePlaying ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Desktop: Hover-triggered video */}
          {!isMobile && (
            <video
              ref={videoRef}
              src={testimonial.videoUrl}
              muted={isMuted}
              loop
              playsInline
              webkit-playsinline="true"
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                isHovering ? "opacity-100 scale-100" : "opacity-0 scale-100"
              }`}
            />
          )}

          {testimonial.verified && (
            <div className="absolute top-2 left-2 z-20">
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-[#5b8def]/90 backdrop-blur-sm text-white text-[10px] font-medium rounded-full shadow-sm">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          )}

          {/* Play/Pause indicator */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              (isHovering && !isMobile) || (isMobile && isMobilePlaying) ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="relative">
              {!isMobile && (
                <div
                  className="absolute inset-0 w-10 h-10 rounded-full bg-white/20 animate-ping"
                  style={{ animationDuration: "2s" }}
                />
              )}
              <div className="relative w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <div className="flex flex-col items-center">
                  {isMobile ? (
                    <>
                      <svg className="w-4 h-4 text-[#5b8def]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="text-[6px] font-medium text-[#5b8def] mt-0.5">Play</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5 text-[#5b8def]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                        />
                      </svg>
                      <span className="text-[7px] font-medium text-[#5b8def] mt-0.5">Hover</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Pause indicator when playing */}
          {isMobile && isMobilePlaying && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 active:opacity-100 transition-opacity duration-300">
              <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              </div>
            </div>
          )}

          {/* Desktop-only hover controls */}
          {!isMobile && (
            <>
              <div
                className={`absolute top-2 right-2 transition-all duration-300 ${
                  isHovering ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
              >
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium rounded-full">
                  <span className="flex gap-0.5">
                    <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
                    <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
                    <span className="w-0.5 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
                  </span>
                  Playing
                </span>
              </div>

              <div
                className={`absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300 ${
                  isHovering ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                    }}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                        />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                      </svg>
                    )}
                  </button>
                  <span className="text-[10px] text-white/80">Click for full video</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFullscreen(true);
                    }}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors"
                    aria-label="Fullscreen"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col px-6 py-5">
          <p className="text-white/80 text-sm leading-relaxed line-clamp-3 mb-3 flex-1">"{displayText}"</p>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <TestimonialAvatar testimonial={testimonial} size="sm" />
              <div className="min-w-0">
                <h4 className="font-semibold text-white text-sm truncate max-w-[120px]">{testimonial.name}</h4>
                <p className="text-xs text-white/50 truncate max-w-[150px]">
                  {testimonial.role}
                  {testimonial.company && ` · ${testimonial.company}`}
                </p>
              </div>
            </div>
            <div className="flex gap-0.5 flex-shrink-0">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${i < rating ? "text-amber-400 fill-amber-400" : "text-white/10 fill-white/10"}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* FULLSCREEN MODAL - Desktop only */}
      <AnimatePresence>
        {isFullscreen && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95"
            onClick={() => setIsFullscreen(false)}
          >
            <div className="absolute inset-0 overflow-y-auto">
              <div className="min-h-full flex flex-col items-center justify-center p-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative w-full max-w-4xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white transition-colors z-10"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="rounded-xl overflow-hidden shadow-2xl bg-black relative">
                    {isVideoLoading && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
                        <img
                          src={testimonial.thumbnailUrl}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover opacity-50"
                        />
                        <div className="relative z-10 flex flex-col items-center gap-3">
                          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                          <span className="text-white/70 text-sm">Loading video...</span>
                        </div>
                      </div>
                    )}

                    <video
                      ref={fullscreenVideoRef}
                      src={testimonial.videoUrl}
                      poster={testimonial.thumbnailUrl}
                      controls
                      playsInline
                      webkit-playsinline="true"
                      x-webkit-airplay="allow"
                      controlsList="nodownload"
                      className="w-full"
                      style={{ maxHeight: "calc(100vh - 150px)" }}
                      onLoadedData={() => setIsVideoLoading(false)}
                      onCanPlay={() => setIsVideoLoading(false)}
                      onPlay={() => setIsVideoLoading(false)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  <div className="mt-3 flex items-center gap-3 text-white">
                    <TestimonialAvatar testimonial={testimonial} size="sm" />
                    <div>
                      <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                      <p className="text-white/70 text-xs">
                        {testimonial.role}
                        {testimonial.company && ` · ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}