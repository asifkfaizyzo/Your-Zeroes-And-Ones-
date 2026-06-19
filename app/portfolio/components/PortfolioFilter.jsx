// app/portfolio/components/PortfolioFilter.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ChevronDown, Filter, Palette, TrendingUp, Monitor,
  Sparkles, Layers, Grid3X3, Check, SlidersHorizontal,
} from "lucide-react";

const getCategoryIcon = (categorySlug) => {
  const icons = {
    "branding-design": Palette,
    "digital-marketing": TrendingUp,
    technology: Monitor,
    default: Sparkles,
  };
  return icons[categorySlug] || icons.default;
};

export default function PortfolioFilter({
  categories, activeCategory, activeSubCategory,
  onCategoryChange, onSubCategoryChange, projectCounts,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !dropdownRefs.current[openDropdown]?.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handleCategorySelect = (categorySlug) => {
    onCategoryChange(categorySlug);
    onSubCategoryChange(null);
    setOpenDropdown(null);
    setShowMobileFilters(false);
  };

  const handleSubCategorySelect = (categorySlug, subCategorySlug) => {
    onCategoryChange(categorySlug);
    onSubCategoryChange(subCategorySlug);
    setOpenDropdown(null);
    setShowMobileFilters(false);
  };

  const clearFilters = () => {
    onCategoryChange(null);
    onSubCategoryChange(null);
  };

  const getActiveLabel = () => {
    if (!activeCategory) return "All Projects";
    const category = categories.find((c) => c.slug === activeCategory);
    if (!category) return "All Projects";
    if (activeSubCategory) {
      const sub = category.subServices.find((s) => s.slug === activeSubCategory);
      return sub ? sub.name : category.category;
    }
    return category.category;
  };

  const ActiveIcon = !activeCategory ? Grid3X3 : getCategoryIcon(activeCategory);

  return (
    <>
      {/* Desktop Filter Bar */}
      <div className="bg-[#060010]/80 backdrop-blur-xl z-40 py-4 border-b border-[#5b8def]/10">
        <div
          className="w-full"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left Side */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white/40">
                <Filter className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">Filter by:</span>
              </div>

              <div className="flex items-center gap-2 bg-[#5b8def]/10 border border-[#5b8def]/20 px-4 py-2 rounded-xl">
                <ActiveIcon className="w-4 h-4 text-[#5b8def]" />
                <span className="text-[#5b8def] font-semibold text-sm">
                  {getActiveLabel()}
                </span>
                {(activeCategory || activeSubCategory) && (
                  <button
                    onClick={clearFilters}
                    className="ml-1 p-1 text-[#5b8def] hover:bg-[#5b8def]/20 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <span className="text-white/30 text-sm hidden md:inline">
                {projectCounts.all || 0} projects
              </span>
            </div>

            {/* Right Side — Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {/* All Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategorySelect(null)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  !activeCategory
                    ? "bg-[#1e3a6e] text-white border border-[#5b8def]/40 shadow-lg shadow-[#5b8def]/10"
                    : "bg-[#5b8def]/5 border border-[#5b8def]/10 text-white/60 hover:bg-[#5b8def]/10 hover:text-white/80"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                All
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  !activeCategory ? "bg-[#5b8def]/30 text-white" : "bg-white/5 text-white/40"
                }`}>
                  {projectCounts.all || 0}
                </span>
              </motion.button>

              {/* Category Dropdowns */}
              {categories.map((category) => {
                const CategoryIcon = getCategoryIcon(category.slug);
                const isActive = activeCategory === category.slug;

                return (
                  <div
                    key={category.slug}
                    ref={(el) => (dropdownRefs.current[category.slug] = el)}
                    className="relative"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setOpenDropdown(openDropdown === category.slug ? null : category.slug)
                      }
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                        isActive
                          ? "bg-[#1e3a6e] text-white border border-[#5b8def]/40 shadow-lg shadow-[#5b8def]/10"
                          : "bg-[#5b8def]/5 border border-[#5b8def]/10 text-white/60 hover:bg-[#5b8def]/10 hover:text-white/80"
                      }`}
                    >
                      <CategoryIcon className="w-4 h-4" />
                      <span>{category.category}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdown === category.slug ? "rotate-180" : ""
                      }`} />
                    </motion.button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {openDropdown === category.slug && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full right-0 mt-2 w-72 bg-[#0a1628] border border-[#5b8def]/20 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                        >
                          <button
                            onClick={() => handleCategorySelect(category.slug)}
                            className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-[#5b8def]/10 border-b border-[#5b8def]/10 transition-colors ${
                              isActive && !activeSubCategory ? "bg-[#5b8def]/10" : ""
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Layers className="w-4 h-4 text-white/30" />
                              <span className="font-medium text-white/70">All {category.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-white/5 px-2 py-1 rounded-full text-white/40">
                                {projectCounts[category.slug] || 0}
                              </span>
                              {isActive && !activeSubCategory && (
                                <Check className="w-4 h-4 text-[#5b8def]" />
                              )}
                            </div>
                          </button>

                          <div className="max-h-64 overflow-y-auto py-1">
                            {category.subServices.map((sub) => {
                              const isSubActive = activeSubCategory === sub.slug;
                              return (
                                <button
                                  key={sub.slug}
                                  onClick={() => handleSubCategorySelect(category.slug, sub.slug)}
                                  className={`w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-[#5b8def]/10 transition-colors ${
                                    isSubActive ? "bg-[#5b8def]/10" : ""
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full ${
                                      isSubActive ? "bg-[#5b8def]" : "bg-white/20"
                                    }`} />
                                    <span className={`text-sm ${
                                      isSubActive ? "text-[#5b8def] font-medium" : "text-white/50"
                                    }`}>
                                      {sub.name}
                                    </span>
                                  </div>
                                  {isSubActive && <Check className="w-4 h-4 text-[#5b8def]" />}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#5b8def]/10 border border-[#5b8def]/20 rounded-xl text-white/70 font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(activeCategory || activeSubCategory) && (
                <span className="w-2 h-2 bg-[#5b8def] rounded-full" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/70 z-50 lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-[#0a1628] border-t border-[#5b8def]/20 rounded-t-3xl z-50 lg:hidden max-h-[80vh] overflow-hidden"
            >
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-b border-[#5b8def]/10">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#5b8def]" />
                  Filter Projects
                </h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white/50" />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[60vh] p-6">
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={`w-full mb-4 p-4 rounded-2xl flex items-center justify-between transition-all ${
                    !activeCategory
                      ? "bg-[#1e3a6e] text-white border border-[#5b8def]/40"
                      : "bg-[#5b8def]/5 border border-[#5b8def]/10 text-white/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Grid3X3 className="w-5 h-5" />
                    <span className="font-semibold">All Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                      !activeCategory ? "bg-[#5b8def]/30" : "bg-white/5"
                    }`}>
                      {projectCounts.all || 0}
                    </span>
                    {!activeCategory && <Check className="w-5 h-5" />}
                  </div>
                </button>

                <div className="space-y-3">
                  {categories.map((category) => {
                    const CategoryIcon = getCategoryIcon(category.slug);
                    const isActive = activeCategory === category.slug;

                    return (
                      <div key={category.slug} className="space-y-2">
                        <button
                          onClick={() => handleCategorySelect(category.slug)}
                          className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${
                            isActive && !activeSubCategory
                              ? "bg-[#1e3a6e] text-white border border-[#5b8def]/40"
                              : "bg-[#5b8def]/5 border border-[#5b8def]/10 text-white/60"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <CategoryIcon className="w-5 h-5" />
                            <span className="font-semibold">{category.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm px-2 py-0.5 rounded-full ${
                              isActive && !activeSubCategory ? "bg-[#5b8def]/30" : "bg-white/5"
                            }`}>
                              {projectCounts[category.slug] || 0}
                            </span>
                            {isActive && !activeSubCategory && <Check className="w-5 h-5" />}
                          </div>
                        </button>

                        <div className="ml-4 space-y-1">
                          {category.subServices.map((sub) => {
                            const isSubActive = activeSubCategory === sub.slug;
                            return (
                              <button
                                key={sub.slug}
                                onClick={() => handleSubCategorySelect(category.slug, sub.slug)}
                                className={`w-full p-3 rounded-xl flex items-center justify-between transition-all ${
                                  isSubActive
                                    ? "bg-[#5b8def]/10 border border-[#5b8def]/20 text-[#5b8def]"
                                    : "bg-white/[0.02] border border-transparent text-white/40 hover:bg-white/5"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`w-2 h-2 rounded-full ${
                                    isSubActive ? "bg-[#5b8def]" : "bg-white/20"
                                  }`} />
                                  <span className="text-sm font-medium">{sub.name}</span>
                                </div>
                                {isSubActive && <Check className="w-4 h-4 text-[#5b8def]" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 border-t border-[#5b8def]/10 bg-[#060812]">
                <div className="flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="flex-1 py-3 px-4 border border-[#5b8def]/20 text-white/60 rounded-xl font-semibold hover:bg-[#5b8def]/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 py-3 px-4 bg-[#1e3a6e] text-white border border-[#5b8def]/30 rounded-xl font-semibold hover:bg-[#2d5aa8] transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}