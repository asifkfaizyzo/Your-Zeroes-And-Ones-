// app/about/sections/VisionMission.jsx
"use client";
import { Eye, Zap } from "lucide-react";
import { CSSAnimatedSection, SectionHeader, SectionWrapper } from "@/components/ui/AnimatedSection";

export default function VisionMission() {
  return (
    <SectionWrapper bg="bg-gray-100">
      <SectionHeader
        badge="Our Purpose"
        title="Vision &"
        highlightedText="Mission"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision Card */}
        <CSSAnimatedSection delay={0}>
          <div className="bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-3xl p-8 sm:p-10 text-white h-full relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
            {/* Dot pattern background */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "30px 30px",
                }}
              />
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                To be the leading catalyst for digital innovation, empowering
                businesses worldwide to achieve their full potential through
                transformative technology solutions that create lasting impact
                and drive sustainable growth.
              </p>
            </div>
          </div>
        </CSSAnimatedSection>

        {/* Mission Card */}
        <CSSAnimatedSection delay={150}>
          <div className="bg-white rounded-3xl p-8 sm:p-10 h-full shadow-xl border border-gray-100 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#203E7F]/10 to-cyan-600/10 opacity-50" />

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                To deliver exceptional, customized IT solutions that solve
                complex business challenges. We are committed to building
                long-term partnerships based on trust, innovation, and
                measurable results that help our clients stay ahead in an
                ever-evolving digital landscape.
              </p>
            </div>
          </div>
        </CSSAnimatedSection>
      </div>
    </SectionWrapper>
  );
}