import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export default function SocialMedia() {
  const services = [
    {
      title: "Strategy & Audit",
      description:
        "Comprehensive social media audit and custom strategy development tailored to your business goals and target audience.",
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
      title: "Content Creation & Curation",
      description:
        "Engaging visual and written content including graphics, videos, and captions that reflect your brand voice.",
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      title: "Scheduling & Publishing",
      description:
        "Strategic content scheduling and consistent publishing across all your social media platforms.",
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Community Management & Engagement",
      description:
        "Active monitoring, responding to comments, and building meaningful relationships with your audience.",
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
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
      ),
    },
    {
      title: "Paid Social Advertising",
      description:
        "Targeted social media advertising campaigns to reach new audiences and drive conversions.",
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
      title: "Analytics & Performance Reporting",
      description:
        "Detailed performance tracking, insights, and regular reporting to measure ROI and optimize strategy.",
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
      title: "Plan",
      description:
        "Develop comprehensive social media strategy and content calendar",
    },
    {
      step: "2",
      title: "Create",
      description: "Design and produce engaging content for all platforms",
    },
    {
      step: "3",
      title: "Publish",
      description:
        "Schedule and post content at optimal times for maximum reach",
    },
    {
      step: "4",
      title: "Engage",
      description:
        "Monitor and interact with your audience across all platforms",
    },
    {
      step: "5",
      title: "Analyze",
      description: "Track performance metrics and gather insights from data",
    },
    {
      step: "6",
      title: "Refine",
      description: "Optimize strategy based on performance data and insights",
    },
  ];

  const platforms = [
    {
      name: "Facebook",
      desc: "Business Pages & Ads",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      desc: "Visual Content & Stories",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.22 14.815 3.73 13.664 3.73 12.367s.49-2.448 1.396-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.906.875 1.396 2.026 1.396 3.323s-.49 2.448-1.396 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.716 0c-.39 0-.712-.322-.712-.712s.322-.712.712-.712.712.322.712.712-.322.712-.712.712zm1.649-4.903c-.13.26-.39.422-.682.422-.13 0-.26-.032-.39-.097-.452-.226-.583-.777-.357-1.229.226-.452.777-.583 1.229-.357.452.226.583.777.357 1.229-.065.13-.194.26-.357.322z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      desc: "Professional Networking",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      desc: "Real-time Engagement",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      desc: "Short-form Video",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      desc: "Video Content & SEO",
      icon: (
        <svg className="w-10 h-10" fill="#20427f" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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
              Social Media <span className="text-[#20427f]">Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Build a powerful social presence that drives engagement, builds
              community, and delivers measurable business results across all
              major platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-[#20427f] text-white px-8 py-4 rounded-lg hover:bg-[#1a3566] transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Get Free Strategy Session
              </Link>
              <Link
                href="#services"
                className="border border-[#20427f] text-[#20427f] px-8 py-4 rounded-lg hover:bg-[#20427f]/5 transition-all duration-200 font-medium"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-20 bg-white">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Social Media Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                End-to-end social media solutions designed to build your brand
                and engage your audience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:border-[#20427f]/30 group"
                >
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-200">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section - Simple Linear Layout */}
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
                Our Social Media Process
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A straightforward approach to managing and optimizing your
                social media presence
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

        {/* Platforms Section */}
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
                Platforms We Master
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Expert management across all major social media platforms
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-[#20427f]/30 group"
                >
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                    {platform.icon}
                  </div>
                  <div className="text-xl font-bold mb-2 text-gray-900">
                    {platform.name}
                  </div>
                  <div className="text-sm text-gray-600">{platform.desc}</div>
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
                  Measurable Social Media Success
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Track your growth and see tangible results with our
                  data-driven approach to social media management.
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
                        Increased Engagement
                      </h3>
                      <p className="text-blue-100">
                        Higher likes, comments, and shares
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
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Audience Growth</h3>
                      <p className="text-blue-100">
                        Organic follower growth and community building
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
                      <h3 className="font-semibold text-lg">Lead Generation</h3>
                      <p className="text-blue-100">
                        Quality leads and conversions from social
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Choose Our Social Media Services?
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
                        Platform Expertise
                      </h4>
                      <p className="text-gray-600">
                        Deep knowledge of each platform's algorithms and best
                        practices
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
                        Creative Content
                      </h4>
                      <p className="text-gray-600">
                        Visually appealing and engaging content that stands out
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
                        Data-Driven Strategy
                      </h4>
                      <p className="text-gray-600">
                        Decisions based on performance data and audience
                        insights
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
                        Consistent Brand Voice
                      </h4>
                      <p className="text-gray-600">
                        Maintain your brand identity across all platforms
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
          subCategoryName="Social Media Management (SMM)"
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
              Ready to Transform Your Social Media?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's create a social media presence that drives real business
              results and builds lasting customer relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-[#20427f] text-white px-8 py-4 rounded-lg hover:bg-[#1a3566] transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Start Your Social Success
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
  title: "Social Media Management Services - YourZerosAndOnes",
  description:
    "Professional social media management including strategy, content creation, community management, paid advertising, and analytics across all major platforms.",
};
