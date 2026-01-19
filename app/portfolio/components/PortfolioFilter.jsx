// app/portfolio/components/PortfolioFilter.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronDown,
  Filter,
  Palette,
  TrendingUp,
  Monitor,
  Sparkles,
  Layers,
  Grid3X3,
  Check,
  Search,
  SlidersHorizontal,
} from "lucide-react";

// Category icon mapping
const getCategoryIcon = (categorySlug) => {
  const icons = {
    "branding-design": Palette,
    "digital-marketing": TrendingUp,
    "technology": Monitor,
    default: Sparkles,
  };
  return icons[categorySlug] || icons.default;
};

export default function PortfolioFilter({
  categories,
  activeCategory,
  activeSubCategory,
  onCategoryChange,
  onSubCategoryChange,
  projectCounts,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const dropdownRefs = useRef({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown &&
        !dropdownRefs.current[openDropdown]?.contains(event.target)
      ) {
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
    setSearchQuery("");
  };

  const getActiveLabel = () => {
    if (!activeCategory) return "All Projects";
    const category = categories.find((c) => c.slug === activeCategory);
    if (!category) return "All Projects";
    if (activeSubCategory) {
      const subCategory = category.subServices.find(
        (s) => s.slug === activeSubCategory
      );
      return subCategory ? subCategory.name : category.category;
    }
    return category.category;
  };

  const getActiveCategoryIcon = () => {
    if (!activeCategory) return Grid3X3;
    return getCategoryIcon(activeCategory);
  };

  const ActiveIcon = getActiveCategoryIcon();

  return (
    <>
      {/* Desktop Filter Bar */}
      <div className="bg-white sticky top-0 z-40 py-4 border-b border-gray-100 shadow-sm">
        <div
          className="max-w-[1800px] mx-auto"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left Side - Filter Label & Active Filter */}
            <div className="flex items-center gap-4">
              {/* Filter Icon */}
              <div className="flex items-center gap-2 text-gray-500">
                <Filter className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">Filter by:</span>
              </div>

              {/* Active Filter Badge */}
              <div className="flex items-center gap-2 bg-[#20427f]/10 px-4 py-2 rounded-xl">
                <ActiveIcon className="w-4 h-4 text-[#20427f]" />
                <span className="text-[#20427f] font-semibold text-sm">
                  {getActiveLabel()}
                </span>
                {(activeCategory || activeSubCategory) && (
                  <button
                    onClick={clearFilters}
                    className="ml-1 p-1 text-[#20427f] hover:bg-[#20427f]/20 rounded-full transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Project Count */}
              <span className="text-gray-400 text-sm hidden md:inline">
                {projectCounts.all || 0} projects
              </span>
            </div>

            {/* Right Side - Filter Buttons (Desktop) */}
            <div className="hidden lg:flex items-center gap-2">
              {/* All Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategorySelect(null)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  !activeCategory
                    ? "bg-gradient-to-r from-[#20427f] to-cyan-600 text-white shadow-lg shadow-[#20427f]/25"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                All
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    !activeCategory
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
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
                        setOpenDropdown(
                          openDropdown === category.slug ? null : category.slug
                        )
                      }
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                        isActive
                          ? "bg-gradient-to-r from-[#20427f] to-cyan-600 text-white shadow-lg shadow-[#20427f]/25"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <CategoryIcon className="w-4 h-4" />
                      <span>{category.category}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === category.slug ? "rotate-180" : ""
                        }`}
                      />
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {openDropdown === category.slug && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                        >
                          {/* Dropdown Header */}
                          <div className="px-4 py-3 bg-gradient-to-r from-[#20427f] to-cyan-600">
                            <div className="flex items-center gap-2 text-white">
                              <CategoryIcon className="w-5 h-5" />
                              <span className="font-semibold">{category.category}</span>
                            </div>
                          </div>

                          {/* All in Category Option */}
                          <button
                            onClick={() => handleCategorySelect(category.slug)}
                            className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                              isActive && !activeSubCategory
                                ? "bg-blue-50"
                                : ""
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Layers className="w-4 h-4 text-gray-400" />
                              <span className="font-medium text-gray-700">
                                All {category.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                                {projectCounts[category.slug] || 0}
                              </span>
                              {isActive && !activeSubCategory && (
                                <Check className="w-4 h-4 text-[#20427f]" />
                              )}
                            </div>
                          </button>

                          {/* Sub Categories */}
                          <div className="max-h-64 overflow-y-auto py-1">
                            {category.subServices.map((sub) => {
                              const isSubActive = activeSubCategory === sub.slug;
                              return (
                                <button
                                  key={sub.slug}
                                  onClick={() =>
                                    handleSubCategorySelect(category.slug, sub.slug)
                                  }
                                  className={`w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors ${
                                    isSubActive ? "bg-blue-50" : ""
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span
                                      className={`w-2 h-2 rounded-full ${
                                        isSubActive
                                          ? "bg-[#20427f]"
                                          : "bg-gray-300"
                                      }`}
                                    />
                                    <span
                                      className={`text-sm ${
                                        isSubActive
                                          ? "text-[#20427f] font-medium"
                                          : "text-gray-600"
                                      }`}
                                    >
                                      {sub.name}
                                    </span>
                                  </div>
                                  {isSubActive && (
                                    <Check className="w-4 h-4 text-[#20427f]" />
                                  )}
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
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl text-gray-700 font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(activeCategory || activeSubCategory) && (
                <span className="w-2 h-2 bg-[#20427f] rounded-full" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 lg:hidden max-h-[80vh] overflow-hidden"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#20427f]" />
                  Filter Projects
                </h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[60vh] p-6">
                {/* All Projects */}
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={`w-full mb-4 p-4 rounded-2xl flex items-center justify-between transition-all ${
                    !activeCategory
                      ? "bg-gradient-to-r from-[#20427f] to-cyan-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Grid3X3 className="w-5 h-5" />
                    <span className="font-semibold">All Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm px-2 py-0.5 rounded-full ${
                        !activeCategory
                          ? "bg-white/20"
                          : "bg-gray-200"
                      }`}
                    >
                      {projectCounts.all || 0}
                    </span>
                    {!activeCategory && <Check className="w-5 h-5" />}
                  </div>
                </button>

                {/* Categories */}
                <div className="space-y-3">
                  {categories.map((category) => {
                    const CategoryIcon = getCategoryIcon(category.slug);
                    const isActive = activeCategory === category.slug;

                    return (
                      <div key={category.slug} className="space-y-2">
                        {/* Category Header */}
                        <button
                          onClick={() => handleCategorySelect(category.slug)}
                          className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all ${
                            isActive && !activeSubCategory
                              ? "bg-gradient-to-r from-[#20427f] to-cyan-600 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <CategoryIcon className="w-5 h-5" />
                            <span className="font-semibold">{category.category}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm px-2 py-0.5 rounded-full ${
                                isActive && !activeSubCategory
                                  ? "bg-white/20"
                                  : "bg-gray-200"
                              }`}
                            >
                              {projectCounts[category.slug] || 0}
                            </span>
                            {isActive && !activeSubCategory && (
                              <Check className="w-5 h-5" />
                            )}
                          </div>
                        </button>

                        {/* Sub Categories */}
                        <div className="ml-4 space-y-1">
                          {category.subServices.map((sub) => {
                            const isSubActive = activeSubCategory === sub.slug;
                            return (
                              <button
                                key={sub.slug}
                                onClick={() =>
                                  handleSubCategorySelect(category.slug, sub.slug)
                                }
                                className={`w-full p-3 rounded-xl flex items-center justify-between transition-all ${
                                  isSubActive
                                    ? "bg-[#20427f]/10 text-[#20427f]"
                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span
                                    className={`w-2 h-2 rounded-full ${
                                      isSubActive ? "bg-[#20427f]" : "bg-gray-300"
                                    }`}
                                  />
                                  <span className="text-sm font-medium">
                                    {sub.name}
                                  </span>
                                </div>
                                {isSubActive && (
                                  <Check className="w-4 h-4 text-[#20427f]" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex gap-3">
                  <button
                    onClick={clearFilters}
                    className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-[#20427f] to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
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