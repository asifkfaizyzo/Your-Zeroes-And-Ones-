// components\home\TestimonialsSection.jsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Aurora from "@/components/effects/Aurora/Aurora";
import BlurText from "@/components/effects/BlurText/BlurText";
import GlareHover from "@/components/effects/GlareHover/GlareHover";
import TestimonialsGrid from "./TestimonialsGrid";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/testimonials");
        if (!res.ok) throw new Error("Failed to load testimonials");
        const data = await res.json();

        // Filter verified, sort by video first, then by date, limit to 8
        const filtered = data
          .filter((t) => t.verified !== false)
          .sort((a, b) => {
            const aHasVideo = !!(a.videoUrl && a.thumbnailUrl);
            const bHasVideo = !!(b.videoUrl && b.thumbnailUrl);
            if (aHasVideo && !bHasVideo) return -1;
            if (!aHasVideo && bHasVideo) return 1;
            return new Date(b.createdAt) - new Date(a.createdAt);
          })
          .slice(0, 8);

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

  // Loading/Empty state
  if (loading || testimonials.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1525]">
        <div className="absolute inset-0 z-0">
          {!isClient ? (
            <div className="absolute inset-0 bg-[#0a1525]" />
          ) : isMobile ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a1525] via-[#0f2744] to-[#0a1525]" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `
                    radial-gradient(ellipse at 30% 30%, rgba(91, 141, 239, 0.15) 0%, transparent 50%),
                    radial-gradient(ellipse at 70% 70%, rgba(36, 74, 110, 0.2) 0%, transparent 50%)
                  `,
                }}
              />
            </>
          ) : (
            <Aurora
              colorStops={["#0f2744", "#1a3a5c", "#244a6e"]}
              blend={0.5}
              amplitude={0.8}
              speed={0.5}
            />
          )}
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

  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden bg-[#060812]"
      id="testimonials"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {!isClient ? (
          <div className="absolute inset-0 bg-[#060812]" />
        ) : isMobile ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#060812] via-[#0f2744] to-[#060812]" />
            <div
              className="absolute inset-0 opacity-25"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 20%, rgba(15, 39, 68, 0.6) 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 80%, rgba(15, 39, 68, 0.6) 0%, transparent 50%)
                `,
              }}
            />
          </>
        ) : (
          <Aurora
            colorStops={["#0f2744", "#060812", "#0f2744"]}
            blend={0.5}
            amplitude={0.8}
            speed={0.5}
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0a1525]/40 z-[1]" />

      {/* Decorative side lines - Desktop only */}
      {!isMobile && (
        <>
          <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#5b8def]/15 to-transparent hidden lg:block z-[2]" />
          <div className="absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#5b8def]/15 to-transparent hidden lg:block z-[2]" />
        </>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="text-[#5b8def] text-sm font-semibold uppercase tracking-[0.2em]">
              Client Testimonials
            </span>
          </motion.div>

          <div className="mb-4">
            <BlurText
              text="What Our Clients Say"
              delay={80}
              animateBy="words"
              direction="top"
              align="center" // ADD THIS
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            />
          </div>

          <div className="mb-8">
            <BlurText
              text="Real stories from partners who trust us to deliver excellence."
              delay={60}
              animateBy="words"
              direction="top"
              align="center" // ADD THIS
              className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal"
            />
          </div>
        </div>

        {/* Grid */}
        <TestimonialsGrid testimonials={testimonials} isMobile={isMobile} />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <GlareHover
            glareColor="#5b8def"
            glareOpacity={0.35}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
            className="inline-block rounded-full overflow-hidden"
          >
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e3a6e] text-white rounded-full font-semibold hover:bg-[#2d5aa8] transition-all duration-300 hover:gap-4"
            >
              View All Testimonials
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </GlareHover>
        </motion.div>
      </div>
    </section>
  );
}
