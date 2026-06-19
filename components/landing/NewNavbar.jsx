// components/landing/NewNavbar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NewNavbar({ isDark = true }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const servicesTimeoutRef = useRef(null);

  // Transition tracking
  const isFirstRender = useRef(true);
  const [navStyles, setNavStyles] = useState(null);
  const [shouldTransition, setShouldTransition] = useState(false);
  const transitionTimerRef = useRef(null);
  const prevIsHomepageRef = useRef(null);

  const isHomepage = pathname === "/" || pathname === "/rehome";

  const widthConfig = {
    stages: [
      { startVh: 0, endVh: 1.0, width: 60 },
      { startVh: 1.0, endVh: 1.06, width: 100 },
      { startVh: 1.06, endVh: 999, width: 100 },
    ],
    radiusStages: [{ startVh: 0, endVh: 999, radius: 9999 }],
    paddingStages: [{ startVh: 0, endVh: 999, padding: 16 }],
  };

  const getInterpolatedValue = (stages, progress, key) => {
    for (let i = 0; i < stages.length; i++) {
      const stage = stages[i];
      if (progress >= stage.startVh && progress < stage.endVh) {
        const nextStage = stages[i + 1];
        if (nextStage) {
          const t = (progress - stage.startVh) / (stage.endVh - stage.startVh);
          const easedT = 1 - Math.pow(1 - Math.min(t, 1), 3);
          return stage[key] + (nextStage[key] - stage[key]) * easedT;
        }
        return stage[key];
      }
    }
    return stages[stages.length - 1][key];
  };

  const computeStyles = (forHomepage, progress) => {
    if (!forHomepage) {
      return {
        widthPercent: 100,
        borderRadius: 9999,
        topPadding: 16,
        isGlass: true,
        isSolid: false,
        logoTextOpacity: 1,
        useDarkText: !isDark,
      };
    }

    return {
      widthPercent: getInterpolatedValue(widthConfig.stages, progress, "width"),
      borderRadius: getInterpolatedValue(
        widthConfig.radiusStages,
        progress,
        "radius"
      ),
      topPadding: getInterpolatedValue(
        widthConfig.paddingStages,
        progress,
        "padding"
      ),
      isGlass: true,
      isSolid: false,
      logoTextOpacity: 0,
      useDarkText: false,
    };
  };

  // Initialize on first render (no animation)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevIsHomepageRef.current = isHomepage;
      setNavStyles(computeStyles(isHomepage, 0));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // When route changes — enable transition, update styles with double-rAF, then disable transition after animation completes
  useEffect(() => {
    if (isFirstRender.current) return;

    const wasHomepage = prevIsHomepageRef.current;
    prevIsHomepageRef.current = isHomepage;

    // Clear any pending transition timer
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    // Enable CSS transitions
    setShouldTransition(true);

    // Double rAF: ensures browser has painted current styles before applying new ones
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setNavStyles(computeStyles(isHomepage, isHomepage ? 0 : 0));

        // After the 400ms animation completes, disable CSS transitions
        // so homepage scroll animation isn't affected
        transitionTimerRef.current = setTimeout(() => {
          setShouldTransition(false);
        }, 450); // slightly longer than 400ms transition to be safe
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [pathname, isDark]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll handler — only on homepage, updates styles directly (no CSS transition)
  useEffect(() => {
    if (!isHomepage) return;

    const handleScroll = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const progress = scrollY / vh;
      setScrollProgress(progress);

      // Only update via scroll if transition period is over
      if (!shouldTransition) {
        setNavStyles(computeStyles(true, progress));
      }
    };

    // Only set initial scroll position if not transitioning
    if (!shouldTransition) {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage, isDark, shouldTransition]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current);
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  // Don't render until initialized
  if (!navStyles) return null;

  const styles = navStyles;

  const transitionValue = shouldTransition
    ? "400ms cubic-bezier(0.4, 0, 0.2, 1)"
    : "none";

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
        {
          name: "Brand Consulting",
          href: "/services/branding-design/brand-consulting",
        },
        {
          name: "Logo Design",
          href: "/services/branding-design/logo-design",
        },
        {
          name: "Graphic Design",
          href: "/services/branding-design/graphic-design",
        },
        {
          name: "2D & 3D Visualization",
          href: "/services/branding-design/2d-3d-visualization",
        },
        {
          name: "Video Production",
          href: "/services/branding-design/video-production",
        },
        {
          name: "Audio Production",
          href: "/services/branding-design/audio-production",
        },
        {
          name: "AI Video Production",
          href: "/services/branding-design/ai-video-production",
        },
      ],
    },
    {
      category: "Digital Marketing",
      href: "/services/digital-marketing",
      description: "Reach and engage your audience",
      subServices: [
        { name: "SEO", href: "/services/digital-marketing/seo" },
        {
          name: "Social Media Management",
          href: "/services/digital-marketing/social-media-management",
        },
        {
          name: "Performance Marketing",
          href: "/services/digital-marketing/performance-marketing",
        },
        {
          name: "Content Marketing",
          href: "/services/digital-marketing/content-marketing",
        },
        {
          name: "Marketing Automations",
          href: "/services/digital-marketing/marketing-automation",
        },
        {
          name: "Analytics",
          href: "/services/digital-marketing/analytics",
        },
      ],
    },
    {
      category: "Technology",
      href: "/services/technology",
      description: "",
      subServices: [
        {
          name: "AI & Machine Learning",
          href: "/services/technology/ai-ml",
        },
        {
          name: "DevOps Consulting",
          href: "/services/technology/devops-consulting",
        },
        {
          name: "Web Development",
          href: "/services/technology/web-development",
        },
        {
          name: "Mobile App Development",
          href: "/services/technology/mobile-app-development",
        },
        {
          name: "E-Commerce",
          href: "/services/technology/ecommerce",
        },
        {
          name: "QA & Testing",
          href: "/services/technology/qa-testing",
        },
        {
          name: "Cloud Services",
          href: "/services/technology/cloud-services",
        },
        {
          name: "Data & Analytics",
          href: "/services/technology/data-analytics",
        },
        {
          name: "Cyber Security",
          href: "/services/technology/cyber-security",
        },
      ],
    },
  ];

  const closeAllMenus = () => {
    setIsServicesOpen(false);
    setIsMenuOpen(false);
  };

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  const isActivePath = (href) => {
    if (href === "/services") return pathname?.startsWith("/services");
    return pathname === href;
  };

  const theme = {
    navBg: isMenuOpen
      ? isDark
        ? "rgba(6, 8, 18, 0.98)"
        : "rgba(255, 255, 255, 1)"
      : styles.isSolid
      ? isDark
        ? "rgba(6, 8, 18, 1)"
        : "rgba(255, 255, 255, 1)"
      : "rgba(255, 255, 255, 0.1)",

    borderColor:
      isMenuOpen || styles.isSolid
        ? isDark
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(229, 231, 235, 1)"
        : "rgba(255, 255, 255, 0.2)",

    logoText:
      styles.useDarkText || isMenuOpen
        ? isDark
          ? "text-white"
          : "text-gray-900"
        : "text-white",

    navText:
      styles.useDarkText || isMenuOpen
        ? isDark
          ? "text-blue-200/80 hover:bg-white/10 hover:text-white"
          : "text-gray-600 hover:bg-gray-100"
        : "text-white/90 hover:bg-white/10",

    navTextActive: "bg-[#20427f] text-white shadow-lg shadow-[#20427f]/25",

    dropdown: {
      bg: isDark
        ? "bg-gradient-to-br from-[#060812] via-[#141620] to-[#060812]"
        : "bg-white",
      border: isDark ? "border-white/10" : "border-gray-200",
      divider: isDark ? "divide-white/10" : "divide-gray-100",
      headerBorder: isDark ? "border-white/10" : "border-gray-100",
      title: isDark ? "text-white" : "text-gray-900",
      subtitle: isDark ? "text-blue-200/70" : "text-gray-500",
      categoryTitle: isDark ? "text-white" : "text-gray-900",
      categoryTitleHover: isDark
        ? "group-hover:text-blue-200"
        : "group-hover:text-[#20427f]",
      categoryDesc: isDark ? "text-blue-200/60" : "text-gray-500",
      subServiceText: isDark
        ? "text-blue-200/70 hover:bg-white/10 hover:text-white"
        : "text-gray-600 hover:bg-[#20427f]/5 hover:text-[#20427f]",
      subServiceIcon: isDark ? "text-blue-200/40" : "text-[#20427f]/40",
      viewAllBtn: isDark
        ? "bg-white/10 text-blue-200 hover:bg-white/20 hover:text-white border-white/10"
        : "bg-[#20427f] text-white hover:bg-[#1a3668]",
      footerBg: isDark ? "bg-white/5" : "bg-gray-50",
      footerText: isDark ? "text-blue-200/70" : "text-gray-600",
      footerLink: isDark
        ? "text-blue-200 hover:text-white"
        : "text-[#20427f] hover:text-[#1a3668]",
    },

    mobile: {
      menuBg: isDark ? "bg-[#060812]" : "bg-white",
      menuBorder: isDark ? "border-white/10" : "border-gray-100",
      itemDefault: isDark
        ? "bg-white/5 text-blue-200/80 hover:bg-white/10 hover:text-white"
        : "bg-gray-50 text-gray-700 hover:bg-gray-100",
      itemActive: "bg-[#20427f] text-white",
      subMenuBg: isDark ? "bg-white/5" : "bg-gray-50",
      subMenuTitle: isDark ? "text-white" : "text-gray-900",
      subMenuText: isDark
        ? "text-blue-200/70 hover:text-white"
        : "text-gray-600 hover:text-[#20427f]",
      subMenuDivider: isDark ? "border-white/10" : "border-gray-200",
      viewAllBtn: isDark
        ? "text-blue-200 border-white/10 bg-white/5 hover:bg-white/10"
        : "text-[#20427f] border-gray-200 bg-white",
    },

    hamburgerBg:
      styles.useDarkText || isMenuOpen
        ? isDark
          ? "bg-white/10 hover:bg-white/20"
          : "bg-gray-100 hover:bg-gray-200"
        : "bg-white/10 hover:bg-white/20",
    hamburgerLines:
      styles.useDarkText || isMenuOpen
        ? isDark
          ? "bg-white"
          : "bg-gray-700"
        : "bg-white",

    contactBtn:
      styles.useDarkText || isMenuOpen
        ? "bg-[#20427f] hover:bg-[#1a3668] text-white"
        : "bg-white/20 hover:bg-white/30 text-white border border-white/30",

    logoFilter:
      !styles.useDarkText && !isMenuOpen
        ? "brightness-0 invert"
        : isDark
        ? "brightness-0 invert"
        : "",
  };

  const MegaMenuContent = () => (
    <div
      className={`w-[850px] max-h-[70vh] overflow-y-auto rounded-2xl shadow-2xl border overflow-hidden ${theme.dropdown.bg} ${theme.dropdown.border}`}
      onMouseEnter={handleServicesMouseEnter}
      onMouseLeave={handleServicesMouseLeave}
    >
      <div className={`px-6 py-3 border-b ${theme.dropdown.headerBorder}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-bold ${theme.dropdown.title}`}>
              Our Services
            </h3>
            <p className={`text-xs mt-0.5 ${theme.dropdown.subtitle}`}>
              Comprehensive digital solutions for your business
            </p>
          </div>
          <Link
            href="/services"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${theme.dropdown.viewAllBtn}`}
            onClick={closeAllMenus}
          >
            View All
            <svg
              className="w-3.5 h-3.5"
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

      <div className={`grid grid-cols-3 divide-x ${theme.dropdown.divider}`}>
        {services.map((service) => (
          <div key={service.category} className="p-4">
            <Link
              href={service.href}
              className="group block mb-3"
              onClick={closeAllMenus}
            >
              <h4
                className={`text-sm font-bold flex items-center gap-1.5 ${theme.dropdown.categoryTitle} ${theme.dropdown.categoryTitleHover} transition-colors`}
              >
                {service.category}
                <svg
                  className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
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
              </h4>
              <p
                className={`text-xs mt-0.5 ${theme.dropdown.categoryDesc}`}
              ></p>
            </Link>
            <div className="space-y-0">
              {service.subServices.map((sub, idx) => (
                <Link
                  key={idx}
                  href={sub.href}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs transition-all ${theme.dropdown.subServiceText}`}
                  onClick={closeAllMenus}
                >
                  <svg
                    className={`w-2.5 h-2.5 flex-shrink-0 ${theme.dropdown.subServiceIcon}`}
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
                  <span className="truncate">{sub.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`px-6 py-2.5 ${theme.dropdown.footerBg} border-t ${theme.dropdown.headerBorder}`}
      >
        <div className="flex items-center justify-between">
          <p className={`text-xs ${theme.dropdown.footerText}`}>
            Need help choosing?
          </p>
          <Link
            href="/contact"
            className={`text-xs font-medium ${theme.dropdown.footerLink} transition-colors`}
            onClick={closeAllMenus}
          >
            Contact our team →
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeAllMenus}
        />
      )}

      <header
        className="fixed top-0 left-0 right-0 px-8 z-50 flex justify-center"
        style={{
          paddingTop: styles.topPadding,
          transition:
            transitionValue === "none"
              ? "none"
              : `padding-top ${transitionValue}`,
        }}
      >
        <nav
          style={{
            width: isMenuOpen
              ? "min(95%, 1600px)"
              : `min(${styles.widthPercent}%, 1600px)`,
            minWidth: "320px",
            transition:
              transitionValue === "none"
                ? "none"
                : `width ${transitionValue}`,
          }}
        >
          <div
            className={`${isMenuOpen ? "overflow-hidden" : ""} ${
              styles.isGlass && !isMenuOpen ? "backdrop-blur-xl" : ""
            } shadow-lg shadow-black/5`}
            style={{
              backgroundColor: theme.navBg,
              borderRadius: isMenuOpen ? 24 : styles.borderRadius,
              border: `1px solid ${theme.borderColor}`,
              transition:
                transitionValue === "none"
                  ? "none"
                  : `background-color ${transitionValue}, border-color ${transitionValue}, border-radius ${transitionValue}`,
            }}
          >
            <div className="flex justify-between items-center py-2 px-4 lg:px-6">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2.5"
                onClick={closeAllMenus}
              >
                <Image
                  src="/logo.svg"
                  alt="YZO"
                  width={32}
                  height={32}
                  className={`object-contain ${theme.logoFilter}`}
                  priority
                />
                <span
                  className={`font-bold text-sm whitespace-nowrap ${theme.logoText}`}
                  style={{
                    opacity: isMenuOpen ? 1 : styles.logoTextOpacity,
                    maxWidth:
                      styles.logoTextOpacity === 0 && !isMenuOpen
                        ? "0px"
                        : "200px",
                    overflow: "hidden",
                    transition:
                      transitionValue === "none"
                        ? "none"
                        : `opacity ${transitionValue}, max-width ${transitionValue}`,
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
                        onMouseEnter={handleServicesMouseEnter}
                        onMouseLeave={handleServicesMouseLeave}
                      >
                        <button
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                            isActivePath("/services")
                              ? theme.navTextActive
                              : theme.navText
                          }`}
                        >
                          {item.label}
                          <svg
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${
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
                          className={`fixed left-1/2 -translate-x-1/2 top-16 pt-2 transition-all duration-300 ${
                            isServicesOpen
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible -translate-y-2 pointer-events-none"
                          }`}
                        >
                          <div className="h-2" />
                          <MegaMenuContent />
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                          isActivePath(item.href)
                            ? theme.navTextActive
                            : theme.navText
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}

                <Link
                  href="/contact"
                  className={`ml-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${theme.contactBtn}`}
                >
                  Contact Us
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className={`md:hidden relative w-9 h-9 flex items-center justify-center rounded-lg ${theme.hamburgerBg}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="w-4 h-3.5 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 rounded-full origin-center transition-all duration-300 ${
                      theme.hamburgerLines
                    } ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                  />
                  <span
                    className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                      theme.hamburgerLines
                    } ${isMenuOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`w-full h-0.5 rounded-full origin-center transition-all duration-300 ${
                      theme.hamburgerLines
                    } ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                  />
                </div>
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className={`md:hidden border-t ${theme.mobile.menuBorder}`}>
                <div className="py-4 px-4 space-y-2 max-h-[70vh] overflow-y-auto">
                  {navItems.map((item) => (
                    <div key={item.href}>
                      {item.hasDropdown ? (
                        <div>
                          <button
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium ${
                              isActivePath("/services")
                                ? theme.mobile.itemActive
                                : theme.mobile.itemDefault
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

                          {isServicesOpen && (
                            <div
                              className={`mt-2 rounded-xl p-3 space-y-3 ${theme.mobile.subMenuBg}`}
                            >
                              {services.map((service) => (
                                <div
                                  key={service.category}
                                  className={`border-b last:border-0 pb-3 last:pb-0 ${theme.mobile.subMenuDivider}`}
                                >
                                  <Link
                                    href={service.href}
                                    className={`font-semibold mb-2 block text-sm ${theme.mobile.subMenuTitle}`}
                                    onClick={closeAllMenus}
                                  >
                                    {service.category}
                                  </Link>
                                  <div className="grid grid-cols-2 gap-1">
                                    {service.subServices.map((sub, idx) => (
                                      <Link
                                        key={idx}
                                        href={sub.href}
                                        className={`text-xs py-1 truncate ${theme.mobile.subMenuText}`}
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
                                className={`block w-full text-center py-2.5 rounded-lg font-medium text-sm border ${theme.mobile.viewAllBtn}`}
                                onClick={closeAllMenus}
                              >
                                View All Services
                              </Link>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`block px-4 py-3 rounded-xl text-base font-medium ${
                            isActivePath(item.href)
                              ? theme.mobile.itemActive
                              : theme.mobile.itemDefault
                          }`}
                          onClick={closeAllMenus}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}

                  <div className={`pt-3 border-t ${theme.mobile.menuBorder}`}>
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
            )}
          </div>
        </nav>
      </header>
    </>
  );
}