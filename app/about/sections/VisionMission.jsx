// app/about/sections/VisionMission.jsx
"use client";
import { motion } from "framer-motion";
import { Eye, Zap } from "lucide-react";
import BlurText from "@/components/effects/BlurText/BlurText";

export default function VisionMission() {
  return (
    <section className="relative py-20 sm:py-24 bg-[#060010] overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="relative z-10 w-full"
        style={{
          paddingLeft: "clamp(2rem, 8vw, 12rem)",
          paddingRight: "clamp(2rem, 8vw, 12rem)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              Our Purpose
            </span>
          </motion.div>
          <BlurText
            text="Vision & Mission"
            delay={60}
            animateBy="words"
            direction="top"
            align="center"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative rounded-3xl border border-[#5b8def]/30 bg-[#5b8def]/5
                       backdrop-blur-sm p-8 sm:p-10 overflow-hidden
                       hover:border-[#5b8def]/50 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#5b8def]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, #5b8def 1px, transparent 0)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative">
              <div className="w-14 h-14 bg-[#1e3a6e] border border-[#5b8def]/30 rounded-2xl flex items-center justify-center mb-6 group-hover:border-[#5b8def]/60 group-hover:scale-110 transition-all duration-300">
                <Eye className="w-7 h-7 text-[#5b8def]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Our Vision
              </h3>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed">
                To be the leading catalyst for digital innovation, empowering
                businesses worldwide to achieve their full potential through
                transformative technology solutions that create lasting impact
                and drive sustainable growth.
              </p>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="group relative rounded-3xl border border-[#5b8def]/20 bg-[#060812]
                       p-8 sm:p-10 overflow-hidden
                       hover:border-[#5b8def]/40 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a6e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="relative">
              <div className="w-14 h-14 bg-[#1e3a6e] border border-[#5b8def]/30 rounded-2xl flex items-center justify-center mb-6 group-hover:border-[#5b8def]/60 group-hover:scale-110 transition-all duration-300">
                <Zap className="w-7 h-7 text-[#5b8def]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed">
                To deliver exceptional, customized IT solutions that solve
                complex business challenges. We are committed to building
                long-term partnerships based on trust, innovation, and
                measurable results that help our clients stay ahead in an
                ever-evolving digital landscape.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}