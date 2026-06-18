// components/ServiceProjects/ExpandableCards.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ServiceProjectsExpandable({
  categoryName,
  subCategoryName,
}) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const params = new URLSearchParams();
        if (categoryName) params.append("category", categoryName);
        if (subCategoryName) params.append("subcategory", subCategoryName);
        const res = await fetch(`/api/portfolio?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data.slice(0, 4));
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [categoryName, subCategoryName]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-[#060812]">
      <div
        className="max-w-[1800px] mx-auto"
        style={{
          paddingLeft: "clamp(2rem, 8vw, 12rem)",
          paddingRight: "clamp(2rem, 8vw, 12rem)",
        }}
      >
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Work
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            {projects.length > 0
              ? "Explore our latest projects"
              : `Explore our ${
                  subCategoryName || categoryName || ""
                } portfolio`}
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-wrap justify-center gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
              >
                <div
                  className="bg-[#5b8def]/10 rounded-2xl"
                  style={{ height: "clamp(180px, 20vw, 280px)" }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="rounded-2xl p-12 text-center border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm">
              <div className="w-16 h-16 bg-[#5b8def]/10 border border-[#5b8def]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Unable to Load Projects
              </h3>
              <p className="text-white/40 mb-6">
                Something went wrong while fetching our projects.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 text-[#5b8def] font-medium hover:underline"
              >
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && projects.length === 0 && (
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden border border-dashed border-[#5b8def]/20 hover:border-[#5b8def]/40 bg-[#5b8def]/5 backdrop-blur-sm transition-colors duration-500">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(#5b8def 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>

              <div className="relative px-8 py-16 md:py-24">
                <div className="max-w-2xl mx-auto text-center">
                  {/* Animated Icon */}
                  <div className="relative w-24 h-24 mx-auto mb-8">
                    <div
                      className="absolute inset-0 bg-[#5b8def]/10 rounded-full animate-ping"
                      style={{ animationDuration: "3s" }}
                    />
                    <div
                      className="absolute inset-2 bg-[#5b8def]/10 rounded-full animate-ping"
                      style={{
                        animationDuration: "3s",
                        animationDelay: "0.5s",
                      }}
                    />
                    <div className="relative w-24 h-24 bg-[#1e3a6e] border border-[#5b8def]/30 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-[#5b8def]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Projects Coming Soon
                  </h3>
                  <p className="text-white/50 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                    We're currently crafting amazing projects in{" "}
                    <span className="font-medium text-[#5b8def]">
                      {subCategoryName || categoryName || "this category"}
                    </span>
                    . Check back soon to see our latest work!
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/portfolio"
                      className="inline-flex items-center justify-center gap-2 bg-[#1e3a6e] border border-[#5b8def]/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2d5aa8] hover:border-[#5b8def]/60 transition-all duration-200 shadow-lg shadow-[#5b8def]/10"
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
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Browse All Projects
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-200"
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
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Start a Project
                    </Link>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-8 left-8 w-20 h-20 border border-[#5b8def]/10 rounded-full" />
                <div className="absolute bottom-8 right-8 w-32 h-32 border border-[#5b8def]/10 rounded-full" />
                <div className="absolute top-1/2 right-12 w-3 h-3 bg-[#5b8def]/20 rounded-full hidden lg:block" />
                <div className="absolute bottom-1/3 left-16 w-2 h-2 bg-[#5b8def]/30 rounded-full hidden lg:block" />
              </div>
            </div>

            {/* Category hint */}
            <div className="mt-8 text-center">
              <p className="text-white/30 text-sm">
                Meanwhile, explore our work in other categories
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {["Branding", "Web Design", "Marketing", "Development"].map(
                  (cat) => (
                    <Link
                      key={cat}
                      href="/portfolio"
                      className="px-4 py-2 bg-[#5b8def]/5 border border-[#5b8def]/10 rounded-full text-sm text-white/50
                                 hover:bg-[#1e3a6e] hover:border-[#5b8def]/40 hover:text-white transition-all duration-200"
                    >
                      {cat}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Project Cards */}
        {!isLoading && !error && projects.length > 0 && (
          <>
            <div className="flex flex-wrap justify-center gap-6">
              {projects.map((project, index) => (
                <div
                  key={project.id || index}
                  className={`group rounded-2xl overflow-hidden border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm
                              hover:border-[#5b8def]/40 hover:-translate-y-1 hover:bg-[#5b8def]/10
                              hover:shadow-lg hover:shadow-[#5b8def]/10
                              transition-all duration-500 cursor-pointer flex flex-col
                              w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] ${
                                isVisible
                                  ? "opacity-100 translate-y-0"
                                  : "opacity-0 translate-y-12"
                              }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link href={`/portfolio/${project.slug}`} className="flex flex-col h-full">
                    {/* Image */}
                    <div
                      className="relative overflow-hidden bg-[#1e3a6e]"
                      style={{ height: "clamp(180px, 20vw, 280px)" }}
                    >
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          unoptimized={project.image?.startsWith("/uploads/")}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm">
                          Project Image
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                      {/* View Project CTA */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white text-[#0f1d32] px-4 py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2 text-sm lg:text-base">
                          View Project
                          <svg
                            className="w-4 h-4 lg:w-5 lg:h-5"
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
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className="flex-1 flex flex-col"
                      style={{ padding: "clamp(1rem, 2vw, 1.5rem)" }}
                    >
                      <h3
                        className="font-bold text-white mb-2 group-hover:text-[#5b8def] transition-colors line-clamp-2"
                        style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-white/40 leading-relaxed line-clamp-2 flex-1"
                        style={{ fontSize: "clamp(0.8rem, 1vw, 0.9rem)" }}
                      >
                        {project.description || project.shortDescription}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`text-center mt-12 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 bg-[#1e3a6e] border border-[#5b8def]/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-[#2d5aa8] hover:border-[#5b8def]/60 transition-all duration-200 shadow-lg shadow-[#5b8def]/10"
              >
                View All Projects
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
          </>
        )}
      </div>
    </section>
  );
}