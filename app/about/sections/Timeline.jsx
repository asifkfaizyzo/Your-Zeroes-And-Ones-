// app/about/sections/Timeline.jsx
"use client";
import { useRef, useState, useEffect, memo } from "react";
import {
  Rocket,
  Users,
  Award,
  Zap,
  Target,
  TrendingUp,
  Star,
  Trophy,
  CheckCircle,
  Calendar,
  Clock,
  Briefcase,
  Heart,
  Shield,
} from "lucide-react";
import { CSSAnimatedSection, SectionHeader } from "@/components/ui/AnimatedSection";

const ICON_MAP = {
  Rocket,
  Users,
  Award,
  Zap,
  Target,
  TrendingUp,
  Star,
  Trophy,
  CheckCircle,
  Calendar,
  Clock,
  Briefcase,
  Heart,
  Shield,
};

// Timeline Item Component
const TimelineItem = memo(function TimelineItem({ item, index }) {
  const IconComponent = ICON_MAP[item.icon] || Rocket;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isEven = index % 2 === 0;

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
      className={`relative flex items-center mb-12 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translateX(0)' 
          : `translateX(${isEven ? '-30px' : '30px'})`,
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 150}ms`
      }}
    >
      <div 
        className="absolute left-4 md:left-1/2 w-8 h-8 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-full transform md:-translate-x-1/2 z-10 flex items-center justify-center shadow-lg"
        style={{
          transform: `scale(${isVisible ? 1 : 0}) ${window?.innerWidth >= 768 ? 'translateX(-50%)' : ''}`,
          transition: `transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 150 + 200}ms`
        }}
      >
        <IconComponent className="w-4 h-4 text-white" />
      </div>

      <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
            <Calendar className="w-3 h-3" />
            {item.year}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            {item.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
});

export default function Timeline({ timelineItems, loading }) {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#203E7F]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div 
        className="relative w-full"
        style={{
          paddingLeft: 'clamp(2rem, 8vw, 12rem)',
          paddingRight: 'clamp(2rem, 8vw, 12rem)'
        }}
      >
        <SectionHeader
          badge="Our Journey"
          title="The Story Behind"
          highlightedText="Our Success"
          description="From a small startup to an industry leader, discover the milestones that shaped our journey."
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading timeline...</p>
            </div>
          </div>
        ) : timelineItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">No timeline items available yet.</p>
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#203E7F] via-cyan-500 to-[#203E7F] transform md:-translate-x-1/2" />
            {timelineItems.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}