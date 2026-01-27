// app/page.jsx
"use client";

import React, { useRef } from "react";
import NewNavbar from "@/components/landing/NewNavbar";

import VH1Hero from "@/components/home/VH1Hero";
import VH2Intro from "@/components/home/VH2Intro";
import ServiceStackSection from "@/components/home/ServiceStackSection";
import CurvedDivider from "@/components/home/CurvedDivider";
import ClientsSection from "@/components/home/ClientsSection";
import CTASection from "@/components/home/CTASection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function HomePage() {
  // Refs for scroll-to sections
  const marketingSectionRef = useRef(null);
  const brandingSectionRef = useRef(null);
  const technologySectionRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="bg-[#060010] font-['Inter',sans-serif]">
      <NewNavbar />

      {/* VH1 - Hero Welcome */}
      <VH1Hero />

      {/* VH2 - What We Do Intro */}
      <VH2Intro />

      {/* Service Sections with Stacking Effect */}
      <ServiceStackSection
        marketingSectionRef={marketingSectionRef}
        brandingSectionRef={brandingSectionRef}
        technologySectionRef={technologySectionRef}
        scrollToSection={scrollToSection}
      />

      {/* Curved Divider */}
      <CurvedDivider />

      {/* Clients Section */}
      <div className="bg-white">
        <ClientsSection />
      </div>

      {/* Testimonials Section */}
      <div className="bg-white">
        <TestimonialsSection />
      </div>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}