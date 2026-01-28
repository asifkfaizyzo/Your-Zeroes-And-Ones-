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
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center justify-center cursor-pointer"
    >
      <motion.div
        animate={{ scale: isHovered && !isMobile ? 1.15 : 1 }}
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
  const [isMobile, setIsMobile] = useState(false); // desktop by default
  const [isClient, setIsClient] = useState(false); // prevent SSR flash

  useEffect(() => {
    setIsClient(true);

    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px breakpoint
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

  const displayedClients = clients.slice(0, displayCount);
  const hasMoreClients = clients.length > displayCount;
  const remainingCount = clients.length - displayCount;

  return (
    <section className="relative overflow-hidden bg-[#060812]">
      <div className="absolute top-0 left-0 right-0 h-16 bg-[#060812]" />

      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background - No flash */}
        <div className="absolute inset-0 z-0">
          {!isClient ? (
            // SSR/Initial render: solid background to prevent flash
            <div className="absolute inset-0 bg-[#060812]" />
          ) : isMobile ? (
            // Mobile: Static gradient background
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
            // Desktop: LightRays animation
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

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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

            <div className="mb-4">
              <BlurText
                text="Trusted Partners"
                delay={80}
                animateBy="words"
                direction="top"
                align="center"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/30 text-sm sm:text-base mb-6"
            >
              From startups to enterprises — we deliver excellence
            </motion.p>

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

          {clientsLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-2 border-[#5b8def]/30 border-t-[#5b8def] rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-8 sm:gap-10 lg:gap-20 max-w-4xl mx-auto">
                {displayedClients.map((client, index) => (
                  <div key={client.id} className="flex-shrink-0">
                    <LogoItem client={client} index={index} isMobile={isMobile} />
                  </div>
                ))}
              </div>

              {hasMoreClients && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center gap-4 mt-10"
                >
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
                  <span className="text-white/40 text-sm">
                    +{" "}
                    <span className="text-[#5b8def] font-semibold">
                      {remainingCount}
                    </span>{" "}
                    more trusted partners
                  </span>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
                </motion.div>
              )}
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e3a6e] text-white rounded-full font-semibold hover:bg-[#2d5aa8] transition-all duration-300 hover:gap-4"
              >
                View All Clients
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
        </div>
      </div>
    </section>
  );
}