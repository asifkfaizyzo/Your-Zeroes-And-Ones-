"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Search, X, ChevronDown, ChevronLeft, ChevronRight,
  Calendar, ArrowDownAZ, ArrowUpZA, ArrowUpDown,
  Clock, History, Frown, Plus, ArrowRight,
} from "lucide-react";

const POSTS_PER_PAGE = 6;

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First", Icon: Clock },
  { value: "oldest", label: "Oldest First", Icon: History },
  { value: "a-z", label: "A → Z", Icon: ArrowDownAZ },
  { value: "z-a", label: "Z → A", Icon: ArrowUpZA },
];

const formatDate = (date) => {
  if (!date) return "No date";
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return "Invalid date";
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  } catch { return "Date error"; }
};

function CustomSelect({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/5 border border-[#5b8def]/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b8def]/50 focus:border-transparent transition-all duration-200 text-white/70 font-medium cursor-pointer min-w-[180px] hover:bg-white/10 hover:border-[#5b8def]/40"
      >
        {selectedOption && (
          <>
            <selectedOption.Icon className="w-4 h-4 text-[#5b8def]" />
            <span className="flex-1 text-left">{selectedOption.label}</span>
          </>
        )}
        <ChevronDown className={`w-4 h-4 text-white/30 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a1628] border border-[#5b8def]/20 rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => { onChange(option.value); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150 ${
                value === option.value ? "bg-[#5b8def]/10 text-[#5b8def]" : "text-white/60 hover:bg-white/5"
              }`}
            >
              <option.Icon className={`w-4 h-4 ${value === option.value ? "text-[#5b8def]" : "text-white/30"}`} />
              <span className="font-medium">{option.label}</span>
              {value === option.value && <div className="ml-auto w-2 h-2 bg-[#5b8def] rounded-full" />}
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

  useEffect(() => {
    const timer = setTimeout(() => { setDebouncedSearch(searchQuery); setCurrentPage(1); }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter((post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query)
      );
    }
    result.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
      const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
      switch (sortOrder) {
        case "newest": return dateB - dateA;
        case "oldest": return dateA - dateB;
        case "a-z": return a.title.localeCompare(b.title);
        case "z-a": return b.title.localeCompare(a.title);
        default: return dateB - dateA;
      }
    });
    return result;
  }, [posts, debouncedSearch, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredAndSortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const emptySlots = POSTS_PER_PAGE - currentPosts.length;

  const handlePageChange = (newPage) => {
    if (newPage === currentPage || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => { setCurrentPage(newPage); setTimeout(() => setIsAnimating(false), 50); }, 200);
    document.getElementById("articles-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearSearch = () => { setSearchQuery(""); setCurrentPage(1); };

  return (
    <section
      id="articles-section"
      className="w-full py-12 bg-[#060812]"
      style={{
        paddingLeft: "clamp(2rem, 8vw, 12rem)",
        paddingRight: "clamp(2rem, 8vw, 12rem)",
      }}
    >
      {/* SEARCH & SORT */}
      <div className="rounded-2xl p-4 sm:p-6 border border-[#5b8def]/10 bg-[#5b8def]/5 backdrop-blur-sm mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-white/30" />
            </div>
            <input
              type="text"
              placeholder="Search articles by title, content, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-white/5 border border-[#5b8def]/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5b8def]/50 focus:border-transparent transition-all duration-200 text-white placeholder-white/30"
            />
            {searchQuery && (
              <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-white/40 whitespace-nowrap">
              <ArrowUpDown className="w-4 h-4" />
              <span>Sort by:</span>
            </div>
            <CustomSelect value={sortOrder} onChange={(v) => { setSortOrder(v); setCurrentPage(1); }} options={SORT_OPTIONS} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="text-white/40">
            {debouncedSearch ? (
              <span>Found <span className="font-semibold text-[#5b8def]">{filteredAndSortedPosts.length}</span> article{filteredAndSortedPosts.length !== 1 ? "s" : ""} for &quot;<span className="font-medium text-white/60">{debouncedSearch}</span>&quot;</span>
            ) : (
              <span>Showing <span className="font-semibold text-[#5b8def]">{filteredAndSortedPosts.length}</span> article{filteredAndSortedPosts.length !== 1 ? "s" : ""}</span>
            )}
          </div>
          {totalPages > 1 && (
            <div className="text-white/30 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>
      </div>

      {/* GRID */}
      <div className="min-h-[800px] lg:min-h-[600px]">
        {filteredAndSortedPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-[#5b8def]/10 border border-[#5b8def]/20 rounded-full flex items-center justify-center mb-6">
              <Frown className="w-12 h-12 text-white/30" />
            </div>
            <h3 className="text-xl font-bold text-white/70 mb-2">No articles found</h3>
            <p className="text-white/40 mb-6 max-w-md">We couldn&apos;t find any articles matching &quot;{debouncedSearch}&quot;. Try a different search term.</p>
            <button onClick={clearSearch} className="px-6 py-3 bg-[#1e3a6e] text-white border border-[#5b8def]/30 font-medium rounded-xl hover:bg-[#2d5aa8] transition-colors flex items-center gap-2">
              <X className="w-4 h-4" />
              Clear Search
            </button>
          </div>
        ) : (
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300 ease-in-out ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
            {currentPosts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group" style={{ animationDelay: `${index * 50}ms` }}>
                <article className="rounded-2xl overflow-hidden border border-[#5b8def]/15 bg-[#060812] hover:border-[#5b8def]/40 hover:shadow-lg hover:shadow-[#5b8def]/10 transition-all duration-300 h-full hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden bg-[#0a1628]">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060812]/60 via-transparent to-transparent" />
                    {post.category && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-[#1e3a6e]/80 backdrop-blur-sm border border-[#5b8def]/30 text-xs font-semibold text-[#5b8def] rounded-full">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6 border-t border-[#5b8def]/10">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#5b8def] transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-white/40 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-white/30">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1 text-[#5b8def] font-medium group-hover:gap-2 transition-all">
                        Read more
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {emptySlots > 0 && currentPosts.length > 0 && (
              <>
                {Array.from({ length: emptySlots }).map((_, index) => (
                  <div key={`empty-${index}`} className="rounded-2xl min-h-[350px] border-2 border-dashed border-[#5b8def]/10 flex items-center justify-center opacity-50">
                    <div className="text-center text-white/20">
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
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isAnimating}
            className="px-4 py-2.5 rounded-xl bg-[#060812] border border-[#5b8def]/20 hover:bg-[#5b8def]/10 hover:border-[#5b8def]/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium text-white/70"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
              const showEllipsis = (page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2);
              if (!showPage && !showEllipsis) return null;
              if (showEllipsis && !showPage) return <span key={page} className="w-10 h-10 flex items-center justify-center text-white/30">...</span>;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  disabled={isAnimating}
                  className={`w-10 h-10 rounded-xl font-semibold transition-all duration-200 ${
                    currentPage === page
                      ? "bg-[#1e3a6e] text-white border border-[#5b8def]/40 shadow-lg shadow-[#5b8def]/20 scale-110"
                      : "bg-[#060812] border border-[#5b8def]/15 text-white/50 hover:bg-[#5b8def]/10 hover:border-[#5b8def]/30"
                  } disabled:cursor-not-allowed`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isAnimating}
            className="px-4 py-2.5 rounded-xl bg-[#060812] border border-[#5b8def]/20 hover:bg-[#5b8def]/10 hover:border-[#5b8def]/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium text-white/70"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}