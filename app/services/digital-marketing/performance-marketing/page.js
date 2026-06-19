// app/services/digital-marketing/performance-marketing/page.js
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export const metadata = {
  title: "Performance Marketing Services - YourZerosAndOnes",
  description:
    "Data-driven performance marketing including PPC, social media advertising, conversion optimization, and ROI-focused campaigns",
};

export default function PerformanceMarketing() {
  const services = [
    {
      title: "Paid Search Advertising (PPC)",
      description:
        "Strategic pay-per-click campaigns on Google, Bing, and other search engines to drive qualified traffic and conversions.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      title: "Social Media Advertising",
      description:
        "Targeted advertising across Facebook, Instagram, LinkedIn, and Twitter to reach your ideal audience.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
    {
      title: "Programmatic Display Advertising",
      description:
        "Automated display advertising across premium websites and apps using real-time bidding technology.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: "Affiliate Marketing",
      description:
        "Performance-based partnership programs that drive sales through trusted affiliate networks.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Content Marketing & SEO",
      description:
        "Strategic content creation optimized for search engines to drive organic traffic and engagement.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      title: "Email Marketing & Automation",
      description:
        "Automated email campaigns and marketing workflows to nurture leads and drive conversions.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Conversion Rate Optimization (CRO)",
      description:
        "Data-driven optimization of websites and landing pages to maximize conversion rates and ROI.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="#5b8def" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  const performanceFocus = [
    {
      metric: "Sales", acronym: "CPS", fullName: "Cost Per Sale",
      description: "Maximize revenue with campaigns focused on direct sales and transactions",
      icon: <svg className="w-8 h-8" fill="none" stroke="#5b8def" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
    },
    {
      metric: "Lead", acronym: "CPL", fullName: "Cost Per Lead",
      description: "Generate qualified leads at optimal cost for your sales pipeline",
      icon: <svg className="w-8 h-8" fill="none" stroke="#5b8def" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    },
    {
      metric: "Click", acronym: "CPC", fullName: "Cost Per Click",
      description: "Drive targeted traffic to your website with optimized click campaigns",
      icon: <svg className="w-8 h-8" fill="none" stroke="#5b8def" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>,
    },
    {
      metric: "App Install", acronym: "CPI", fullName: "Cost Per Install",
      description: "Grow your mobile app user base with targeted installation campaigns",
      icon: <svg className="w-8 h-8" fill="none" stroke="#5b8def" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
    },
    {
      metric: "View", acronym: "CPV", fullName: "Cost Per View",
      description: "Increase brand visibility with video and display view-based campaigns",
      icon: <svg className="w-8 h-8" fill="none" stroke="#5b8def" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    },
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
            Performance{" "}
            <span className="text-[#5b8def]">Marketing</span>
          </h1>
          <p className="text-xl text-white/50 mb-8 max-w-3xl mx-auto leading-relaxed">
            Data-driven marketing campaigns focused on measurable results and
            maximum ROI. Pay only for the outcomes that drive your business
            forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#1e3a6e] text-white px-8 py-4 rounded-lg border border-[#5b8def]/30 hover:bg-[#2d5aa8] hover:border-[#5b8def]/60 transition-all duration-200 font-medium shadow-lg hover:shadow-[#5b8def]/10"
            >
              Start Performance Campaign
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
              Performance Marketing Services
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Comprehensive data-driven marketing solutions designed to deliver
              measurable results and maximum ROI
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

      {/* Performance Focus Section */}
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
              Performance Marketing Focuses On
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              We optimize campaigns based on your specific business objectives
              and key performance indicators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {performanceFocus.map((focus, index) => (
              <div
                key={index}
                className="rounded-xl p-6 text-center border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm
                           hover:border-[#5b8def]/40 hover:-translate-y-1 hover:bg-[#5b8def]/10
                           hover:shadow-lg hover:shadow-[#5b8def]/10
                           transition-all duration-300 group"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  {focus.icon}
                </div>
                <div className="text-2xl font-bold text-[#5b8def] mb-2">{focus.acronym}</div>
                <div className="text-lg font-semibold text-white mb-2">{focus.metric}</div>
                <div className="text-sm text-white/40 mb-3">{focus.fullName}</div>
                <p className="text-xs text-white/30 leading-relaxed">{focus.description}</p>
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
                Measurable Results That Drive Growth
              </h2>
              <p className="text-lg text-white/50 mb-8 leading-relaxed">
                Our performance marketing approach ensures every dollar spent
                contributes directly to your business objectives with clear,
                trackable outcomes and continuous optimization.
              </p>
              <div className="space-y-6">
                {[
                  { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "Increased ROI", desc: "Maximize return on every marketing dollar spent" },
                  { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "Better Conversion Rates", desc: "Optimized campaigns that drive more conversions" },
                  { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Data-Driven Decisions", desc: "Strategic insights based on real performance data" },
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
                Why Choose Performance Marketing?
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Pay for Results", desc: "Only pay when you get the outcomes that matter" },
                  { title: "Real-Time Optimization", desc: "Continuous campaign improvement based on live data" },
                  { title: "Transparent Reporting", desc: "Clear insights into campaign performance and ROI" },
                  { title: "Scalable Growth", desc: "Strategies that grow with your business objectives" },
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

      <ServiceProjects categoryName="Digital Marketing" subCategoryName="Performance Marketing" />

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
            Ready to Drive Measurable Results?
          </h2>
          <p className="text-xl text-blue-200/70 mb-8 max-w-2xl mx-auto">
            Let's create performance marketing campaigns that deliver tangible
            ROI and drive sustainable business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#0f1d32] px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Start Your Performance Campaign
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