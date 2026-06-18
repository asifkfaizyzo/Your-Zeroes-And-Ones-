// app/about/sections/WhoWeAre.jsx
"use client";
import { useRef, useState, useEffect, memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Users, Clock } from "lucide-react";
import BlurText from "@/components/effects/BlurText/BlurText";

const ICON_MAP = { CheckCircle, Calendar, Users, Clock };

const StatCard = memo(function StatCard({ stat, index }) {
  const IconComponent = ICON_MAP[stat.icon] || CheckCircle;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.3 }
    );
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div
      ref={ref}
      className="text-center p-4 rounded-2xl border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm
                 hover:border-[#5b8def]/40 hover:-translate-y-1 hover:bg-[#5b8def]/10
                 transition-all duration-300 cursor-default"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        transition: `all 0.5s cubic-bezier(0.4,0,0.2,1) ${index * 100}ms`,
      }}
    >
      <div className="w-10 h-10 bg-[#1e3a6e] rounded-xl flex items-center justify-center mx-auto mb-3 border border-[#5b8def]/30">
        <IconComponent className="w-5 h-5 text-[#5b8def]" />
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
        {stat.value}
      </div>
      <div className="text-xs sm:text-sm text-white/40">{stat.label}</div>
    </div>
  );
});

export default function WhoWeAre({ aboutContent, displayStats }) {
  return (
    <section
      id="who-we-are"
      className="relative py-20 sm:py-24 md:py-28 bg-[#060010] overflow-hidden"
    >
      {/* Subtle grid */}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Text + Stats */}
          <div className="space-y-6">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
                {aboutContent.badge}
              </span>
            </motion.div>

            {/* Heading */}
            <div>
              <BlurText
                text={`${aboutContent.title} ${aboutContent.highlightedText}`}
                delay={50}
                animateBy="words"
                direction="left"
                align="left"
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
              />
            </div>

            {/* Paragraphs */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-base sm:text-lg leading-relaxed"
            >
              {aboutContent.paragraph1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/50 text-base sm:text-lg leading-relaxed"
            >
              {aboutContent.paragraph2}
            </motion.p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {displayStats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>

          {/* Right — Image/Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            {/* Glow behind */}
            <div className="absolute -inset-4 bg-[#5b8def]/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative rounded-3xl overflow-hidden border border-[#5b8def]/20 group-hover:border-[#5b8def]/40 transition-colors duration-300">
              <div className="aspect-[4/3] relative bg-[#0a1628]">
                {aboutContent.mediaType === "video" && aboutContent.media ? (
                  <video
                    src={aboutContent.media}
                    controls
                    className="w-full h-full object-cover relative z-10"
                  />
                ) : (
                  <>
                    <Image
                      src={aboutContent.media || "/images/about/about-company.png"}
                      alt="Your Zeros and Ones Team"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      quality={90}
                    />
                    {/* Overlay only on images, NOT videos */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060010]/40 via-transparent to-transparent" />
                  </>
                )}
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-[#5b8def]/30 rounded-br-2xl" />
            <div className="absolute -top-3 -left-3 w-16 h-16 border-l-2 border-t-2 border-[#5b8def]/30 rounded-tl-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}