// app/about/sections/WhyChooseUs.jsx
"use client";
import { useRef, useState, useEffect, memo } from "react";
import {
  Lightbulb,
  Rocket,
  Shield,
  HeadphonesIcon,
  Settings,
  BarChart3,
} from "lucide-react";
import { CSSAnimatedSection, SectionHeader, SectionWrapper } from "@/components/ui/AnimatedSection";

// Feature Card Component
const FeatureCard = memo(function FeatureCard({ item, index }) {
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
      { threshold: 0.2 }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
        transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 80}ms`
      }}
    >
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full hover:-translate-y-2">
        <div className="w-14 h-14 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <item.Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {item.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
});

// Static data - no need to fetch
const WHY_CHOOSE_US_DATA = [
  {
    Icon: Lightbulb,
    title: "Innovation First",
    description: "We stay at the forefront of technology trends, ensuring your solutions are built with the latest tools and methodologies.",
  },
  {
    Icon: Rocket,
    title: "Rapid Delivery",
    description: "Agile development processes and experienced teams ensure your projects are delivered on time and within budget.",
  },
  {
    Icon: Shield,
    title: "Quality & Security",
    description: "Rigorous testing protocols and security measures guarantee robust, reliable, and secure applications.",
  },
  {
    Icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Our relationship doesn't end at delivery. We provide ongoing support and maintenance to ensure your success.",
  },
  {
    Icon: Settings,
    title: "Custom Solutions",
    description: "Every project is tailored to your specific needs, ensuring perfect alignment with your business objectives.",
  },
  {
    Icon: BarChart3,
    title: "Proven Results",
    description: "Track record of delivering measurable business outcomes and ROI for our diverse client portfolio.",
  },
];

export default function WhyChooseUs() {
  return (
    <SectionWrapper bg="bg-gray-100">
      <SectionHeader
        badge="Why Us"
        title="Why Choose"
        highlightedText="Us?"
        description="Discover what sets us apart and makes us the right partner for your digital journey."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {WHY_CHOOSE_US_DATA.map((item, index) => (
          <FeatureCard key={index} item={item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}