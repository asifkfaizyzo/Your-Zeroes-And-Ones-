// app/components/landingpages/CTASection.js
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 2xl:py-24 bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div
        className="w-full max-w-[1800px] mx-auto text-center relative z-10"
        style={{
          paddingLeft: "clamp(2rem, 8vw, 12rem)",
          paddingRight: "clamp(2rem, 8vw, 12rem)",
        }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Ready to Transform Your Business?
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl text-blue-200/70 mb-6 sm:mb-8 lg:mb-10 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed">
          Let's discuss how our comprehensive services can help you achieve
          your digital goals and drive real results.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
          <Link
            href="/contact"
            className="group bg-white text-[#0f1d32] px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl hover:bg-blue-50 transition-all duration-300 font-bold text-sm sm:text-base lg:text-lg shadow-2xl hover:scale-105 inline-flex items-center justify-center"
          >
            Get Free Consultation
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <Link
            href="/portfolio"
            className="group border-2 border-white/30 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 font-bold text-sm sm:text-base lg:text-lg hover:scale-105 inline-flex items-center justify-center"
          >
            View Our Work
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:rotate-45 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-white/10">
          <div className="text-blue-200/80 flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold text-sm sm:text-base">
              Secure & Confidential
            </span>
          </div>
          <div className="text-blue-200/80 flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span className="font-semibold text-sm sm:text-base">
              100% Satisfaction
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}