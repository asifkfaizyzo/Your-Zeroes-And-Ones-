// app/services/page.js
import Link from "next/link";

export const metadata = {
  title: "Services - YourZerosAndOnes",
  description:
    "Explore our comprehensive services including branding, digital marketing, and technology solutions",
};

export default function Services() {
  const services = [
    {
      title: "Branding & Design",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      description:
        "Complete branding solutions that create memorable identities and compelling visual experiences for your business.",
      mainPage: "/services/branding-design",
      features: [
        { name: "Brand Consulting", path: "/services/branding-design/brand-consulting" },
        { name: "Logo Design", path: "/services/branding-design/logo-design" },
        { name: "Graphic Design", path: "/services/branding-design/graphic-design" },
        { name: "2D & 3D Visualization", path: "/services/branding-design/2d-3d-visualization" },
        { name: "Video Production", path: "/services/branding-design/video-production" },
        { name: "Audio Production", path: "/services/branding-design/audio-production" },
        { name: "AI Video Production", path: "/services/branding-design/ai-video-production" },
      ],
    },
    {
      title: "Digital Marketing",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      description:
        "Data-driven marketing strategies to boost your online presence, engage audiences, and drive measurable results.",
      mainPage: "/services/digital-marketing",
      features: [
        { name: "Search Engine Optimization (SEO)", path: "/services/digital-marketing/seo" },
        { name: "Social Media Management (SMM)", path: "/services/digital-marketing/social-media-management" },
        { name: "Performance Marketing", path: "/services/digital-marketing/performance-marketing" },
        { name: "Content Marketing", path: "/services/digital-marketing/content-marketing" },
        { name: "Marketing Automations", path: "/services/digital-marketing/marketing-automation" },
        { name: "Analytics & Reporting", path: "/services/digital-marketing/analytics" },
      ],
    },
    {
      title: "Technology",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      description:
        "Cutting-edge technology solutions that power your business growth and digital transformation.",
      mainPage: "/services/technology",
      features: [
        { name: "AI & Machine Learning", path: "/services/technology/ai-ml" },
        { name: "DevOps Consulting", path: "/services/technology/devops-consulting" },
        { name: "Web Development", path: "/services/technology/web-development" },
        { name: "Mobile App Development", path: "/services/technology/mobile-development" },
        { name: "E-Commerce Solutions", path: "/services/technology/ecommerce" },
        { name: "Quality Assurance & Testing", path: "/services/technology/qa-testing" },
        { name: "Cloud Services", path: "/services/technology/cloud-services" },
        { name: "Data & Analytics", path: "/services/technology/data-analytics" },
        { name: "Cyber Security", path: "/services/technology/cyber-security" },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#060010] pt-10">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#060010] via-[#0a1628] to-[#060010]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
            What We Offer
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 mt-3">
            Our Services
          </h1>
          <p className="text-xl text-white/50 mb-8 leading-relaxed">
            Comprehensive digital solutions designed to transform your
            business and drive sustainable growth
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-8 pb-20 bg-[#060812]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm
                           hover:border-[#5b8def]/30 hover:shadow-lg hover:shadow-[#5b8def]/10
                           transition-all duration-300 flex flex-col"
              >
                {/* Header */}
                <div className="p-6 border-b border-[#5b8def]/10">
                  <div className="text-center mb-4">
                    <div className="inline-flex justify-center">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-white text-center mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-center">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="p-6 flex-grow">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <Link
                          href={feature.path}
                          className="flex items-center justify-between py-2 text-white/50 hover:text-[#5b8def] transition-colors duration-200 group"
                        >
                          <span className="font-medium">{feature.name}</span>
                          <svg
                            className="w-4 h-4 text-white/20 group-hover:text-[#5b8def] transform group-hover:translate-x-1 transition-all duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* View All Button */}
                <div className="p-6 border-t border-[#5b8def]/10 mt-auto">
                  <Link
                    href={service.mainPage}
                    className="w-full bg-[#1e3a6e] border border-[#5b8def]/30 text-white text-center py-3 px-4 rounded-lg
                               hover:bg-[#2d5aa8] hover:border-[#5b8def]/60
                               transition-all duration-200 font-medium inline-flex items-center justify-center space-x-2 group"
                  >
                    <div className="flex flex-col items-center">
                      <span>Explore Services</span>
                      <span>in {service.title}</span>
                    </div>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-blue-200/70 mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your business
            goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#0f1d32] px-8 py-3 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium inline-flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Get Free Consultation</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="border border-white/30 text-white px-8 py-3 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 font-medium inline-flex items-center justify-center space-x-2"
            >
              <span>View Our Work</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}