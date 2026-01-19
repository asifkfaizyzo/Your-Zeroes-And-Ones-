// app/page.js
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Cpu, TrendingUp, Palette } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

// ============================================
// CONSTANTS & HELPERS
// ============================================

function getInitials(name = "") {
  if (!name) return "";
  const parts = name.trim().split(" ").filter(Boolean).slice(0, 2);
  const letters = parts.map((p) => p.charAt(0).toUpperCase());
  return letters.join("");
}

const fallbackColors = [
  "#4285F4",
  "#34A853",
  "#FBBC04",
  "#EA4335",
  "#FF6D01",
  "#46BDC6",
  "#7B1FA2",
  "#1976D2",
  "#E65100",
  "#424242",
  "#0277BD",
  "#2E7D32",
  "#5E35B1",
  "#C62828",
  "#AD1457",
  "#00695C",
  "#00838F",
  "#F9A825",
  "#283593",
  "#6A1B9A",
];

const serviceCategories = [
  {
    title: "Branding & Design",
    description:
      "Complete branding solutions that create memorable identities and compelling visual experiences.",
    icon: (
      <svg
        className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-14 2xl:h-14"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
    link: "/services/branding-design",
    services: [
      "Brand Consulting",
      "Logo Design",
      "Graphic Design",
      "2D & 3D Visualization",
      "Video Production",
      "Audio Production",
      "AI Video Production",
    ],
    color: "from-[#203E7F] to-cyan-600",
  },
  {
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies to boost your online presence and drive measurable results.",
    icon: (
      <svg
        className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-14 2xl:h-14"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
    link: "/services/digital-marketing",
    services: [
      "SEO",
      "Social Media Management",
      "Performance Marketing",
      "Content Marketing",
      "Marketing Automations",
      "Analytics & Reporting",
    ],
    color: "from-[#203E7F] to-cyan-600",
  },
  {
    title: "Technology",
    description:
      "Cutting-edge technology solutions that power your business growth and digital transformation.",
    icon: (
      <svg
        className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-14 2xl:h-14"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    link: "/services/technology",
    services: [
      "AI & Machine Learning",
      "DevOps Consulting",
      "Web Development",
      "Mobile App Development",
      "E-Commerce Solutions",
      "Quality Assurance",
      "Cloud Services",
      "Data & Analytics",
      "Cyber Security",
    ],
    color: "from-[#203E7F] to-cyan-600",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discover",
    desc: "We analyze your needs and define project goals",
    icon: "🔍",
    color: "from-[#203E7F] to-cyan-600",
  },
  {
    step: "02",
    title: "Design",
    desc: "Create solutions tailored to your requirements",
    icon: "✨",
    color: "from-[#203E7F] to-cyan-600",
  },
  {
    step: "03",
    title: "Develop",
    desc: "Build and implement with cutting-edge technology",
    icon: "⚙️",
    color: "from-[#203E7F] to-cyan-600",
  },
  {
    step: "04",
    title: "Deliver",
    desc: "Launch and provide ongoing support",
    icon: "🚀",
    color: "from-[#203E7F] to-cyan-600",
  },
];

// Fallback testimonials in case API fails
const fallbackTestimonials = [
  {
    id: "fallback-1",
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    message:
      "Working with this team transformed our digital presence. Their comprehensive approach to branding and technology helped us scale rapidly.",
    image: null,
    rating: 5,
  },
  {
    id: "fallback-2",
    name: "Michael Chen",
    role: "Marketing Director, GrowthCo",
    message:
      "The ROI from their digital marketing strategies exceeded our expectations. Professional, data-driven, and always innovative.",
    image: null,
    rating: 5,
  },
  {
    id: "fallback-3",
    name: "Emily Rodriguez",
    role: "Founder, Creative Studios",
    message:
      "From concept to execution, every detail was perfect. They truly understand how to bring a vision to life.",
    image: null,
    rating: 5,
  },
];

// ============================================
// REUSABLE COMPONENTS
// ============================================

function ClientCard({ client, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const color = fallbackColors[index % fallbackColors.length] || "#203E7F";
  const initials = getInitials(client.name);

  return (
    <div
      className="mx-3 sm:mx-4 flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div
        className="group relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 xl:w-48 xl:h-48 rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex items-center justify-center hover:-translate-y-2 hover:scale-105"
        role="img"
        aria-label={client.name}
        tabIndex={0}
      >
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${color}40, transparent 70%)`,
          }}
        />

        <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 overflow-hidden p-2">
          {client.logo ? (
            <img
              src={client.logo}
              alt={client.name}
              className={`w-full h-full object-contain transition-all duration-500 ${
                isHovered ? "grayscale-0" : "grayscale"
              }`}
              loading="lazy"
            />
          ) : (
            <div
              className={`w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg lg:text-xl xl:text-2xl transition-all duration-500 ${
                isHovered ? "grayscale-0 shadow-lg" : "grayscale"
              }`}
              style={{ backgroundColor: color }}
            >
              {initials || "?"}
            </div>
          )}
        </div>

        <div
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none z-50 ${
            isHovered
              ? "opacity-100 -bottom-10 sm:-bottom-12"
              : "opacity-0 -bottom-8"
          }`}
        >
          <div className="relative">
            <span className="bg-gray-900 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-lg whitespace-nowrap block">
              {client.name}
            </span>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientsCarousel({ clients }) {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const baseDuration = 3;
  const animationDuration = Math.max(20, clients.length * baseDuration);
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="Our clients carousel"
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-[#203E7F] via-[#203E7F]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-cyan-600 via-cyan-600/80 to-transparent z-20 pointer-events-none" />

      <div className="overflow-hidden pb-14 sm:pb-16">
        <div
          ref={scrollRef}
          className="flex"
          style={{
            animation: `scroll ${animationDuration}s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {duplicatedClients.map((client, index) => (
            <ClientCard
              key={`${client.id}-${index}`}
              client={client}
              index={index % clients.length}
            />
          ))}
        </div>
      </div>

      {isPaused && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/60 text-xs flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Paused
        </div>
      )}
    </div>
  );
}

// ✅ NEW: Homepage Testimonial Avatar Component
function TestimonialAvatar({ testimonial, size = "md" }) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(testimonial.name);

  const sizeClasses = {
    sm: "w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-base",
    md: "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-lg sm:text-xl lg:text-2xl",
    lg: "w-16 h-16 sm:w-20 sm:h-20 text-xl sm:text-2xl",
  };

  if (testimonial.image && !imageError) {
    return (
      <img
        src={testimonial.image}
        alt={testimonial.name}
        onError={() => setImageError(true)}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-lg`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-[#20427f] to-cyan-600 rounded-full flex items-center justify-center text-white font-bold`}
    >
      {initials || "?"}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function Home() {
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [countUp, setCountUp] = useState({});
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);

  // ✅ NEW: Testimonials state
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const stats = [
    { number: 50, label: "Projects Completed", suffix: "+" },
    { number: clients.length || 30, label: "Happy Clients", suffix: "+" },
    { number: 15, label: "Years Experience", suffix: "+" },
    { number: 24, label: "Support", suffix: "/7" },
  ];

  // Fetch clients from API
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

  // ✅ NEW: Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setTestimonialsLoading(true);
        const res = await fetch("/api/testimonials");
        if (!res.ok) throw new Error("Failed to load testimonials");
        const data = await res.json();

        // Filter for verified testimonials and sort by date (newest first)
        // Then take only the first 5 for the carousel
        const filtered = data
          .filter((t) => t.verified !== false) // Include verified or unspecified
          .sort((a, b) => {
            // Sort by date if available, newest first
            if (a.date && b.date) {
              return new Date(b.date) - new Date(a.date);
            }
            // Sort by id as fallback (assuming higher id = newer)
            return (b.id || 0) - (a.id || 0);
          })
          .slice(0, 5); // Take only first 5

        setTestimonials(filtered.length > 0 ? filtered : fallbackTestimonials);
      } catch (err) {
        console.error("Testimonials fetch error:", err);
        setTestimonials(fallbackTestimonials);
      } finally {
        setTestimonialsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Intersection Observer for animations
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

  // Counter animation helper
  const animateCounter = useCallback((target, key) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCountUp((prev) => ({ ...prev, [key]: target }));
        clearInterval(timer);
      } else {
        setCountUp((prev) => ({ ...prev, [key]: Math.floor(current) }));
      }
    }, 30);
  }, []);

  // Animate stats counters
  useEffect(() => {
    if (isVisible["stats"]) {
      animateCounter(50, "projects");
      animateCounter(clients.length || 30, "clients");
      animateCounter(15, "years");
    }
  }, [isVisible["stats"], clients.length, animateCounter]);

  // ✅ UPDATED: Auto-rotate testimonials (only when not paused and testimonials loaded)
  useEffect(() => {
    if (testimonialsLoading || testimonials.length === 0 || isPaused) return;

    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [testimonialsLoading, testimonials.length, isPaused]);

  // ✅ Get current testimonial safely
  const currentTestimonial =
    testimonials[activeTestimonial] || fallbackTestimonials[0];
  const rating = Math.min(
    5,
    Math.max(0, parseInt(currentTestimonial?.rating) || 5)
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#20427f] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#1a3668] transition-colors text-sm sm:text-base"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-hidden">
        {/* ==================== HERO SECTION ==================== */}
        <section className="bg-white relative overflow-hidden min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#20427f]/5 via-white to-cyan-50" />

          {/* Floating Shapes */}
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 lg:w-80 xl:w-96 h-48 sm:h-72 lg:h-80 xl:h-96 bg-[#407def] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-48 sm:w-72 lg:w-80 xl:w-96 h-48 sm:h-72 lg:h-80 xl:h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-10 sm:left-20 w-48 sm:w-72 lg:w-80 xl:w-96 h-48 sm:h-72 lg:h-80 xl:h-96 bg-[#53cbec] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

          <div className="relative z-10 py-12 sm:py-16 lg:py-10 w-full">
            <div
              className="w-full max-w-[1800px] mx-auto"
              style={{
                paddingLeft: "clamp(2rem, 8vw, 12rem)",
                paddingRight: "clamp(2rem, 8vw, 12rem)",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
                {/* Hero Content */}
                <div
                  className="text-left space-y-4 sm:space-y-6 lg:space-y-7"
                  data-animate
                  id="hero-content"
                >
                  <h1
                    className={`text-2xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-5xl 2xl:text-7xl font-bold text-gray-900 leading-tight transition-all duration-1000 transform ${
                      isVisible["hero-content"]
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                   We Complete Your
                    <span className="block bg-gradient-to-r from-[#20427f] via-cyan-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                      Zeros and Ones
                    </span>
                  </h1>

                  <p
                    className={`text-base sm:text-lg md:text-xl lg:text-1xl 2xl:text-3xl text-gray-600 leading-relaxed transition-all duration-1000 delay-200 transform ${
                      isVisible["hero-content"]
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    Comprehensive digital solutions that transform your business
                    through innovative branding, strategic marketing, and
                    cutting-edge technology.
                  </p>

                  <div
                    className={`flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-3 transition-all duration-1000 delay-400 transform ${
                      isVisible["hero-content"]
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                  >
                    <Link
                      href="/services"
                      className="group bg-[#20427f] text-white px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl hover:bg-[#1a3668] transition-all duration-300 font-semibold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center"
                    >
                      Explore Our Services
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                    <Link
                      href="/contact"
                      className="group border-2 border-[#20427f] text-[#20427f] px-5 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl hover:bg-[#20427f] hover:text-white transition-all duration-300 font-semibold text-sm sm:text-base lg:text-lg hover:scale-105 flex items-center justify-center"
                    >
                      <span>Get Started Today</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:rotate-45 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Hero Cards */}
                <div className="relative w-full mt-8 lg:mt-0">
                  {/* Mobile/Tablet: Horizontal scroll */}
                  <div className="flex flex-row gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:hidden px-2">
                    <div className="flex-shrink-0 w-40 sm:w-48 h-52 sm:h-60 bg-gradient-to-br from-[#20427f] to-cyan-600 rounded-2xl shadow-xl transform rotate-3 hover:rotate-6 transition-transform duration-500 flex items-center justify-center snap-center">
                      <div className="text-white text-center p-4">
                        <h3 className="text-sm sm:text-base font-bold">
                          Technology
                        </h3>
                        <Cpu
                          className="w-12 sm:w-14 h-12 sm:h-14 mx-auto mt-3"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-40 sm:w-48 h-52 sm:h-60 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl transform -rotate-3 hover:-rotate-6 transition-transform duration-500 flex items-center justify-center snap-center">
                      <div className="text-white text-center p-4">
                        <h3 className="text-sm sm:text-base font-bold">
                          Digital Marketing
                        </h3>
                        <TrendingUp
                          className="w-12 sm:w-14 h-12 sm:h-14 mx-auto mt-3"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-40 sm:w-48 h-52 sm:h-60 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-xl transform rotate-2 hover:scale-105 transition-transform duration-500 flex items-center justify-center snap-center">
                      <div className="text-white text-center p-4">
                        <h3 className="text-sm sm:text-base font-bold">
                          Branding & Designing
                        </h3>
                        <Palette
                          className="w-12 sm:w-14 h-12 sm:h-14 mx-auto mt-3"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Absolute positioned layout */}
                  <div className="hidden lg:block relative w-full h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px]">
                    <div className="absolute top-0 right-0 w-48 lg:w-52 xl:w-60 2xl:w-64 h-60 lg:h-64 xl:h-72 2xl:h-80 bg-gradient-to-br from-[#20427f] to-cyan-600 rounded-2xl shadow-2xl transform rotate-6 hover:rotate-12 transition-transform duration-500 flex items-center justify-center">
                      <div className="text-white text-center p-4 lg:p-6 xl:p-8">
                        <h3 className="text-base lg:base xl:text-1xl 2xl:text-2xl font-bold">
                          Technology
                        </h3>
                        <Cpu
                          className="w-14 lg:w-16 xl:w-20 2xl:w-24 h-14 lg:h-16 xl:h-20 2xl:h-24 mx-auto mt-3 lg:mt-4"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div className="absolute top-10 left-0 w-48 lg:w-52 xl:w-60 2xl:w-64 h-60 lg:h-64 xl:h-72 2xl:h-80 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl transform -rotate-6 hover:-rotate-12 transition-transform duration-500 flex items-center justify-center">
                      <div className="text-white text-center p-4 lg:p-6 xl:p-8">
                        <h3 className="text-base lg:base xl:text-1xl 2xl:text-2xl font-bold">
                          Digital Marketing
                        </h3>
                        <TrendingUp
                          className="w-14 lg:w-16 xl:w-20 2xl:w-24 h-14 lg:h-16 xl:h-20 2xl:h-24 mx-auto mt-3 lg:mt-4"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 lg:w-52 xl:w-60 2xl:w-64 h-60 lg:h-64 xl:h-72 2xl:h-80 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-2xl hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                      <div className="text-white text-center p-4 lg:p-6 xl:p-8">
                        <h3 className="text-base lg:base xl:text-1xl 2xl:text-2xl font-bold">
                          Branding & Designing
                        </h3>
                        <Palette
                          className="w-14 lg:w-16 xl:w-20 2xl:w-24 h-14 lg:h-16 xl:h-20 2xl:h-24 mx-auto mt-3 lg:mt-4"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== STATS SECTION ==================== */}
        <section
          className="py-12 sm:py-16 lg:py-20 2xl:py-24 bg-white relative"
          data-animate
          id="stats"
        >
          <div
            className="w-full max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-4 sm:p-6 lg:p-8 2xl:p-10 rounded-xl sm:rounded-2xl bg-gradient-to-br ${
                    index === 0
                      ? "from-purple-50 to-pink-50"
                      : index === 1
                      ? "from-blue-50 to-cyan-50"
                      : index === 2
                      ? "from-green-50 to-emerald-50"
                      : "from-orange-50 to-yellow-50"
                  } transform hover:scale-105 lg:hover:scale-110 transition-all duration-300 hover:shadow-xl`}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold bg-gradient-to-r from-[#20427f] to-cyan-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                    {index === 3
                      ? stat.number
                      : countUp[Object.keys(countUp)[index]] || 0}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-600 font-semibold text-xs sm:text-sm md:text-base 2xl:text-lg">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== SERVICES SECTION ==================== */}
        <section
          className="py-12 sm:py-16 lg:py-20 2xl:py-24 bg-gradient-to-b from-gray-50 to-white relative"
          data-animate
          id="services"
        >
          <div
            className="w-full max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <span className="text-[#20427f] font-semibold text-xs sm:text-sm uppercase tracking-wider">
                What We Offer
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 mt-2">
                Our Comprehensive Services
              </h2>
              <p className="text-base sm:text-lg lg:text-xl 2xl:text-2xl text-gray-600 max-w-2xl 2xl:max-w-3xl mx-auto">
                End-to-end digital solutions designed to transform your business
                and drive sustainable growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {serviceCategories.map((category, index) => (
                <div
                  key={index}
                  className={`group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-2 ${
                    isVisible["services"]
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div
                    className={`h-1.5 sm:h-2 bg-gradient-to-r ${category.color}`}
                  />

                  <div className="p-5 sm:p-6 lg:p-8 flex-grow">
                    <div className="text-white mb-4 sm:mb-6 flex justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <div
                        className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${category.color} shadow-lg`}
                      >
                        {category.icon}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-gray-900 text-center mb-3 sm:mb-4 group-hover:text-[#20427f] transition-colors">
                      {category.title}
                    </h3>

                    <p className="text-sm sm:text-base 2xl:text-lg text-gray-600 text-center mb-4 sm:mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      {category.services.map((service, serviceIndex) => (
                        <div
                          key={serviceIndex}
                          className="flex items-center text-gray-700 transform hover:translate-x-2 transition-transform"
                        >
                          <div
                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0`}
                          >
                            <svg
                              className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-xs sm:text-sm 2xl:text-base font-medium">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 lg:p-8 pt-0 mt-auto">
                    <Link
                      href={category.link}
                      className={`w-full bg-gradient-to-r ${category.color} text-white text-center py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm sm:text-base inline-flex items-center justify-center group-hover:scale-105`}
                    >
                      Explore {category.title.split(" ")[0]}
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CLIENTS SECTION ==================== */}
        <section
          className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-[#203E7F] to-cyan-600 relative overflow-hidden"
          data-animate
          id="clients"
        >
          {/* Background Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-[#203E7F] to-cyan-400 rounded-full blur-[100px] opacity-20 animate-pulse" />
          <div className="absolute top-1/3 right-0 w-64 h-64 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full blur-[120px] opacity-20 animate-pulse animation-delay-2000" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-[140px] opacity-20 animation-delay-4000" />

          <div className="relative z-10 w-full">
            {/* Header */}
            <div
              className="text-center mb-12 sm:mb-16 w-full max-w-[1800px] mx-auto"
              style={{
                paddingLeft: "clamp(2rem, 8vw, 12rem)",
                paddingRight: "clamp(2rem, 8vw, 12rem)",
              }}
            >
              <span className="text-cyan-200 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Trusted Partners
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold mt-2 mb-4 text-white">
                Clients We Have Worked With
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">
                Delivering innovative digital solutions with global leaders.
              </p>
            </div>

            {/* Carousel */}
            {clientsLoading ? (
              <div className="flex justify-center py-10">
                <div className="inline-flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="text-white text-sm">Loading clients...</span>
                </div>
              </div>
            ) : clients.length === 0 ? (
              <div className="text-center py-10 text-white/70">
                No clients to display yet.
              </div>
            ) : clients.length < 4 ? (
              <div
                className="w-full max-w-[1800px] mx-auto"
                style={{
                  paddingLeft: "clamp(2rem, 8vw, 12rem)",
                  paddingRight: "clamp(2rem, 8vw, 12rem)",
                }}
              >
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  {clients.map((client, index) => (
                    <ClientCard key={client.id} client={client} index={index} />
                  ))}
                </div>
              </div>
            ) : (
              <ClientsCarousel clients={clients} />
            )}

            {/* Button */}
            <div
              className="text-center mt-12 sm:mt-16 w-full max-w-[1800px] mx-auto"
              style={{
                paddingLeft: "clamp(2rem, 8vw, 12rem)",
                paddingRight: "clamp(2rem, 8vw, 12rem)",
              }}
            >
              <Link
                href="/clients"
                className="group inline-flex items-center justify-center bg-white text-[#203E7F] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                View All Clients
                <svg
                  className="ml-2 w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1"
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
            </div>
          </div>
        </section>

        {/* ==================== PROCESS SECTION ==================== */}
        <section
          className="py-12 sm:py-16 lg:py-20 2xl:py-24 bg-white relative"
          data-animate
          id="process"
        >
          <div
            className="w-full max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <span className="text-[#20427f] font-semibold text-xs sm:text-sm uppercase tracking-wider">
                How We Work
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 mt-2">
                Our Simple Process
              </h2>
              <p className="text-base sm:text-lg lg:text-xl 2xl:text-2xl text-gray-600 max-w-2xl 2xl:max-w-3xl mx-auto">
                A structured approach to ensure your project's success from
                concept to completion
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 relative">
              <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 opacity-20" />

              {processSteps.map((process, index) => (
                <div
                  key={index}
                  className={`text-center p-3 sm:p-4 lg:p-6 relative transform hover:scale-105 transition-all duration-300 ${
                    isVisible["process"]
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative inline-block mb-4 sm:mb-6">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 2xl:w-24 2xl:h-24 bg-gradient-to-r ${process.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto shadow-xl transform rotate-6 hover:rotate-12 transition-transform`}
                    >
                      <span className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl">
                        {process.icon}
                      </span>
                    </div>
                    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold text-gray-900 shadow-lg border-2 border-gray-100">
                      {process.step}
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl 2xl:text-2xl font-bold mb-2 sm:mb-3 text-gray-900">
                    {process.title}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg text-gray-600 leading-relaxed">
                    {process.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

{/* ==================== TESTIMONIALS SECTION - VARIATION 3: CAROUSEL WITH PREVIEWS ==================== */}
<section
  className="py-12 sm:py-16 lg:py-20 2xl:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden"
  data-animate
  id="testimonials"
  onMouseEnter={() => setIsPaused(false)}
  onMouseLeave={() => setIsPaused(false)}
>
  {/* Subtle Grid Background */}
  <div
    className="absolute inset-0 opacity-[0.02]"
    style={{
      backgroundImage: `linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)`,
      backgroundSize: "50px 50px",
    }}
  />

  <div
    className="w-full max-w-[1800px] mx-auto relative z-10"
    style={{
      paddingLeft: "clamp(1rem, 4vw, 4rem)",
      paddingRight: "clamp(1rem, 4vw, 4rem)",
    }}
  >
    {/* Header */}
    <div className="text-center mb-10 lg:mb-14">
      <span className="inline-block text-[#20427f] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
        ★ CLIENT TESTIMONIALS ★
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-gray-900">
        What Our Clients Say
      </h2>
    </div>

    {testimonialsLoading ? (
      <div className="flex justify-center py-16">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-[#20427f] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    ) : testimonials.length === 0 ? (
      <div className="text-center py-16 text-gray-500">
        No testimonials available yet.
      </div>
    ) : (
      <div className="relative">
        {/* Desktop: 3-Card Layout */}
        <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8">
          {testimonials.length > 1 && (
            <>
              {/* Previous Card (Dimmed) */}
              <div
                className="w-80 xl:w-96 flex-shrink-0 cursor-pointer transition-all duration-500 opacity-40 hover:opacity-60 scale-90 hover:scale-95"
                onClick={() =>
                  setActiveTestimonial((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  )
                }
              >
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden">
                  <p 
                    className="text-gray-600 text-sm line-clamp-3 mb-4"
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  >
                    "
                    {testimonials[
                      (activeTestimonial - 1 + testimonials.length) %
                        testimonials.length
                    ]?.message?.slice(0, 100)}
                    ..."
                  </p>
                  <div className="flex items-center gap-3 min-w-0">
                    <TestimonialAvatar
                      testimonial={
                        testimonials[
                          (activeTestimonial -
                            1 +
                            testimonials.length) %
                            testimonials.length
                        ]
                      }
                      size="sm"
                    />
                    <span 
                      className="text-sm font-medium text-gray-700 truncate"
                      style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                    >
                      {
                        testimonials[
                          (activeTestimonial -
                            1 +
                            testimonials.length) %
                            testimonials.length
                        ]?.name
                      }
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Active Card (Center) */}
          <div
            key={activeTestimonial}
            className="w-full max-w-2xl xl:max-w-3xl flex-shrink-0 animate-scale-in"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#20427f] via-cyan-500 to-[#20427f] rounded-3xl blur-lg opacity-20 animate-glow" />

              <div className="relative bg-white rounded-3xl p-8 xl:p-12 shadow-2xl border border-gray-100 overflow-hidden">
                {/* Quote Icon with Animation */}
                <div className="absolute top-4 left-8 w-10 h-10 bg-gradient-to-r from-[#20427f] to-cyan-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce-slow">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Verified */}
                {currentTestimonial.verified && (
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </span>
                  </div>
                )}

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6 pt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${
                        i < rating ? "text-yellow-400" : "text-gray-200"
                      } animate-twinkle`}
                      style={{ animationDelay: `${i * 100}ms` }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Message - FIXED */}
                <p 
                  className="text-xl xl:text-2xl text-gray-700 text-center leading-relaxed mb-8 animate-fade-in"
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  "
                  {currentTestimonial.message ||
                    currentTestimonial.content}
                  "
                </p>

                {/* Author - FIXED */}
                <div className="flex items-center justify-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#20427f] to-cyan-500 rounded-full animate-spin-slow" />
                    <div className="relative bg-white rounded-full p-0.5">
                      <TestimonialAvatar
                        testimonial={currentTestimonial}
                        size="md"
                      />
                    </div>
                  </div>
                  <div className="min-w-0 max-w-xs">
                    <div 
                      className="font-bold text-gray-900 text-lg"
                      style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                    >
                      {currentTestimonial.name}
                    </div>
                    <div 
                      className="text-[#20427f] text-sm font-medium"
                      style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                    >
                      {currentTestimonial.role}
                    </div>
                    {currentTestimonial.company && (
                      <div 
                        className="text-gray-500 text-xs"
                        style={{
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word'
                        }}
                      >
                        {currentTestimonial.company}
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                {!isPaused && testimonials.length > 1 && (
                  <div className="mt-8 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#20427f] to-cyan-500 animate-progress"
                      style={{ animationDuration: "3s" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {testimonials.length > 1 && (
            <>
              {/* Next Card (Dimmed) */}
              <div
                className="w-80 xl:w-96 flex-shrink-0 cursor-pointer transition-all duration-500 opacity-40 hover:opacity-60 scale-90 hover:scale-95"
                onClick={() =>
                  setActiveTestimonial(
                    (prev) => (prev + 1) % testimonials.length
                  )
                }
              >
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden">
                  <p 
                    className="text-gray-600 text-sm line-clamp-3 mb-4"
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  >
                    "
                    {testimonials[
                      (activeTestimonial + 1) % testimonials.length
                    ]?.message?.slice(0, 100)}
                    ..."
                  </p>
                  <div className="flex items-center gap-3 min-w-0">
                    <TestimonialAvatar
                      testimonial={
                        testimonials[
                          (activeTestimonial + 1) % testimonials.length
                        ]
                      }
                      size="sm"
                    />
                    <span 
                      className="text-sm font-medium text-gray-700 truncate"
                      style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                    >
                      {
                        testimonials[
                          (activeTestimonial + 1) % testimonials.length
                        ]?.name
                      }
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile: Single Card */}
        <div className="lg:hidden">
          <div
            key={activeTestimonial}
            className="bg-white rounded-2xl p-6 shadow-xl animate-slide-up overflow-hidden"
          >
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < rating ? "text-yellow-400" : "text-gray-200"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p 
              className="text-gray-700 text-center mb-6"
              style={{
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                whiteSpace: 'pre-wrap'
              }}
            >
              "
              {currentTestimonial.message || currentTestimonial.content}
              "
            </p>
            <div className="flex items-center justify-center gap-3">
              <TestimonialAvatar
                testimonial={currentTestimonial}
                size="sm"
              />
              <div className="min-w-0 max-w-[200px]">
                <div 
                  className="font-bold text-gray-900"
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}
                >
                  {currentTestimonial.name}
                </div>
                <div 
                  className="text-[#20427f] text-sm"
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}
                >
                  {currentTestimonial.role}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {testimonials.length > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() =>
                setActiveTestimonial((prev) =>
                  prev === 0 ? testimonials.length - 1 : prev - 1
                )
              }
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#20427f] hover:bg-[#20427f] hover:text-white transition-all duration-300 hover:scale-110"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === activeTestimonial
                      ? "bg-[#20427f] scale-125"
                      : "bg-gray-300 hover:bg-[#20427f]/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setActiveTestimonial(
                  (prev) => (prev + 1) % testimonials.length
                )
              }
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#20427f] hover:bg-[#20427f] hover:text-white transition-all duration-300 hover:scale-110"
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-[#20427f] font-semibold hover:gap-3 transition-all"
          >
            View all testimonials
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
        </div>
      </div>
    )}
  </div>
</section>

        {/* ==================== CTA SECTION ==================== */}
        <section className="py-12 sm:py-16 lg:py-20 2xl:py-24 bg-gradient-to-r from-[#203E7F] to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-white rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
          </div>

          <div
            className="w-full max-w-[1800px] mx-auto text-center relative z-10"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl text-blue-100 mb-6 sm:mb-8 lg:mb-10 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed">
              Let's discuss how our comprehensive services can help you achieve
              your digital goals and drive real results.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
              <Link
                href="/contact"
                className="group bg-white text-[#20427f] px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl hover:bg-gray-100 transition-all duration-300 font-bold text-sm sm:text-base lg:text-lg shadow-2xl hover:scale-105 inline-flex items-center justify-center"
              >
                Get Free Consultation
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/portfolio"
                className="group border-2 border-white text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl hover:bg-white hover:text-[#20427f] transition-all duration-300 font-bold text-sm sm:text-base lg:text-lg hover:scale-105 inline-flex items-center justify-center"
              >
                View Our Work
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:rotate-45 transition-transform"
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

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-white/20">
              <div className="text-white/90 flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold text-sm sm:text-base">
                  Secure & Confidential
                </span>
              </div>
              <div className="text-white/90 flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <span className="font-semibold text-sm sm:text-base">
                  100% Satisfaction
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes glow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-progress {
          animation: progress linear forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .animate-flip-in {
          animation: flip-in 0.7s ease-out forwards;
        }
        .animate-orbit {
          animation: orbit 20s linear infinite;
        }
        .animate-orbit-reverse {
          animation: orbit-reverse 25s linear infinite;
        }
        .animate-star-bounce {
          animation: star-bounce 2s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
          overflow: hidden;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </>
  );
}