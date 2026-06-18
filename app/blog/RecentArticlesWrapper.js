"use client";

import dynamic from "next/dynamic";
import {
  Search, ArrowUpDown, Calendar, ArrowRight, Loader2,
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
      <div className="rounded-2xl p-4 sm:p-6 border border-[#5b8def]/10 bg-[#5b8def]/5 backdrop-blur-sm mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-white/20 animate-pulse" />
            </div>
            <div className="w-full h-12 pl-12 pr-4 bg-white/5 border border-[#5b8def]/10 rounded-xl animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-white/30">
              <ArrowUpDown className="w-4 h-4 animate-pulse" />
              <span>Sort by:</span>
            </div>
            <div className="w-[180px] h-12 bg-white/5 border border-[#5b8def]/10 rounded-xl animate-pulse" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
        </div>
      </div>

      {/* Loading */}
      <div className="flex items-center justify-center gap-2 mb-6 text-white/40">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm font-medium">Loading articles...</span>
      </div>

      {/* Grid Skeleton */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden border border-[#5b8def]/10 bg-[#060812]"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative h-48 bg-[#5b8def]/5 animate-pulse">
              <div className="absolute top-4 left-4">
                <div className="w-20 h-6 bg-white/5 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="h-5 bg-white/5 rounded-lg w-full animate-pulse" />
                <div className="h-5 bg-white/5 rounded-lg w-3/4 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-white/[0.03] rounded w-full animate-pulse" />
                <div className="h-3 bg-white/[0.03] rounded w-5/6 animate-pulse" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1 text-white/10">
                  <Calendar className="w-3 h-3" />
                  <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-1 text-white/10">
                  <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});

export default function RecentArticlesWrapper(props) {
  return <RecentArticlesClient {...props} />;
}