"use client";

import { useState, useEffect } from "react";
import { Cpu, TrendingUp, Palette } from "lucide-react";
import Link from "next/link";
import LiquidEther from "../LiquidEther";
import CardSwap, { Card } from "../CardSwap";

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
      { threshold: 0.1 },
    );

    const element = document.getElementById("hero-content");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white relative overflow-hidden min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center">
      {/* LiquidEther Background */}
      <div className="absolute inset-0 w-full h-full">
        <LiquidEther
          colors={["#20427f", "#53cbec", "#407def"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={true}
          viscous={30}
          resolution={0.5}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.5}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/80" />

      {/* Floating Shapes */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 lg:w-80 xl:w-96 h-48 sm:h-72 lg:h-80 xl:h-96 bg-[#407def] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
      <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-48 sm:w-72 lg:w-80 xl:w-96 h-48 sm:h-72 lg:h-80 xl:h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-10 sm:left-20 w-48 sm:w-72 lg:w-80 xl:w-96 h-48 sm:h-72 lg:h-80 xl:h-96 bg-[#53cbec] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />

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

            {/* Hero Cards - Mobile: Simple Stack */}
            <div className="relative w-full mt-8 lg:mt-0">
              {/* Mobile/Tablet: Simple vertical stack */}
              <div className="flex flex-col gap-4 lg:hidden px-2">
                <HeroCardMobile
                  title="Technology"
                  icon={<Cpu className="w-12 h-12" strokeWidth={1.5} />}
                  gradient="from-[#20427f] to-cyan-600"
                  description="Custom software, web & mobile apps"
                />
                <HeroCardMobile
                  title="Digital Marketing"
                  icon={<TrendingUp className="w-12 h-12" strokeWidth={1.5} />}
                  gradient="from-purple-500 to-pink-500"
                  description="SEO, social media & growth strategies"
                />
                <HeroCardMobile
                  title="Branding & Design"
                  icon={<Palette className="w-12 h-12" strokeWidth={1.5} />}
                  gradient="from-emerald-500 to-teal-500"
                  description="Logo, identity & creative solutions"
                />
              </div>

              {/* Desktop: CardSwap Animation */}
              <div className="hidden lg:block relative w-full h-[450px] xl:h-[500px] 2xl:h-[600px] ">
                <div className="absolute top-5/6 left-5/6 -translate-x-1/4 -translate-y-1/4">
                  <CardSwap
                    width={280}
                    height={340}
                    cardDistance={50}
                    verticalDistance={80}
                    delay={4000}
                    pauseOnHover={true}
                    skewAmount={4}
                    easing="elastic"
                  >
                    <Card className="bg-gradient-to-br from-[#20427f] to-cyan-600">
                      <div className="w-full h-full flex flex-col items-center justify-center text-white p-8">
                        <div className="bg-white/20 p-4 rounded-2xl mb-6 backdrop-blur-sm">
                          <Cpu className="w-16 h-16" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-center">
                          Technology
                        </h3>
                        <p className="text-white/90 text-center text-sm leading-relaxed">
                          Custom software development, web applications, and
                          mobile solutions
                        </p>
                        <div className="mt-6 flex gap-2">
                          <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                        </div>
                      </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-500 to-pink-500">
                      <div className="w-full h-full flex flex-col items-center justify-center text-white p-8">
                        <div className="bg-white/20 p-4 rounded-2xl mb-6 backdrop-blur-sm">
                          <TrendingUp className="w-16 h-16" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-center">
                          Digital Marketing
                        </h3>
                        <p className="text-white/90 text-center text-sm leading-relaxed">
                          SEO optimization, social media management, and
                          data-driven growth
                        </p>
                        <div className="mt-6 flex gap-2">
                          <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                        </div>
                      </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-emerald-500 to-teal-500">
                      <div className="w-full h-full flex flex-col items-center justify-center text-white p-8">
                        <div className="bg-white/20 p-4 rounded-2xl mb-6 backdrop-blur-sm">
                          <Palette className="w-16 h-16" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-center">
                          Branding & Design
                        </h3>
                        <p className="text-white/90 text-center text-sm leading-relaxed">
                          Brand identity, logo design, and creative visual
                          solutions
                        </p>
                        <div className="mt-6 flex gap-2">
                          <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                        </div>
                      </div>
                    </Card>
                  </CardSwap>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mobile Card Component
function HeroCardMobile({ title, icon, gradient, description }) {
  return (
    <div
      className={`w-full bg-gradient-to-br ${gradient} rounded-2xl shadow-xl p-6 backdrop-blur-sm transform hover:scale-105 transition-all duration-300`}
    >
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm flex-shrink-0">
          {icon}
        </div>
        <div className="text-white flex-1">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-white/90 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
