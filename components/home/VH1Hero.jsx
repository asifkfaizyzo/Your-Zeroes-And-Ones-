// components/home/VH1Hero.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import LiquidEther from "@/components/effects/LiquidEther/LiquidEther";
import BlurText from "@/components/effects/BlurText/BlurText";
import ShinyText from "@/components/effects/ShinyText/ShinyText";
import GlareHover from "@/components/effects/GlareHover/GlareHover";

// ============================================
// 🎛️ CONFIGURATION TOGGLES
// ============================================
const CONFIG = {
  // Enable/disable LiquidEther on mobile (true = animated, false = static gradient)
  MOBILE_LIQUID_ETHER: true,

  // Enable/disable mouse interaction on desktop
  DESKTOP_MOUSE_INTERACTION: true,

  // Enable/disable mouse interaction on mobile (only if MOBILE_LIQUID_ETHER is true)
  MOBILE_MOUSE_INTERACTION: true,

  // Delay for text animations on FIRST LOAD (accounts for page loader)
  // PageLoader: entering(300) + visible(2500) + exiting(600) + buffer(200) ≈ 3600ms
  FIRST_LOAD_DELAY: 3600,

  // Delay for navigation (no loader, just slight stagger)
  NAVIGATION_DELAY: 100,
};

export default function VH1Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Check if this is the first load or a navigation
    const hasVisited = sessionStorage.getItem("yzo-has-visited");
    const delay = hasVisited
      ? CONFIG.NAVIGATION_DELAY
      : CONFIG.FIRST_LOAD_DELAY;

    // Mark as visited for future navigations
    if (!hasVisited) {
      sessionStorage.setItem("yzo-has-visited", "true");
    }

    // Delay animations accordingly
    const animationTimer = setTimeout(() => {
      setShouldAnimate(true);
    }, delay);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background - Conditional based on screen size */}
      <div className="absolute inset-0 z-0">
        {!isClient ? (
          <div className="absolute inset-0 bg-[#060010]" />
        ) : isMobile ? (
          CONFIG.MOBILE_LIQUID_ETHER ? (
            <LiquidEther
              colors={["#3b6cc9", "#5b8def", "#2d5aa8"]}
              mouseForce={CONFIG.MOBILE_MOUSE_INTERACTION ? 15 : 0}
              cursorSize={80}
              isViscous={true}
              viscous={20}
              resolution={0.6}
              autoDemo={true}
              autoSpeed={0.3}
              autoIntensity={1.5}
              takeoverDuration={0.3}
              autoResumeDelay={2000}
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[#060010] via-[#010e24] to-[#060010]" />
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: `
                    radial-gradient(circle at 20% 20%, #060010 0%, transparent 40%),
                    radial-gradient(circle at 80% 80%, #060010 0%, transparent 40%),
                    radial-gradient(circle at 40% 60%, #0a0033 0%, transparent 50%)
                  `,
                }}
              />
              <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
            </>
          )
        ) : (
          <LiquidEther
            colors={["#3b6cc9", "#5b8def", "#2d5aa8"]}
            mouseForce={CONFIG.DESKTOP_MOUSE_INTERACTION ? 25 : 0}
            cursorSize={120}
            isViscous={true}
            viscous={25}
            resolution={0.5}
            autoDemo={true}
            autoSpeed={0.4}
            autoIntensity={2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
          />
        )}
      </div>

      {/* Overlay */}
      <div
        className={`absolute inset-0 z-[1] ${
          !isClient
            ? "bg-[#060010]/40"
            : isMobile
              ? "bg-gradient-to-b from-transparent via-[#060010]/10 to-[#060010]/40"
              : "bg-[#060010]/20"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-6 md:px-8 max-w-6xl mx-auto flex flex-col justify-center min-h-[80vh] md:min-h-0">
        {/* Welcome text */}
        <h1 className="mb-5 md:mb-8">
          <span className="block text-white/60 text-xs tracking-[0.2em] uppercase mb-3 md:mb-4">
            {shouldAnimate ? (
              <BlurText
                text="Welcome to"
                delay={100}
                animateBy="words"
                direction="top"
                align="center"
                className="md:text-lg lg:text-xl md:tracking-widest"
              />
            ) : (
              <span className="md:text-lg lg:text-xl md:tracking-widest opacity-0">
                Welcome to
              </span>
            )}
          </span>

          <span className="block text-[2.25rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold">
            {shouldAnimate ? (
              <ShinyText
                text="Your Zeros and Ones"
                speed={2}
                delay={0.8}
                color="#5b8def"
                shineColor="#ffffff"
                spread={150}
                direction="left"
                className="font-bold"
                loop={true}
              />
            ) : (
              <span className="font-bold text-[#5b8def] opacity-0">
                Your Zeros and Ones
              </span>
            )}
          </span>
        </h1>

        {/* Tagline */}
        <div className="mb-8 md:mb-12 px-2">
          {shouldAnimate ? (
            <BlurText
              text="We complete your zeros and ones — transforming your digital vision into reality."
              delay={50}
              animateBy="words"
              direction="bottom"
              align="center"
              className="text-white/60 text-sm leading-relaxed md:text-lg lg:text-xl max-w-md md:max-w-2xl mx-auto md:leading-relaxed"
            />
          ) : (
            <span className="text-white/60 text-sm leading-relaxed md:text-lg lg:text-xl max-w-md md:max-w-2xl mx-auto md:leading-relaxed opacity-0 block">
              We complete your zeros and ones — transforming your digital vision
              into reality.
            </span>
          )}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: shouldAnimate ? 1.2 : 0 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 sm:px-0"
        >
          {/* Explore Services */}
          <GlareHover
            glareColor="#5b8def"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
            className="inline-block rounded-full overflow-hidden w-full sm:w-auto"
          >
            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-4 bg-[#1e3a6e] text-white rounded-full font-semibold text-base inline-flex items-center justify-center gap-2 hover:gap-4 hover:bg-[#2d5aa8] transition-all duration-300 whitespace-nowrap"
            >
              Explore Services
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

          {/* Get in Touch */}
          <GlareHover
            glareColor="#ffffff"
            glareOpacity={0.28}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
            className="inline-block rounded-full overflow-hidden w-full sm:w-auto"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white rounded-full font-semibold text-base backdrop-blur-sm inline-flex items-center justify-center gap-2 hover:gap-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300 whitespace-nowrap"
            >
              Get in Touch
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: shouldAnimate ? 2 : 0 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
