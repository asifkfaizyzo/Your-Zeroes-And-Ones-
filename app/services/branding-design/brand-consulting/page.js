// app/services/branding-design/brand-consulting/page.js
"use client";
import { useState, useEffect } from "react";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export default function BrandConsulting() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          "/api/projects?category=branding-design&subcategory=brand-consulting&limit=6",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

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
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Sales Volume",
      description:
        "Drive consistent revenue growth through strategic brand positioning and market expansion. Increase market share with compelling brand narratives.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: "Loyalty",
      description:
        "Build lasting emotional connections that turn customers into brand advocates. Create trust-based relationships for repeat business.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Quality & Pricing Power",
      description:
        "Establish premium positioning for higher pricing without losing market appeal. Build perceived value through consistent quality delivery.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Customer Effectiveness",
      description:
        "Optimize customer acquisition costs through targeted brand messaging. Improve retention with engaging brand experiences.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      ),
      title: "Brand Identity",
      description:
        "Create distinctive visual and verbal identity for crowded markets. Develop consistent guidelines across all customer touchpoints.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      title: "Market Research",
      description:
        "Gather actionable insights about customer needs and market trends. Use data-driven analysis for strategic brand decisions.",
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section with Side Elements */}
        <section className="relative bg-white py-20 overflow-hidden">
          <div className="absolute left-0 top-1/4 w-32 h-32 bg-[#20427f]/5 rounded-full"></div>
          <div className="absolute right-0 bottom-1/4 w-24 h-24 bg-[#20427f]/10 rounded-full"></div>

          <div
            className="max-w-[1800px] mx-auto text-center relative z-10"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Strategic Brand Consulting
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We transform brands into powerful business assets across six key
              dimensions of growth.
            </p>
          </div>
        </section>

        {/* Side-by-Section Layout */}
        <section className="py-16 bg-gray-50">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Visual Element */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="aspect-square bg-gradient-to-br from-[#20427f]/10 to-[#20427f]/5 rounded-xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-[#20427f] rounded-full flex items-center justify-center text-white mx-auto mb-6">
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Integrated Approach
                    </h3>
                    <p className="text-gray-600">
                      Each dimension works together to create a cohesive brand
                      strategy that delivers measurable business results and
                      sustainable growth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Process List */}
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Our Brand Growth Framework
                </h2>

                {processes.map((process, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#20427f] rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        {process.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">
                        {process.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {process.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServiceProjects
          categoryName="Branding & Design"
          subCategoryName="Brand Consulting"
        />

        {/* Simple CTA */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div
            className="max-w-[1800px] mx-auto text-center"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start Your Brand Transformation
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to build a brand that drives real business results?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-[#20427f] text-white px-8 py-3 rounded-lg hover:bg-[#1a3566] transition-colors duration-200 font-medium"
              >
                Get Started
              </Link>
              <Link
                href="/services"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
