// components/home/ServiceStackSection.jsx
"use client";

import React, { useRef, forwardRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Share2,
  Target,
  Mail,
  BarChart3,
  FileText,
  PenTool,
  Video,
  Music,
  Layers,
  Cpu,
  Palette,
  TrendingUp,
  Code,
  Smartphone,
  Brain,
  Cloud,
  ChevronDown,
} from "lucide-react";
import Threads from "@/components/effects/Threads/Threads";
import FloatingLines from "@/components/effects/FloatingLines/FloatingLines";
import { Spotlight } from "@/components/effects/Spotlight/Spotlight";
import BlurText from "@/components/effects/BlurText/BlurText";
import ScrollVelocity from "@/components/effects/ScrollVelocity/ScrollVelocity";
import Aurora from "@/components/effects/Aurora/Aurora";
import GlareHover from "@/components/effects/GlareHover/GlareHover";
import CardSwap, { Card } from "@/components/effects/CardSwap/CardSwap";

export default function ServiceStackSection({
  marketingSectionRef,
  brandingSectionRef,
  technologySectionRef,
  scrollToSection,
}) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false); // desktop by default
  const [isClient, setIsClient] = useState(false); // prevent SSR flash

  useEffect(() => {
    setIsClient(true);

    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px = perfect for 14" laptops
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative">
      <MarketingSection
        ref={marketingSectionRef}
        scrollProgress={scrollYProgress}
        onNextClick={() => scrollToSection(brandingSectionRef)}
        isMobile={isMobile}
        isClient={isClient}
      />

      <BrandingSection
        ref={brandingSectionRef}
        scrollProgress={scrollYProgress}
        onNextClick={() => scrollToSection(technologySectionRef)}
        isMobile={isMobile}
        isClient={isClient}
      />

      <TechnologySection
        ref={technologySectionRef}
        scrollProgress={scrollYProgress}
        isMobile={isMobile}
        isClient={isClient}
      />
    </div>
  );
}

// ============================================
// MARKETING SECTION
// ============================================
const MarketingSection = forwardRef(
  ({ scrollProgress, onNextClick, isMobile, isClient }, ref) => {
    // Desktop-only transforms
    const y = useTransform(scrollProgress, [0, 0.33], [0, isMobile ? 0 : -50]);
    const scale = useTransform(
      scrollProgress,
      [0, 0.33],
      [1, isMobile ? 1 : 0.95],
    );
    const opacity = useTransform(
      scrollProgress,
      [0.25, 0.33],
      [1, isMobile ? 1 : 0.8],
    );

    const marketingServices = [
      { icon: <Search className="w-5 h-5 md:w-7 md:h-7" />, label: "SEO" },
      {
        icon: <Share2 className="w-5 h-5 md:w-7 md:h-7" />,
        label: "Social Media",
      },
      { icon: <Target className="w-5 h-5 md:w-7 md:h-7" />, label: "PPC Ads" },
      { icon: <Mail className="w-5 h-5 md:w-7 md:h-7" />, label: "Email" },
      {
        icon: <BarChart3 className="w-5 h-5 md:w-7 md:h-7" />,
        label: "Analytics",
      },
      {
        icon: <FileText className="w-5 h-5 md:w-7 md:h-7" />,
        label: "Content",
      },
    ];

    return (
      <motion.section
        ref={ref}
        style={isMobile ? {} : { y, scale, opacity }}
        className={`relative min-h-screen flex items-center overflow-hidden bg-[#060010] py-16 md:py-20 ${
          isMobile ? "" : "sticky top-0"
        }`}
      >
        {/* Background - No flash */}
        <div className="absolute inset-0 z-0">
          {!isClient ? (
            <div className="absolute inset-0 bg-[#060010]" />
          ) : isMobile ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[#060010] via-[#0a0033] to-[#060010]" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `
                  radial-gradient(circle at 30% 30%, #3b6cc9 0%, transparent 50%),
                  radial-gradient(circle at 70% 70%, #5b8def 0%, transparent 50%)
                `,
                }}
              />
            </>
          ) : (
            <Threads
              amplitude={1}
              distance={0}
              enableMouseInteraction={true}
              color={[0.2, 0.4, 0.8]}
            />
          )}
        </div>

        <div className="absolute inset-0 bg-[#060010]/20 z-[1]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <span className="text-[#5b8def] text-xs md:text-sm font-semibold uppercase tracking-widest mb-3 md:mb-4 block">
                Digital Marketing
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                <BlurText
                  text="We Grow Your Reach"
                  delay={60}
                  animateBy="words"
                  direction="left"
                  align="left"
                  className="text-white"
                />
              </h2>

              <p className="text-white/50 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                Data-driven marketing strategies that connect you with your
                audience. From SEO to social media, we amplify your digital
                presence and drive measurable results.
              </p>

              <GlareHover
                glareColor="#5b8def"
                glareOpacity={0.35}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                className="inline-block rounded-full overflow-hidden"
              >
                <Link
                  href="/services/digital-marketing"
                  className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-[#1e3a6e] text-white rounded-full font-semibold text-sm md:text-base hover:bg-[#2d5aa8] transition-all duration-300 hover:gap-4"
                >
                  Explore Marketing
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
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
              </GlareHover>
            </motion.div>

            {/* Service Cards Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {marketingServices.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0, duration: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={isMobile ? {} : { scale: 1.08, y: -8 }}
                    className="aspect-square flex flex-col items-center justify-center p-2 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#20427f]/30 to-[#0a1628]/50 border border-[#5b8def]/30 backdrop-blur-sm cursor-pointer group transition-transform duration-300 ease-out"
                  >
                    <div className="text-[#5b8def] group-hover:text-white transition-colors duration-300 mb-1 md:mb-2">
                      {item.icon}
                    </div>
                    <span className="text-white/60 text-[10px] md:text-xs group-hover:text-white transition-colors duration-300 font-medium text-center">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Scroll Velocity - Desktop only */}
          {!isMobile && (
            <div className="mt-12 -mx-4 lg:-mx-8">
              <div className="w-screen relative left-1/2 -translate-x-1/2">
                <ScrollVelocity
                  texts={[
                    "SEO‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Social Media‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ PPC Advertising‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Content Marketing‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Email Campaigns‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Analytics & Reporting‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ",
                  ]}
                  velocity={50}
                  className="text-[#5b8def]/30 text-base font-medium"
                />
              </div>
            </div>
          )}
        </div>

        {/* Next Section Button - Desktop only */}
        {!isMobile && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-purple-900/20 to-transparent z-20 flex items-end justify-center pb-4">
            <motion.button
              onClick={onNextClick}
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 text-purple-400/60 text-sm cursor-pointer hover:text-purple-400 transition-colors"
            >
              <span>Branding & Design</span>
              <ChevronDown className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </motion.section>
    );
  },
);

MarketingSection.displayName = "MarketingSection";

// ============================================
// BRANDING SECTION
// ============================================
const BrandingSection = forwardRef(
  ({ scrollProgress, onNextClick, isMobile, isClient }, ref) => {
    // Desktop-only transforms
    const y = useTransform(
      scrollProgress,
      [0.33, 0.66],
      [0, isMobile ? 0 : -50],
    );
    const scale = useTransform(scrollProgress, [0.33, 0.66], [1, 1]);
    const opacity = useTransform(scrollProgress, [0.58, 0.66], [1, 1]);

    const brandingServices = [
      {
        icon: <PenTool className="w-4 h-4 md:w-5 md:h-5" />,
        label: "Logos",
        value: "25+",
      },
      {
        icon: <Video className="w-4 h-4 md:w-5 md:h-5" />,
        label: "Videos",
        value: "120+",
      },
      {
        icon: <Music className="w-4 h-4 md:w-5 md:h-5" />,
        label: "Audio",
        value: "45+",
      },
      {
        icon: <Layers className="w-4 h-4 md:w-5 md:h-5" />,
        label: "Graphics",
        value: "300+",
      },
      {
        icon: <Cpu className="w-4 h-4 md:w-5 md:h-5" />,
        label: "AI Videos",
        value: "35+",
      },
    ];

    return (
      <motion.section
        ref={ref}
        style={isMobile ? {} : { y, scale, opacity }}
        className={`relative min-h-screen flex items-center overflow-hidden bg-[#0a0815] py-16 md:py-20 ${
          isMobile ? "" : "sticky top-0"
        }`}
      >
        {/* Background - No flash */}
        <div className="absolute inset-0 z-0">
          {!isClient ? (
            <div className="absolute inset-0 bg-[#0a0815]" />
          ) : isMobile ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a0815] via-[#150a25] to-[#0a0815]" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `
                  radial-gradient(circle at 20% 50%, #9333ea 0%, transparent 50%),
                  radial-gradient(circle at 80% 50%, #ec4899 0%, transparent 50%)
                `,
                }}
              />
            </>
          ) : (
            <FloatingLines
              enabledWaves={["top", "middle", "bottom"]}
              lineCount={5}
              lineDistance={5}
              bendRadius={5}
              bendStrength={-0.5}
              interactive={true}
              parallax={true}
            />
          )}
        </div>

        <div className="absolute inset-0 bg-[#0a0815]/30 z-[1]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            {/* Cards Grid - Mobile: After text, Desktop: Before text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              {/* Mobile Layout */}
              {isMobile ? (
                <div className="grid grid-cols-3 gap-2">
                  {/* Brand Identity - spans 2 columns */}
                  <div className="col-span-2 rounded-xl bg-gradient-to-br from-purple-600/20 to-[#20427f]/20 border border-purple-500/30 p-3 flex items-center justify-between backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-purple-500/20">
                        <Palette className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-purple-300 font-semibold text-xs block">
                          Brand Identity
                        </span>
                        <span className="text-white/40 text-[10px]">
                          Complete Systems
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">25+</div>
                      <div className="text-white/50 text-[10px]">Brands</div>
                    </div>
                  </div>

                  {/* First small card */}
                  <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-[#20427f]/10 border border-purple-500/20 p-2 flex flex-col justify-between backdrop-blur-sm">
                    <div className="text-purple-400">
                      {brandingServices[0].icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {brandingServices[0].value}
                      </div>
                      <div className="text-white/40 text-[10px]">
                        {brandingServices[0].label}
                      </div>
                    </div>
                  </div>

                  {/* Brand Consulting - spans 2 columns */}
                  <div className="col-span-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-[#20427f]/10 border border-purple-500/20 p-3 flex items-center justify-between backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-purple-500/20">
                        <TrendingUp className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-purple-300 font-semibold text-xs block">
                          Brand Consulting
                        </span>
                        <span className="text-white/40 text-[10px]">
                          Strategy & Growth
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">20+</div>
                      <div className="text-white/50 text-[10px]">Clients</div>
                    </div>
                  </div>

                  {/* Remaining small cards */}
                  {brandingServices.slice(1).map((item, i) => (
                    <div
                      key={item.label}
                      className="rounded-xl bg-gradient-to-br from-purple-500/10 to-[#20427f]/10 border border-purple-500/20 p-2 flex flex-col justify-between backdrop-blur-sm aspect-square"
                    >
                      <div className="text-purple-400">{item.icon}</div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {item.value}
                        </div>
                        <div className="text-white/40 text-[10px]">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Desktop Layout - Original */
                <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[380px]">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="col-span-2 row-span-1 rounded-2xl bg-gradient-to-br from-purple-600/20 to-[#20427f]/20 border border-purple-500/30 p-4 flex items-center justify-between backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-purple-500/20">
                        <Palette className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-purple-300 font-semibold block">
                          Brand Identity
                        </span>
                        <span className="text-white/40 text-xs">
                          Complete Systems
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">25+</div>
                      <div className="text-white/50 text-xs">Brands</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.0, duration: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="row-span-1 rounded-2xl bg-gradient-to-br from-purple-500/10 to-[#20427f]/10 border border-purple-500/20 p-3 flex flex-col justify-between backdrop-blur-sm cursor-pointer group transition-transform duration-300 ease-out"
                  >
                    <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                      {brandingServices[0].icon}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">
                        {brandingServices[0].value}
                      </div>
                      <div className="text-white/40 text-xs">
                        {brandingServices[0].label}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="col-span-2 row-span-1 rounded-2xl bg-gradient-to-br from-purple-500/10 to-[#20427f]/10 border border-purple-500/20 p-4 flex items-center justify-between backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-purple-500/20">
                        <TrendingUp className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-purple-300 font-semibold block">
                          Brand Consulting
                        </span>
                        <span className="text-white/40 text-xs">
                          Strategy & Growth
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">20+</div>
                      <div className="text-white/50 text-xs">Clients</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.0, duration: 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="row-span-1 rounded-2xl bg-gradient-to-br from-purple-500/10 to-[#20427f]/10 border border-purple-500/20 p-3 flex flex-col justify-between backdrop-blur-sm cursor-pointer group transition-transform duration-300 ease-out"
                  >
                    <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                      {brandingServices[1].icon}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">
                        {brandingServices[1].value}
                      </div>
                      <div className="text-white/40 text-xs">
                        {brandingServices[1].label}
                      </div>
                    </div>
                  </motion.div>

                  {brandingServices.slice(2).map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0, duration: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-[#20427f]/10 border border-purple-500/20 p-3 flex flex-col justify-between backdrop-blur-sm cursor-pointer group transition-transform duration-300 ease-out"
                    >
                      <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">
                          {item.value}
                        </div>
                        <div className="text-white/40 text-xs">
                          {item.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-left lg:text-right order-1 lg:order-2"
            >
              <span className="text-purple-400 text-xs md:text-sm font-semibold uppercase tracking-widest mb-3 md:mb-4 block">
                Branding & Design
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                <BlurText
                  text="We Create Your Identity"
                  delay={60}
                  animateBy="words"
                  direction="right"
                  align={isMobile ? "left" : "right"}
                  className="text-white"
                />
              </h2>

              <p className="text-white/50 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                Memorable brand experiences that resonate with your audience.
                From logo design to complete visual identities and multimedia
                production.
              </p>

              <GlareHover
                glareColor="#cb79d6"
                glareOpacity={0.4}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                className="inline-block rounded-full overflow-hidden"
              >
                <Link
                  href="/services/branding-design"
                  className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-[#82168c] text-white rounded-full font-semibold text-sm md:text-base hover:bg-[#a922ba] transition-all duration-300 hover:gap-4 hover:shadow-lg hover:shadow-purple-500/40"
                >
                  Explore Branding
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
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
              </GlareHover>
            </motion.div>
          </div>

          {/* Scroll Velocity - Desktop only */}
          {!isMobile && (
            <div className="mt-12 -mx-4 lg:-mx-8">
              <div className="w-screen relative left-1/2 -translate-x-1/2">
                <ScrollVelocity
                  texts={[
                    "Brand Identity‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Logo Design‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Graphic Design‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Video Production‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Audio Production‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ AI Video‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Brand Consulting‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •",
                  ]}
                  velocity={-40}
                  className="text-purple-400/30 text-base font-medium"
                />
              </div>
            </div>
          )}
        </div>

        {/* Next Section Button - Desktop only */}
        {!isMobile && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cyan-900/20 to-transparent z-20 flex items-end justify-center pb-4">
            <motion.button
              onClick={onNextClick}
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 text-cyan-400/60 text-sm cursor-pointer hover:text-cyan-400 transition-colors"
            >
              <span>Technology Solutions</span>
              <ChevronDown className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </motion.section>
    );
  },
);

BrandingSection.displayName = "BrandingSection";

// ============================================
// TECHNOLOGY SECTION
// ============================================
const TechnologySection = forwardRef(
  ({ scrollProgress, isMobile, isClient }, ref) => {
    const techServices = [
      {
        tabIcon: Code,
        label: "Web Development",
        bgColor: "#0a1628",
        tabColor: "text-blue-400",
        auroraColors: ["#0f2744", "#1a3a5c", "#244a6e"],
        techIcons: [
          "/images/tech-icons/react.svg",
          "/images/tech-icons/nextjs.svg",
          "/images/tech-icons/nodejs.svg",
          "/images/tech-icons/typescript.svg",
          "/images/tech-icons/postgresql.svg",
          "/images/tech-icons/mongodb.svg",
        ],
      },
      {
        tabIcon: Smartphone,
        label: "Mobile Apps",
        bgColor: "#1a1a3e",
        tabColor: "text-indigo-400",
        auroraColors: ["#1a1a3e", "#2a2a5e", "#3a3a7e"],
        techIcons: [
          "/images/tech-icons/react-native.svg",
          "/images/tech-icons/flutter.svg",
          "/images/tech-icons/swift.svg",
          "/images/tech-icons/android-studio.svg",
          "/images/tech-icons/java.svg",
          "/images/tech-icons/kotlin.svg",
        ],
      },
      {
        tabIcon: Brain,
        label: "AI & Machine Learning",
        bgColor: "#0a1a2a",
        tabColor: "text-cyan-400",
        auroraColors: ["#0d3d4d", "#134e5e", "#1a5c5c"],
        techIcons: [
          "/images/data-tools/TensorFlow.svg",
          "/images/data-tools/Airbyte.svg",
          "/images/data-tools/SageMaker.svg",
          "/images/data-tools/azureml.svg",
          "/images/data-tools/Dbt.svg",
          "/images/data-tools/fivetran.svg",
        ],
      },
      {
        tabIcon: Cloud,
        label: "Cloud Services",
        bgColor: "#0d2137",
        tabColor: "text-sky-400",
        auroraColors: ["#0c2d4a", "#1a4a6e", "#2a6090"],
        techIcons: [
          "/images/cloud-platforms/aws.svg",
          "/images/cloud-platforms/azure.svg",
          "/images/cloud-platforms/gcp.svg",
          "/images/cloud-platforms/digitalocean.svg",
          "/images/cloud-platforms/cloudflare.svg",
          "/images/cloud-platforms/Oracle.svg",
        ],
      },
    ];

    return (
      <section ref={ref} className="relative overflow-hidden bg-[#060812]">
        <div className="relative min-h-screen flex items-center py-16 md:py-20">
          {/* Background - No flash */}
          <div className="absolute inset-0 z-0">
            {!isClient ? (
              <div className="absolute inset-0 bg-[#060812]" />
            ) : isMobile ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-[#060812] via-[#0a1525] to-[#060812]" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `
                    radial-gradient(circle at 50% 30%, #06b6d4 0%, transparent 50%),
                    radial-gradient(circle at 50% 70%, #3b82f6 0%, transparent 50%)
                  `,
                  }}
                />
              </>
            ) : (
              <Spotlight
                gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(200, 80%, 70%, .1) 0, hsla(200, 80%, 50%, .03) 50%, hsla(200, 80%, 40%, 0) 80%)"
                gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(200, 80%, 70%, .08) 0, hsla(200, 80%, 50%, .02) 80%, transparent 100%)"
                gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(200, 80%, 70%, .05) 0, hsla(200, 80%, 40%, .02) 80%, transparent 100%)"
              />
            )}
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
            {/* Mobile Layout - Matching MarketingSection structure */}
            {isMobile ? (
              <div className="grid grid-cols-1 gap-8 md:gap-12 items-center">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-left mb-8"
                >
                  <span className="text-cyan-400 text-xs md:text-sm font-semibold uppercase tracking-widest mb-3 md:mb-4 block">
                    Technology Solutions
                  </span>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                    <BlurText
                      text="We Build the Future"
                      delay={60}
                      animateBy="words"
                      direction="left"
                      align="left"
                      className="text-white"
                    />
                  </h2>

                  <p className="text-white/50 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                    Cutting-edge software solutions that power your digital
                    transformation. From AI-driven applications to scalable
                    cloud infrastructure and secure systems.
                  </p>

                  <GlareHover
                    glareColor="#06b6d4"
                    glareOpacity={0.35}
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}
                    className="inline-block rounded-full overflow-hidden"
                  >
                    <Link
                      href="/services/technology"
                      className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-[#0e7490] text-white rounded-full font-semibold text-sm md:text-base hover:bg-[#0891b2] transition-all duration-300"
                    >
                      Explore Technology
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5"
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
                  </GlareHover>
                </motion.div>

                {/* Card Swap Container */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Wrapper to properly contain and center the CardSwap */}
                  <div 
                    className="relative mr-auto"
                    style={{ 
                      width: 300, 
                      height: 320,
                    }}
                  >
                    {/* Inner positioning wrapper - offset to account for upward card stacking */}
                    <div 
                      className="absolute"
                      style={{ 
                        top: '55%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <CardSwap
                        cardDistance={30}
                        verticalDistance={30}
                        skewAmount={2}
                        delay={4000}
                        pauseOnHover={false}
                        width={260}
                        height={200}
                        zDepthMultiplier={0.5}
                        centered={true}
                      >
                        {techServices.map((service, index) => {
                          const TabIcon = service.tabIcon;
                          return (
                            <Card key={index}>
                              <div
                                className="w-full h-full rounded-xl overflow-hidden relative border border-white/10"
                                style={{ backgroundColor: service.bgColor }}
                              >
                                {/* Tab Label */}
                                <div className="absolute top-2 left-2 z-20">
                                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 backdrop-blur-md border border-white/10">
                                    <TabIcon
                                      className={`w-3 h-3 ${service.tabColor}`}
                                    />
                                    <span className="text-white/90 text-xs font-medium">
                                      {service.label}
                                    </span>
                                  </div>
                                </div>

                                <div className="absolute inset-0 z-0">
                                  <Aurora
                                    colorStops={service.auroraColors}
                                    blend={0.5}
                                    amplitude={0.8}
                                    speed={0.5}
                                  />
                                </div>

                                <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/30" />

                                {/* Tech Icons Grid */}
                                <div className="absolute inset-0 z-10 flex items-center justify-center pt-4">
                                  <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-lg border border-white/15">
                                    <div className="grid grid-cols-3 gap-1.5">
                                      {service.techIcons.map(
                                        (iconPath, iconIndex) => (
                                          <div
                                            key={iconIndex}
                                            className="w-9 h-9 flex items-center justify-center rounded-md bg-white/5 border border-white/10"
                                          >
                                            <img
                                              src={iconPath}
                                              alt=""
                                              className="w-5 h-5 object-contain"
                                            />
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                      </CardSwap>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              /* Desktop Layout - COMPLETELY UNCHANGED */
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-left"
                  >
                    <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 block">
                      Technology Solutions
                    </span>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                      <BlurText
                        text="We Build the Future"
                        delay={60}
                        animateBy="words"
                        direction="left"
                        align="left"
                        className="text-white"
                      />
                    </h2>

                    <p className="text-white/50 text-lg leading-relaxed mb-8">
                      Cutting-edge software solutions that power your digital
                      transformation. From AI-driven applications to scalable
                      cloud infrastructure and secure systems.
                    </p>

                    <GlareHover
                      glareColor="#06b6d4"
                      glareOpacity={0.35}
                      glareAngle={-30}
                      glareSize={300}
                      transitionDuration={800}
                      playOnce={false}
                      className="inline-block rounded-full overflow-hidden"
                    >
                      <Link
                        href="/services/technology"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#0e7490] text-white rounded-full font-semibold text-sm hover:bg-[#0891b2] transition-all duration-300 hover:gap-4 hover:shadow-lg hover:shadow-cyan-500/40"
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
                    </GlareHover>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative h-[450px] z-20"
                  >
                    <CardSwap
                      cardDistance={90}
                      verticalDistance={70}
                      skewAmount={6}
                      delay={4000}
                      pauseOnHover={true}
                      width={500}
                      height={380}
                      zDepthMultiplier={0.9}
                    >
                      {techServices.map((service, index) => {
                        const TabIcon = service.tabIcon;
                        return (
                          <Card key={index}>
                            <div
                              className="w-full h-full rounded-2xl overflow-hidden relative border border-white/10"
                              style={{ backgroundColor: service.bgColor }}
                            >
                              <div className="absolute top-4 left-4 z-20">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20">
                                  <TabIcon
                                    className={`w-4 h-4 ${service.tabColor}`}
                                  />
                                  <span className="text-white/90 text-sm font-medium">
                                    {service.label}
                                  </span>
                                </div>
                              </div>

                              <div className="absolute inset-0 z-0">
                                <Aurora
                                  colorStops={service.auroraColors}
                                  blend={0.5}
                                  amplitude={0.8}
                                  speed={0.5}
                                />
                              </div>

                              <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/30" />

                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/15 shadow-xl shadow-black/20">
                                  <div className="grid grid-cols-3 gap-4">
                                    {service.techIcons.map(
                                      (iconPath, iconIndex) => (
                                        <div
                                          key={iconIndex}
                                          className="w-20 h-20 flex items-center justify-center rounded-xl transition-all duration-300 bg-white/5 border border-white/10"
                                        >
                                          <img
                                            src={iconPath}
                                            alt=""
                                            className="w-8 h-8 object-contain"
                                          />
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </CardSwap>
                  </motion.div>
                </div>

                <div className="mt-12 -mx-4 lg:-mx-8 relative z-0">
                  <div className="w-screen relative left-1/2 -translate-x-1/2">
                    <ScrollVelocity
                      texts={[
                        "AI/ML‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Web Development‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ • Mobile Apps‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ • Cloud Services‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ DevOps‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Data Analytics‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ Cyber Security‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ERP Solutions‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ API Integration‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ •‎",
                      ]}
                      velocity={30}
                      className="text-cyan-400/20 text-base font-medium"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }
);

TechnologySection.displayName = "TechnologySection";
