// app/blog/components/BlogHero.jsx
"use client";
import { motion } from "framer-motion";

export default function BlogHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#203F7F] overflow-hidden min-h-[40vh] max-h-[50vh] flex items-center">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Gradient Orb - Single subtle one */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

      {/* Floating Accent */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[15%] w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl blur-sm hidden lg:block"
      />

      <div 
        className="w-full relative z-10 py-12 md:py-16"
        style={{
          paddingLeft: 'clamp(2rem, 8vw, 12rem)',
          paddingRight: 'clamp(2rem, 8vw, 12rem)'
        }}
      >
        <div className="max-w-4xl">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="pt-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Blog
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-blue-100/70 max-w-2xl"
          >
            Explore articles on web development, UI/UX, performance, and digital innovation.
          </motion.p>
        </div>
      </div>

      {/* Bottom Wave - Fixed with block display and negative margin */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-[1px]">
        <svg 
          viewBox="0 0 1440 60" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 60L80 52.5C160 45 320 30 480 25C640 20 800 25 960 30C1120 35 1280 40 1360 42.5L1440 45V60H1360C1280 60 1120 60 960 60C800 60 640 60 480 60C320 60 160 60 80 60H0Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}