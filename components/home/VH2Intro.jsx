// components/home/VH2Intro.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import BlurText from "@/components/effects/BlurText/BlurText";
import ScrollReveal from "@/components/effects/ScrollReveal/ScrollReveal";

export default function VH2Intro() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-[#060010] overflow-hidden py-20">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="text-[#5b8def] text-sm font-semibold uppercase tracking-widest">
            Our Services
          </span>
        </motion.div>

        {/* Main heading - Now uses ScrollReveal */}
        <div className="mb-8">
          <ScrollReveal
            baseOpacity={0.0}
            enableBlur={true}
            baseRotation={0.1}
            blurStrength={1}
            rotationEnd="center center"
            wordAnimationEnd="center center"
            textClassName="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            We craft digital experiences that drive results
          </ScrollReveal>
        </div>

        {/* Description - Now uses BlurText */}
        <div className="mb-16">
          <BlurText
            text="From cutting-edge technology solutions to data-driven marketing strategies and stunning brand identities — we're your complete digital partner."
            delay={40}
            animateBy="words"
            direction="top"
            align="center"
            className="text-white/50 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-normal"
          />
        </div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-sm">Scroll to explore our services</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}