import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export default function MobileDevelopment() {
  const services = [
    {
      title: "Native App Development",
      description:
        "High-performance mobile applications built specifically for iOS and Android platforms using native technologies.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Cross-Platform App Development",
      description:
        "Efficient mobile solutions that run seamlessly across both iOS and Android from a single codebase.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
    },
    {
      title: "Hybrid App Development",
      description:
        "Web-based mobile applications wrapped in a native container for broader platform reach and faster development.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  const techStacks = {
    native: {
      title: "Native Development",
      description:
        "Platform-specific technologies for optimal performance and user experience",
      technologies: [
        {
          name: "Swift",
          category: "iOS",
          icon: "/images/tech-icons/swift.svg",
        },
        {
          name: "Kotlin",
          category: "Android",
          icon: "/images/tech-icons/kotlin.svg",
        },
        {
          name: "Objective-C",
          category: "iOS",
          icon: "/images/tech-icons/objective-c.svg",
        },
        {
          name: "Java",
          category: "Android",
          icon: "/images/tech-icons/java.svg",
        },
        {
          name: "Xcode",
          category: "IDE",
          icon: "/images/tech-icons/xcode.svg",
        },
        {
          name: "Android Studio",
          category: "IDE",
          icon: "/images/tech-icons/android-studio.svg",
        },
      ],
    },
    crossPlatform: {
      title: "Cross-Platform Development",
      description:
        "Single codebase solutions for multiple platforms with native-like performance",
      technologies: [
        {
          name: "React Native",
          category: "Framework",
          icon: "/images/tech-icons/react-native.svg",
        },
        {
          name: "Flutter",
          category: "Framework",
          icon: "/images/tech-icons/flutter.svg",
        },
        {
          name: "Dart",
          category: "Language",
          icon: "/images/tech-icons/dart.svg",
        },
        {
          name: "JavaScript",
          category: "Language",
          icon: "/images/tech-icons/javascript.svg",
        },
        {
          name: "TypeScript",
          category: "Language",
          icon: "/images/tech-icons/typescript.svg",
        },
        {
          name: "Expo",
          category: "Platform",
          icon: "/images/tech-icons/expo.svg",
        },
      ],
    },
    hybrid: {
      title: "Hybrid Development",
      description:
        "Web technologies wrapped in native containers for rapid development and deployment",
      technologies: [
        {
          name: "Ionic",
          category: "Framework",
          icon: "/images/tech-icons/ionic.svg",
        },
        {
          name: "Cordova",
          category: "Platform",
          icon: "/images/tech-icons/cordova.svg",
        },
        {
          name: "Capacitor",
          category: "Platform",
          icon: "/images/tech-icons/capacitor.svg",
        },
        {
          name: "HTML5",
          category: "Web",
          icon: "/images/tech-icons/html5.svg",
        },
        { name: "CSS3", category: "Web", icon: "/images/tech-icons/css3.svg" },
        {
          name: "JavaScript",
          category: "Language",
          icon: "/images/tech-icons/javascript.svg",
        },
      ],
    },
  };

  const processes = [
    {
      step: "01",
      title: "Strategy & Consulting",
      description:
        "Comprehensive analysis of business goals, target audience, and technical requirements to define the perfect mobile strategy.",
      activities: [
        "Market Research",
        "Technical Planning",
        "Feature Definition",
        "Roadmap Creation",
      ],
    },
    {
      step: "02",
      title: "UI/UX Design",
      description:
        "Creating intuitive, engaging user interfaces and seamless user experiences tailored to mobile platforms.",
      activities: [
        "Wireframing",
        "Prototyping",
        "User Testing",
        "Design System",
      ],
    },
    {
      step: "03",
      title: "App Development",
      description:
        "Agile development process with regular iterations, code reviews, and continuous integration.",
      activities: [
        "Sprint Planning",
        "Feature Development",
        "Code Review",
        "Integration",
      ],
    },
    {
      step: "04",
      title: "QA & Testing",
      description:
        "Rigorous testing across devices and platforms to ensure performance, security, and user satisfaction.",
      activities: [
        "Unit Testing",
        "Integration Testing",
        "Performance Testing",
        "Security Audit",
      ],
    },
    {
      step: "05",
      title: "Deployment & Launch Support",
      description:
        "Seamless app store submission, deployment, and launch coordination for successful market entry.",
      activities: [
        "App Store Submission",
        "Play Store Deployment",
        "Launch Planning",
        "Performance Monitoring",
      ],
    },
    {
      step: "06",
      title: "Post Launch Services",
      description:
        "Ongoing maintenance, updates, and feature enhancements to keep your app competitive and engaging.",
      activities: [
        "Bug Fixing",
        "Feature Updates",
        "Performance Optimization",
        "User Support",
      ],
    },
  ];

  const ctaLinks = [
    {
      text: "Start Mobile Project",
      href: "/contact",
      variant: "primary",
    },
    {
      text: "Explore Services",
      href: "/services/technology",
      variant: "secondary",
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#f0f4ff] to-[#e8efff] py-20">
          <div
            className="max-w-[1800px] mx-auto text-center"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Mobile App Development
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Native and cross-platform mobile applications for iOS and Android
              that deliver seamless user experiences and drive engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              {ctaLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`${
                    link.variant === "primary"
                      ? "bg-[#20427f] text-white hover:bg-[#1a3568] shadow-lg hover:shadow-xl"
                      : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  } px-8 py-4 rounded-lg transition-all duration-200 font-medium`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
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
                Our Mobile Development Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive mobile solutions tailored to your platform
                requirements and business objectives
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#20427f] group"
                >
                  <div className="text-[#20427f] mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
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
                Technology Stack
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Modern technologies and frameworks we use to build robust,
                high-performance mobile applications
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {Object.entries(techStacks).map(([key, stack]) => (
                <div key={key} className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                    {stack.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm text-center">
                    {stack.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {stack.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-colors duration-200"
                      >
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-8 h-8"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900 text-sm">
                            {tech.name}
                          </div>
                          <div className="text-xs text-[#20427f]">
                            {tech.category}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Process Section */}
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
                Our Development Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A comprehensive approach to delivering successful mobile
                applications from concept to launch and beyond
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processes.map((process, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-[#20427f] text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {process.description}
                  </p>
                  <ul className="space-y-2">
                    {process.activities.map((activity, activityIndex) => (
                      <li
                        key={activityIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <svg
                          className="w-4 h-4 text-[#20427f] mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
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
                Why Choose Our Mobile Development
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Expertise and experience that sets us apart in mobile app
                development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Platform Expertise",
                  description:
                    "Deep knowledge of iOS, Android, and cross-platform technologies with native performance optimization.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="#1a3568"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Agile Development",
                  description:
                    "Iterative development approach with regular updates, feedback loops, and transparent communication.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="#1a3568"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  ),
                },
                {
                  title: "User-Centric Design",
                  description:
                    "Beautiful, intuitive interfaces designed with your users in mind for maximum engagement and retention.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="#1a3568"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "End-to-End Support",
                  description:
                    "From concept to launch and beyond — we provide ongoing maintenance, updates, and dedicated support.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="#1a3568"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#20427f] group"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#20427f] group-hover:scale-110 transition-all duration-300">
                    <div className="group-hover:[&_svg]:stroke-white transition-all duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-[#20427f] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceProjects
          categoryName="Technology"
          subCategoryName="Mobile App Development"
        />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#20427f] to-[#2c5aa0]">
          <div
            className="max-w-[1800px] mx-auto text-center"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build Your Mobile App?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's create mobile applications that engage users and drive
              business growth across all platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {ctaLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`${
                    link.variant === "primary"
                      ? "bg-white text-[#20427f] hover:bg-gray-100 shadow-lg hover:shadow-xl"
                      : "border border-white text-white hover:bg-white hover:text-[#20427f]"
                  } px-8 py-4 rounded-lg transition-all duration-200 font-medium`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const metadata = {
  title: "Mobile App Development - YourZerosAndOnes",
  description:
    "Professional mobile app development services for iOS, Android, and cross-platform applications",
};
