// components/home/VH1Hero.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import LiquidEther from "@/components/effects/LiquidEther/LiquidEther";
import BlurText from "@/components/effects/BlurText/BlurText";
import ShinyText from "@/components/effects/ShinyText/ShinyText";

export default function VH1Hero() {
  const [isMobile, setIsMobile] = useState(true); // Default to mobile for SSR

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background - Conditional based on screen size */}
      <div className="absolute inset-0 z-0">
        {isMobile ? (
          // 📱 MOBILE: Static Gradient Background (better performance)
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
        ) : (
          // 🖥️ DESKTOP: LiquidEther animated background
          <LiquidEther
            colors={["#3b6cc9", "#5b8def", "#2d5aa8"]}
            mouseForce={25}
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

      {/* Overlay - Different opacity for mobile vs desktop */}
      <div className={`absolute inset-0 z-[1] ${
        isMobile 
          ? "bg-gradient-to-b from-transparent via-[#060010]/10 to-[#060010]/40" 
          : "bg-[#060010]/20"
      }`} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        
        {/* Welcome text */}
        <div className="mb-4 md:mb-6">
          <BlurText
            text="Welcome to"
            delay={100}
            animateBy="words"
            direction="top"
            align="center"
            className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.2em] md:tracking-widest uppercase"
          />
        </div>

        {/* Main headline with ShinyText */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-6 md:mb-8 leading-tight px-2">
          <ShinyText
            text="Your Zeros and Ones"
            speed={1.5}
            delay={0}
            color="#5b8def"
            shineColor="#ffffff"
            spread={150}
            direction="left"
            className="font-bold"
            loop={true}
          />
        </h1>

        {/* Tagline */}
        <div className="mb-8 md:mb-12">
          <BlurText
            text="We complete your zeros and ones — transforming your digital vision into reality through innovative technology, strategic marketing, and creative design."
            delay={50}
            animateBy="words"
            direction="bottom"
            align="center"
            className="text-white/60 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4 md:px-0"
          />
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4 sm:px-0"
        >
          <Link
            href="/services"
            className="w-full sm:w-52 px-8 py-4 bg-[#20427f] text-white rounded-full font-semibold text-base
                     hover:bg-[#2d5aa8] transition-all duration-300 
                     hover:scale-105 hover:shadow-xl hover:shadow-[#20427f]/30
                     active:scale-95
                     text-center"
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-52 px-8 py-4 
                     border border-white/30 text-white rounded-full font-semibold text-base
                     hover:bg-white/10 hover:border-white/50 transition-all duration-300 
                     hover:scale-105
                     active:scale-95
                     backdrop-blur-sm
                     text-center"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
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