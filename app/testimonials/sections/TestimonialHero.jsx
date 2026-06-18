// app/testimonials/sections/TestimonialHero.jsx
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BlurText from "@/components/effects/BlurText/BlurText";
import ShinyText from "@/components/effects/ShinyText/ShinyText";
import PrismaticBurst from "@/components/effects/PrismaticBurst/PrismaticBurst";

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
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [stats, setStats] = useState([
    { value: "30+", label: "Happy Clients" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "25+", label: "5-Star Reviews" },
  ]);

  useEffect(() => {
    setIsClient(true);
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats([
          { value: `${data.clients}+`, label: "Happy Clients" },
          { value: "98%", label: "Satisfaction Rate" },
          { value: `25+`, label: "5-Star Reviews" },
        ]);
      })
      .catch(() => {
        setStats([
          { value: "30+", label: "Happy Clients" },
          { value: "98%", label: "Satisfaction Rate" },
          { value: "20+", label: "5-Star Reviews" },
        ]);
      });
  }, []);

  return (
    <section className="relative w-full text-white text-center bg-[#060010] overflow-hidden min-h-[60vh] flex items-center">

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
          <div className="absolute inset-0 w-full h-full">
            <PrismaticBurst
              animationType="rotate3d"
              intensity={1.5}
              speed={0.1}
              distort={0}
              paused={false}
              offset={{ x: 0, y: 0 }}
              hoverDampness={0.25}
              rayCount={0}
              mixBlendMode="screen"
              colors={["#1e3a6e", "#2d5aa8", "#5b8def", "#93c5fd", "#ffffff"]}
            />
          </div>
        )}
      </div>

      {/* Dark base — sits behind the blend effect to keep bg dark */}
      <div className="absolute inset-0 z-0 bg-[#060010]" style={{ zIndex: -1 }} />

      {/* Dark overlay to tone down the effect and ensure readability */}
      <div className="absolute inset-0 z-[1] bg-[#060010]/60" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Words */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {floatingWords.map((word, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.08, 0.08, 0],
              scale: [0.8, 1, 1, 0.9],
              y: [0, -20, -20, -40],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
            className="absolute font-bold text-4xl md:text-6xl text-[#5b8def]/10 whitespace-nowrap"
            style={{
              top: `${15 + ((i * 12) % 70)}%`,
              left: `${5 + ((i * 14) % 85)}%`,
              transform: `rotate(${-15 + i * 8}deg)`,
            }}
          >
            <span className="mr-2">{word.emoji}</span>
            {word.text}
          </motion.div>
        ))}
      </div>

      {/* Ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5b8def]/20 rounded-full blur-3xl pointer-events-none z-[2]"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.04, 0.1, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2d5aa8]/20 rounded-full blur-3xl pointer-events-none z-[2]"
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 md:w-36 md:h-36 z-[4]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border border-white/10 rounded-full"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20 md:w-28 md:h-28 z-[4]">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border border-[#5b8def]/10 rounded-full"
        />
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 w-full py-16 md:py-24"
        style={{
          paddingLeft: "clamp(2rem, 8vw, 12rem)",
          paddingRight: "clamp(2rem, 8vw, 12rem)",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#1e3a6e]/50 backdrop-blur-sm border border-[#5b8def]/20 rounded-full px-4 py-2 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-white/70">
            Trusted by {stats[0].value.replace("+", "")}+ clients worldwide
          </span>
        </motion.div>

        {/* Heading */}
        <h1 className="mb-0">
          <span className="block text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2">
            <BlurText
              text="Real Stories from"
              delay={60}
              animateBy="words"
              direction="top"
              align="center"
              className="text-white"
            />
          </span>
          <span className="block text-4xl md:text-6xl lg:text-7xl font-bold">
            <ShinyText
              text="Real People"
              speed={2}
              delay={0.5}
              color="#5b8def"
              shineColor="#ffffff"
              spread={150}
              direction="left"
              className="font-bold"
              loop={true}
            />
          </span>
        </h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 max-w-2xl mx-auto"
        >
          <BlurText
            text="Discover why clients and collaborators love working with us. These testimonials represent genuine experiences and lasting partnerships."
            delay={35}
            animateBy="words"
            direction="bottom"
            align="center"
            className="text-white/50 text-base md:text-lg lg:text-xl leading-relaxed"
          />
        </motion.div>

        {/* Stats Row */}
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
              <div className="text-sm md:text-base text-white/40 mt-1">
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
            className="flex flex-col items-center gap-2 text-white/30"
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

      {/* Bottom fade into next dark section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060812] to-transparent z-[5]" />
    </section>
  );
}