// app/about/sections/AboutHero.jsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb, Award, TrendingUp, Shield, Star, Heart, Globe, Rocket,
} from "lucide-react";
import BlurText from "@/components/effects/BlurText/BlurText";
import ShinyText from "@/components/effects/ShinyText/ShinyText";
import Prism from "@/components/effects/Prism/Prism";

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

export default function AboutHero() {
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
    <section className="relative w-full text-white text-center bg-[#060010] overflow-hidden min-h-[70vh] flex items-center">
      
      {/* === Background: Prism on desktop, gradient on mobile === */}
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
                  radial-gradient(circle at 30% 30%, #5b8def 0%, transparent 50%),
                  radial-gradient(circle at 70% 70%, #2d5aa8 0%, transparent 50%)
                `,
              }}
            />
          </>
        ) : (
          <Prism
            animationType="3D Rotate"
            timeScale={0.3}
            height={6.3}
            baseWidth={5.4}
            scale={2.3}
            hueShift={-0.2}
            colorFrequency={1}
            noise={0}
            glow={1}
            bloom={0.8}
            transparent={true}
            suspendWhenOffscreen={true}
          />
        )}
      </div>

      {/* === Dark overlay to ensure text readability === */}
      <div className="absolute inset-0 z-[1] bg-[#060010]/50" />

      {/* === Floating words with icons === */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {floatingItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.1, 0.1, 0],
              scale: [0.8, 1, 1, 0.9],
              y: [0, -30, -30, -60],
              rotate: [-5 + i * 3, 5 + i * 2, -5 + i * 3],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              delay: i * 1.8,
              ease: "easeInOut",
            }}
            className="absolute font-bold text-2xl md:text-4xl lg:text-5xl text-white/[0.06] whitespace-nowrap select-none flex items-center gap-2"
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

      {/* === CONTENT === */}
      <div
        className="relative z-10 w-full py-16 md:py-20"
        style={{
          paddingLeft: "clamp(2rem, 8vw, 12rem)",
          paddingRight: "clamp(2rem, 8vw, 12rem)",
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          
        </motion.div>

        {/* Heading */}
        <h1 className="pt-6 mb-6">
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2">
            <BlurText
              text="About Your Zeros"
              delay={60}
              animateBy="words"
              direction="top"
              align="center"
              className="text-white"
            />
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
            <ShinyText
              text="and Ones"
              speed={2}
              delay={0.6}
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
        <div className="mb-10 max-w-2xl mx-auto">
          <BlurText
            text="Leading the digital transformation journey for businesses worldwide. We combine technical expertise with business acumen to deliver."
            delay={40}
            animateBy="words"
            direction="bottom"
            align="center"
            className="text-white/50 text-sm md:text-base lg:text-lg leading-relaxed"
          />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-white/30 cursor-pointer group"
            onClick={() => {
              document
                .getElementById("who-we-are")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <motion.span
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs group-hover:text-white/60 transition-colors"
            >
              Discover our story
            </motion.span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5 group-hover:border-[#5b8def]/50 transition-colors"
            >
              <div className="w-1 h-2 bg-white/30 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* === Corner Decorations === */}
      <div className="absolute top-0 left-0 w-24 h-24 md:w-36 md:h-36 z-[3]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border border-white/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-3 border border-white/[0.06] rounded-full"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32 z-[3]">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border border-white/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border border-white/[0.06] rounded-full"
        />
      </div>
    </section>
  );
}