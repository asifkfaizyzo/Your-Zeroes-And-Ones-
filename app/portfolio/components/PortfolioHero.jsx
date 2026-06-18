// app/portfolio/components/PortfolioHero.jsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BlurText from "@/components/effects/BlurText/BlurText";
import ShinyText from "@/components/effects/ShinyText/ShinyText";
import FloatingLines from "@/components/effects/FloatingLines/FloatingLines";

export default function PortfolioHero({ stats }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const heroStats = stats || { projects: 20, clients: 30, satisfaction: 100 };

  useEffect(() => {
    setIsClient(true);
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="relative bg-[#060010] overflow-hidden">
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
          <FloatingLines
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={6}
            lineDistance={6}
            bendRadius={6}
            bendStrength={-0.8}
            interactive={true}
            parallax={true}
            animationSpeed={0.8}
            linesGradient={["#1e3a6e", "#5b8def", "#2d5aa8", "#5b8def", "#1e3a6e"]}
          />
        )}
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-[#060010]/40" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating accent elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-20 h-20 bg-[#5b8def]/10 rounded-2xl blur-sm z-[3]"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-10 w-32 h-32 bg-[#2d5aa8]/10 rounded-full blur-sm z-[3]"
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 md:w-36 md:h-36 z-[3]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border border-white/10 rounded-full"
        />
      </div>
      <div className="absolute top-20 right-0 w-20 h-20 md:w-28 md:h-28 z-[3]">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border border-[#5b8def]/10 rounded-full"
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 w-full"
        style={{
          paddingLeft: "clamp(2rem, 8vw, 12rem)",
          paddingRight: "clamp(2rem, 8vw, 12rem)",
        }}
      >
        <div className="text-center py-8 pt-16 md:pt-20 xl:pb-35">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              Our Work
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="pt-4 mb-6">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2">
              <BlurText
                text="Our"
                delay={60}
                animateBy="words"
                direction="top"
                align="center"
                className="text-white"
              />
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              <ShinyText
                text="Portfolio"
                speed={2}
                delay={0.4}
                color="#5b8def"
                shineColor="#ffffff"
                spread={150}
                direction="left"
                className="font-bold"
                loop={true}
              />
            </span>
          </h1>

          {/* Description */}
          <div className="mb-10 max-w-3xl mx-auto">
            <BlurText
              text="Explore our collection of successful projects spanning web development, mobile apps, branding, and digital marketing."
              delay={40}
              animateBy="words"
              direction="bottom"
              align="center"
              className="text-white/50 text-sm md:text-base lg:text-lg leading-relaxed"
            />
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {[
              { value: `${heroStats.projects}+`, label: "Projects" },
              { value: `${heroStats.clients}+`, label: "Clients" },
              { value: `${heroStats.satisfaction}%`, label: "Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave — fills into next dark section */}
      <div className="absolute -bottom-px left-0 right-0 z-[5]">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#060010"
          />
        </svg>
      </div>
    </section>
  );
}