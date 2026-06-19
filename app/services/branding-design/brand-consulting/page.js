// app/services/branding-design/brand-consulting/page.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export default function BrandConsulting() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          "/api/projects?category=branding-design&subcategory=brand-consulting&limit=6"
        );
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const processes = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Sales Volume",
      description:
        "Drive consistent revenue growth through strategic brand positioning and market expansion. Increase market share with compelling brand narratives.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Loyalty",
      description:
        "Build lasting emotional connections that turn customers into brand advocates. Create trust-based relationships for repeat business.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Quality & Pricing Power",
      description:
        "Establish premium positioning for higher pricing without losing market appeal. Build perceived value through consistent quality delivery.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Customer Effectiveness",
      description:
        "Optimize customer acquisition costs through targeted brand messaging. Improve retention with engaging brand experiences.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: "Brand Identity",
      description:
        "Create distinctive visual and verbal identity for crowded markets. Develop consistent guidelines across all customer touchpoints.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Market Research",
      description:
        "Gather actionable insights about customer needs and market trends. Use data-driven analysis for strategic brand decisions.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#060010] pt-10">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#060010] via-[#0a1628] to-[#060010] py-20 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute left-0 top-1/4 w-32 h-32 bg-[#5b8def]/5 rounded-full" />
        <div className="absolute right-0 bottom-1/4 w-24 h-24 bg-[#5b8def]/10 rounded-full" />

        <div
          className="max-w-[1800px] mx-auto text-center relative z-10"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
            Branding & Design
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-3">
            Strategic Brand Consulting
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            We transform brands into powerful business assets across six key
            dimensions of growth.
          </p>
        </div>
      </section>

      {/* Side-by-Side Layout */}
      <section className="py-16 bg-[#060812]">
        <div
          className="max-w-[1800px] mx-auto"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
<div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 xl:gap-16 items-start">
  {/* Left Column — Visual Element */}
  <div className="lg:sticky lg:top-24">
    <div className="rounded-3xl border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm p-6 sm:p-8 h-full">
      <div className="relative overflow-hidden rounded-2xl border border-[#5b8def]/10 bg-[#060812] min-h-[420px] flex items-center justify-center">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-56 h-56 bg-[#5b8def]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-8 right-8 w-32 h-32 bg-[#1e3a6e]/40 rounded-full blur-2xl" />
        </div>

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 text-center p-8 sm:p-10 max-w-md">
          <div className="w-20 h-20 bg-[#1e3a6e] border border-[#5b8def]/30 rounded-full flex items-center justify-center text-[#5b8def] mx-auto mb-6 shadow-lg shadow-[#5b8def]/10">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Integrated Approach
          </h3>
          <p className="text-white/50 leading-relaxed">
            Each dimension works together to create a cohesive brand strategy
            that delivers measurable business results and sustainable growth.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Right Column — Process List */}
  <div>
    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
      Our Brand Growth Framework
    </h2>

    <div className="space-y-4">
      {processes.map((process, index) => (
        <div
          key={index}
          className="group rounded-2xl border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm p-5 sm:p-6
                     hover:border-[#5b8def]/40 hover:bg-[#5b8def]/10 hover:shadow-lg hover:shadow-[#5b8def]/10
                     transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#1e3a6e] border border-[#5b8def]/30 rounded-xl flex items-center justify-center text-[#5b8def] group-hover:scale-110 group-hover:border-[#5b8def]/60 transition-all duration-300">
                {process.icon}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-lg mb-2">
                {process.title}
              </h3>
              <p className="text-white/50 leading-relaxed">
                {process.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
        </div>
      </section>

      <ServiceProjects
        categoryName="Branding & Design"
        subCategoryName="Brand Consulting"
      />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628] relative overflow-hidden border-t border-[#5b8def]/10">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
        </div>

        <div
          className="relative z-10 max-w-[1800px] mx-auto text-center"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Brand Transformation
          </h2>
          <p className="text-lg text-blue-200/70 mb-8 max-w-2xl mx-auto">
            Ready to build a brand that drives real business results?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#0f1d32] px-8 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <Link
              href="/services"
              className="border border-white/30 text-white px-8 py-3 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}