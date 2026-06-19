// app/portfolio/components/PortfolioCTA.jsx
import Link from "next/link";
import GlareHover from "@/components/effects/GlareHover/GlareHover";

export default function PortfolioCTA() {
  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
      </div>

      <div
        className="relative z-10 w-full text-center"
        style={{
          paddingLeft: "clamp(2rem, 8vw, 12rem)",
          paddingRight: "clamp(2rem, 8vw, 12rem)",
        }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Let&apos;s Work Together
        </span>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
          Ready to Start Your{" "}
          <span className="text-[#5b8def]">Next Project?</span>
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-blue-200/70 mb-8 max-w-xl mx-auto leading-relaxed">
          Let&apos;s discuss how we can bring your ideas to life.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <GlareHover
            glareColor="#5b8def"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
            className="inline-block rounded-full overflow-hidden w-full sm:w-auto"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#0f1d32] rounded-full font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:gap-4 hover:bg-blue-50 transition-all duration-300 shadow-xl whitespace-nowrap"
            >
              Start Your Project
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
            className="inline-block rounded-full overflow-hidden w-full sm:w-auto"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white rounded-full font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:gap-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300 whitespace-nowrap"
            >
              Contact Sales
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </GlareHover>
        </div>
      </div>
    </section>
  );
}