// app/portfolio/[slug]/ProjectDetail.jsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import CategoryIcon from "@/components/CategoryIcon";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolio-categories";
export default function ProjectDetail({ project, relatedProjects }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Helper function to get icon name for category
  const getCategoryIconName = (categoryName) => {
    switch (categoryName) {
      case "Branding & Design":
        return "palette";
      case "Digital Marketing":
        return "chart";
      case "Technology":
        return "code";
      default:
        return "sparkles";
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-4 right-4 text-white p-2">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="max-w-5xl w-full">
            <Image
              src={selectedImage}
              alt="Full size"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg"
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
          <div className="absolute inset-0 bg-gradient-to-br from-[#20427f] to-[#266ac9]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/30 text-lg">Project Hero Image</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

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
              <ol className="flex items-center gap-2 text-white/80 text-sm">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:text-white">
                    Portfolio
                  </Link>
                </li>
                <li>
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </li>
                <li className="text-white font-medium">{project.title}</li>
              </ol>
            </nav>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 ml-2 lg:ml-3 xl:ml-5 2xl:ml-20">
              {project.title}
            </h1>

            <p className="text-xl text-white/80 max-w-3xl ml-4 lg:ml-3 xl:ml-5 2xl:ml-20">
              {project.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div
          className="max-w-[1800px] mx-auto"
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
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Project Overview
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap break-words">
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Key Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium break-words">
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Project Gallery
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`relative cursor-pointer rounded-xl overflow-hidden group ${
                          index === 0
                            ? "col-span-2 h-64 md:h-80"
                            : "h-40 md:h-48"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-3 rounded-full">
                            <svg
                              className="w-6 h-6 text-gray-900"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                              />
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
              <div className="bg-white border rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  {/* Categories with Pill Badges - No Duplicates */}
                  {project.categories && project.categories.length > 0 && (
                    <div className="py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm mb-3 block">
                        Categories
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {/* Get unique categories only */}
                        {[
                          ...new Set(
                            project.categories.map((cat) => cat.category),
                          ),
                        ].map((category, index) => {
                          const categorySlug = PORTFOLIO_CATEGORIES.find(
                            (c) => c.category === category,
                          )?.slug;

                          return (
                            <Link
                              key={index}
                              href={
                                categorySlug ? `/services/${categorySlug}` : "#"
                              }
                              className="inline-block"
                            >
                              <span className="px-3 py-1.5 bg-[#20427f]/10 rounded-full text-sm font-medium text-[#20427f] inline-flex items-center gap-1.5 hover:bg-[#20427f]/20 transition-colors cursor-pointer">
                                <CategoryIcon
                                  icon={getCategoryIconName(category)}
                                  className="w-4 h-4"
                                />
                                {category}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Services/SubCategories with Pill Badges */}
                  {project.categories &&
                    project.categories.some((cat) => cat.subCategory) && (
                      <div className="py-3 border-b border-gray-100">
                        <span className="text-gray-500 text-sm mb-3 block">
                          Services
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.categories.map((cat, index) => {
                            const categoryData = PORTFOLIO_CATEGORIES.find(
                              (c) => c.category === cat.category,
                            );
                            const subServiceData =
                              categoryData?.subServices.find(
                                (s) => s.name === cat.subCategory,
                              );
                            const categorySlug = categoryData?.slug;
                            const subServiceSlug = subServiceData?.slug;

                            return (
                              <Link
                                key={index}
                                href={
                                  categorySlug && subServiceSlug
                                    ? `/services/${categorySlug}/${subServiceSlug}`
                                    : "#"
                                }
                                className="inline-block"
                              >
                                <span className="px-3 py-1.5 bg-gradient-to-r from-[#20427f] to-[#1a3668] rounded-full text-sm font-medium text-white inline-flex items-center gap-1.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
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
              <div className="bg-gradient-to-br from-[#20427f] to-[#0f2544] rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  Like What You See?
                </h3>
                <p className="text-blue-200 mb-6 text-sm">
                  Let's discuss your project.
                </p>
                <Link href="/contact">
                  <button className="w-full py-3 bg-white text-[#20427f] rounded-xl font-semibold hover:bg-gray-100">
                    Start a Project
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Related Projects
              </h2>
              <p className="text-gray-600">
                Explore more {project.categories?.[0]?.category || "amazing"}{" "}
                projects
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/portfolio/${relatedProject.slug}`}
                >
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                    <div className="relative h-48 bg-gradient-to-br from-[#20427f] to-[#1a3668]">
                      {relatedProject.image ? (
                        <Image
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/30">
                          Project Image
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      {/* Show first service of first category */}
                      {relatedProject.categories &&
                        relatedProject.categories[0]?.subCategory && (
                          <span className="text-xs font-medium text-[#20427f] bg-[#20427f]/10 px-2 py-1 rounded-full">
                            {relatedProject.categories[0].subCategory}
                          </span>
                        )}
                      <h3 className="text-lg font-bold text-gray-900 mt-3 group-hover:text-[#20427f]">
                        {relatedProject.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {relatedProject.shortDescription}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/portfolio">
                <button className="px-8 py-4 bg-[#20427f] text-white rounded-xl font-semibold hover:bg-[#1a3668]">
                  View All Projects
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20 bg-white">
        <div
          className="max-w-[1800px] mx-auto"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Let's collaborate and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-[#20427f] text-white rounded-xl font-semibold hover:bg-[#1a3668]">
                  Get in Touch
                </button>
              </Link>
              <Link href="/services">
                <button className="px-8 py-4 border-2 border-[#20427f] text-[#20427f] rounded-xl font-semibold hover:bg-[#20427f]/5">
                  Explore Services
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
