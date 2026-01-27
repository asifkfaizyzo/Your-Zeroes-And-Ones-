// components/landing/NewNavbar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function NewNavbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // 🎯 Check if we're on the homepage
  const isHomepage = pathname === "/" || pathname === "/rehome";

  // ============================================
  // 🎛️ CONFIGURABLE VH INTERVALS FOR WIDTH CHANGES
  // ============================================
  const widthConfig = {
    startWidth: 60,
    stages: [
      { startVh: 0, endVh: 0, width: 60 },
      { startVh: 0, endVh: 1.00, width: 60 },
      { startVh: 1.05, endVh: 1.06, width: 100 },
      { startVh: 3, endVh: 4.5, width: 100 },
      { startVh: 4.5, endVh: 999, width: 100 },
    ],
    radiusStages: [
      { startVh: 0, endVh: 3, radius: 9999 },
      { startVh: 3, endVh: 5, radius: 9999 },
      { startVh: 5, endVh: 999, radius: 9999 },
    ],
    paddingStages: [
      { startVh: 0, endVh: 3, padding: 16 },
      { startVh: 3, endVh: 5, padding: 16 },
      { startVh: 5, endVh: 999, padding: 16 },
    ],
  };

  useEffect(() => {
    setMounted(true);

    if (!isHomepage) return;

    const handleScroll = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const progress = scrollY / vh;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  const getInterpolatedValue = (stages, progress, key) => {
    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      if (progress >= stage.startVh && progress < stage.endVh) {
        const nextStage = stages[i + 1];
        if (nextStage && progress >= stage.startVh) {
          const t = (progress - stage.startVh) / (stage.endVh - stage.startVh);
          const currentValue = stage[key];
          const nextValue = nextStage ? nextStage[key] : currentValue;
          const easedT = 1 - Math.pow(1 - Math.min(t, 1), 3);
          return currentValue + (nextValue - currentValue) * easedT;
        }
        return stage[key];
      }
    }
    return stages[stages.length - 1][key];
  };

  const navItems = [
    { href: "/services", label: "Services", hasDropdown: true },
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
  ];

  const services = [
    {
      category: "Branding & Design",
      href: "/services/branding-design",
      description: "Build a memorable brand identity",
      subServices: [
        { name: "Brand Consulting", href: "/services/branding-design/brand-consulting" },
        { name: "Logo Design", href: "/services/branding-design/logo-design" },
        { name: "Graphic Design", href: "/services/branding-design/graphic-design" },
        { name: "2D & 3D Visualization", href: "/services/branding-design/2d-3d-visualization" },
        { name: "Video Production", href: "/services/branding-design/video-production" },
        { name: "Audio Production", href: "/services/branding-design/audio-production" },
        { name: "AI Video Production", href: "/services/branding-design/ai-video-production" },
      ],
    },
    {
      category: "Digital Marketing",
      href: "/services/digital-marketing",
      description: "Reach and engage your target audience",
      subServices: [
        { name: "SEO", href: "/services/digital-marketing/seo" },
        { name: "Social Media Management", href: "/services/digital-marketing/social-media-management" },
        { name: "Performance Marketing", href: "/services/digital-marketing/performance-marketing" },
        { name: "Content Marketing", href: "/services/digital-marketing/content-marketing" },
        { name: "Marketing Automations", href: "/services/digital-marketing/marketing-automation" },
        { name: "Analytics", href: "/services/digital-marketing/analytics" },
      ],
    },
    {
      category: "Technology",
      href: "/services/technology",
      description: "Cutting-edge digital solutions",
      subServices: [
        { name: "AI & Machine Learning", href: "/services/technology/ai-ml" },
        { name: "DevOps Consulting", href: "/services/technology/devops-consulting" },
        { name: "Web Development", href: "/services/technology/web-development" },
        { name: "Mobile App Development", href: "/services/technology/mobile-app-development" },
        { name: "E-Commerce", href: "/services/technology/ecommerce" },
        { name: "QA & Testing", href: "/services/technology/qa-testing" },
        { name: "Cloud Services", href: "/services/technology/cloud-services" },
        { name: "Data & Analytics", href: "/services/technology/data-analytics" },
        { name: "Cyber Security", href: "/services/technology/cyber-security" },
      ],
    },
  ];

  const closeAllMenus = () => {
    setIsServicesOpen(false);
    setIsMenuOpen(false);
  };

  const isActivePath = (href) => {
    if (href === "/services") return pathname?.startsWith("/services");
    return pathname === href;
  };

  // 🎯 Get styles based on page type - with SSR-safe defaults
  const getStyles = () => {
    // NON-HOMEPAGE: Always solid white, full width
    if (!isHomepage) {
      return {
        widthPercent: 100,
        borderRadius: 0,
        topPadding: 0,
        isGlass: false,
        isSolid: true,
        logoTextOpacity: 1,
        isDarkText: true,
      };
    }

    // HOMEPAGE: Glass navbar, width changes based on scroll
    const p = scrollProgress;
    
    return {
      widthPercent: getInterpolatedValue(widthConfig.stages, p, 'width'),
      borderRadius: getInterpolatedValue(widthConfig.radiusStages, p, 'radius'),
      topPadding: getInterpolatedValue(widthConfig.paddingStages, p, 'padding'),
      isGlass: true,
      isSolid: false,
      logoTextOpacity: 0,
      isDarkText: false,
    };
  };

  const styles = getStyles();

  // 🎯 NO MORE LOADING SKELETON - Render actual content immediately
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{ paddingTop: styles.topPadding }}
    >
      <nav
        className="transition-all duration-150 ease-out"
        style={{
          width: `min(${styles.widthPercent}%, 1600px)`,
          minWidth: "320px",
        }}
      >
        <div
          className={`transition-all duration-150 ease-out ${
            styles.isGlass ? "backdrop-blur-xl" : ""
          } ${styles.isSolid ? "shadow-sm" : "shadow-lg shadow-black/5"}`}
          style={{
            backgroundColor: styles.isSolid 
              ? "rgba(255, 255, 255, 1)" 
              : "rgba(255, 255, 255, 0.1)",
            borderRadius: styles.borderRadius,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: styles.isSolid
              ? "rgba(229, 231, 235, 1)"
              : "rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="flex justify-between items-center py-2 px-4 lg:px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/logo.svg"
                alt="YZO"
                width={32}
                height={32}
                className={`object-contain transition-all duration-300 ${
                  !styles.isDarkText ? "brightness-0 invert" : ""
                }`}
                priority
              />
              <span
                className={`font-bold text-sm transition-all duration-300 whitespace-nowrap ${
                  styles.isDarkText ? "text-gray-900" : "text-white"
                }`}
                style={{ 
                  opacity: styles.logoTextOpacity,
                  // Prevent layout shift by keeping space but hiding
                  visibility: styles.logoTextOpacity === 0 ? 'hidden' : 'visible',
                  width: styles.logoTextOpacity === 0 ? 0 : 'auto',
                  overflow: 'hidden'
                }}
              >
                Your Zeros and Ones
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  {item.hasDropdown ? (
                    <div
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <button
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                          isActivePath("/services")
                            ? "bg-[#20427f] text-white shadow-lg shadow-[#20427f]/25"
                            : styles.isDarkText
                            ? "text-gray-600 hover:bg-gray-100"
                            : "text-white/90 hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isServicesOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Mega Menu Dropdown */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 ${
                          isServicesOpen
                            ? "opacity-100 visible"
                            : "opacity-0 invisible pointer-events-none"
                        }`}
                      >
                        <div className="w-[700px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                          <div className="flex">
                            <div className="w-1/3 bg-gray-50 p-4">
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                Categories
                              </p>
                              {services.map((service, idx) => (
                                <button
                                  key={service.category}
                                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                    activeService === idx
                                      ? "bg-[#20427f] text-white shadow-lg"
                                      : "text-gray-700 hover:bg-gray-100"
                                  }`}
                                  onMouseEnter={() => setActiveService(idx)}
                                >
                                  {service.category}
                                </button>
                              ))}

                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <Link
                                  href="/services"
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-[#20427f] font-medium hover:underline"
                                  onClick={closeAllMenus}
                                >
                                  View All Services
                                  <svg
                                    className="w-4 h-4"
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

                            <div className="w-2/3 p-6">
                              <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-900">
                                  {services[activeService].category}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {services[activeService].description}
                                </p>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                {services[activeService].subServices.map(
                                  (sub, idx) => (
                                    <Link
                                      key={idx}
                                      href={sub.href}
                                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-[#20427f]/5 hover:text-[#20427f] transition-colors"
                                      onClick={closeAllMenus}
                                    >
                                      <svg
                                        className="w-4 h-4 text-[#20427f]"
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
                                      {sub.name}
                                    </Link>
                                  )
                                )}
                              </div>

                              <div className="mt-6 pt-4 border-t border-gray-100">
                                <Link
                                  href={services[activeService].href}
                                  className="inline-flex items-center gap-2 text-sm font-medium text-[#20427f]"
                                  onClick={closeAllMenus}
                                >
                                  Explore {services[activeService].category}
                                  <svg
                                    className="w-4 h-4"
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
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActivePath(item.href)
                          ? "bg-[#20427f] text-white shadow-lg shadow-[#20427f]/25"
                          : styles.isDarkText
                          ? "text-gray-600 hover:bg-gray-100"
                          : "text-white/90 hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Contact Button */}
              <Link
                href="/contact"
                className={`ml-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  styles.isDarkText
                    ? "bg-[#20427f] hover:bg-[#1a3668] text-white"
                    : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                }`}
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden relative w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
                styles.isDarkText
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-white/10 hover:bg-white/20"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-4 h-3.5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-300 origin-center ${
                    styles.isDarkText ? "bg-gray-700" : "bg-white"
                  } ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                />
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                    styles.isDarkText ? "bg-gray-700" : "bg-white"
                  } ${isMenuOpen ? "opacity-0 scale-0" : ""}`}
                />
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-300 origin-center ${
                    styles.isDarkText ? "bg-gray-700" : "bg-white"
                  } ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white border-t border-gray-100 rounded-b-3xl max-h-[calc(80vh-64px)] overflow-y-auto">
              <div className="py-4 px-6 space-y-2">
                {navItems.map((item) => (
                  <div key={item.href}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                            isActivePath("/services")
                              ? "bg-[#20427f] text-white"
                              : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                        >
                          <span>{item.label}</span>
                          <svg
                            className={`w-5 h-5 transition-transform duration-200 ${
                              isServicesOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        <div
                          className={`transition-all duration-300 overflow-hidden ${
                            isServicesOpen
                              ? "max-h-[1000px] opacity-100 mt-2"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                            {services.map((service) => (
                              <div
                                key={service.category}
                                className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                              >
                                <Link
                                  href={service.href}
                                  className="font-semibold text-gray-900 mb-3 block"
                                  onClick={closeAllMenus}
                                >
                                  {service.category}
                                </Link>
                                <div className="grid grid-cols-2 gap-2">
                                  {service.subServices.map((sub, idx) => (
                                    <Link
                                      key={idx}
                                      href={sub.href}
                                      className="text-sm text-gray-600 hover:text-[#20427f] py-1"
                                      onClick={closeAllMenus}
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <Link
                              href="/services"
                              className="block w-full text-center py-3 bg-white rounded-xl font-medium text-[#20427f] border border-gray-200"
                              onClick={closeAllMenus}
                            >
                              View All Services
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          isActivePath(item.href)
                            ? "bg-[#20427f] text-white"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={closeAllMenus}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-200">
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-gradient-to-r from-[#20427f] to-[#2d5aa8] text-white py-3 rounded-xl font-medium"
                    onClick={closeAllMenus}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}