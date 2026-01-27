// components/home/TestimonialsSection.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Aurora from "@/components/effects/Aurora/Aurora";
import BlurText from "@/components/effects/BlurText/BlurText";

function getInitials(name = "") {
  if (!name) return "?";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TestimonialAvatar({ testimonial, size = "md" }) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(testimonial.name);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  if (testimonial.image && !imageError) {
    return (
      <img
        src={testimonial.image}
        alt={testimonial.name}
        onError={() => setImageError(true)}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-[#5b8def]/30`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-[#5b8def] to-[#20427f] rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-[#5b8def]/30`}
    >
      {initials}
    </div>
  );
}

const VIDEO_HEIGHT = 200;
const CONTENT_HEIGHT = 170;

function VideoTestimonialCard({ testimonial }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);

  const hasVideo = !!(testimonial.videoUrl && testimonial.thumbnailUrl);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovering) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovering]);

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

  return (
    <>
      <div
        className="relative bg-slate-900 cursor-pointer overflow-hidden rounded-t-xl"
        style={{ height: `${VIDEO_HEIGHT}px` }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsFullscreen(true)}
      >
        <img
          src={testimonial.thumbnailUrl}
          alt=""
          loading="eager"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            isHovering ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
        />

        <video
          ref={videoRef}
          src={testimonial.videoUrl}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            isHovering ? "opacity-100 scale-100" : "opacity-0 scale-100"
          }`}
        />

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

        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovering ? "opacity-0" : "opacity-100"}`}
        >
          <div className="relative">
            <div
              className="absolute inset-0 w-12 h-12 rounded-full bg-white/20 animate-ping"
              style={{ animationDuration: "2s" }}
            />
            <div className="relative w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <div className="flex flex-col items-center">
                <svg className="w-4 h-4 text-[#5b8def]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
                <span className="text-[9px] font-medium text-[#5b8def] mt-0.5">Hover</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute top-2 right-2 transition-all duration-300 ${isHovering ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
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
          className={`absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300 ${isHovering ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
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
      </div>

      <AnimatePresence>
        {isFullscreen && (
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
                    className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="rounded-xl overflow-hidden shadow-2xl bg-black">
                    <video
                      src={testimonial.videoUrl}
                      controls
                      autoPlay
                      className="w-full"
                      style={{ maxHeight: "calc(100vh - 150px)" }}
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

const TOTAL_CARD_HEIGHT = VIDEO_HEIGHT + CONTENT_HEIGHT;

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedAtRef = useRef(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/testimonials");
        if (!res.ok) throw new Error("Failed to load testimonials");
        const data = await res.json();

        const filtered = data
          .filter((t) => t.verified !== false)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setTestimonials(filtered);
      } catch (err) {
        console.error("Testimonials fetch error:", err);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (loading || testimonials.length <= 1) return;

    const duration = 5000;

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp - pausedAtRef.current;
      }

      if (!isPaused) {
        const elapsed = timestamp - startTimeRef.current;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);

        if (newProgress >= 100) {
          setActiveIndex((prev) => (prev + 1) % testimonials.length);
          startTimeRef.current = null;
          pausedAtRef.current = 0;
          setProgress(0);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [loading, testimonials.length, isPaused, activeIndex]);

  useEffect(() => {
    if (isPaused) {
      pausedAtRef.current = (progress / 100) * 5000;
      startTimeRef.current = null;
    }
  }, [isPaused, progress]);

  const goToSlide = (index) => {
    setActiveIndex(index);
    setProgress(0);
    startTimeRef.current = null;
    pausedAtRef.current = 0;
  };

  if (loading || testimonials.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1525]">
        <div className="absolute inset-0 z-0">
          <Aurora colorStops={["#0f2744", "#1a3a5c", "#244a6e"]} blend={0.5} amplitude={0.8} speed={0.5} />
        </div>
        <div className="absolute inset-0 bg-[#0a1525]/40 z-[1]" />
        <div className="relative z-10">
          {loading ? (
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 bg-[#5b8def] rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          ) : (
            <p className="text-white/50">No testimonials available</p>
          )}
        </div>
      </section>
    );
  }

  const current = testimonials[activeIndex];
  const rating = Math.min(5, Math.max(0, parseInt(current?.rating) || 5));
  const hasVideo = !!(current.videoUrl && current.thumbnailUrl);
  const displayText = hasVideo && current.quoteExcerpt ? current.quoteExcerpt : current.message;

return (
  <section
    className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060812]"
    id="testimonials"
  >
    {/* Background - Aurora with blue theme */}
    <div className="absolute inset-0 z-0">
      <Aurora colorStops={["#0f2744", "#060812", "#0f2744"]} blend={0.5} amplitude={0.8} speed={0.5} />
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-[#0a1525]/40 z-[1]" />

    {/* Decorative side lines */}
    <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#5b8def]/15 to-transparent hidden lg:block z-[2]" />
    <div className="absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#5b8def]/15 to-transparent hidden lg:block z-[2]" />

    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-10">
      
      {/* TOP: Label - Outside columns, centered */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="text-center mb-10"
      >
        <span className="text-[#5b8def] text-sm font-semibold uppercase tracking-[0.2em]">
          Client Testimonials
        </span>
      </motion.div>

      {/* 2-column layout: Left = header, Right = card - ALIGNED TO TOP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* LEFT: Header / Text */}
        <div className="text-left lg:pr-8">
          <div className="mb-4">
            <BlurText
              text="What Our Clients Say"
              delay={80}
              animateBy="words"
              direction="top"
              align="left"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            />
          </div>

          <div className="mb-6">
            <BlurText
              text="Real stories from partners who trust us to deliver excellence."
              delay={60}
              animateBy="words"
              direction="top"
              align="left"
              className="text-white/50 text-base sm:text-lg max-w-md leading-relaxed font-normal"
            />
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#20427f] text-white rounded-full font-semibold hover:bg-[#2d5aa8] transition-all duration-300 hover:gap-4"
            >
              View All Testimonials
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT: Card + navigation - PAUSE ON HOVER */}
        <div
          className="flex flex-col items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl overflow-hidden will-change-transform"
              style={{ height: `${TOTAL_CARD_HEIGHT}px` }}
            >
              {hasVideo ? (
                <div className="h-full flex flex-col">
                  <VideoTestimonialCard testimonial={current} />
                  <div className="flex flex-col items-center justify-center px-5 pb-5" style={{ height: `${CONTENT_HEIGHT}px` }}>
                    <p className="text-white/90 text-sm leading-relaxed text-center mb-3 line-clamp-2 max-w-lg">"{displayText}"</p>

                    <div className="flex items-center gap-3">
                      <TestimonialAvatar testimonial={current} size="sm" />
                      <div>
                        <h4 className="font-semibold text-white text-sm">{current.name}</h4>
                        <p className="text-xs text-white/50">
                          {current.role}
                          {current.company && ` · ${current.company}`}
                        </p>
                      </div>
                      <div className="flex justify-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-white/10 fill-white/10"}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {testimonials.length > 1 && (
                      <div className="mt-3 w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#5b8def] to-[#20427f] transition-none" style={{ width: `${progress}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-6" style={{ height: `${TOTAL_CARD_HEIGHT}px` }}>
                  <svg className="w-10 h-10 text-[#5b8def]/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <div className="flex justify-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-white/10 fill-white/10"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-white/90 text-base leading-relaxed text-center mb-5 line-clamp-3 max-w-lg">"{displayText}"</p>

                  <div className="flex items-center gap-3">
                    <TestimonialAvatar testimonial={current} size="md" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-semibold text-white text-sm">{current.name}</h4>
                        {current.verified && (
                          <svg className="w-3.5 h-3.5 text-[#5b8def]" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <p className="text-xs text-white/50">
                        {current.role}
                        {current.company && ` · ${current.company}`}
                      </p>
                    </div>
                  </div>

                  {testimonials.length > 1 && (
                    <div className="mt-5 w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#5b8def] to-[#20427f] transition-none" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                onClick={() => goToSlide(activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1)}
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                aria-label="Previous testimonial"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${i === activeIndex ? "bg-[#5b8def] w-6" : "bg-white/20 w-1.5 hover:bg-white/40"}`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => goToSlide((activeIndex + 1) % testimonials.length)}
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                aria-label="Next testimonial"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);
}