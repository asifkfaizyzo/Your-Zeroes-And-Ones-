// app/blog/[slug]/components/ViewAllButton.jsx
"use client";

import Link from "next/link";
import GlareHover from "@/components/effects/GlareHover/GlareHover";

export default function ViewAllButton() {
  return (
    <GlareHover
      glareColor="#5b8def"
      glareOpacity={0.3}
      glareAngle={-30}
      glareSize={300}
      transitionDuration={800}
      playOnce={false}
      className="inline-block rounded-full overflow-hidden"
    >
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#1e3a6e] border border-[#5b8def]/30 text-white font-bold rounded-full transition-all duration-300 hover:bg-[#2d5aa8] hover:gap-4 text-sm sm:text-base"
      >
        View All Articles
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </GlareHover>
  );
}