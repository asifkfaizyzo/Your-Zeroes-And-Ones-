// app/portfolio/[slug]/ProjectDetail.jsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import CategoryIcon from "@/components/CategoryIcon";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolio-categories";
import GlareHover from "@/components/effects/GlareHover/GlareHover";

export default function ProjectDetail({ project, relatedProjects }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const getCategoryIconName = (categoryName) => {
    switch (categoryName) {
      case "Branding & Design": return "palette";
      case "Digital Marketing": return "chart";
      case "Technology": return "code";
      default: return "sparkles";
    }
  };

  return (
    <div className="min-h-screen bg-[#060010]">
      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-4 right-4 text-white/60 hover:text-white p-2 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-5xl w-full">
            <Image
              src={selectedImage}
              alt="Full size"
              width={1200}
              height={800}
              className="w-full h-auto rounded-2xl border border-[#5b8def]/20"
            />
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[45vh] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a6e] to-[#0a1628]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/20 text-lg">Project Hero Image</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060010] via-[#060010]/60 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div
            className="w-full pb-12 md:pb-20"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            {/* Breadcrumb */}
            <nav className="mb-6 ml-2 lg:ml-3 xl:ml-5 2xl:ml-20">
              <ol className="flex items-center gap-2 text-white/50 text-sm">
                <li>
                  <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:text-white/80 transition-colors">Portfolio</Link>
                </li>
                <li>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="text-white/80 font-medium">{project.title}</li>
              </ol>
            </nav>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 ml-2 lg:ml-3 xl:ml-5 2xl:ml-20">
              {project.title}
            </h1>

            <p className="text-xl text-white/50 max-w-3xl ml-4 lg:ml-3 xl:ml-5 2xl:ml-20">
              {project.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-[#060010]">
        <div
          className="w-full"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Column */}
            <div className="lg:col-span-2 w-full min-w-0">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 overflow-hidden"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  Project Overview
                </h2>
                <p className="text-white/50 leading-relaxed text-lg whitespace-pre-wrap break-words">
                  {project.fullDescription}
                </p>
              </motion.div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Key Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-xl border border-[#5b8def]/15 bg-[#5b8def]/5 backdrop-blur-sm"
                      >
                        <div className="w-6 h-6 bg-[#1e3a6e] border border-[#5b8def]/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-[#5b8def]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-white/70 font-medium break-words">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Gallery */}
              {project.images && project.images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Project Gallery
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`relative cursor-pointer rounded-xl overflow-hidden group border border-[#5b8def]/15 hover:border-[#5b8def]/40 transition-colors ${
                          index === 0 ? "col-span-2 h-64 md:h-80" : "h-40 md:h-48"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[#060010]/0 group-hover:bg-[#060010]/40 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1e3a6e] border border-[#5b8def]/40 p-3 rounded-full">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 min-w-0">
              {/* Project Details */}
              <div className="rounded-2xl border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  {/* Categories */}
                  {project.categories && project.categories.length > 0 && (
                    <div className="py-3 border-b border-[#5b8def]/10">
                      <span className="text-white/40 text-sm mb-3 block">Categories</span>
                      <div className="flex flex-wrap gap-2">
                        {[...new Set(project.categories.map((cat) => cat.category))].map((category, index) => {
                          const categorySlug = PORTFOLIO_CATEGORIES.find((c) => c.category === category)?.slug;
                          return (
                            <Link key={index} href={categorySlug ? `/services/${categorySlug}` : "#"} className="inline-block">
                              <span className="px-3 py-1.5 bg-[#1e3a6e]/50 border border-[#5b8def]/20 rounded-full text-sm font-medium text-[#5b8def] inline-flex items-center gap-1.5 hover:bg-[#1e3a6e] hover:border-[#5b8def]/40 transition-all cursor-pointer">
                                <CategoryIcon icon={getCategoryIconName(category)} className="w-4 h-4" />
                                {category}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Services/SubCategories */}
                  {project.categories && project.categories.some((cat) => cat.subCategory) && (
                    <div className="py-3 border-b border-[#5b8def]/10">
                      <span className="text-white/40 text-sm mb-3 block">Services</span>
                      <div className="flex flex-wrap gap-2">
                        {project.categories.map((cat, index) => {
                          const categoryData = PORTFOLIO_CATEGORIES.find((c) => c.category === cat.category);
                          const subServiceData = categoryData?.subServices.find((s) => s.name === cat.subCategory);
                          const categorySlug = categoryData?.slug;
                          const subServiceSlug = subServiceData?.slug;
                          return (
                            <Link key={index} href={categorySlug && subServiceSlug ? `/services/${categorySlug}/${subServiceSlug}` : "#"} className="inline-block">
                              <span className="px-3 py-1.5 bg-[#1e3a6e] border border-[#5b8def]/30 rounded-full text-sm font-medium text-white inline-flex items-center gap-1.5 hover:border-[#5b8def]/60 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                                {cat.subCategory}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628] border border-[#5b8def]/20 rounded-2xl p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#5b8def] rounded-full blur-3xl" />
                </div>
                <div className="relative">
                  <h3 className="text-xl font-bold text-white mb-2">Like What You See?</h3>
                  <p className="text-white/40 mb-6 text-sm">Let&apos;s discuss your project.</p>
                  <Link href="/contact">
                    <button className="w-full py-3 bg-white text-[#0f1d32] rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                      Start a Project
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-[#060812]">
          <div
            className="w-full"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4"
              >
                <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
                  More Work
                </span>
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4">Related Projects</h2>
              <p className="text-white/40">
                Explore more {project.categories?.[0]?.category || "amazing"} projects
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Link key={relatedProject.id} href={`/portfolio/${relatedProject.slug}`}>
                  <div className="group rounded-2xl overflow-hidden border border-[#5b8def]/15 bg-[#060812] hover:border-[#5b8def]/40 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#5b8def]/10 transition-all duration-300">
                    <div className="relative h-48 bg-[#0a1628]">
                      {relatedProject.image ? (
                        <Image
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/20">
                          Project Image
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060812]/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-6 border-t border-[#5b8def]/10">
                      {relatedProject.categories && relatedProject.categories[0]?.subCategory && (
                        <span className="text-xs font-medium text-[#5b8def] bg-[#1e3a6e]/50 border border-[#5b8def]/20 px-2 py-1 rounded-full">
                          {relatedProject.categories[0].subCategory}
                        </span>
                      )}
                      <h3 className="text-lg font-bold text-white mt-3 group-hover:text-[#5b8def] transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-white/40 text-sm mt-2 line-clamp-2">
                        {relatedProject.shortDescription}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <GlareHover
                glareColor="#5b8def"
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                className="inline-block rounded-full overflow-hidden"
              >
                <Link
                  href="/portfolio"
                  className="px-8 py-4 bg-[#1e3a6e] text-white border border-[#5b8def]/30 rounded-full font-semibold inline-flex items-center gap-2 hover:gap-4 hover:bg-[#2d5aa8] transition-all duration-300"
                >
                  View All Projects
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </GlareHover>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-10 sm:py-12 lg:py-16 bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
        </div>

        <div
          className="relative z-10 w-full text-center"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Ready to Start Your Project?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-blue-200/70 mb-8 max-w-xl mx-auto leading-relaxed">
            Let&apos;s collaborate and create something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <GlareHover
              glareColor="#5b8def"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              className="inline-block rounded-full overflow-hidden w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#0f1d32] rounded-full font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:gap-4 hover:bg-blue-50 transition-all duration-300 shadow-xl whitespace-nowrap"
              >
                Get in Touch
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </GlareHover>

            <GlareHover
              glareColor="#ffffff"
              glareOpacity={0.25}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              className="inline-block rounded-full overflow-hidden w-full sm:w-auto"
            >
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white rounded-full font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:gap-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300 whitespace-nowrap"
              >
                Explore Services
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </GlareHover>
          </div>
        </div>
      </section>
    </div>
  );
}