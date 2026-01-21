// app/about/sections/WhoWeAre.jsx
"use client";
import { useRef, useState, useEffect, memo } from "react";
import Image from "next/image";
import { CheckCircle, Calendar, Users, Clock } from "lucide-react";
import { CSSAnimatedSection, SimpleCounter, SectionWrapper } from "@/components/ui/AnimatedSection";

// Icon mapping
const ICON_MAP = {
  CheckCircle,
  Calendar,
  Users,
  Clock,
};

// Stat Card Component
const StatCard = memo(function StatCard({ stat, index }) {
  const IconComponent = ICON_MAP[stat.icon] || CheckCircle;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="text-center p-4 bg-white rounded-2xl shadow-lg border border-gray-100 group cursor-default hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 100}ms`
      }}
    >
      <div className="w-10 h-10 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
        <IconComponent className="w-5 h-5 text-white" />
      </div>
      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#203E7F] to-cyan-600 bg-clip-text text-transparent">
        <SimpleCounter value={stat.value} />
      </div>
      <div className="text-xs sm:text-sm text-gray-500 mt-1">
        {stat.label}
      </div>
    </div>
  );
});

export default function WhoWeAre({ aboutContent, displayStats }) {
  return (
    <section id="who-we-are" className="py-16 sm:py-20 md:py-24 bg-gray-100">
      <div 
        className="w-full"
        style={{
          paddingLeft: 'clamp(2rem, 8vw, 12rem)',
          paddingRight: 'clamp(2rem, 8vw, 12rem)'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div className="space-y-6">
            <CSSAnimatedSection delay={0}>
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white text-sm font-semibold rounded-full mb-4">
                {aboutContent.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {aboutContent.title}{" "}
                <span className="bg-gradient-to-r from-[#203E7F] to-cyan-600 bg-clip-text text-transparent">
                  {aboutContent.highlightedText}
                </span>
              </h2>
            </CSSAnimatedSection>

            <CSSAnimatedSection delay={100}>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {aboutContent.paragraph1}
              </p>
            </CSSAnimatedSection>

            <CSSAnimatedSection delay={200}>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {aboutContent.paragraph2}
              </p>
            </CSSAnimatedSection>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {displayStats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <CSSAnimatedSection delay={150}>
            <div className="relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="aspect-[4/3] relative bg-gradient-to-br from-[#203E7F]/20 to-cyan-600/20">
                  {aboutContent.mediaType === 'video' && aboutContent.media ? (
                    <video
                      src={aboutContent.media}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={aboutContent.media || "/images/about/about-company.png"}
                      alt="Your Zeros and Ones Team"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      quality={90}
                    />
                  )}
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-2xl -z-10 opacity-20" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-cyan-600 to-[#203E7F] rounded-xl -z-10 opacity-20" />
            </div>
          </CSSAnimatedSection>
        </div>
      </div>
    </section>
  );
}