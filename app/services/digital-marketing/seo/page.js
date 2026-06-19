// app/services/digital-marketing/seo/page.js
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export const metadata = {
  title: "Professional SEO Services - YourZerosAndOnes",
  description:
    "Comprehensive SEO solutions including On-Page, Off-Page, Technical, Local, International, and E-Commerce SEO. Drive organic growth with our proven strategies.",
};

export default function SEO() {
  const services = [
    {
      title: "On-Page SEO",
      description:
        "Optimize your website's content, meta tags, headings, and internal linking structure for better search visibility.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Off-Page SEO",
      description:
        "Build quality backlinks and improve your domain authority through strategic outreach and digital PR.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
    {
      title: "Technical SEO",
      description:
        "Fix website architecture, speed, mobile-friendliness, and other technical factors affecting rankings.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Local SEO",
      description:
        "Dominate local search results with Google Business Profile optimization and local citation building.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "International SEO",
      description:
        "Expand your global reach with hreflang implementation, geo-targeting, and multilingual optimization.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "E-Commerce SEO",
      description:
        "Optimize product pages, category structures, and user experience for online stores.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
  ];

  const processes = [
    { step: "1", title: "Auditing", description: "Comprehensive analysis of your current SEO performance, technical issues, and competitor landscape" },
    { step: "2", title: "Research", description: "In-depth keyword research, user intent analysis, and market opportunity identification" },
    { step: "3", title: "Optimization", description: "Strategic implementation of on-page, technical, and content optimizations" },
    { step: "4", title: "Creation", description: "Development of high-quality, SEO-optimized content that resonates with your target audience" },
    { step: "5", title: "Building", description: "Acquisition of authoritative backlinks and establishment of digital authority" },
    { step: "6", title: "Reporting", description: "Detailed performance tracking, analytics, and continuous optimization recommendations" },
  ];

  return (
    <main className="min-h-screen bg-[#060010] pt-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#060010] via-[#0a1628] to-[#060010] py-20">
        <div
          className="max-w-[1800px] mx-auto text-center"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
            Digital Marketing
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 mt-3">
            Search Engine{" "}
            <span className="text-[#5b8def]">Optimization</span>
          </h1>
          <p className="text-xl text-white/50 mb-8 max-w-3xl mx-auto leading-relaxed">
            Drive sustainable organic growth with our comprehensive SEO
            strategies. From technical audits to content creation, we help you
            dominate search results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#1e3a6e] text-white px-8 py-4 rounded-lg border border-[#5b8def]/30 hover:bg-[#2d5aa8] hover:border-[#5b8def]/60 transition-all duration-200 font-medium shadow-lg hover:shadow-[#5b8def]/10"
            >
              Get Free SEO Audit
            </Link>
            <Link
              href="#services"
              className="border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 font-medium"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-[#060812]">
        <div
          className="max-w-[1800px] mx-auto"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Comprehensive SEO Services
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Tailored solutions to meet your specific business goals and
              drive measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm
                           hover:border-[#5b8def]/40 hover:-translate-y-1 hover:bg-[#5b8def]/10
                           hover:shadow-lg hover:shadow-[#5b8def]/10
                           transition-all duration-300 group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-200">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/50 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#060010]">
        <div
          className="max-w-[1800px] mx-auto"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Proven SEO Process
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              A systematic approach that delivers consistent, sustainable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processes.map((process, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm
                           hover:border-[#5b8def]/40 hover:-translate-y-1 hover:bg-[#5b8def]/10
                           hover:shadow-lg hover:shadow-[#5b8def]/10
                           transition-all duration-300 group"
              >
                <div className="flex items-start mb-6">
                  <div className="bg-[#1e3a6e] border border-[#5b8def]/30 text-[#5b8def] rounded-xl w-12 h-12 flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0 group-hover:scale-110 group-hover:border-[#5b8def]/60 transition-all duration-200">
                    {process.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white pt-2">{process.title}</h3>
                </div>
                <p className="text-white/50 text-lg leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-[#060812]">
        <div
          className="max-w-[1800px] mx-auto"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Measurable Results That Matter
              </h2>
              <p className="text-lg text-white/50 mb-8 leading-relaxed">
                Our data-driven approach ensures you see tangible improvements
                in your search visibility, organic traffic, and most
                importantly—your bottom line.
              </p>
              <div className="space-y-6">
                {[
                  { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Increased Organic Traffic", desc: "Drive qualified visitors to your website" },
                  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Higher Conversion Rates", desc: "Turn visitors into customers and leads" },
                  { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Improved ROI", desc: "Get the best return on your marketing investment" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="bg-[#1e3a6e] border border-[#5b8def]/30 rounded-lg p-3 mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-[#5b8def]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-white/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="rounded-2xl p-8 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">
                Why Choose Our SEO Services?
              </h3>
              <div className="space-y-4">
                {[
                  { title: "White-Hat Strategies", desc: "Ethical techniques that deliver sustainable results" },
                  { title: "Transparent Reporting", desc: "Clear, actionable insights into your campaign performance" },
                  { title: "Customized Approach", desc: "Strategies tailored to your unique business needs" },
                  { title: "Expert Team", desc: "Certified SEO professionals with proven track records" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <svg className="w-6 h-6 text-[#5b8def] mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-white/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceProjects categoryName="Digital Marketing" subCategoryName="Search Engine Optimization (SEO)" />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
        </div>
        <div
          className="relative z-10 max-w-[1800px] mx-auto text-center"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Dominate Search Results?
          </h2>
          <p className="text-xl text-blue-200/70 mb-8 max-w-2xl mx-auto">
            Get a comprehensive SEO audit and discover how we can help you
            achieve sustainable organic growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#0f1d32] px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Start Your SEO Journey
            </Link>
            <Link
              href="/services/digital-marketing"
              className="border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 font-medium"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}