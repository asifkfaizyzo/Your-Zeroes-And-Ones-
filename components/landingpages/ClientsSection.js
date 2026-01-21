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
  if (!name) return "";
  const parts = name.trim().split(" ").filter(Boolean).slice(0, 2);
  const letters = parts.map((p) => p.charAt(0).toUpperCase());
  return letters.join("");
}

function EnhancedClientCard({ client, index, color }) {
  const [isHovered, setIsHovered] = useState(false);
  const initials = getInitials(client.name);
  const clientColor = client.color || color;

  return (
    <div
      className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${
        isHovered ? 'scale-105 -translate-y-2' : ''
      }`}
      style={{
        transitionDelay: `${index * 50}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Only Hover Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${clientColor}30, transparent 70%)`,
        }}
      />

      <div className="p-5 sm:p-6 lg:p-8 flex flex-col items-center relative z-10">
        {/* Logo Container - NO SHADOWS, NO BORDERS, NO BOX */}
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex items-center justify-center mb-4 transition-all duration-500 ${
            isHovered ? 'scale-110' : ''
          }`}
          style={{
            backgroundColor: client.logo ? 'transparent' : `${clientColor}20`,
            border: 'none', // NO BORDER
            boxShadow: 'none', // NO SHADOW
          }}
        >
          {client.logo ? (
            <img
              src={client.logo}
              alt={client.name}
              className="max-w-[75%] max-h-[75%] w-auto h-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          
          <span
            className={`text-xl sm:text-2xl lg:text-3xl font-bold ${client.logo ? 'hidden' : ''}`}
            style={{ color: clientColor }}
          >
            {initials || '?'}
          </span>
        </div>

        {/* Client Name */}
        <div className="text-center w-full">
          <h3 className="text-sm sm:text-base font-semibold text-white/90 group-hover:text-white transition-colors duration-300 leading-tight line-clamp-2">
            {client.name}
          </h3>
          
          {/* Animated underline */}
          <div
            className="h-0.5 mx-auto mt-3 rounded-full transition-all duration-500"
            style={{
              width: isHovered ? '50%' : '30%',
              backgroundColor: isHovered ? clientColor : 'rgba(255,255,255,0.3)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

function EnhancedComingSoonCard({ index }) {
  return (
    <div
      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-dashed border-white/20 overflow-hidden cursor-default transition-all duration-500 hover:bg-white/8 hover:border-white/30"
      style={{
        transitionDelay: `${index * 50}ms`,
      }}
    >
      <div className="p-5 sm:p-6 lg:p-8 flex flex-col items-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 bg-white/5 border border-white/10">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-white/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>

        <div className="text-center">
          <span className="text-sm text-white/40 font-medium">Coming Soon</span>
          <div className="h-0.5 w-8 mx-auto mt-3 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}

export default function ClientsSection() {
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);

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

  return (
    <section
      className="py-20 sm:py-24 lg:py-32 relative overflow-hidden"
      data-animate
      id="clients"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#203E7F] to-cyan-600" />
      
      {/* Animated Mesh Gradient Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-[120px] opacity-20 animate-float" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-[140px] opacity-15 animate-float-delayed" />
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-[160px] opacity-15 animate-float-slow" />

      <div className="relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-18 lg:mb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
            </span>
            <span className="text-cyan-100 font-medium text-sm tracking-wide">Trusted Partnerships</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold mb-6">
            <span className="text-white">Companies That </span>
            <span className="relative">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Trust Us
              </span>
              <svg 
                className="absolute -bottom-2 left-0 w-full" 
                height="8" 
                viewBox="0 0 200 8" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M0 5 Q50 0, 100 5 T200 5" 
                  stroke="url(#gradient)" 
                  strokeWidth="3" 
                  fill="none"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#67e8f9" />
                    <stop offset="50%" stopColor="#93c5fd" />
                    <stop offset="100%" stopColor="#c4b5fd" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            We're proud to partner with industry leaders, delivering innovative digital solutions 
            that drive <span className="text-cyan-300 font-medium">measurable results</span>.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mt-10">
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                {clients.length > 0 ? `${clients.length}+` : '50+'}
              </div>
              <div className="text-cyan-200/70 text-sm sm:text-base mt-1">Happy Clients</div>
            </div>
            <div className="hidden sm:block w-px h-14 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="text-cyan-200/70 text-sm sm:text-base mt-1">Satisfaction Rate</div>
            </div>
            <div className="hidden sm:block w-px h-14 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                200+
              </div>
              <div className="text-cyan-200/70 text-sm sm:text-base mt-1">Projects Delivered</div>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        {clientsLoading ? (
          <div className="flex justify-center py-16">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-white/10" />
                <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin" />
                <div className="absolute inset-2 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-400 animate-spin animation-delay-150" style={{ animationDirection: 'reverse' }} />
              </div>
              <span className="text-white/80 font-medium">Loading amazing clients...</span>
            </div>
          </div>
        ) : (
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl 2xl:max-w-[1600px] mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
              {Array.from({ length: 12 }).map((_, index) => {
                const client = clients[index];
                const color = fallbackColors[index % fallbackColors.length];

                if (client) {
                  return (
                    <EnhancedClientCard
                      key={client.id}
                      client={client}
                      index={index}
                      color={color}
                    />
                  );
                } else {
                  return <EnhancedComingSoonCard key={`coming-soon-${index}`} index={index} />;
                }
              })}
            </div>

            {clients.length > 12 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <div className="flex -space-x-3">
                  {clients.slice(12, 16).map((client, idx) => (
                    <div
                      key={client.id}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold shadow-lg"
                      style={{ zIndex: 4 - idx }}
                    >
                      {getInitials(client.name)}
                    </div>
                  ))}
                  {clients.length > 16 && (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      +{clients.length - 16}
                    </div>
                  )}
                </div>
                <span className="text-white/70 text-sm">
                  and <span className="text-cyan-300 font-semibold">{clients.length - 12} more</span> trusted partners
                </span>
              </div>
            )}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-14 sm:mt-18 lg:mt-20 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-white/30" />
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-white/30" />
          </div>

          <p className="text-white/60 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Join our growing family of successful partnerships
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/clients"
              className="group relative inline-flex items-center justify-center gap-2 bg-white text-[#1a365d] px-8 sm:px-10 py-4 rounded-2xl font-bold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              <span className="relative z-10 flex items-center gap-2">
                View All Clients
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white px-8 sm:px-10 py-4 rounded-2xl font-bold text-base sm:text-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105"
            >
              <span>Become a Partner</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:rotate-45"
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
        </div>
      </div>

      {/* Bottom Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 50L48 45C96 40 192 30 288 35C384 40 480 60 576 65C672 70 768 60 864 50C960 40 1056 30 1152 35C1248 40 1344 60 1392 70L1440 80V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}