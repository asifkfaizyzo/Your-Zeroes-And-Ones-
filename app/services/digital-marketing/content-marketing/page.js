// app/services/digital-marketing/content-marketing/page.js
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export const metadata = {
  title: "Content Marketing Services - YourZerosAndOnes",
  description:
    "Strategic content marketing including blog content, website copy, e-books, videos, case studies, email marketing, and infographics",
};

export default function ContentMarketing() {
  const services = [
    {
      title: "Blog Content Marketing",
      description:
        "Strategic blog content creation that engages your audience, builds authority, and drives organic traffic through SEO-optimized articles.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      title: "Website Content Marketing",
      description:
        "Compelling website copy and landing page content that converts visitors into customers and supports your brand messaging.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
        </svg>
      ),
    },
    {
      title: "e-Books & White Papers",
      description:
        "In-depth educational content that establishes thought leadership and generates high-quality leads for your business.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Explainer Videos",
      description:
        "Engaging video content that simplifies complex concepts, demonstrates products, and connects with your audience emotionally.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Case Studies",
      description:
        "Compelling success stories that showcase your expertise and demonstrate real-world results to potential customers.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Email Marketing",
      description:
        "Strategic email campaigns that nurture leads, build relationships, and drive conversions through personalized content.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Infographics & Asset Design",
      description:
        "Visually compelling infographics and design assets that make complex information easily digestible and shareable.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
    },
  ];

  const processes = [
    { step: "1", title: "Foundation & Strategy", description: "Audience research, content planning, and strategy development" },
    { step: "2", title: "Creation & Production", description: "Content development, writing, design, and video production" },
    { step: "3", title: "Distribution & Promotion", description: "Strategic content distribution across multiple channels" },
    { step: "4", title: "Analysis & Measurement", description: "Performance tracking and data-driven insights" },
    { step: "5", title: "Repurposing & Optimization", description: "Content optimization and repurposing for maximum reach" },
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
            Content{" "}
            <span className="text-[#5b8def]">Marketing</span>
          </h1>
          <p className="text-xl text-white/50 mb-8 max-w-3xl mx-auto leading-relaxed">
            Strategic content creation and distribution that engages your
            target audience, builds authority, and drives sustainable business
            growth through valuable, relevant content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#1e3a6e] text-white px-8 py-4 rounded-lg border border-[#5b8def]/30 hover:bg-[#2d5aa8] hover:border-[#5b8def]/60 transition-all duration-200 font-medium shadow-lg hover:shadow-[#5b8def]/10"
            >
              Start Content Strategy
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
              Content Marketing Services
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Comprehensive content solutions designed to engage your audience,
              build authority, and drive measurable results
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
              Our Content Marketing Process
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              A systematic approach to creating, distributing, and optimizing
              content for maximum impact
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-[#5b8def]/10 hidden lg:block" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4">
              {processes.map((process, index) => (
                <div
                  key={index}
                  className="relative rounded-xl p-6 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm
                             hover:border-[#5b8def]/40 hover:-translate-y-1 hover:bg-[#5b8def]/10
                             hover:shadow-lg hover:shadow-[#5b8def]/10
                             transition-all duration-300 text-center group"
                >
                  <div className="bg-[#1e3a6e] border border-[#5b8def]/30 text-[#5b8def] rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mb-4 mx-auto group-hover:scale-110 group-hover:border-[#5b8def]/60 transition-all duration-200">
                    {process.step}
                  </div>
                  <h3 className="font-bold text-white mb-3 text-lg">{process.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{process.description}</p>
                  {index < processes.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                      <svg className="w-6 h-6 text-[#5b8def]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
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
            {/* Left — Stats */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Content That Drives Real Results
              </h2>
              <p className="text-xl text-white/50 mb-8 leading-relaxed">
                Strategic content marketing delivers measurable business
                outcomes and builds lasting customer relationships.
              </p>
              <div className="space-y-6">
                {[
                  { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Increased Organic Traffic", desc: "SEO-optimized content that ranks higher" },
                  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Enhanced Brand Authority", desc: "Establish as a thought leader in your industry" },
                  { icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", title: "Higher Conversion Rates", desc: "Content that guides users through the buyer's journey" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="bg-[#1e3a6e] border border-[#5b8def]/30 rounded-lg p-3 mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-[#5b8def]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{item.title}</h3>
                      <p className="text-white/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Why Content */}
            <div className="rounded-2xl p-8 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">
                Why Content Marketing Works
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Builds Trust & Credibility", desc: "Valuable content establishes your expertise" },
                  { title: "Cost-Effective Strategy", desc: "Higher ROI compared to traditional advertising" },
                  { title: "Long-Term Results", desc: "Content continues to generate value over time" },
                  { title: "Audience Engagement", desc: "Creates meaningful connections with your target market" },
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

      <ServiceProjects categoryName="Digital Marketing" subCategoryName="Content Marketing" />

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
            Ready to Build Authority with Content?
          </h2>
          <p className="text-xl text-blue-200/70 mb-8 max-w-2xl mx-auto">
            Let's create a content marketing strategy that engages your
            audience, builds trust, and drives sustainable business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#0f1d32] px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Start Your Content Strategy
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