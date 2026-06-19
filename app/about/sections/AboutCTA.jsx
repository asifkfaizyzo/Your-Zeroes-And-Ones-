// app/about/sections/AboutCTA.jsx
import Link from "next/link";
import GlareHover from "@/components/effects/GlareHover/GlareHover";

export default function AboutCTA() {
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
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
          Ready to Start Your Project?
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-blue-200/70 mb-8 max-w-xl mx-auto leading-relaxed">
          Let&apos;s work together to bring your vision to life. Our team is excited to hear about your ideas.
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
              Get In Touch
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
              href="/portfolio"
              className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white rounded-full font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 hover:gap-4 hover:bg-white/10 hover:border-white/50 transition-all duration-300 whitespace-nowrap"
            >
              View Our Work
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </GlareHover>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-6 pt-6 mt-4 border-t border-white/10">
          <div className="text-blue-200/70 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-sm">Secure & Confidential</span>
          </div>
          <div className="text-blue-200/70 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span className="font-medium text-sm">100% Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
}