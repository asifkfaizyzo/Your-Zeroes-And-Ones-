import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export default function Analytics() {
  const solutions = [
    {
      title: "Web & Mobile Analytics Implementation",
      description:
        "Complete setup of analytics tracking for websites and mobile apps to capture user behavior and engagement metrics.",
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
    {
      title: "Web & Mobile Analytics Overhauls",
      description:
        "Revamp existing analytics setups to improve data accuracy, tracking capabilities, and reporting efficiency.",
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
      title: "Conversion and Event Tracking",
      description:
        "Implement advanced conversion tracking and custom event monitoring to measure key user actions and goals.",
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "E-commerce Tracking Implementation",
      description:
        "Comprehensive e-commerce tracking setup including transactions, product performance, and customer journey analysis.",
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
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
    },
    {
      title: "Data Customization & Enhanced Tracking",
      description:
        "Custom data layer implementation and enhanced tracking for unique business requirements and advanced analytics.",
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  const processes = [
    {
      step: "1",
      title: "Define Goals & KPIs",
      description:
        "Identify business objectives and key performance indicators",
    },
    {
      step: "2",
      title: "Data Collection & Integration",
      description: "Set up tracking and integrate data from multiple sources",
    },
    {
      step: "3",
      title: "Data Processing & Organization",
      description: "Clean, structure, and organize data for analysis",
    },
    {
      step: "4",
      title: "Analysis & Deriving Insights",
      description: "Analyze data to uncover patterns and actionable insights",
    },
    {
      step: "5",
      title: "Reporting & Visualization",
      description: "Create dashboards and reports for clear data presentation",
    },
    {
      step: "6",
      title: "Optimization & Action",
      description: "Implement data-driven optimizations and strategic actions",
    },
  ];

  const analyticsTools = [
    {
      name: "Google Analytics",
      desc: "Website traffic and user behavior",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M3.5 3.5c0 .97.78 1.75 1.75 1.75s1.75-.78 1.75-1.75S6.22 1.75 5.25 1.75 3.5 2.53 3.5 3.5zM1.75 7.25h7v15h-7zM13.25 12.25h7v10h-7zM13.25 1.75h7v7h-7z" />
        </svg>
      ),
    },
    {
      name: "Google Tag Manager",
      desc: "Tag management and deployment",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M21.5 11.5h-8v-8h8v8zm-10 0h-8v-8h8v8zm10 10h-8v-8h8v8zm-10 0h-8v-8h8v8z" />
        </svg>
      ),
    },
    {
      name: "Data Studio",
      desc: "Dashboards and visualization",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
        </svg>
      ),
    },
    {
      name: "Hotjar",
      desc: "User behavior and heatmaps",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      name: "Mixpanel",
      desc: "Product analytics and events",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M5.5 15.5h13v3h-13zM7.5 7.5h9v3h-9zM10.5 11.5h3v7h-3z" />
        </svg>
      ),
    },
    {
      name: "CRM Integration",
      desc: "Sales and marketing data",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2h16zm-10-9a4 4 0 100-8 4 4 0 000 8zm12 4h4v-4h-4v4zm0 6h4v-4h-4v4z" />
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
              Analytics & <span className="text-[#20427f]">Reporting</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive analytics and reporting solutions that transform raw
              data into actionable insights for data-driven marketing
              optimization and performance excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-[#20427f] text-white px-8 py-4 rounded-lg hover:bg-[#1a3566] transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Get Analytics Setup
              </Link>
              <Link
                href="#solutions"
                className="border border-[#20427f] text-[#20427f] px-8 py-4 rounded-lg hover:bg-[#20427f]/5 transition-all duration-200 font-medium"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section id="solutions" className="py-20 bg-white">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Analytics Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive analytics implementations and optimizations to
                drive data-informed decisions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:border-[#20427f]/30 group"
                >
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-200">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {solution.description}
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
                Our Analytics Process
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A systematic approach to transforming data into actionable
                business intelligence
              </p>
            </div>

            <div className="relative">
              {/* Connecting Line - Hidden on mobile */}
              <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-[#20427f]/20 hidden lg:block"></div>

              <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-4">
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

        {/* Analytics Tools Section */}
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
                Analytics Tools We Master
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Expertise across leading analytics platforms for comprehensive
                data insights
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {analyticsTools.map((tool, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-[#20427f]/30 group"
                >
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    {tool.icon}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {tool.name}
                  </div>
                  <div className="text-sm text-gray-600">{tool.desc}</div>
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
                  Data-Driven Results That Matter
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Advanced analytics delivers measurable business outcomes
                  through informed decision-making and continuous optimization.
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
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        23% Increase in Conversions
                      </h3>
                      <p className="text-blue-100">
                        Data-driven optimization improves performance
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        65% Faster Insights
                      </h3>
                      <p className="text-blue-100">
                        Automated reporting saves analysis time
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
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        89% Data Accuracy
                      </h3>
                      <p className="text-blue-100">
                        Reliable tracking ensures trustworthy insights
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Analytics Matters
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
                        Informed Decision Making
                      </h4>
                      <p className="text-gray-600">
                        Base strategic decisions on data, not assumptions
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
                        Performance Optimization
                      </h4>
                      <p className="text-gray-600">
                        Continuously improve based on performance data
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
                        ROI Measurement
                      </h4>
                      <p className="text-gray-600">
                        Track and prove marketing campaign effectiveness
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
                        Customer Understanding
                      </h4>
                      <p className="text-gray-600">
                        Gain deep insights into user behavior and preferences
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
          subCategoryName="Analytics"
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
              Ready to Make Data-Driven Decisions?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's implement comprehensive analytics and reporting that
              provides the insights you need to optimize performance and drive
              business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-[#20427f] text-white px-8 py-4 rounded-lg hover:bg-[#1a3566] transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Start Analytics Setup
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
      <Footer />
    </>
  );
}

export const metadata = {
  title: "Analytics & Reporting Services - YourZerosAndOnes",
  description:
    "Comprehensive analytics solutions including implementation, tracking, e-commerce analytics, and custom reporting for data-driven decisions",
};
