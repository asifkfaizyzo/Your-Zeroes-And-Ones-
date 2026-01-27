// components/home/ClientsSection.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BlurText from "@/components/effects/BlurText/BlurText";
import ScrollReveal from "@/components/effects/ScrollReveal/ScrollReveal";
import LightRays from "@/components/effects/LightRays/LightRays";

function getInitials(name = "") {
  if (!name) return "?";
  const parts = name.trim().split(" ").filter(Boolean).slice(0, 2);
  return parts.map((p) => p.charAt(0).toUpperCase()).join("");
}

// Inside components/home/ClientsSection.jsx

import GlareHover from "@/components/effects/GlareHover/GlareHover";

function LogoItem({ client, index }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const initials = getInitials(client.name);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-center cursor-pointer"
    >
      
        <motion.div
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {client.logo && !imageError ? (
            <img
              src={client.logo}
              alt={client.name}
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain brightness-0 invert"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
              {initials}
            </span>
          )}
        </motion.div>
      
    </motion.div>
  );
}

export default function ClientsSection() {
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [displayCount] = useState(10);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setClientsLoading(true);
        const res = await fetch("/api/clients");
        if (!res.ok) throw new Error("Failed to load clients");
        const data = await res.json();
        setClients(data.data || data || []);
      } catch (err) {
        console.error("Clients fetch error:", err);
      } finally {
        setClientsLoading(false);
      }
    };
    fetchClients();
  }, []);

  const displayedClients = clients.slice(0, displayCount);
  const hasMoreClients = clients.length > displayCount;
  const remainingCount = clients.length - displayCount;

  return (
    <section className="relative overflow-hidden bg-[#060812]">
      {/* Curved top edge - connects from Technology section */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-[#060812]" />

      {/* Main content */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background - LightRays */}
        <div className="absolute inset-0 z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.8}
            lightSpread={0.5}
            rayLength={2}
            followMouse={true}
            mouseInfluence={0.06}
            noiseAmount={0}
            distortion={0}
            pulsating={false}
            fadeDistance={0.7}
            saturation={0.6}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#060812]/50 z-[1]" />

        {/* Decorative side lines */}
        <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#5b8def]/15 to-transparent hidden lg:block z-[2]" />
        <div className="absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#5b8def]/15 to-transparent hidden lg:block z-[2]" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
<div className="text-center mb-10 lg:mb-16">
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-4"
  >
    <span className="text-[#5b8def] text-sm font-semibold uppercase tracking-[0.2em]">
      Our Clients
    </span>
  </motion.div>

  {/* Main heading - Now uses ScrollReveal */}
  <div className="mb-4">
    <ScrollReveal
      baseOpacity={0.1}
      enableBlur={true}
      baseRotation={3}
      blurStrength={4}
      rotationEnd="center center"
      wordAnimationEnd="center center"
      textClassName="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
    >
      Trusted Partners
    </ScrollReveal>
  </div>

  {/* Subtext line */}
  <motion.p
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
    className="text-white/30 text-sm sm:text-base mb-6"
  >
    From startups to enterprises — we deliver excellence
  </motion.p>

  {/* Description - Now uses BlurText */}
  <div>
    <BlurText
      text="Building digital excellence with industry-leading organizations across technology, healthcare, finance, and beyond."
      delay={40}
      animateBy="words"
      direction="top"
      align="center"
      className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-normal"
    />
  </div>
</div>

          {/* Logo Grid */}
          {clientsLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-2 border-[#5b8def]/30 border-t-[#5b8def] rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-5 gap-8 sm:gap-10 lg:gap-12 place-items-center max-w-4xl mx-auto">
                {displayedClients.map((client, index) => (
                  <LogoItem key={client.id} client={client} index={index} />
                ))}
              </div>

              {/* "and X more" */}
              {hasMoreClients && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center gap-4 mt-10"
                >
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
                  <span className="text-white/40 text-sm">
                    + <span className="text-[#5b8def] font-semibold">{remainingCount}</span> more trusted partners
                  </span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
                </motion.div>
              )}
            </>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/clients"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#20427f] text-white rounded-full font-semibold hover:bg-[#2d5aa8] transition-all duration-300 hover:gap-4"
            >
              View All Clients
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}