// app/blog/RecentArticlesWrapper.js
"use client";

import dynamic from "next/dynamic";
import {
  Search,
  ArrowUpDown,
  Calendar,
  ArrowRight,
  Loader2,
} from "lucide-react";

const RecentArticlesClient = dynamic(() => import("./RecentArticlesClient"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full py-12"
      style={{
        paddingLeft: "clamp(2rem, 8vw, 12rem)",
        paddingRight: "clamp(2rem, 8vw, 12rem)",
      }}
    >
      {/* Search & Sort Bar Skeleton */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input Skeleton */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-300 animate-pulse" />
            </div>
            <div className="w-full h-12 pl-12 pr-4 bg-slate-100 border border-slate-200 rounded-xl animate-pulse" />
          </div>

          {/* Sort Dropdown Skeleton */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
              <ArrowUpDown className="w-4 h-4 animate-pulse" />
              <span>Sort by:</span>
            </div>
            <div className="w-[180px] h-12 bg-slate-100 border border-slate-200 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Results Info Skeleton */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="flex items-center justify-center gap-2 mb-6 text-slate-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm font-medium">Loading articles...</span>
      </div>

      {/* Articles Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100"
            style={{
              animationDelay: `${i * 100}ms`,
            }}
          >
            {/* Image Skeleton */}
            <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-100 animate-pulse">
              {/* Category Badge Skeleton */}
              <div className="absolute top-4 left-4">
                <div className="w-20 h-6 bg-white/80 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
              {/* Title Skeleton */}
              <div className="space-y-2">
                <div className="h-5 bg-slate-200 rounded-lg w-full animate-pulse" />
                <div className="h-5 bg-slate-200 rounded-lg w-3/4 animate-pulse" />
              </div>

              {/* Excerpt Skeleton */}
              <div className="space-y-2">
                <div className="h-3 bg-slate-100 rounded w-full animate-pulse" />
                <div className="h-3 bg-slate-100 rounded w-5/6 animate-pulse" />
              </div>

              {/* Footer Skeleton */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-slate-300">
                  <Calendar className="w-3 h-3" />
                  <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-1 text-slate-300">
                  <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center items-center gap-2 mt-12">
        <div className="w-24 h-10 bg-slate-200 rounded-xl animate-pulse" />
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-slate-200 rounded-xl animate-pulse"
              style={{ animationDelay: `${i * 50}ms` }}
            />
          ))}
        </div>
        <div className="w-20 h-10 bg-slate-200 rounded-xl animate-pulse" />
      </div>
    </div>
  ),
});

export default function RecentArticlesWrapper(props) {
  return <RecentArticlesClient {...props} />;
}