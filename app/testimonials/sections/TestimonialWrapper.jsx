// app/testimonials/sections/TestimonialWrapper.jsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialCard from "../ui/TestimonialCard";
import TestimonialPagination from "../ui/TestimonialPagination";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: { opacity: 0, y: -20, scale: 0.95 },
};

export default function TestimonialWrapper() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/testimonials");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTestimonials(data.data || data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const searchTerm = search.toLowerCase();
    let results = testimonials;
    if (searchTerm) {
      results = results.filter(
        (t) =>
          t.message?.toLowerCase().includes(searchTerm) ||
          t.name?.toLowerCase().includes(searchTerm) ||
          t.role?.toLowerCase().includes(searchTerm)
      );
    }
    return results;
  }, [testimonials, search]);

  useEffect(() => { setPage(1); }, [search]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [page]);

  const totalPages = Math.ceil((filtered?.length || 0) / ITEMS_PER_PAGE);
  const paginated =
    filtered?.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE) || [];

  /* Loading skeleton */
  if (loading) {
    return (
      <section className="py-16 md:py-24 w-full bg-[#060812] relative overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="relative z-10 w-full"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="flex items-center justify-center py-20">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2.5 h-2.5 bg-[#5b8def] rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
              <span className="text-white/50 font-medium">Loading testimonials...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 w-full bg-[#060812] relative overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#5b8def]/5 rounded-full blur-[120px] pointer-events-none" />

      <div
        className="relative z-10 w-full"
        style={{
          paddingLeft: "clamp(2rem, 8vw, 12rem)",
          paddingRight: "clamp(2rem, 8vw, 12rem)",
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-[#1e3a6e] border border-[#5b8def]/30 text-[#5b8def] rounded-full text-sm font-medium mb-4">
            💬 Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Voices of Our Community
          </h2>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            See what our amazing clients and partners have to say about their experience
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <AnimatePresence mode="wait">
          {paginated.length > 0 ? (
            <motion.div
              key={`${page}-${search}`}
              variants={containerVariants}
              initial="hidden"
              animate={isLoading ? "hidden" : "visible"}
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {paginated.map((item, index) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <TestimonialCard item={item} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-20"
            >
              {/* Empty State */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#5b8def]/10 border border-[#5b8def]/20 rounded-full mb-6">
                <svg className="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white/70 mb-2">
                No testimonials found
              </h3>
              <p className="text-white/40 mb-6">
                {search ? "Try adjusting your search" : "No testimonials available yet"}
              </p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1e3a6e] border border-[#5b8def]/30 text-white rounded-lg hover:bg-[#2d5aa8] hover:border-[#5b8def]/60 transition-all duration-200 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Clear search
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <TestimonialPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}