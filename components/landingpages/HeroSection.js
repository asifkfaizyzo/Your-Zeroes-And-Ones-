// app/components/landingpages/HeroSection.js
"use client";

import { useState, useEffect } from "react";
import { Cpu, TrendingUp, Palette } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("hero-content");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
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
                  isVisible
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
                  isVisible
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
                  isVisible
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
                <HeroCard
                  title="Technology"
                  icon={<Cpu className="w-12 sm:w-14 h-12 sm:h-14 mx-auto mt-3" strokeWidth={1.5} />}
                  gradient="from-[#20427f] to-cyan-600"
                  rotation="rotate-3 hover:rotate-6"
                />
                <HeroCard
                  title="Digital Marketing"
                  icon={<TrendingUp className="w-12 sm:w-14 h-12 sm:h-14 mx-auto mt-3" strokeWidth={1.5} />}
                  gradient="from-purple-500 to-pink-500"
                  rotation="-rotate-3 hover:-rotate-6"
                />
                <HeroCard
                  title="Branding & Designing"
                  icon={<Palette className="w-12 sm:w-14 h-12 sm:h-14 mx-auto mt-3" strokeWidth={1.5} />}
                  gradient="from-green-500 to-emerald-500"
                  rotation="rotate-2 hover:scale-105"
                />
              </div>

              {/* Desktop: Absolute positioned layout */}
              <div className="hidden lg:block relative w-full h-[400px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px]">
                <div className="absolute top-0 right-0">
                  <HeroCard
                    title="Technology"
                    icon={<Cpu className="w-14 lg:w-16 xl:w-20 2xl:w-24 h-14 lg:h-16 xl:h-20 2xl:h-24 mx-auto mt-3 lg:mt-4" strokeWidth={1.5} />}
                    gradient="from-[#20427f] to-cyan-600"
                    rotation="rotate-6 hover:rotate-12"
                    size="w-48 lg:w-52 xl:w-60 2xl:w-64 h-60 lg:h-64 xl:h-72 2xl:h-80"
                  />
                </div>

                <div className="absolute top-10 left-0">
                  <HeroCard
                    title="Digital Marketing"
                    icon={<TrendingUp className="w-14 lg:w-16 xl:w-20 2xl:w-24 h-14 lg:h-16 xl:h-20 2xl:h-24 mx-auto mt-3 lg:mt-4" strokeWidth={1.5} />}
                    gradient="from-purple-500 to-pink-500"
                    rotation="-rotate-6 hover:-rotate-12"
                    size="w-48 lg:w-52 xl:w-60 2xl:w-64 h-60 lg:h-64 xl:h-72 2xl:h-80"
                  />
                </div>

                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <HeroCard
                    title="Branding & Designing"
                    icon={<Palette className="w-14 lg:w-16 xl:w-20 2xl:w-24 h-14 lg:h-16 xl:h-20 2xl:h-24 mx-auto mt-3 lg:mt-4" strokeWidth={1.5} />}
                    gradient="from-green-500 to-emerald-500"
                    rotation="hover:scale-110"
                    size="w-48 lg:w-52 xl:w-60 2xl:w-64 h-60 lg:h-64 xl:h-72 2xl:h-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCard({ title, icon, gradient, rotation, size = "w-40 sm:w-48 h-52 sm:h-60" }) {
  return (
    <div
      className={`flex-shrink-0 ${size} bg-gradient-to-br ${gradient} rounded-2xl shadow-xl transform ${rotation} transition-transform duration-500 flex items-center justify-center snap-center`}
    >
      <div className="text-white text-center p-4 lg:p-6 xl:p-8">
        <h3 className="text-sm sm:text-base lg:base xl:text-1xl 2xl:text-2xl font-bold">
          {title}
        </h3>
        {icon}
      </div>
    </div>
  );
}