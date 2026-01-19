// Q:\PROJECTS\YourZeroesAndOnes\YZO_Main\app\portfolio\components\ProjectCard.jsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ project }) {
  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case 'Branding & Design':
        return '🎨';
      case 'Digital Marketing':
        return '📈';
      case 'Technology':
        return '💻';
      default:
        return '✨';
    }
  };

  const firstCategory = project.categories?.[0];
  const hasMultipleCategories = project.categories?.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
    >
      <Link href={`/portfolio/${project.slug}`} className="flex flex-col h-full">
        {/* Image - Dynamic height based on viewport */}
        <div 
          className="relative overflow-hidden bg-gradient-to-br from-[#20427f] to-[#1a3668]"
          style={{
            height: 'clamp(180px, 20vw, 280px)'
          }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
		unoptimized={project.image?.startsWith('/uploads/')}
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/40 text-sm">Project Image</span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

          {/* View Project Button */}
          <div className="absolute bottom-4 left-4 right-4 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white text-[#20427f] px-4 py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2 text-sm lg:text-base">
              View Project
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content - Dynamic padding */}
        <div 
          className="flex-1 flex flex-col"
          style={{
            padding: 'clamp(1rem, 2vw, 1.5rem)'
          }}
        >
          {/* Title */}
          <h3 
            className="font-bold text-gray-900 mb-2 group-hover:text-[#20427f] transition-colors line-clamp-2"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)'
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p 
            className="text-gray-600 leading-relaxed line-clamp-2 flex-1"
            style={{
              fontSize: 'clamp(0.8rem, 1vw, 0.9rem)'
            }}
          >
            {project.shortDescription}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
