// components/ui/AnimatedSection.jsx
"use client";
import { useRef, useState, useEffect, memo } from "react";

// CSS-based animated section - no Framer Motion for better performance
export const CSSAnimatedSection = memo(function CSSAnimatedSection({ 
  children, 
  className = "", 
  delay = 0 
}) {
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
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
});

// Simple counter component
export const SimpleCounter = memo(function SimpleCounter({ value }) {
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
      { threshold: 0.5 }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return <span ref={ref}>{isVisible ? value : "0"}</span>;
});

// Helper function for initials
export function getInitials(name = '') {
  if (!name) return '';
  const parts = name.trim().split(' ').filter(Boolean).slice(0, 2);
  return parts.map((p) => p.charAt(0).toUpperCase()).join('');
}

// Section wrapper with consistent padding
export function SectionWrapper({ children, className = "", bg = "bg-gray-100" }) {
  return (
    <section className={`py-16 sm:py-20 md:py-24 ${bg} ${className}`}>
      <div 
        className="w-full"
        style={{
          paddingLeft: 'clamp(2rem, 8vw, 12rem)',
          paddingRight: 'clamp(2rem, 8vw, 12rem)'
        }}
      >
        {children}
      </div>
    </section>
  );
}

// Section header component
export function SectionHeader({ badge, title, highlightedText, description }) {
  return (
    <CSSAnimatedSection className="text-center mb-12 md:mb-16">
      {badge && (
        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white text-sm font-semibold rounded-full mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {title}{" "}
        {highlightedText && (
          <span className="bg-gradient-to-r from-[#203E7F] to-cyan-600 bg-clip-text text-transparent">
            {highlightedText}
          </span>
        )}
      </h2>
      {description && (
        <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
          {description}
        </p>
      )}
    </CSSAnimatedSection>
  );
}