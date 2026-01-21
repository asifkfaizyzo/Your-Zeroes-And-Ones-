// app/components/landingpages/ProcessSection.js
"use client";

import { useState, useEffect } from "react";

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

export default function ProcessSection() {
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

    const element = document.getElementById("process");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
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
                isVisible
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
  );
}