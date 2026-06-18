// app/testimonials/ui/TestimonialPagination.jsx
"use client";
import { motion } from "framer-motion";

export default function TestimonialPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      {/* Page info */}
      <div className="text-sm text-white/40 order-2 sm:order-1">
        Page{" "}
        <span className="font-semibold text-white">{currentPage}</span> of{" "}
        <span className="font-semibold text-white">{totalPages}</span>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1 order-1 sm:order-2">
        {/* Previous button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            currentPage === 1
              ? "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
              : "bg-[#5b8def]/5 border border-[#5b8def]/20 text-white/70 hover:bg-[#5b8def]/10 hover:border-[#5b8def]/40 hover:text-white"
          }`}
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Previous</span>
        </motion.button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-2">
          {visiblePages.map((page, index) => (
            <motion.button
              key={index}
              whileHover={page !== "..." ? { scale: 1.1 } : {}}
              whileTap={page !== "..." ? { scale: 0.95 } : {}}
              onClick={() => page !== "..." && onPageChange(page)}
              disabled={page === "..."}
              className={`relative min-w-[40px] h-10 rounded-lg font-medium text-sm transition-all duration-200 ${
                page === "..."
                  ? "text-white/30 cursor-default"
                  : currentPage === page
                  ? "bg-[#1e3a6e] border border-[#5b8def]/60 text-[#5b8def] shadow-lg shadow-[#5b8def]/10"
                  : "bg-[#5b8def]/5 border border-[#5b8def]/15 text-white/70 hover:bg-[#5b8def]/10 hover:border-[#5b8def]/30 hover:text-white"
              }`}
            >
              {currentPage === page && page !== "..." && (
                <motion.div
                  layoutId="activePage"
                  className="absolute inset-0 bg-[#1e3a6e] border border-[#5b8def]/60 rounded-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{page}</span>
            </motion.button>
          ))}
        </div>

        {/* Next button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
            currentPage === totalPages
              ? "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
              : "bg-[#5b8def]/5 border border-[#5b8def]/20 text-white/70 hover:bg-[#5b8def]/10 hover:border-[#5b8def]/40 hover:text-white"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
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
        </motion.button>
      </div>

      {/* Quick jump */}
      <div className="hidden md:flex items-center gap-2 order-3">
        <span className="text-sm text-white/40">Go to:</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          placeholder="#"
          className="w-16 px-3 py-2 text-sm bg-white/5 border border-[#5b8def]/20 rounded-lg text-white placeholder-white/20
                     focus:ring-2 focus:ring-[#5b8def]/50 focus:border-[#5b8def]/40 outline-none transition-all"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = parseInt(e.target.value);
              if (value >= 1 && value <= totalPages) {
                onPageChange(value);
                e.target.value = "";
              }
            }
          }}
        />
      </div>
    </div>
  );
}