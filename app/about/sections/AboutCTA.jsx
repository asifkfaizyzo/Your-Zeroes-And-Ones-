// app/about/sections/AboutCTA.jsx
"use client";
import { Rocket, ArrowRight } from "lucide-react";
import { CSSAnimatedSection, SectionWrapper } from "@/components/ui/AnimatedSection";

export default function AboutCTA() {
  return (
    <SectionWrapper bg="bg-white">
      <CSSAnimatedSection>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-gray-200 max-w-4xl mx-auto group hover:shadow-xl transition-shadow duration-300">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#203E7F]/10 to-cyan-600/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-600/10 to-[#203E7F]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-[#203E7F] to-cyan-600 bg-clip-text text-transparent">
                Project?
              </span>
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
              Let&apos;s work together to bring your vision to life. Our team is excited to hear about your ideas.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get In Touch
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </CSSAnimatedSection>
    </SectionWrapper>
  );
}