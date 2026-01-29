// app/blog/RecentArticlesClient.js
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowDownAZ,
  ArrowUpZA,
  ArrowUpDown,
  Clock,
  History,
  Frown,
  Plus,
  ArrowRight,
} from "lucide-react";

const POSTS_PER_PAGE = 6;

// Sort options with Lucide icons
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First", Icon: Clock },
  { value: "oldest", label: "Oldest First", Icon: History },
  { value: "a-z", label: "A → Z", Icon: ArrowDownAZ },
  { value: "z-a", label: "Z → A", Icon: ArrowUpZA },
];

// ✅ Helper function to format dates
const formatDate = (date) => {
  if (!date) {
    return "No date";
  }

  try {
    let dateObj;

    // If it's already a Date object
    if (date instanceof Date) {
      dateObj = date;
    } else {
      // If it's a string or number, convert to Date
      dateObj = new Date(date);
    }

    // Check if valid date
    if (isNaN(dateObj.getTime())) {
      return "Invalid date";
    }

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Date error";
  }
};

// Custom Select Component with Icons
function CustomSelect({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative">
      {/* Selected Value Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-700 font-medium cursor-pointer min-w-[180px] hover:bg-slate-100"
      >
        {selectedOption && (
          <>
            <selectedOption.Icon className="w-4 h-4 text-indigo-600" />
            <span className="flex-1 text-left">{selectedOption.label}</span>
          </>
        )}
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150 ${
                value === option.value
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <option.Icon
                className={`w-4 h-4 ${
                  value === option.value ? "text-indigo-600" : "text-slate-400"
                }`}
              />
              <span className="font-medium">{option.label}</span>
              {value === option.value && (
                <div className="ml-auto w-2 h-2 bg-indigo-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RecentArticlesClient({ posts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    // Filter by search query
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query) ||
          post.category?.toLowerCase().includes(query)
      );
    }

    // Sort posts - ✅ FIXED: Using createdAt
    result.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);

      switch (sortOrder) {
        case "newest":
          return dateB - dateA;
        case "oldest":
          return dateA - dateB;
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        default:
          return dateB - dateA;
      }
    });

    return result;
  }, [posts, debouncedSearch, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredAndSortedPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );
  const emptySlots = POSTS_PER_PAGE - currentPosts.length;

  // Handle page change with animation
  const handlePageChange = (newPage) => {
    if (newPage === currentPage || isAnimating) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setTimeout(() => setIsAnimating(false), 50);
    }, 200);

    document.getElementById("articles-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Handle sort change
  const handleSortChange = (newSort) => {
    setSortOrder(newSort);
    setCurrentPage(1);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <section
      id="articles-section"
      className="w-full py-12"
      style={{
        paddingLeft: "clamp(2rem, 8vw, 12rem)",
        paddingRight: "clamp(2rem, 8vw, 12rem)",
      }}
    >
      {/* SEARCH & SORT BAR */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles by title, content, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-700 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 whitespace-nowrap">
              <ArrowUpDown className="w-4 h-4" />
              <span>Sort by:</span>
            </div>
            <CustomSelect
              value={sortOrder}
              onChange={handleSortChange}
              options={SORT_OPTIONS}
            />
          </div>
        </div>

        {/* Search Results Info */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="text-slate-500">
            {debouncedSearch ? (
              <span>
                Found{" "}
                <span className="font-semibold text-indigo-600">
                  {filteredAndSortedPosts.length}
                </span>{" "}
                article{filteredAndSortedPosts.length !== 1 ? "s" : ""} for "
                <span className="font-medium text-slate-700">
                  {debouncedSearch}
                </span>
                "
              </span>
            ) : (
              <span>
                Showing{" "}
                <span className="font-semibold text-indigo-600">
                  {filteredAndSortedPosts.length}
                </span>{" "}
                article{filteredAndSortedPosts.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {totalPages > 1 && (
            <div className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>
      </div>

      {/* ARTICLES GRID */}
      <div className="min-h-[800px] lg:min-h-[600px]">
        {filteredAndSortedPosts.length === 0 ? (
          /* No Results */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Frown className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              No articles found
            </h3>
            <p className="text-slate-500 mb-6 max-w-md">
              We couldn't find any articles matching "{debouncedSearch}". Try a
              different search term.
            </p>
            <button
              onClick={clearSearch}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear Search
            </button>
          </div>
        ) : (
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300 ease-in-out ${
              isAnimating
                ? "opacity-0 transform translate-y-4"
                : "opacity-100 transform translate-y-0"
            }`}
          >
            {/* Article Cards */}
            {currentPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <article className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 h-full hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    {post.category && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-indigo-600 rounded-full">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {/* ✅ FIXED: Use createdAt instead of date */}
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1 text-indigo-600 font-medium group-hover:gap-2 transition-all">
                        Read more
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {/* Empty Placeholder Slots */}
            {emptySlots > 0 && currentPosts.length > 0 && (
              <>
                {Array.from({ length: emptySlots }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="rounded-2xl min-h-[350px] bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center opacity-50"
                  >
                    <div className="text-center text-slate-400">
                      <Plus className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">More coming soon</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && filteredAndSortedPosts.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isAnimating}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium text-slate-700 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const showPage =
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1;

              const showEllipsis =
                (page === 2 && currentPage > 3) ||
                (page === totalPages - 1 && currentPage < totalPages - 2);

              if (!showPage && !showEllipsis) return null;

              if (showEllipsis && !showPage) {
                return (
                  <span
                    key={page}
                    className="w-10 h-10 flex items-center justify-center text-slate-400"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  disabled={isAnimating}
                  className={`w-10 h-10 rounded-xl font-semibold transition-all duration-200 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-110"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
                  } disabled:cursor-not-allowed`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isAnimating}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium text-slate-700 shadow-sm"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}