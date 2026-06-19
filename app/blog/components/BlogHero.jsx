"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BlurText from "@/components/effects/BlurText/BlurText";
import ShinyText from "@/components/effects/ShinyText/ShinyText";
import Lightfall from "@/components/effects/Lightfall/Lightfall";

export default function BlogHero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="relative bg-[#060010] overflow-hidden min-h-[40vh] max-h-[55vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {!isClient ? (
          <div className="absolute inset-0 bg-[#060010]" />
        ) : isMobile ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#060010] via-[#0a1628] to-[#060010]" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `
                  radial-gradient(circle at 30% 40%, #5b8def 0%, transparent 50%),
                  radial-gradient(circle at 70% 60%, #2d5aa8 0%, transparent 50%)
                `,
              }}
            />
          </>
        ) : (
          <Lightfall
            colors={["#1e3a6e", "#5b8def", "#2d5aa8"]}
            backgroundColor="#060010"
            speed={0.3}
            streakCount={3}
            streakWidth={0.8}
            streakLength={1.2}
            glow={0.8}
            density={0.5}
            twinkle={0.8}
            zoom={3}
            backgroundGlow={0.3}
            opacity={1}
            mouseInteraction={true}
            mouseStrength={0.4}
            mouseRadius={1}
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-[#060010]/40" />

      {/* Grid */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating accent */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[15%] w-16 h-16 bg-[#5b8def]/10 rounded-xl blur-sm hidden lg:block z-[3]"
      />

      {/* Content */}
      <div
        className="w-full relative z-10 py-12 md:py-16"
        style={{
          paddingLeft: "clamp(2rem, 8vw, 12rem)",
          paddingRight: "clamp(2rem, 8vw, 12rem)",
        }}
      >
        <div className="max-w-4xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="my-4"
          >
            <span className="text-[#fff] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              Insights & Articles
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="relative mb-5">
            <span className="block py-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-normal">
              <ShinyText
                text="Our Blog"
                speed={2}
                delay={0.4}
                color="#5b8def"
                shineColor="#ffffff"
                spread={150}
                direction="left"
                className="inline-block" // Ensure it's inline-block to respect padding
                loop={true}
              />
            </span>
          </h1>

          {/* Description */}
          <div className="max-w-2xl">
            <BlurText
              text="Explore articles on web development, UI/UX, performance, and digital innovation."
              delay={40}
              animateBy="words"
              direction="bottom"
              align="left"
              className="text-white/50 text-sm md:text-base lg:text-lg leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute -bottom-px left-0 right-0 z-[5]">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60L80 52.5C160 45 320 30 480 25C640 20 800 25 960 30C1120 35 1280 40 1360 42.5L1440 45V60H1360C1280 60 1120 60 960 60C800 60 640 60 480 60C320 60 160 60 80 60H0Z"
            fill="#060812"
          />
        </svg>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 md:w-36 md:h-36 z-[3]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border border-white/10 rounded-full"
        />
      </div>
    </section>
  );
}
