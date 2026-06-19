// app/about/sections/WhyChooseUs.jsx
"use client";
import { useRef, useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb, Rocket, Shield, HeadphonesIcon, Settings, BarChart3,
} from "lucide-react";
import BlurText from "@/components/effects/BlurText/BlurText";

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

const FeatureCard = memo(function FeatureCard({ item, index }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div
      ref={ref}
      className="group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        transition: `all 0.5s cubic-bezier(0.4,0,0.2,1) ${index * 80}ms`,
      }}
    >
      <div className="h-full rounded-2xl border border-[#5b8def]/20 bg-[#5b8def]/5
                      p-6 sm:p-8 backdrop-blur-sm
                      hover:border-[#5b8def]/40 hover:-translate-y-2 hover:bg-[#5b8def]/10
                      transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5b8def]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

        <div className="relative">
          <div className="w-12 h-12 bg-[#1e3a6e] border border-[#5b8def]/30 rounded-xl
                          flex items-center justify-center mb-5
                          group-hover:border-[#5b8def]/60 group-hover:scale-110 group-hover:rotate-3
                          transition-all duration-300">
            <item.Icon className="w-6 h-6 text-[#5b8def]" />
          </div>
          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#5b8def] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-white/40 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
});

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 sm:py-24 bg-[#060010] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#5b8def]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div
        className="relative z-10 w-full"
        style={{
          paddingLeft: "clamp(2rem, 8vw, 12rem)",
          paddingRight: "clamp(2rem, 8vw, 12rem)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              Why Us
            </span>
          </motion.div>
          <div className="mb-4">
            <BlurText
              text="Why Choose Us?"
              delay={60}
              animateBy="words"
              direction="top"
              align="center"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Discover what sets us apart and makes us the right partner for your digital journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {WHY_CHOOSE_US_DATA.map((item, index) => (
            <FeatureCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}