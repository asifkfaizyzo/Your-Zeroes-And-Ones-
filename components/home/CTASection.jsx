// app/components/landingpages/CTASection.js
import Link from "next/link";
import GlareHover from "@/components/effects/GlareHover/GlareHover";

export default function CTASection() {
  return (
    <section className="py-10 sm:py-12 lg:py-16 2xl:py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="w-full max-w-[1800px] mx-auto text-center relative z-10 px-4 sm:px-6">
        {/* Heading - Matched to VH1Hero sizes */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          Ready to Transform Your Business?
        </h2>

        {/* Subtext - Matched to VH1Hero tagline */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-200/70 mb-6 sm:mb-8 max-w-md sm:max-w-xl lg:max-w-2xl mx-auto leading-relaxed">
          Let's discuss how our comprehensive services can help you achieve your
          digital goals and drive real results.
        </p>

        {/* Buttons - Grid layout for mobile, flex for desktop */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-4 justify-center mb-6 sm:mb-8 max-w-2xl mx-auto">
          {/* Get Free Consultation */}
          <GlareHover
            glareColor="#1e3a6e"
            glareOpacity={0.25}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
            className="inline-block rounded-xl sm:rounded-full overflow-hidden"
          >
            <Link
              href="/contact"
              className="w-full bg-white text-[#0f1d32] px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-full hover:bg-blue-50 transition-all duration-300 font-semibold text-xs sm:text-sm lg:text-base inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 hover:gap-3 shadow-xl"
            >
              <span className="text-center sm:text-left leading-tight whitespace-nowrap">
                Get Free Consultation
              </span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </GlareHover>

          {/* View Our Work */}
          <GlareHover
            glareColor="#ffffff"
            glareOpacity={0.28}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
            className="inline-block rounded-xl sm:rounded-full overflow-hidden"
          >
            <Link
              href="/portfolio"
              className="w-full border border-white/30 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 font-semibold text-xs sm:text-sm lg:text-base inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 hover:gap-3"
            >
              <span className="text-center sm:text-left leading-tight whitespace-nowrap">
                View Our Work
              </span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </GlareHover>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-white/10">
          <div className="text-blue-200/70 flex items-center justify-center gap-1.5 sm:gap-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium text-xs sm:text-sm">
              Secure & Confidential
            </span>
          </div>
          <div className="text-blue-200/70 flex items-center justify-center gap-1.5 sm:gap-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span className="font-medium text-xs sm:text-sm">
              100% Satisfaction
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}