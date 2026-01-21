// app/components/landingpages/ClientsSection.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const fallbackColors = [
  "#4285F4", "#34A853", "#FBBC04", "#EA4335", "#FF6D01", "#46BDC6",
  "#7B1FA2", "#1976D2", "#E65100", "#424242", "#0277BD", "#2E7D32",
  "#5E35B1", "#C62828", "#AD1457", "#00695C", "#00838F", "#F9A825",
  "#283593", "#6A1B9A",
];

function getInitials(name = "") {
  if (!name) return "?";
  const parts = name.trim().split(" ").filter(Boolean).slice(0, 2);
  return parts.map((p) => p.charAt(0).toUpperCase()).join("");
}

function GlassmorphicCard({ client, index, fallbackColor }) {
  const [isHovered, setIsHovered] = useState(false);
  const initials = getInitials(client.name);
  const clientColor = client.color || fallbackColor;

  return (
    <div
      className={`group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isHovered ? "scale-105 -translate-y-2 bg-white/10 border-white/20" : ""
      }`}
      style={{ 
        transitionDelay: `${index * 30}ms`,
        boxShadow: isHovered ? `0 20px 60px -15px ${clientColor}40` : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${clientColor}30, transparent, ${clientColor}20)`,
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute -top-10 -right-10 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{ backgroundColor: clientColor }}
      />

      <div className="p-6 sm:p-8 flex flex-col items-center relative z-10">
        {/* Logo Container */}
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 ${
            isHovered ? "scale-110" : ""
          }`}
          style={{
            backgroundColor: client.logo ? "rgba(255,255,255,0.05)" : `${clientColor}15`,
            border: `2px solid ${clientColor}30`,
          }}
        >
          {client.logo ? (
            <img
              src={client.logo}
              alt={client.name}
              className="max-w-[75%] max-h-[75%] object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <span
            className={`text-xl sm:text-2xl lg:text-3xl font-bold ${client.logo ? "hidden" : ""}`}
            style={{ color: clientColor }}
          >
            {initials}
          </span>
        </div>

        {/* Client name */}
        <h3 className="text-sm sm:text-base lg:text-lg font-medium text-white/90 group-hover:text-white transition-colors duration-300 text-center line-clamp-2">
          {client.name}
        </h3>

        {/* Glow dot */}
        <div
          className={`
            mt-3 transition-all duration-500 ${
            isHovered ? "scale-150" : "scale-100"
          }`}
          style={{
            backgroundColor: clientColor,
            boxShadow: isHovered ? `0 0 20px ${clientColor}` : 'none'
          }}
        />
      </div>
    </div>
  );
}

export default function ClientsSection() {
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(10); // Show limited clients initially

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
    <section
      className="py-20 sm:py-28 lg:py-36 relative overflow-hidden"
      data-animate
      id="clients"
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#203E7F] to-cyan-600" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 font-medium text-sm uppercase tracking-widest">Our Clients</span>
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="text-white">Trusted by </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Industry Leaders
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M2 6C50 2 150 2 198 6" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="#22d3ee"/>
                    <stop offset="0.5" stopColor="#a855f7"/>
                    <stop offset="1" stopColor="#ec4899"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
            Partnering with forward-thinking companies to create extraordinary digital experiences
          </p>
        </div>

        {/* Client Grid */}
        {clientsLoading ? (
          <div className="flex justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-2 border-white/10" />
              <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-t-green-500 border-r-white-400 animate-spin" />
              <div className="absolute inset-3 w-14 h-14 rounded-full border-2 border-transparent border-b-amber-600 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {displayedClients.map((client, index) => (
                <GlassmorphicCard
                  key={client.id}
                  client={client}
                  index={index}
                  fallbackColor={fallbackColors[index % fallbackColors.length]}
                />
              ))}
            </div>

            {/* "and X more" indicator */}
            {hasMoreClients && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
                <span className="text-white/60 text-base">
                  and <span className="text-cyan-300 font-semibold">{remainingCount} more</span> trusted partners
                </span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
              </div>
            )}
          </>
        )}

        {/* Bottom CTA - Two Buttons */}
        <div className="text-center mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* View All Clients Button */}
          <Link
            href="/clients"
            className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>View All Clients</span>
            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full font-medium">
              {clients.length}
            </span>
          </Link>

          {/* Become a Partner Button */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-800 to-cyan-600 text-white font-semibold px-8 py-4 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            <span>Become a Partner</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}