// Q:\PROJECTS\YourZeroesAndOnes\YZO_Main\app\testimonials\sections\TestimonialWrapper.jsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialCard from "../ui/TestimonialCard";
import TestimonialPagination from "../ui/TestimonialPagination";

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
};

export default function TestimonialWrapper() {
  // ✅ NEW: State to hold testimonials from database
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const ITEMS_PER_PAGE = 6;

  // ✅ NEW: Fetch testimonials from API when component loads
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/testimonials'); // Call our API
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setTestimonials(data.data || data || []); // Store in state
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Enhanced filtering (search only, removed category filter)
  const filtered = useMemo(() => {
    const searchTerm = search.toLowerCase();
    let results = testimonials;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (t) =>
          t.message?.toLowerCase().includes(searchTerm) ||
          t.name?.toLowerCase().includes(searchTerm) ||
          t.role?.toLowerCase().includes(searchTerm)
      );
    }

    return results;
  }, [testimonials, search]); // ✅ Now depends on testimonials from state

  // Reset page on search change
  useEffect(() => {
    setPage(1);
  }, [search]);

  // Simulate loading state for smooth transitions
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [page]);

  const totalPages = Math.ceil((filtered?.length || 0) / ITEMS_PER_PAGE);
  const paginated =
    filtered?.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE) || [];

  // ✅ NEW: Show loading state while fetching
  if (loading) {
    return (
      <section className="py-16 md:py-24 w-full bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto  sm:px-6 ">
          <div className="flex items-center justify-center py-20">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-slate-600 font-medium">Loading testimonials...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 "
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            💬 Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Voices of Our Community
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-10 gap-6 md:gap-8"
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No testimonials found
              </h3>
              <p className="text-gray-500 mb-6">
                {search ? 'Try adjusting your search' : 'No testimonials available yet'}
              </p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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
