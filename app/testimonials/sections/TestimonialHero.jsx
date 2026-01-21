// app/testimonials/sections/TestimonialHero.jsx
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const floatingWords = [
  { text: "Amazing!", emoji: "✨" },
  { text: "Incredible", emoji: "🚀" },
  { text: "Game-changer", emoji: "💡" },
  { text: "Seamless", emoji: "🎯" },
  { text: "Top Quality", emoji: "⭐" },
  { text: "Outstanding", emoji: "🏆" },
  { text: "Brilliant", emoji: "💎" },
];

export default function TestimonialHero() {
  // ✅ NEW: Dynamic stats state
  const [stats, setStats] = useState([
    { value: "30+", label: "Happy Clients" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "25+", label: "5-Star Reviews" },
  ]);

  // ✅ NEW: Fetch stats from API
  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats([
          { value: `${data.clients}+`, label: "Happy Clients" },
          { value: "98%", label: "Satisfaction Rate" }, // Keep this static
          { value: `25+`, label: "5-Star Reviews" },
        ]);
      })
      .catch(() => {
        // Keep fallback values on error
        setStats([
          { value: "30+", label: "Happy Clients" },
          { value: "98%", label: "Satisfaction Rate" },
          { value: "20+", label: "5-Star Reviews" },
        ]);
      });
  }, []);

  return (
    <section className="relative w-full text-white text-center bg-gradient-to-br from-[#1a365d] via-[#2d5a87] to-[#1a5388] overflow-hidden min-h-[60vh] flex items-center">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Floating Words with Enhanced Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {floatingWords.map((word, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.15, 0.15, 0],
              scale: [0.8, 1, 1, 0.9],
              y: [0, -20, -20, -40],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            className="absolute font-bold text-4xl md:text-6xl text-white/10 whitespace-nowrap"
            style={{
              top: `${15 + (i * 12) % 70}%`,
              left: `${5 + (i * 14) % 85}%`,
              transform: `rotate(${-15 + i * 8}deg)`,
            }}
          >
            <span className="mr-2">{word.emoji}</span>
            {word.text}
          </motion.div>
        ))}
      </div>

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
      />

      {/* Main Content */}
      <div className="relative z-10 w-full py-16 md:py-24 px-4">
        {/* Badge - ✅ Dynamic client count */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium">
            Trusted by {stats[0].value.replace('+', '')}+ clients worldwide
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
        >
          Real Stories from
          <br />
          <span className="bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent">
            Real People
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-blue-100/90 leading-relaxed"
        >
          Discover why clients and collaborators love working with us. 
          These testimonials represent genuine experiences and lasting partnerships.
        </motion.p>

        {/* Stats Row - ✅ Dynamic data */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-blue-200/80 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-blue-200/60"
          >
            <span className="text-sm">Scroll to explore</span>
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
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}