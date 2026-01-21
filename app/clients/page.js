// app/clients/page.js
'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

// Helper: generate initials from name (first 2 words)
function getInitials(name = '') {
  if (!name) return '';
  const parts = name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2);
  const letters = parts.map((p) => p.charAt(0).toUpperCase());
  return letters.join('');
}

export default function ClientsPage() {
  const [isVisible, setIsVisible] = useState({});
  const [hoveredClient, setHoveredClient] = useState(null);

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch clients from public API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/clients');
        if (!res.ok) throw new Error('Failed to load clients');
        const data = await res.json();
        const clientsArray = Array.isArray(data) ? data : (data.data || []);
        setClients(clientsArray);
        setError('');
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to load clients');
        setClients([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Intersection observer for animation
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

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const totalClients = clients.length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white relative z-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0f1c3f] via-[#203E7F] to-[#1a5a7a] relative overflow-hidden py-20 sm:py-24 lg:py-32">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full filter blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full filter blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-white/5 to-cyan-400/10 rounded-full filter blur-3xl"></div>
          </div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              {/* Breadcrumb */}
              <nav className="flex justify-center mb-8" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-3 text-sm sm:text-base">
                  <li>
                    <Link href="/" className="text-blue-200/80 hover:text-white transition-colors duration-300 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      Home
                    </Link>
                  </li>
                  <li className="text-blue-300/50">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </li>
                  <li className="text-white font-semibold">Our Clients</li>
                </ol>
              </nav>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-white/90 text-sm font-medium">Trusted Partnerships</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold text-white mb-6">
                Our <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Valued</span> Clients
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
                Partnering with industry leaders across diverse sectors to deliver exceptional digital solutions that drive success.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-white">{loading ? '...' : `${totalClients}+`}</div>
                  <div className="text-blue-200/70 text-sm mt-1">Happy Clients</div>
                </div>
                <div className="w-px h-16 bg-white/20 hidden sm:block"></div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-white">98%</div>
                  <div className="text-blue-200/70 text-sm mt-1">Satisfaction Rate</div>
                </div>
                <div className="w-px h-16 bg-white/20 hidden sm:block"></div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-white">5+</div>
                  <div className="text-blue-200/70 text-sm mt-1">Years of Trust</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
            </svg>
          </div>
        </section>

        {/* Clients Grid */}
        <section
          className="py-16 sm:py-20 lg:py-28 bg-slate-50"
          data-animate
          id="clients-grid"
        >
          <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <span className="inline-block text-[#203E7F] font-semibold text-sm uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full mb-4">
                Our Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
                {loading ? 'Loading clients…' : 'Companies That Trust Us'}
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
                We've had the privilege of working with amazing companies across various industries
              </p>
              {error && (
                <div className="mt-4 inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
            </div>

            {/* Loading state */}
            {loading && (
              <div className="flex justify-center py-16">
                <div className="inline-flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-[#203E7F] border-t-transparent rounded-full animate-spin absolute inset-0"></div>
                  </div>
                  <span className="text-slate-600 font-medium">Loading our amazing clients...</span>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && clients.length === 0 && (
              <div className="py-16 text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No clients to show yet</h3>
                <p className="text-slate-500">Check back soon for updates.</p>
              </div>
            )}

            {/* Grid */}
            {!loading && clients.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 lg:gap-8">
                {clients.map((client, index) => {
                  const color = client.color || '#4285F4';
                  const initials = getInitials(client.name);
                  const isHovered = hoveredClient === client.id;

                  return (
                    <div
                      key={client.id}
                      className={`group relative bg-white rounded-2xl sm:rounded-3xl transition-all duration-500 overflow-visible border border-gray-100/80 cursor-pointer ${
                        isVisible['clients-grid']
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-10 opacity-0'
                      } ${isHovered ? 'shadow-2xl scale-[1.02] -translate-y-2' : 'shadow-sm hover:shadow-xl'}`}
                      style={{ 
                        transitionDelay: `${index * 40}ms`,
                      }}
                      onMouseEnter={() => setHoveredClient(client.id)}
                      onMouseLeave={() => setHoveredClient(null)}
                    >
                      {/* Gradient Border Effect */}
                      <div
                        className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"
                        style={{
                          background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                          transform: 'scale(1.02)',
                        }}
                      ></div>

                      {/* Top Accent Line */}
                      <div
                        className="absolute top-0 left-4 right-4 h-1 rounded-b-full transition-all duration-500 transform origin-center scale-x-0 group-hover:scale-x-100"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                        }}
                      ></div>

                      <div className="p-6 sm:p-8 flex flex-col items-center">
                        {/* Logo Container */}
                        <div
                          className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 overflow-hidden relative ${
                            client.logo ? 'bg-white' : ''
                          }`}
                          style={{
                            backgroundColor: client.logo ? '#FFFFFF' : `${color}10`,
                            border: client.logo ? '2px solid #f1f5f9' : `2px solid ${color}20`,
                            boxShadow: isHovered
                              ? `0 20px 40px ${color}25`
                              : '0 4px 12px rgba(0,0,0,0.04)',
                          }}
                        >
                          {/* Inner glow effect */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                            style={{
                              background: `radial-gradient(circle at center, ${color}10, transparent 70%)`,
                            }}
                          ></div>

                          {client.logo ? (
                            <img
                              src={client.logo}
                              alt={client.name}
                              className="max-w-[80%] max-h-[80%] w-auto h-auto object-contain transition-all duration-500 ease-in-out relative z-10"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : (
                            <span
                              className="text-2xl sm:text-3xl lg:text-4xl font-bold relative z-10 transition-all duration-300"
                              style={{
                                color: color,
                              }}
                            >
                              {initials || '?'}
                            </span>
                          )}
                          
                          {/* Hidden fallback for failed images */}
                          <span
                            className="hidden text-2xl sm:text-3xl lg:text-4xl font-bold"
                            style={{ color: color }}
                          >
                            {initials || '?'}
                          </span>
                        </div>

                        {/* Client Name - Improved Professional Design */}
                        <div className="w-full text-center mt-2">
                          <h3
                            className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 leading-tight"
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {client.name}
                          </h3>
                          
                          {/* Subtle underline accent */}
                          <div
                            className="h-0.5 mx-auto mt-3 rounded-full transition-all duration-500 ease-out"
                            style={{
                              width: isHovered ? '40px' : '20px',
                              backgroundColor: isHovered ? color : '#e2e8f0',
                            }}
                          ></div>
                        </div>

                        {/* Hover Badge */}
                        <div
                          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                          }`}
                        >
                          {/* <span
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg whitespace-nowrap"
                            style={{ backgroundColor: color }}
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Trusted Partner
                          </span> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* View More Section */}
            {!loading && clients.length > 0 && (
              <div className="text-center mt-16">
                <p className="text-gray-500 mb-6">
                  And many more amazing companies we're proud to work with
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Technology', 'Healthcare', 'Finance', 'Education', 'E-commerce'].map((industry, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#203E7F] hover:text-[#203E7F] transition-colors cursor-default"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="relative">
              <svg className="w-12 h-12 text-[#203E7F]/20 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-800 leading-relaxed">
                "Working with exceptional partners has been the cornerstone of our success. 
                <span className="text-[#203E7F]"> Together, we achieve more.</span>"
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  TW
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">TechWave Team</div>
                  <div className="text-sm text-gray-500">Building Digital Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-[#0f1c3f] via-[#203E7F] to-[#1a5a7a] relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl"></div>
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm font-medium">Let's Work Together</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-white mb-6">
              Ready to Join Our
              <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Success Stories?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how we can help transform your business with our comprehensive digital solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group bg-white text-[#203E7F] px-8 sm:px-10 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-base sm:text-lg shadow-2xl hover:shadow-white/25 hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Start Your Project
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="group bg-transparent border-2 border-white/30 text-white px-8 sm:px-10 py-4 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 font-bold text-base sm:text-lg backdrop-blur-sm hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Explore Services
                <svg
                  className="w-5 h-5 group-hover:rotate-45 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-12 border-t border-white/10">
              <p className="text-blue-200/60 text-sm mb-4">Trusted by companies worldwide</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {['ISO Certified', '24/7 Support', 'Secure & Reliable', 'Global Reach'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white/80 text-sm">
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
      <Footer />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-5deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
}