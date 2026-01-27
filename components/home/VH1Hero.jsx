// components/home/VH1Hero.jsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import LiquidEther from "@/components/effects/LiquidEther/LiquidEther";
import BlurText from "@/components/effects/BlurText/BlurText";
import ShinyText from "@/components/effects/ShinyText/ShinyText";

export default function VH1Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background - LiquidEther with brighter colors */}
      <div className="absolute inset-0 z-0">
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
      </div>

      {/* Lighter overlay for better visibility */}
      <div className="absolute inset-0 bg-[#060010]/20 z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Welcome text */}
        <div className="mb-6">
          <BlurText
            text="Welcome to"
            delay={100}
            animateBy="words"
            direction="top"
            align="center"
            className="text-white/70 text-lg md:text-xl tracking-widest uppercase"
          />
        </div>

        {/* Main headline with ShinyText - LOOPING */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8">
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
        <div className="mb-12">
          <BlurText
            text="We complete your zeros and ones — transforming your digital vision into reality through innovative technology, strategic marketing, and creative design."
            delay={50}
            animateBy="words"
            direction="bottom"
            align="center"
            className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          />
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/services"
            className="w-full sm:w-52 px-8 py-4 bg-[#20427f] text-white rounded-full font-semibold hover:bg-[#2d5aa8] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#20427f]/30 text-center"
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-52 px-8 py-4 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}