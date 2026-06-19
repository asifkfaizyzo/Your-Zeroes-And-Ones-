// app/portfolio/[slug]/not-found.jsx
"use client";
import Link from "next/link";
import GlareHover from "@/components/effects/GlareHover/GlareHover";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060010] relative overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5b8def]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center px-6 relative z-10">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#5b8def]/20">404</h1>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Project Not Found
        </h2>
        <p className="text-white/40 mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the project you&apos;re looking for. It may have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
              href="/portfolio"
              className="px-8 py-4 bg-[#1e3a6e] text-white border border-[#5b8def]/30 rounded-full font-semibold inline-flex items-center gap-2 hover:gap-4 hover:bg-[#2d5aa8] transition-all duration-300"
            >
              View All Projects
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </GlareHover>

          <GlareHover
            glareColor="#ffffff"
            glareOpacity={0.25}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
            className="inline-block rounded-full overflow-hidden"
          >
            <Link
              href="/"
              className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold inline-flex items-center gap-2 hover:gap-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              Go Home
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </GlareHover>
        </div>
      </div>
    </div>
  );
}