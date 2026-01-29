// components/home/ClientsSection.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import BlurText from "@/components/effects/BlurText/BlurText";
import LightRays from "@/components/effects/LightRays/LightRays";
import GlareHover from "@/components/effects/GlareHover/GlareHover";

function getInitials(name = "") {
  if (!name) return "?";
  const parts = name.trim().split(" ").filter(Boolean).slice(0, 2);
  return parts.map((p) => p.charAt(0).toUpperCase()).join("");
}

function LogoItem({ client, index, isMobile }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const initials = getInitials(client.name);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: index * 0.03, 
        duration: 0.4,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-center cursor-pointer aspect-square"
    >
      <motion.div
        animate={{ 
          scale: isHovered && !isMobile ? 1.2 : 1,
          filter: isHovered && !isMobile ? "brightness(1.2)" : "brightness(1)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex items-center justify-center w-full h-full"
      >
        {client.logo && !imageError ? (
          <img
            src={client.logo}
            alt={client.name}
            title={client.name}
            className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain brightness-0 invert transition-all duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/5 border border-white/10">
            <span className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white/80">
              {initials}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ClientsSection() {
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // ✅ Grid configuration: 3 rows × 6 columns = 18 clients max
  const DISPLAY_COUNT = 18;

  useEffect(() => {
    setIsClient(true);

    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

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

  const displayedClients = clients.slice(0, DISPLAY_COUNT);
  const hasMoreClients = clients.length > DISPLAY_COUNT;
  const remainingCount = clients.length - DISPLAY_COUNT;

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
      {Array.from({ length: 18 }).map((_, index) => (
        <div
          key={index}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white/5 animate-pulse"
          style={{ animationDelay: `${index * 50}ms` }}
        />
      ))}
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-[#060812]">
      <div className="absolute top-0 left-0 right-0 h-16 bg-[#060812]" />

      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {!isClient ? (
            <div className="absolute inset-0 bg-[#060812]" />
          ) : isMobile ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-[#060812] via-[#0a1020] to-[#060812]" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `
                    radial-gradient(ellipse at 50% 0%, rgba(91, 141, 239, 0.15) 0%, transparent 50%),
                    radial-gradient(ellipse at 50% 100%, rgba(91, 141, 239, 0.1) 0%, transparent 50%)
                  `,
                }}
              />
            </>
          ) : (
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={0.8}
              lightSpread={0.5}
              rayLength={2}
              followMouse={true}
              mouseInfluence={0.02}
              noiseAmount={0}
              distortion={0}
              pulsating={false}
              fadeDistance={0.7}
              saturation={0.6}
            />
          )}
        </div>

        <div className="absolute inset-0 bg-[#060812]/50 z-[1]" />

        {/* Side decorative lines - Desktop only */}
        {!isMobile && (
          <>
            <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#5b8def]/15 to-transparent hidden lg:block z-[2]" />
            <div className="absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#5b8def]/15 to-transparent hidden lg:block z-[2]" />
          </>
        )}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {/* Header */}
          <div className="text-center mb-10 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
                Our Clients
              </span>
            </motion.div>

            <div className="mb-4">
              <BlurText
                text="Trusted Partners"
                delay={80}
                animateBy="words"
                direction="top"
                align="center"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/30 text-xs sm:text-sm md:text-base mb-4 sm:mb-6"
            >
              From startups to enterprises — we deliver excellence
            </motion.p>

            <div className="px-4">
              <BlurText
                text="Building digital excellence with industry-leading organizations across technology, healthcare, finance, and beyond."
                delay={40}
                animateBy="words"
                direction="top"
                align="center"
                className="text-white/50 text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed font-normal"
              />
            </div>
          </div>

          {/* Clients Grid */}
          {clientsLoading ? (
            <LoadingSkeleton />
          ) : displayedClients.length === 0 ? (
            /* No clients fallback */
            <div className="text-center py-12">
              <p className="text-white/40 text-sm">No clients to display</p>
            </div>
          ) : (
            <>
              {/* ✅ Responsive Flexbox Grid - Centers incomplete rows automatically */}
              <div className="flex flex-wrap justify-center gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-w-6xl mx-auto px-2">
                {displayedClients.map((client, index) => (
                  <div
                    key={client.id}
                    className="
                      flex-shrink-0
                      w-[calc(33.333%-0.75rem)]
                      xs:w-[calc(33.333%-1rem)]
                      sm:w-[calc(25%-1.5rem)]
                      md:w-[calc(20%-2rem)]
                      lg:w-[calc(16.666%-2.5rem)]
                      max-w-[120px]
                      aspect-square
                    "
                  >
                    <LogoItem
                      client={client}
                      index={index}
                      isMobile={isMobile}
                    />
                  </div>
                ))}
              </div>

              {/* Remaining count indicator */}
              {hasMoreClients && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10"
                >
                  <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent to-white/20" />
                  <span className="text-white/40 text-xs sm:text-sm whitespace-nowrap">
                    +{" "}
                    <span className="text-[#5b8def] font-semibold">
                      {remainingCount}
                    </span>{" "}
                    more trusted partners
                  </span>
                  <div className="h-px w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent to-white/20" />
                </motion.div>
              )}
            </>
          )}

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10 sm:mt-12"
          >
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
                href="/clients"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#1e3a6e] text-white text-sm sm:text-base rounded-full font-semibold hover:bg-[#2d5aa8] transition-all duration-300 hover:gap-3 sm:hover:gap-4"
              >
                View All Clients
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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
      </div>
    </section>
  );
}