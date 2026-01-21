// app/components/landingpages/ServicesSection.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

export default function ServicesSection() {
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

    const element = document.getElementById("services");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
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
                isVisible
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
  );
}