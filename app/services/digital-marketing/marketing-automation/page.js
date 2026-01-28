import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export default function MarketingAutomation() {
  const features = [
    {
      title: "Automate Engagement Workflows",
      description:
        "Streamline customer journeys with automated touchpoints that nurture leads and drive conversions 24/7.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="#20427f"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
    },
    {
      title: "Higher Conversion",
      description:
        "Automated lead scoring and targeted follow-ups that increase conversion rates and sales opportunities.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="#20427f"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      title: "Personalization at Scale",
      description:
        "Deliver tailored experiences to thousands of customers simultaneously based on behavior and preferences.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="#20427f"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "Efficient Spend",
      description:
        "Optimize marketing budgets by automating repetitive tasks and focusing resources on high-impact activities.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="#20427f"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Accurate Reporting",
      description:
        "Comprehensive analytics and real-time dashboards that provide clear insights into campaign performance.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="#20427f"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  const processes = [
    {
      step: "1",
      title: "Foundation & Strategy",
      description:
        "Audit current processes and develop comprehensive automation strategy",
    },
    {
      step: "2",
      title: "Technology Selection & Setup",
      description:
        "Choose and implement the right automation tools for your business",
    },
    {
      step: "3",
      title: "Execution & Campaign Building",
      description:
        "Develop and deploy automated workflows and customer journeys",
    },
    {
      step: "4",
      title: "Lead Management & Nurturing",
      description:
        "Implement lead scoring, segmentation, and automated nurturing",
    },
    {
      step: "5",
      title: "Analysis & Optimization",
      description:
        "Monitor performance and continuously improve automation workflows",
    },
  ];

  const automationTypes = [
    {
      name: "Email Marketing",
      desc: "Drip campaigns and triggered sequences",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      name: "Lead Nurturing",
      desc: "Automated lead scoring and qualification",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
        </svg>
      ),
    },
    {
      name: "Social Media",
      desc: "Scheduled posts and engagement tracking",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M17 2H7C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5zm-5 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm5-10c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
        </svg>
      ),
    },
    {
      name: "CRM Integration",
      desc: "Seamless data sync across platforms",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
        </svg>
      ),
    },
    {
      name: "SMS Marketing",
      desc: "Automated text message campaigns",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
        </svg>
      ),
    },
    {
      name: "Web Personalization",
      desc: "Dynamic content based on user behavior",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#20427f]/10 via-white to-[#20427f]/5 py-20">
          <div
            className="max-w-[1800px] mx-auto text-center"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Marketing <span className="text-[#20427f]">Automation</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Automate your marketing processes for maximum efficiency,
              personalized customer engagement, and scalable growth with
              intelligent workflows that work 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-[#20427f] text-white px-8 py-4 rounded-lg hover:bg-[#1a3566] transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Start Automation Setup
              </Link>
              <Link
                href="#features"
                className="border border-[#20427f] text-[#20427f] px-8 py-4 rounded-lg hover:bg-[#20427f]/5 transition-all duration-200 font-medium"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 bg-white">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Marketing Automation Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Transform your marketing with intelligent automation that drives
                efficiency and delivers personalized experiences at scale
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:border-[#20427f]/30 group"
                >
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gray-50">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Automation Implementation Process
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A systematic approach to implementing marketing automation that
                delivers measurable results
              </p>
            </div>

            <div className="relative">
              {/* Connecting Line - Hidden on mobile */}
              <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-[#20427f]/20 hidden lg:block"></div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4">
                {processes.map((process, index) => (
                  <div
                    key={index}
                    className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#20427f]/30 text-center group"
                  >
                    <div className="bg-[#20427f] text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold mb-4 mx-auto group-hover:scale-110 transition-transform duration-200">
                      {process.step}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">
                      {process.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {process.description}
                    </p>

                    {/* Arrow between steps - Hidden on mobile */}
                    {index < processes.length - 1 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                        <svg
                          className="w-6 h-6 text-[#20427f]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Automation Types Section */}
        <section className="py-20 bg-white">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Automation Types We Implement
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive automation solutions across all major marketing
                channels
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {automationTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-[#20427f]/30 group"
                >
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    {type.icon}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {type.name}
                  </div>
                  <div className="text-sm text-gray-600">{type.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20 bg-gradient-to-r from-[#20427f] to-[#1a3566]">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-4xl font-bold mb-6">
                  Transform Your Marketing with Automation
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Marketing automation delivers tangible business outcomes by
                  streamlining processes and enhancing customer experiences.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-white/20 rounded-lg p-3 mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        80% Time Savings
                      </h3>
                      <p className="text-blue-100">
                        Automate repetitive marketing tasks
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-white/20 rounded-lg p-3 mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        451% More Qualified Leads
                      </h3>
                      <p className="text-blue-100">
                        Automated lead nurturing delivers better results
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-white/20 rounded-lg p-3 mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        14.5% Revenue Increase
                      </h3>
                      <p className="text-blue-100">
                        Automated workflows drive more sales
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Marketing Automation?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-[#20427f] mt-1 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Scale Personalization
                      </h4>
                      <p className="text-gray-600">
                        Deliver tailored experiences to thousands simultaneously
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-[#20427f] mt-1 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        24/7 Engagement
                      </h4>
                      <p className="text-gray-600">
                        Automated systems work around the clock
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-[#20427f] mt-1 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Data-Driven Decisions
                      </h4>
                      <p className="text-gray-600">
                        Real-time insights for continuous optimization
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="w-6 h-6 text-[#20427f] mt-1 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Increased ROI
                      </h4>
                      <p className="text-gray-600">
                        Better results with less manual effort
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceProjects
          categoryName="Digital Marketing"
          subCategoryName="Marketing Automations"
        />

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div
            className="max-w-[1800px] mx-auto text-center"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Automate Your Marketing?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's implement marketing automation that saves time, personalizes
              customer experiences, and drives measurable business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-[#20427f] text-white px-8 py-4 rounded-lg hover:bg-[#1a3566] transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Start Automation Setup
              </Link>
              <Link
                href="/services/digital-marketing"
                className="border border-[#20427f] text-[#20427f] px-8 py-4 rounded-lg hover:bg-[#20427f]/5 transition-all duration-200 font-medium"
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const metadata = {
  title: "Marketing Automation Services - YourZerosAndOnes",
  description:
    "Professional marketing automation services including workflow automation, lead nurturing, personalization, and campaign optimization",
};
