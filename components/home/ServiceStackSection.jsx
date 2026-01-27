// components/home/ServiceStackSection.jsx
"use client";

import React, { useRef, forwardRef } from "react";
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
import CardSwap, { Card } from "@/components/effects/CardSwap/CardSwap";

export default function ServiceStackSection({
  marketingSectionRef,
  brandingSectionRef,
  technologySectionRef,
  scrollToSection,
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Position 1: Threads style + MARKETING content */}
      <MarketingSection
        ref={marketingSectionRef}
        scrollProgress={scrollYProgress}
        onNextClick={() => scrollToSection(brandingSectionRef)}
      />

      {/* Position 2: FloatingLines style + BRANDING content */}
      <BrandingSection
        ref={brandingSectionRef}
        scrollProgress={scrollYProgress}
        onNextClick={() => scrollToSection(technologySectionRef)}
      />

      {/* Position 3: Spotlight style + TECHNOLOGY content */}
      <TechnologySection
        ref={technologySectionRef}
        scrollProgress={scrollYProgress}
      />
    </div>
  );
}

// ============================================
// MARKETING SECTION with Threads Style
// ============================================
const MarketingSection = forwardRef(({ scrollProgress, onNextClick }, ref) => {
  const y = useTransform(scrollProgress, [0, 0.33], [0, -50]);
  const scale = useTransform(scrollProgress, [0, 0.33], [1, 0.95]);
  const opacity = useTransform(scrollProgress, [0.25, 0.33], [1, 0.8]);

  const marketingServices = [
    { icon: <Search className="w-7 h-7" />, label: "SEO" },
    { icon: <Share2 className="w-7 h-7" />, label: "Social Media" },
    { icon: <Target className="w-7 h-7" />, label: "PPC Ads" },
    { icon: <Mail className="w-7 h-7" />, label: "Email" },
    { icon: <BarChart3 className="w-7 h-7" />, label: "Analytics" },
    { icon: <FileText className="w-7 h-7" />, label: "Content" },
  ];

  return (
    <motion.section
      ref={ref}
      style={{ y, scale, opacity }}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#060010] py-20 sticky top-0"
    >
      {/* Background - Threads (Blue theme) */}
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
              Digital Marketing
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <BlurText
                text="We Grow Your Reach"
                delay={60}
                animateBy="words"
                direction="left"
                align="left"
                className="text-White"
              />
            </h2>

            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Data-driven marketing strategies that connect you with your
              audience. From SEO to social media, we amplify your digital
              presence and drive measurable results.
            </p>

            <Link
              href="/services/digital-marketing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#20427f] text-white rounded-full font-semibold hover:bg-[#2d5aa8] transition-all duration-300 hover:gap-4"
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

          {/* RIGHT: 6-Card Grid (Marketing Icons) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-3 gap-3">
              {marketingServices.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, y: -8 }}
                  className="aspect-square flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-[#20427f]/30 to-[#0a1628]/50 border border-[#5b8def]/30 backdrop-blur-sm cursor-pointer group transition-transform duration-300 ease-out"
                >
                  <div className="text-[#5b8def] group-hover:text-white transition-colors duration-300 mb-2">
                    {item.icon}
                  </div>
                  <span className="text-white/60 text-xs group-hover:text-white transition-colors duration-300 font-medium text-center">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Full-width ScrollVelocity */}
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
      </div>

      {/* Next section preview */}
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
    </motion.section>
  );
});

MarketingSection.displayName = "MarketingSection";

// ============================================
// BRANDING SECTION with FloatingLines Style
// ============================================
const BrandingSection = forwardRef(({ scrollProgress, onNextClick }, ref) => {
  const y = useTransform(scrollProgress, [0.33, 0.66], [0, -50]);
  const scale = useTransform(scrollProgress, [0.33, 0.66], [1, 1]);
  const opacity = useTransform(scrollProgress, [0.58, 0.66], [1, 1]);

  const brandingServices = [
    {
      icon: <PenTool className="w-5 h-5" />,
      label: "Logos",
      value: "85+",
    },
    {
      icon: <Video className="w-5 h-5" />,
      label: "Videos",
      value: "120+",
    },
    {
      icon: <Music className="w-5 h-5" />,
      label: "Audio",
      value: "45+",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      label: "Graphics",
      value: "300+",
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      label: "AI Videos",
      value: "35+",
    },
  ];

  return (
    <motion.section
      ref={ref}
      style={{ y, scale, opacity }}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0815] py-20 sticky top-0"
    >
      {/* Background - FloatingLines (Purple theme) */}
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
          {/* LEFT: Bento Grid (Branding Stats) - 7 Services */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[380px]">
              {/* Top Large Card - Brand Identity (col-span-2, row-span-1) */}
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
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-white/50 text-xs">Brands</div>
                </div>
              </motion.div>

              {/* Top Right Small Card - First service */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
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

              {/* Bottom Large Card - Brand Consulting (col-span-2, row-span-1) */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="col-span-2 row-span-1 rounded-2xl bg-gradient-to-br from-purple-500/10 to-[#20427f]/10 border border-purple-500/20 p-4 flex items-center justify-between backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl  bg-purple-500/20">
                    <TrendingUp className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                  </div>
                  <div>
                    <span className="text-purple-300 group-hover:text-purple-300 font-semibold block">
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

              {/* Middle Right Small Card - Second service */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
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

              {/* Bottom Row - 3 Small Cards */}
              {brandingServices.slice(2).map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
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
                    <div className="text-white/40 text-xs">{item.label}</div>
                  </div>
                </motion.div>
              ))}
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
              Branding & Design
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <BlurText
                text="We Create Your Identity"
                delay={60}
                animateBy="words"
                direction="right"
                align="right"
                className="text-white"
              />
            </h2>

            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Memorable brand experiences that resonate with your audience. From
              logo design to complete visual identities and multimedia
              production.
            </p>

            <Link
              href="/services/branding-design"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:gap-4"
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
        </div>

        {/* Full-width ScrollVelocity */}
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
      </div>

      {/* Next section preview */}
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
    </motion.section>
  );
});

BrandingSection.displayName = "BrandingSection";

// ============================================
// TECHNOLOGY SECTION with Spotlight Style + 4 CardSwap
// ============================================
const TechnologySection = forwardRef(({ scrollProgress }, ref) => {
  const techServices = [
    {
      tabIcon: Code,
      label: "Web Development",
      bgColor: "#0a1628",
      iconColor: "text-blue-300",
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
      iconColor: "text-indigo-300",
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
      iconColor: "text-cyan-300",
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
      iconColor: "text-sky-300",
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
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#060812] py-20"
    >
      {/* Background - Spotlight (Cyan theme) */}
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
              Technology Solutions
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <BlurText
                text="We Build the Future"
                delay={60}
                animateBy="words"
                direction="left"
                align="left"
                className="text-White"
              />
            </h2>

            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Cutting-edge software solutions that power your digital
              transformation. From AI-driven applications to scalable cloud
              infrastructure and secure systems.
            </p>

            <Link
              href="/services/technology"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-[#20427f] text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:gap-4"
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

          {/* RIGHT: 4-Card CardSwap */}
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
                      {/* Glass Tab - Top Left with Lucide Icon */}
                      <div className="absolute top-4 left-4 z-20">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20">
                          <TabIcon className={`w-4 h-4 ${service.tabColor}`} />
                          <span className="text-white/90 text-sm font-medium">
                            {service.label}
                          </span>
                        </div>
                      </div>

                      {/* Aurora Background */}
                      <div className="absolute inset-0 z-0">
                        <Aurora
                          colorStops={service.auroraColors}
                          blend={0.5}
                          amplitude={0.8}
                          speed={0.5}
                        />
                      </div>

                      {/* Subtle overlay for depth */}
                      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-transparent to-black/30" />

                      {/* Floating Tech Icons - 3x2 Grid */}
                      <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/15 shadow-xl shadow-black/20">
                          <div className="grid grid-cols-3 gap-4">
                            {service.techIcons.map((iconPath, iconIndex) => (
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
                            ))}
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

        {/* Full-width ScrollVelocity */}
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
      </div>
    </section>
  );
});

TechnologySection.displayName = "TechnologySection";