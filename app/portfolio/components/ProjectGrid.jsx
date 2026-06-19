// app/portfolio/components/ProjectGrid.jsx
"use client";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects, isLoading }) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        style={{ gap: "clamp(1rem, 2vw, 2rem)" }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-[#5b8def]/10 h-56 rounded-t-2xl" />
            <div className="bg-[#060812] border border-[#5b8def]/10 p-6 rounded-b-2xl">
              <div className="h-4 bg-[#5b8def]/10 rounded w-1/4 mb-3" />
              <div className="h-6 bg-[#5b8def]/10 rounded w-3/4 mb-2" />
              <div className="h-4 bg-[#5b8def]/10 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-[#5b8def]/10 border border-[#5b8def]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white/70 mb-2">No projects found</h3>
        <p className="text-white/40">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      style={{ gap: "clamp(1rem, 2vw, 2rem)" }}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}