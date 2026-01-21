// app/components/landingpages/StatsSection.js
"use client";

import { useState, useEffect, useCallback } from "react";

export default function StatsSection({ clientCount = 30 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [countUp, setCountUp] = useState({});

  const stats = [
    { number: 50, label: "Projects Completed", suffix: "+", key: "projects" },
    { number: clientCount, label: "Happy Clients", suffix: "+", key: "clients" },
    { number: 15, label: "Years Experience", suffix: "+", key: "years" },
    { number: 24, label: "Support", suffix: "/7", key: "support" },
  ];

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

    const element = document.getElementById("stats");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat) => {
        if (stat.key !== "support") {
          animateCounter(stat.number, stat.key);
        }
      });
    }
  }, [isVisible, animateCounter, clientCount]);

  return (
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
                {stat.key === "support"
                  ? stat.number
                  : countUp[stat.key] || 0}
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
  );
}