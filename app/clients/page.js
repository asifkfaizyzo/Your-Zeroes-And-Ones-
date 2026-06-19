// app/clients/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function getInitials(name = "") {
  if (!name) return "";
  const parts = name.trim().split(" ").filter(Boolean).slice(0, 2);
  return parts.map((p) => p.charAt(0).toUpperCase()).join("");
}

export default function ClientsPage() {
  const [isVisible, setIsVisible] = useState({});
  const [hoveredClient, setHoveredClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/clients");
        if (!res.ok) throw new Error("Failed to load clients");
        const data = await res.json();
        setClients(Array.isArray(data) ? data : data.data || []);
        setError("");
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load clients");
        setClients([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const totalClients = clients.length;

  return (
    <>
      <main className="min-h-screen bg-[#060010] relative z-0 pt-10">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#060010] via-[#0a1628] to-[#060010] relative overflow-hidden py-20 sm:py-24 lg:py-32">
          {/* Ambient blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-[#5b8def]/10 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#2d5aa8]/10 rounded-full filter blur-3xl animate-float-delayed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#5b8def]/5 rounded-full filter blur-3xl" />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(#5b8def 1px, transparent 1px), linear-gradient(90deg, #5b8def 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              {/* Breadcrumb */}
              <nav className="flex justify-center mb-8" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-3 text-sm sm:text-base">
                  <li>
                    <Link href="/" className="text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      Home
                    </Link>
                  </li>
                  <li className="text-white/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </li>
                  <li className="text-white font-semibold">Our Clients</li>
                </ol>
              </nav>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-[#5b8def]/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white/70 text-sm font-medium">Trusted Partnerships</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Our{" "}
                <span className="text-[#5b8def]">Valued</span>{" "}
                Clients
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed">
                Partnering with industry leaders across diverse sectors to deliver exceptional digital solutions that drive success.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-white">{loading ? "..." : `${totalClients}+`}</div>
                  <div className="text-white/40 text-sm mt-1">Happy Clients</div>
                </div>
                <div className="w-px h-16 bg-white/10 hidden sm:block" />
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-white">98%</div>
                  <div className="text-white/40 text-sm mt-1">Satisfaction Rate</div>
                </div>
                <div className="w-px h-16 bg-white/10 hidden sm:block" />
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-white">5+</div>
                  <div className="text-white/40 text-sm mt-1">Years of Trust</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#060812" />
            </svg>
          </div>
        </section>

        {/* Clients Grid */}
        <section className="py-16 sm:py-20 lg:py-28 bg-[#060812]" data-animate id="clients-grid">
          <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <span className="inline-block text-[#5b8def] font-semibold text-sm uppercase tracking-widest bg-[#5b8def]/10 border border-[#5b8def]/20 px-4 py-2 rounded-full mb-4">
                Our Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">
                {loading ? "Loading clients…" : "Companies That Trust Us"}
              </h2>
              <p className="text-white/40 mt-4 max-w-2xl mx-auto text-lg">
                We've had the privilege of working with amazing companies across various industries
              </p>
              {error && (
                <div className="mt-4 inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex justify-center py-16">
                <div className="inline-flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-white/5 rounded-full" />
                    <div className="w-16 h-16 border-4 border-[#5b8def] border-t-transparent rounded-full animate-spin absolute inset-0" />
                  </div>
                  <span className="text-white/50 font-medium">Loading our amazing clients...</span>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && clients.length === 0 && (
              <div className="py-16 text-center">
                <div className="w-24 h-24 bg-[#5b8def]/10 border border-[#5b8def]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white/50 mb-2">No clients to show yet</h3>
                <p className="text-white/30">Check back soon for updates.</p>
              </div>
            )}

            {/* Grid */}
            {!loading && clients.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 lg:gap-8">
                {clients.map((client, index) => {
                  const color = client.color || "#5b8def";
                  const initials = getInitials(client.name);
                  const isHovered = hoveredClient === client.id;

                  return (
                    <div
                      key={client.id}
                      className={`group relative rounded-2xl sm:rounded-3xl transition-all duration-500 overflow-visible border cursor-pointer ${
                        isVisible["clients-grid"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                      } ${
                        isHovered
                          ? "shadow-2xl shadow-[#5b8def]/10 scale-[1.02] -translate-y-2 border-[#5b8def]/40 bg-[#5b8def]/10"
                          : "border-[#5b8def]/15 bg-[#5b8def]/5 backdrop-blur-sm hover:shadow-xl hover:border-[#5b8def]/30"
                      }`}
                      style={{ transitionDelay: `${index * 40}ms` }}
                      onMouseEnter={() => setHoveredClient(client.id)}
                      onMouseLeave={() => setHoveredClient(null)}
                    >
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-4 right-4 h-0.5 rounded-b-full transition-all duration-500 transform origin-center scale-x-0 group-hover:scale-x-100"
                        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                      />

                      <div className="p-6 sm:p-8 flex flex-col items-center">
                        {/* Logo Container */}
                        <div
                          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 overflow-hidden relative"
                          style={{
                            backgroundColor: client.logo ? "rgba(255,255,255,0.05)" : `${color}15`,
                            border: `2px solid ${color}25`,
                            boxShadow: isHovered ? `0 20px 40px ${color}20` : "none",
                          }}
                        >
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                            style={{ background: `radial-gradient(circle at center, ${color}15, transparent 70%)` }}
                          />
                          {client.logo ? (
                            <img
                              src={client.logo}
                              alt={client.name}
                              className="max-w-[80%] max-h-[80%] w-auto h-auto object-contain transition-all duration-500 ease-in-out relative z-10"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling?.classList.remove("hidden");
                              }}
                            />
                          ) : (
                            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold relative z-10 transition-all duration-300" style={{ color }}>
                              {initials || "?"}
                            </span>
                          )}
                          <span className="hidden text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color }}>
                            {initials || "?"}
                          </span>
                        </div>

                        {/* Client Name */}
                        <div className="w-full text-center mt-2">
                          <h3
                            className="text-sm sm:text-base font-semibold text-white/70 group-hover:text-white transition-colors duration-300 leading-tight"
                            style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
                          >
                            {client.name}
                          </h3>
                          <div
                            className="h-0.5 mx-auto mt-3 rounded-full transition-all duration-500 ease-out"
                            style={{ width: isHovered ? "40px" : "20px", backgroundColor: isHovered ? color : "rgba(255,255,255,0.1)" }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Industry tags */}
            {!loading && clients.length > 0 && (
              <div className="text-center mt-16">
                <p className="text-white/30 mb-6">And many more amazing companies we're proud to work with</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Technology", "Healthcare", "Finance", "Education", "E-commerce"].map((industry, idx) => (
                    <span key={idx} className="px-4 py-2 bg-[#5b8def]/5 border border-[#5b8def]/15 rounded-full text-sm text-white/50 hover:border-[#5b8def]/40 hover:text-white transition-all cursor-default">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[#060010]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative">
              <svg className="w-12 h-12 text-[#5b8def]/20 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white/70 leading-relaxed">
                "Working with exceptional partners has been the cornerstone of our success.
                <span className="text-[#5b8def]"> Together, we achieve more.</span>"
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-[#1e3a6e] border border-[#5b8def]/30 rounded-full flex items-center justify-center text-[#5b8def] font-bold">
                  TW
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">TechWave Team</div>
                  <div className="text-sm text-white/40">Building Digital Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628] relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(rgba(91,141,239,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(91,141,239,.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-[#5b8def]/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/70 text-sm font-medium">Let's Work Together</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Join Our
              <span className="block text-[#5b8def]">Success Stories?</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how we can help transform your business with our comprehensive digital solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group bg-white text-[#0f1d32] px-8 sm:px-10 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-bold text-base sm:text-lg shadow-2xl hover:shadow-[#5b8def]/20 hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Start Your Project
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="group bg-transparent border border-white/30 text-white px-8 sm:px-10 py-4 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 font-bold text-base sm:text-lg hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Explore Services
                <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>

            <div className="mt-12 pt-12 border-t border-white/5">
              <p className="text-white/30 text-sm mb-4">Trusted by companies worldwide</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {["ISO Certified", "24/7 Support", "Secure & Reliable", "Global Reach"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white/60 text-sm">
                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; animation-delay: 1s; }
      `}</style>
    </>
  );
}