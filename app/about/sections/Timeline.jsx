// app/about/sections/Timeline.jsx
"use client";
import { useRef, useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import {
  Rocket, Users, Award, Zap, Target, TrendingUp,
  Star, Trophy, CheckCircle, Calendar, Clock,
  Briefcase, Heart, Shield,
} from "lucide-react";
import BlurText from "@/components/effects/BlurText/BlurText";

const ICON_MAP = {
  Rocket, Users, Award, Zap, Target, TrendingUp,
  Star, Trophy, CheckCircle, Calendar, Clock,
  Briefcase, Heart, Shield,
};

const TimelineItem = memo(function TimelineItem({ item, index }) {
  const IconComponent = ICON_MAP[item.icon] || Rocket;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.2 }
    );
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  useEffect(() => {
    const check = () => setIsMd(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex items-center mb-12 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateX(0)"
          : `translateX(${isEven ? "-30px" : "30px"})`,
        transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 150}ms`,
      }}
    >
      {/* Center dot with glow */}
      <div
        className="absolute left-4 md:left-1/2 z-10"
        style={{ transform: isMd ? "translateX(-50%)" : "none" }}
      >
        <div className="relative">
          <div
            className="absolute inset-0 bg-[#5b8def]/30 rounded-full blur-md"
            style={{
              transform: isVisible ? "scale(1.5)" : "scale(0)",
              transition: `transform 0.4s ease ${index * 150 + 200}ms`,
            }}
          />
          <div
            className="relative w-9 h-9 bg-[#1e3a6e] border-2 border-[#5b8def] rounded-full flex items-center justify-center shadow-lg shadow-[#5b8def]/20"
            style={{
              transform: isVisible ? "scale(1)" : "scale(0)",
              transition: `transform 0.4s cubic-bezier(0.4,0,0.2,1) ${index * 150 + 100}ms`,
            }}
          >
            <IconComponent className="w-4 h-4 text-[#5b8def]" />
          </div>
        </div>
      </div>

      {/* Card */}
      <div
        className={`ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] ${
          isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
        }`}
      >
        <div className="rounded-2xl border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm p-6 hover:border-[#5b8def]/40 hover:-translate-y-1 transition-all duration-300 group">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e3a6e] border border-[#5b8def]/30 text-[#5b8def] text-sm font-bold mb-4">
            <Calendar className="w-3 h-3" />
            {item.year}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#5b8def] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
});

export default function Timeline({ timelineItems, loading }) {
  return (
    <section className="relative py-20 sm:py-24 bg-[#060812] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5b8def]/5 rounded-full blur-[120px] pointer-events-none" />

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
              Our Journey
            </span>
          </motion.div>
          <div className="mb-4">
            <BlurText
              text="The Story Behind Our Success"
              delay={60}
              animateBy="words"
              direction="top"
              align="center"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto"
          >
            From a small startup to an industry leader — discover the milestones that shaped our journey.
          </motion.p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 bg-[#5b8def] rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        ) : timelineItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/40">No timeline items available yet.</p>
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#5b8def]/40 to-transparent md:-translate-x-1/2" />
            {timelineItems.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}