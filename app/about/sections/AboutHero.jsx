// app/about/sections/AboutHero.jsx
"use client";
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Rocket, 
  Award, 
  Lightbulb, 
  TrendingUp, 
  Heart,
  Star,
  Briefcase,
  Globe,
  Zap,
  Shield
} from "lucide-react";

const floatingItems = [
  { text: "Innovation", Icon: Lightbulb },
  { text: "Excellence", Icon: Award },
  { text: "Growth", Icon: TrendingUp },
  { text: "Trust", Icon: Shield },
  { text: "Quality", Icon: Star },
  { text: "Passion", Icon: Heart },
  { text: "Global", Icon: Globe },
  { text: "Success", Icon: Rocket },
];

const stats = [
  { value: "50+", label: "Projects Delivered", Icon: Briefcase },
  { value: "15+", label: "Years Experience", Icon: Award },
  { value: "30+", label: "Happy Clients", Icon: Users },
];

const jumpingIcons = [
  { Icon: Users, delay: 0 },
  { Icon: Target, delay: 0.15 },
  { Icon: Rocket, delay: 0.3 },
  { Icon: Award, delay: 0.45 },
  { Icon: Zap, delay: 0.6 },
];

export default function AboutHero() {
  return (
    <section className="relative w-full text-white text-center bg-gradient-to-br from-[#203E7F] via-[#2d5a9e] to-cyan-600 overflow-hidden min-h-[50vh] flex items-center">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Words with Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {floatingItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.1, 0.1, 0],
              scale: [0.8, 1, 1, 0.9],
              y: [0, -25, -25, -50],
              rotate: [-5 + i * 3, 5 + i * 2, -5 + i * 3],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              delay: i * 1.8,
              ease: "easeInOut",
            }}
            className="absolute font-bold text-2xl md:text-4xl lg:text-5xl text-white/10 whitespace-nowrap select-none flex items-center gap-2"
            style={{
              top: `${10 + ((i * 13) % 60)}%`,
              left: `${3 + ((i * 15) % 80)}%`,
            }}
          >
            <item.Icon className="w-6 h-6 md:w-8 md:h-8" />
            {item.text}
          </motion.div>
        ))}
      </div>

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-56 md:w-80 h-56 md:h-80 bg-cyan-400/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.35, 0.15],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-48 md:w-72 h-48 md:h-72 bg-blue-500/25 rounded-full blur-3xl"
      />

      {/* Jumping Icons Row */}
      
      {/* Main Content */}
      <div 
        className="relative z-10 w-full py-16 md:py-20"
        style={{
          paddingLeft: 'clamp(2rem, 8vw, 12rem)',
          paddingRight: 'clamp(2rem, 8vw, 12rem)'
        }}
      >

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
        >
          <motion.h1 className="pt-10 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="block"
            >
              About Your
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring", bounce: 0.4 }}
              className="block bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-transparent"
            >
              Zeros and Ones
            </motion.span>
          </motion.h1>
        </motion.div>

       
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-5 max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-blue-100/90 leading-relaxed"
        >
          Leading the digital transformation journey for businesses worldwide. 
          We combine technical expertise with business acumen to deliver{" "}
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block font-semibold text-cyan-300"
          >
            innovative solutions
          </motion.span>{" "}
          that drive growth.
        </motion.p>

       
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-10 md:mt-12"
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-blue-200/60 cursor-pointer group"
            onClick={() => {
              document.getElementById("who-we-are")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs group-hover:text-white transition-colors"
            >
              Discover our story
            </motion.span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-12 border-2 border-blue-200/40 rounded-full flex items-start justify-center p-2 group-hover:border-cyan-400/60 transition-colors"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 bg-blue-200/60 rounded-full group-hover:bg-cyan-400 transition-colors"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 md:w-36 md:h-36">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border border-white/10 rounded-full"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border border-white/10 rounded-full"
        />
      </div>

      {/* Cloud-like Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120V80C40 80 40 60 80 60C120 60 120 40 160 40C200 40 200 50 240 50C280 50 280 30 320 30C360 30 360 45 400 45C440 45 440 25 480 25C520 25 520 35 560 35C600 35 600 20 640 20C680 20 680 40 720 40C760 40 760 15 800 15C840 15 840 35 880 35C920 35 920 25 960 25C1000 25 1000 45 1040 45C1080 45 1080 30 1120 30C1160 30 1160 50 1200 50C1240 50 1240 35 1280 35C1320 35 1320 55 1360 55C1400 55 1400 70 1440 70V120H0Z"
            fill="#F3F4F6"
          />
          <path
            d="M0 120V90C60 90 60 75 120 75C180 75 180 85 240 85C300 85 300 70 360 70C420 70 420 80 480 80C540 80 540 65 600 65C660 65 660 75 720 75C780 75 780 60 840 60C900 60 900 70 960 70C1020 70 1020 55 1080 55C1140 55 1140 65 1200 65C1260 65 1260 50 1320 50C1380 50 1380 60 1440 60V120H0Z"
            fill="#F3F4F6"
            opacity="0.7"
          />
        </svg>
      </div>
    </section>
  );
}
