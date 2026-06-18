// app/contact/sections/ContactHero.jsx
"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  MessageSquare,
  Handshake,
  Rocket,
  Sparkles,
  Lightbulb,
  Wrench,
  TrendingUp,
  Target,
  Send,
  Phone,
} from "lucide-react";
import BlurText from "@/components/effects/BlurText/BlurText";
import ShinyText from "@/components/effects/ShinyText/ShinyText";
import DotField from "@/components/effects/DotField/DotField";
import GlareHover from "@/components/effects/GlareHover/GlareHover";

const floatingItems = [
  { text: "Let's Talk!", Icon: MessageSquare },
  { text: "Connect", Icon: Handshake },
  { text: "Collaborate", Icon: Rocket },
  { text: "Create", Icon: Sparkles },
  { text: "Innovate", Icon: Lightbulb },
  { text: "Build", Icon: Wrench },
  { text: "Grow", Icon: TrendingUp },
  { text: "Transform", Icon: Target },
];

export default function ContactHero() {
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
    <section className="relative w-full text-white text-center  overflow-hidden min-h-[50vh] flex items-center">

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
            <DotField
              dotRadius={1.5}
              dotSpacing={18}
              bulgeStrength={55}
              glowRadius={180}
              sparkle={false}
              waveAmplitude={0}
              cursorRadius={500}
              cursorForce={0.1}
              bulgeOnly={true}
              gradientFrom="rgba(91, 141, 239, 0.25)"
              gradientTo="rgba(45, 90, 168, 0.15)"
              glowColor="#1e3a6e"
            />
          </div>
        )}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] " />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Words with Icons */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {floatingItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.08, 0.08, 0],
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
            className="absolute font-bold text-2xl md:text-4xl lg:text-5xl text-[#5b8def]/10 whitespace-nowrap select-none flex items-center gap-2"
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

      {/* Ambient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.18, 0.08],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-56 md:w-80 h-56 md:h-80 bg-[#5b8def]/20 rounded-full blur-3xl pointer-events-none z-[2]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.12, 0.05],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-48 md:w-72 h-48 md:h-72 bg-[#2d5aa8]/20 rounded-full blur-3xl pointer-events-none z-[2]"
      />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 md:w-36 md:h-36 z-[4]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border border-white/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-3 border border-[#5b8def]/10 rounded-full"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32 z-[4]">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border border-white/10 rounded-full"
        />
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 w-full py-16 sm:py-20 lg:py-24 2xl:py-28"
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
          <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
            Get In Touch
          </span>
        </motion.div>

        {/* Heading */}
        <h1 className="mb-0">
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold leading-tight mb-2">
            <BlurText
              text="Let's Start a"
              delay={60}
              animateBy="words"
              direction="top"
              align="center"
              className="text-white"
            />
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold">
            <ShinyText
              text="Conversation"
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
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-5 max-w-2xl 2xl:max-w-3xl mx-auto"
        >
          <BlurText
            text="Have a project in mind? We'd love to hear about it. Reach out to our team and let's create something amazing together."
            delay={35}
            animateBy="words"
            direction="bottom"
            align="center"
            className="text-white/50 text-sm md:text-base lg:text-lg 2xl:text-xl leading-relaxed"
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <GlareHover
            glareColor="#5b8def"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
            className="inline-block rounded-full overflow-hidden w-full sm:w-auto"
          >
            <a
              href="#contact-form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#0f1d32] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base lg:text-lg shadow-xl hover:bg-blue-50 hover:gap-4 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              Send a Message
            </a>
          </GlareHover>

          <GlareHover
            glareColor="#ffffff"
            glareOpacity={0.25}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
            className="inline-block rounded-full overflow-hidden w-full sm:w-auto"
          >
            <a
              href="tel:+919605305453"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base lg:text-lg hover:bg-white/10 hover:border-white/50 hover:gap-4 transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              Call Us Now
            </a>
          </GlareHover>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10 md:mt-12"
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-white/30 cursor-pointer group"
            onClick={() => {
              const contactForm = document.querySelector('[id*="contact"]');
              contactForm?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <motion.span
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xs group-hover:text-white/60 transition-colors"
            >
              Scroll to connect
            </motion.span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5 group-hover:border-[#5b8def]/50 transition-colors"
            >
              <div className="w-1 h-2 bg-white/30 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave into next dark section */}
      <div className="absolute -bottom-px left-0 right-0 z-[5]">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80V50C40 50 40 35 80 35C120 35 120 20 160 20C200 20 200 30 240 30C280 30 280 15 320 15C360 15 360 28 400 28C440 28 440 12 480 12C520 12 520 22 560 22C600 22 600 10 640 10C680 10 680 25 720 25C760 25 760 8 800 8C840 8 840 22 880 22C920 22 920 14 960 14C1000 14 1000 28 1040 28C1080 28 1080 18 1120 18C1160 18 1160 32 1200 32C1240 32 1240 20 1280 20C1320 20 1320 38 1360 38C1400 38 1400 48 1440 48V80H0Z"
            fill="#060010"
          />
        </svg>
      </div>
    </section>
  );
}