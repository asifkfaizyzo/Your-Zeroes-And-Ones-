// app/rehome/page.jsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Cpu,
  TrendingUp,
  Palette,
  Code,
  Smartphone,
  Cloud,
  Brain,
  BarChart3,
  Search,
  Share2,
  Mail,
  Target,
  Megaphone,
  PenTool,
  Video,
  Music,
  Layers,
  Sparkles,
  ChevronDown,
} from "lucide-react";

// Import components
import NewNavbar from "@/components/landing/NewNavbar";

// Import effects
import LiquidEther from "@/components/effects/LiquidEther/LiquidEther";
import BlurText from "@/components/effects/BlurText/BlurText";
import ShinyText from "@/components/effects/ShinyText/ShinyText";
import ScrollReveal from "@/components/effects/ScrollReveal/ScrollReveal";
import ScrollVelocity from "@/components/effects/ScrollVelocity/ScrollVelocity";
import Threads from "@/components/effects/Threads/Threads";
import FloatingLines from "@/components/effects/FloatingLines/FloatingLines";
import { Spotlight } from "@/components/effects/Spotlight/Spotlight";
import CardSwap, { Card } from "@/components/effects/CardSwap/CardSwap";

export default function RehomePage() {
  return (
    <main className="bg-[#060010] font-['Inter',sans-serif]">
      <NewNavbar />

      {/* VH1 - Hero Welcome */}
      <VH1Hero />

      {/* VH2 - What We Do Intro */}
      <VH2Intro />

      {/* Service Sections with Stacking Effect */}
      <ServiceStackSection />

      {/* Curved Divider */}
      <CurvedDivider />

      {/* White Section (Navbar Test) */}
      <WhiteSection />
    </main>
  );
}

// ============================================
// VH1 - HERO WELCOME
// ============================================
function VH1Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background - LiquidEther with brighter colors */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={["#3b6cc9", "#5b8def", "#2d5aa8"]}
          mouseForce={25}
          cursorSize={120}
          isViscous={true}
          viscous={25}
          resolution={0.5}
          autoDemo={true}
          autoSpeed={0.4}
          autoIntensity={2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
        />
      </div>

      {/* Lighter overlay for better visibility */}
      <div className="absolute inset-0 bg-[#060010]/20 z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Welcome text */}
        <div className="mb-6">
          <BlurText
            text="Welcome to"
            delay={100}
            animateBy="words"
            direction="top"
            align="center"  // 👈 CENTERED
            className="text-white/70 text-lg md:text-xl tracking-widest uppercase"
          />
        </div>

        {/* Main headline with ShinyText */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8">
          <ShinyText
            text="Your Zeros and Ones"
            speed={3}
            delay={500}
            color="#5b8def"
            shineColor="#ffffff"
            spread={150}
            direction="left"
            className="font-bold"
          />
        </h1>

        {/* Tagline */}
        <div className="mb-12">
          <BlurText
            text="We complete your zeros and ones — transforming your digital vision into reality through innovative technology, strategic marketing, and creative design."
            delay={50}
            animateBy="words"
            direction="bottom"
            align="center"  // 👈 CENTERED
            className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          />
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/services"
            className="w-full sm:w-52 px-8 py-4 bg-[#20427f] text-white rounded-full font-semibold hover:bg-[#2d5aa8] transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#20427f]/30 text-center"
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-52 px-8 py-4 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all hover:scale-105 text-center"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}


// ============================================
// VH2 - WHAT WE DO INTRO
// ============================================
function VH2Intro() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-[#060010] overflow-hidden py-20">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="text-[#5b8def] text-sm font-semibold uppercase tracking-widest">
            Our Services
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="mb-8">
          <BlurText
            text="We craft digital experiences that drive results"
            delay={80}
            animateBy="words"
            direction="top"
            align="center"  // 👈 CENTERED
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          />
        </div>

        {/* Description */}
        <div className="mb-16">
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={1}
            blurStrength={2}
          >
            <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              From cutting-edge technology solutions to data-driven marketing
              strategies and stunning brand identities — we're your complete
              digital partner.
            </p>
          </ScrollReveal>
        </div>

        {/* Scroll down indicator for services */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-sm">Scroll to explore our services</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


// ============================================
// SERVICE STACK SECTION - All 3 services stacked
// ============================================
function ServiceStackSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Technology Section */}
      <TechnologySection scrollProgress={scrollYProgress} index={0} />

      {/* Marketing Section */}
      <MarketingSection scrollProgress={scrollYProgress} index={1} />

      {/* Branding Section */}
      <BrandingSection scrollProgress={scrollYProgress} index={2} />
    </div>
  );
}

// ============================================
// TECHNOLOGY SECTION
// ============================================
function TechnologySection({ scrollProgress, index }) {
  const y = useTransform(scrollProgress, [0, 0.33], [0, -50]);
  const scale = useTransform(scrollProgress, [0, 0.33], [1, 0.95]);
  const opacity = useTransform(scrollProgress, [0.25, 0.33], [1, 0.8]);

  return (
    <motion.section
      style={{ y, scale, opacity }}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#060010] py-20 sticky top-0"
    >
      {/* Background - Threads */}
      <div className="absolute inset-0 z-0">
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
          color={[0.2, 0.4, 0.8]}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#060010]/20 z-[1]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <span className="text-[#5b8def] text-sm font-semibold uppercase tracking-widest mb-4 block">
              Technology Solutions
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <BlurText
                text="We Build the Future"
                delay={60}
                animateBy="words"
                direction="left"
                align="left"  // 👈 LEFT aligned
                className="text-[#5b8def]"
              />
            </h2>

            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Cutting-edge software solutions that power your digital
              transformation. From AI-driven applications to scalable cloud
              infrastructure.
            </p>

            <Link
              href="/services/technology"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#20427f] text-white rounded-full font-semibold hover:bg-[#2d5aa8] transition-all hover:gap-4"
            >
              Explore Technology
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>

          {/* RIGHT: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Brain className="w-7 h-7" />, label: "AI/ML" },
                { icon: <Code className="w-7 h-7" />, label: "Web Dev" },
                { icon: <Smartphone className="w-7 h-7" />, label: "Mobile" },
                { icon: <Cloud className="w-7 h-7" />, label: "Cloud" },
                { icon: <Layers className="w-7 h-7" />, label: "DevOps" },
                { icon: <BarChart3 className="w-7 h-7" />, label: "Data" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, y: -8 }}
                  className="aspect-square flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-[#20427f]/30 to-[#0a1628]/50 border border-[#5b8def]/30 backdrop-blur-sm cursor-pointer group transition-all"
                >
                  <div className="text-[#5b8def] group-hover:text-white transition-colors mb-2">
                    {item.icon}
                  </div>
                  <span className="text-white/60 text-xs group-hover:text-white transition-colors font-medium">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <ScrollVelocity
                texts={[
                  "AI/ML • Web Development • Mobile Apps • Cloud Services • DevOps • Cyber Security",
                ]}
                velocity={50}
                className="text-[#5b8def]/30 text-base font-medium"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Next section preview */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-900/20 to-transparent z-20 flex items-end justify-center pb-4">
        <motion.button
          whileHover={{ y: -3 }}
          className="flex items-center gap-2 text-purple-400/60 text-sm"
        >
          <span>Digital Marketing</span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.section>
  );
}


// ============================================
// MARKETING SECTION
// ============================================
function MarketingSection({ scrollProgress, index }) {
  const y = useTransform(scrollProgress, [0.33, 0.66], [0, -50]);
  const scale = useTransform(scrollProgress, [0.33, 0.66], [1, 1]);
  const opacity = useTransform(scrollProgress, [0.58, 0.66], [1, 1]);

  return (
    <motion.section
      style={{ y, scale, opacity }}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0815] py-20 sticky top-0"
    >
      {/* Background - FloatingLines */}
      <div className="absolute inset-0 z-0">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>

      <div className="absolute inset-0 bg-[#0a0815]/30 z-[1]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Visual - Bento Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[350px]">
              {/* Large card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="col-span-2 row-span-2 rounded-2xl bg-gradient-to-br from-purple-600/20 to-[#20427f]/20 border border-purple-500/30 p-6 flex flex-col justify-between backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/20">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <span className="text-purple-300 font-semibold">Growth</span>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-1">250%</div>
                  <div className="text-white/50 text-sm">Average ROI</div>
                </div>
              </motion.div>

              {[
                {
                  icon: <Search className="w-5 h-5" />,
                  label: "SEO",
                  value: "#1",
                },
                {
                  icon: <Share2 className="w-5 h-5" />,
                  label: "Social",
                  value: "10M+",
                },
                {
                  icon: <Target className="w-5 h-5" />,
                  label: "PPC",
                  value: "50+",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-[#20427f]/10 border border-purple-500/20 p-3 flex flex-col justify-between backdrop-blur-sm cursor-pointer group"
                >
                  <div className="text-purple-400 group-hover:text-purple-300">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">
                      {item.value}
                    </div>
                    <div className="text-white/40 text-xs">{item.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <ScrollVelocity
                texts={[
                  "SEO • Social Media • PPC • Content Marketing • Email Campaigns • Analytics",
                ]}
                velocity={-40}
                className="text-purple-400/30 text-base font-medium"
              />
            </div>
          </motion.div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left lg:text-right order-1 lg:order-2"
          >
            <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-4 block">
              Digital Marketing
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <BlurText
                text="We Grow Your Reach"
                delay={60}
                animateBy="words"
                direction="right"
                align="right"  // 👈 RIGHT aligned (for lg screens)
                className="text-purple-400"
              />
            </h2>

            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Data-driven marketing strategies that connect you with your
              audience. From SEO to social media, we amplify your digital
              presence.
            </p>

            <Link
              href="/services/digital-marketing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:gap-4"
            >
              Explore Marketing
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Next section preview */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cyan-900/20 to-transparent z-20 flex items-end justify-center pb-4">
        <motion.button
          whileHover={{ y: -3 }}
          className="flex items-center gap-2 text-cyan-400/60 text-sm"
        >
          <span>Branding & Design</span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.section>
  );
}


// ============================================
// BRANDING SECTION - with CardSwap
// ============================================
function BrandingSection({ scrollProgress, index }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060812] py-20">
      {/* Background - Spotlight with blue tones */}
      <div className="absolute inset-0 z-0">
        <Spotlight
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(200, 80%, 70%, .1) 0, hsla(200, 80%, 50%, .03) 50%, hsla(200, 80%, 40%, 0) 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(200, 80%, 70%, .08) 0, hsla(200, 80%, 50%, .02) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(200, 80%, 70%, .05) 0, hsla(200, 80%, 40%, .02) 80%, transparent 100%)"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">
              Branding & Design
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <BlurText
                text="We Create Your Identity"
                delay={60}
                animateBy="words"
                direction="left"
                align="left"  // 👈 LEFT aligned
                className="text-cyan-400"
              />
            </h2>

            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Memorable brand experiences that resonate with your audience. From
              logo design to complete visual identities and multimedia
              production.
            </p>

            <Link
              href="/services/branding-design"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-[#20427f] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:gap-4"
            >
              Explore Branding
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>

          {/* RIGHT: Visual - CardSwap */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[450px]"
          >
            <CardSwap
              cardDistance={50}
              verticalDistance={60}
              delay={4000}
              pauseOnHover={false}
            >
              <Card>
                <div className="w-full h-full bg-gradient-to-br from-cyan-500/30 to-[#20427f]/50 rounded-2xl p-8 flex flex-col items-center justify-center border border-cyan-500/30">
                  <div className="p-5 rounded-2xl bg-cyan-500/20 mb-6">
                    <Palette className="w-12 h-12 text-cyan-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Brand Identity
                  </h3>
                  <p className="text-white/60 text-center text-sm">
                    Complete visual identity systems that make your brand
                    memorable
                  </p>
                </div>
              </Card>
              <Card>
                <div className="w-full h-full bg-gradient-to-br from-[#20427f]/50 to-[#5b8def]/30 rounded-2xl p-8 flex flex-col items-center justify-center border border-[#5b8def]/30">
                  <div className="p-5 rounded-2xl bg-[#5b8def]/20 mb-6">
                    <PenTool className="w-12 h-12 text-[#5b8def]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Logo Design
                  </h3>
                  <p className="text-white/60 text-center text-sm">
                    Distinctive logos that capture your brand essence
                  </p>
                </div>
              </Card>
              <Card>
                <div className="w-full h-full bg-gradient-to-br from-[#1a3668]/50 to-cyan-600/30 rounded-2xl p-8 flex flex-col items-center justify-center border border-cyan-600/30">
                  <div className="p-5 rounded-2xl bg-cyan-600/20 mb-6">
                    <Video className="w-12 h-12 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Video Production
                  </h3>
                  <p className="text-white/60 text-center text-sm">
                    Engaging video content that tells your story
                  </p>
                </div>
              </Card>
            </CardSwap>
          </motion.div>
        </div>

        {/* Additional services - LEFT aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-start gap-3 mt-12"
        >
          {[
            { icon: <Music className="w-4 h-4" />, label: "Audio Production" },
            { icon: <Layers className="w-4 h-4" />, label: "Graphic Design" },
            { icon: <Cpu className="w-4 h-4" />, label: "AI Video" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-2 cursor-pointer group"
            >
              <div className="text-cyan-400 group-hover:text-cyan-300">
                {item.icon}
              </div>
              <span className="text-white/60 text-sm group-hover:text-white">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8">
          <ScrollVelocity
            texts={[
              "Brand Identity • Logo Design • Graphic Design • Video Production • Audio Production • AI Video",
            ]}
            velocity={30}
            className="text-cyan-400/20 text-base font-medium"
          />
        </div>
      </div>
    </section>
  );
}

// ============================================
// CURVED DIVIDER
// ============================================
function CurvedDivider() {
  return (
    <div className="relative h-32 bg-[#060812]">
      <svg
        className="absolute bottom-0 w-full h-32"
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64 C480,128 960,0 1440,64 L1440,128 L0,128 Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

// ============================================
// WHITE SECTION (Navbar Test)
// ============================================
function WhiteSection() {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center py-20">
      <div className="text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how our comprehensive services can help you achieve
            your digital goals and drive real results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-56 px-8 py-4 bg-[#20427f] text-white rounded-xl font-semibold hover:bg-[#1a3668] transition-all hover:scale-105 hover:shadow-lg inline-flex items-center justify-center gap-2"
            >
              Get Free Consultation
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
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="w-full sm:w-56 px-8 py-4 border-2 border-[#20427f] text-[#20427f] rounded-xl font-semibold hover:bg-[#20427f] hover:text-white transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              View Our Work
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-500">
            {[
              { label: "50+ Projects" },
              { label: "30+ Happy Clients" },
              { label: "24/7 Support" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
