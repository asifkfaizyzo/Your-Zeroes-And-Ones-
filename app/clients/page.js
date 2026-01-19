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

// Optional: simple color palette for fallback circles
const fallbackColors = [
  '#4285F4',
  '#34A853',
  '#FBBC04',
  '#EA4335',
  '#FF6D01',
  '#46BDC6',
  '#7B1FA2',
  '#1976D2',
  '#E65100',
  '#424242',
  '#0277BD',
  '#2E7D32',
  '#5E35B1',
  '#C62828',
  '#AD1457',
  '#00695C',
  '#00838F',
  '#F9A825',
  '#283593',
  '#6A1B9A',
];

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
        setClients(data.data || data || []);
        setError('');
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to load clients');
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
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#203E7F] to-cyan-600 relative overflow-hidden py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          </div>

          <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <nav className="flex justify-center mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm sm:text-base">
                  <li>
                    <Link href="/" className="text-blue-200 hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li className="text-blue-200">/</li>
                  <li className="text-white font-medium">Our Clients</li>
                </ol>
              </nav>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-white mb-4 sm:mb-6">
                Our Valued Clients
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                We're proud to partner with industry leaders across diverse sectors,
                delivering exceptional digital solutions that drive their success.
              </p>
            </div>
          </div>
        </section>

        {/* Clients Grid */}
        <section
          className="py-12 sm:py-16 lg:py-20 bg-gray-50"
          data-animate
          id="clients-grid"
        >
          <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <span className="text-[#203E7F] font-semibold text-sm uppercase tracking-wider">
                Trusted By
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
                {loading ? 'Loading clients…' : `${totalClients}+ Companies Trust Us`}
              </h2>
              {error && (
                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            {/* Loading state */}
            {loading && (
              <div className="flex justify-center py-10">
                <div className="inline-flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
                  <span className="text-slate-600 text-sm">Loading clients...</span>
                </div>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && clients.length === 0 && (
              <div className="py-10 text-center text-slate-500">
                No clients to show yet. Check back soon.
              </div>
            )}

            {/* Grid */}
            {!loading && clients.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                {clients.map((client, index) => {
                  // Choose a stable fallback color based on index
                  const color =
                    fallbackColors[index % fallbackColors.length] || '#203E7F';
                  const initials = getInitials(client.name);
                  const isHovered = hoveredClient === client.id;

                  return (
                    <div
                      key={client.id}
                      className={`group relative bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-3 hover:scale-105 cursor-pointer ${
                        isVisible['clients-grid']
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-10 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                      onMouseEnter={() => setHoveredClient(client.id)}
                      onMouseLeave={() => setHoveredClient(null)}
                    >
                      {/* Glow Effect on Hover */}
                      <div
                        className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, ${color}25, transparent 70%)`,
                        }}
                      ></div>

                      {/* Top border accent */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 transform origin-left scale-x-0 group-hover:scale-x-100"
                        style={{
                          background: `linear-gradient(90deg, ${color}, ${color}80)`,
                        }}
                      ></div>

                      <div className="p-6 sm:p-8 lg:p-10 flex flex-col items-center relative z-10">
                        {/* Logo Container - UPDATED */}
                        <div
                          className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-500 group-hover:scale-110 overflow-hidden ${
                            client.logo ? 'bg-white border border-gray-200 p-3' : ''
                          }`}
                          style={{
                            backgroundColor: client.logo 
                              ? '#FFFFFF' 
                              : (isHovered ? color : '#F3F4F6'),
                            boxShadow: isHovered
                              ? `0 15px 35px ${color}40`
                              : client.logo 
                                ? '0 4px 12px rgba(0,0,0,0.08)' 
                                : 'none',
                          }}
                        >
                          {client.logo ? (
                            // Logo with grayscale effect - UPDATED
                            <img
                              src={client.logo}
                              alt={client.name}
                              className="max-w-full max-h-full w-auto h-auto object-contain transition-all duration-500 ease-in-out grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                              onError={(e) => {
                                // Fallback if image fails to load
                                e.target.style.display = 'none';
                                e.target.nextSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          
                          {/* Fallback initials (shown if no logo or if logo fails) */}
                          <span
                            className={`text-2xl sm:text-3xl lg:text-4xl font-bold transition-all duration-500 ${
                              client.logo ? 'hidden' : ''
                            }`}
                            style={{
                              color: isHovered ? '#FFFFFF' : '#9CA3AF',
                            }}
                          >
                            {initials || '?'}
                          </span>
                        </div>

                        {/* Client Name */}
                        <h3
                          className="text-sm sm:text-base lg:text-lg font-bold text-center transition-colors duration-300 line-clamp-2"
                          style={{
                            color: isHovered ? color : '#1F2937',
                          }}
                        >
                          {client.name}
                        </h3>
                      </div>

                      {/* Bottom Accent Line */}
                      <div
                        className="h-1 w-full transition-all duration-500 transform origin-right scale-x-0 group-hover:scale-x-100"
                        style={{
                          background: `linear-gradient(90deg, ${color}80, ${color})`,
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[#203E7F] to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Join Our Client Family?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how we can help transform your business with our comprehensive digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group bg-white text-[#203E7F] px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-bold text-sm sm:text-base lg:text-lg shadow-2xl hover:scale-105 inline-flex items-center justify-center"
              >
                Start Your Project
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="group border-2 border-white text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl hover:bg-white hover:text-[#203E7F] transition-all duration-300 font-bold text-sm sm:text-base lg:text-lg hover:scale-105 inline-flex items-center justify-center"
              >
                Explore Our Services
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:rotate-45 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}