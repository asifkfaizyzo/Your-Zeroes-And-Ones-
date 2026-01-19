import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export default function QATesting() {
// Icon components for Testing Types
const UnitTestIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IntegrationIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const SystemTestIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const SmokeTestIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

const RegressionIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const UATIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const PerformanceIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const StressIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const EnduranceIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SpikeIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const SecurityIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const UsabilityIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill="#1a3568" />
  </svg>
);

const CompatibilityIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const AccessibilityIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <circle cx="12" cy="4" r="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0l-4 8m4-8l4 8m-8-6h8" />
  </svg>
);

const APIIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const MobileTestIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const AutomationIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 9l2 2 4-4" />
  </svg>
);

const ComplianceIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// Updated testingTypes array
const testingTypes = [
  {
    category: "Functional Testing",
    description:
      "Verifies that the software functions according to its specified requirements.",
    tests: [
      {
        name: "Unit Testing",
        description:
          "Testing individual components or pieces of code (done by developers)",
        icon: <UnitTestIcon />,
      },
      {
        name: "Integration Testing",
        description:
          "Testing how different modules or services work together",
        icon: <IntegrationIcon />,
      },
      {
        name: "System Testing",
        description: "Testing the complete, integrated system as a whole",
        icon: <SystemTestIcon />,
      },
      {
        name: "Sanity/Smoke Testing",
        description:
          "A quick check to ensure a new build is stable enough for further testing",
        icon: <SmokeTestIcon />,
      },
      {
        name: "Regression Testing",
        description:
          "Ensuring that new features or bug fixes haven't broken existing functionality",
        icon: <RegressionIcon />,
      },
      {
        name: "User Acceptance Testing (UAT)",
        description:
          "The final phase where end-users validate if the system meets their business needs",
        icon: <UATIcon />,
      },
    ],
  },
  {
    category: "Non-Functional Testing",
    description:
      "Verifies how the system behaves under various conditions, focusing on quality attributes.",
    tests: [
      {
        name: "Performance Testing",
        description:
          "Load Testing: Checks system behavior under expected user loads",
        icon: <PerformanceIcon />,
      },
      {
        name: "Stress Testing",
        description:
          "Pushes the system beyond its normal capacity to find its breaking point",
        icon: <StressIcon />,
      },
      {
        name: "Endurance/Soak Testing",
        description: "Checks for performance degradation over a long period",
        icon: <EnduranceIcon />,
      },
      {
        name: "Spike Testing",
        description:
          "Checks system reaction to sudden, large increases in load",
        icon: <SpikeIcon />,
      },
      {
        name: "Security Testing",
        description:
          "Identifies vulnerabilities, threats, and risks to prevent malicious attacks",
        icon: <SecurityIcon />,
      },
      {
        name: "Usability Testing",
        description:
          "Evaluates how user-friendly and intuitive the application is",
        icon: <UsabilityIcon />,
      },
      {
        name: "Compatibility Testing",
        description:
          "Ensures the software works across different browsers, devices, and operating systems",
        icon: <CompatibilityIcon />,
      },
      {
        name: "Accessibility Testing",
        description:
          "Ensures the application is usable by people with disabilities (WCAG compliance)",
        icon: <AccessibilityIcon />,
      },
    ],
  },
  {
    category: "Specialized Testing Services",
    description:
      "Advanced testing methodologies for specific technologies and compliance requirements.",
    tests: [
      {
        name: "API Testing",
        description:
          "Testing application programming interfaces for functionality, reliability, performance, and security",
        icon: <APIIcon />,
      },
      {
        name: "Mobile App Testing",
        description:
          "Covers functional, performance, battery usage, and interrupt testing on real devices",
        icon: <MobileTestIcon />,
      },
      {
        name: "Test Automation",
        description:
          "Using scripts and tools (Selenium, Cypress, Appium) to automate repetitive test cases",
        icon: <AutomationIcon />,
      },
      {
        name: "Compliance Testing",
        description:
          "Ensuring software adheres to industry regulations (GDPR, HIPAA, PCI-DSS)",
        icon: <ComplianceIcon />,
      },
    ],
  },
];

  const processes = [
    {
      step: "01",
      title: "Test Analysis",
      description:
        "Comprehensive requirement analysis to understand testing scope and objectives",
      activities: [
        "Requirement Review",
        "Scope Definition",
        "Risk Assessment",
        "Stakeholder Alignment",
      ],
    },
    {
      step: "02",
      title: "Test Planning",
      description:
        "Developing comprehensive test strategy and resource allocation",
      activities: [
        "Test Strategy",
        "Resource Planning",
        "Timeline Creation",
        "Tool Selection",
      ],
    },
    {
      step: "03",
      title: "Test Design",
      description:
        "Creating detailed test cases, scenarios, and automation scripts",
      activities: [
        "Test Case Creation",
        "Scenario Development",
        "Automation Scripting",
        "Data Preparation",
      ],
    },
    {
      step: "04",
      title: "Test Execution",
      description:
        "Systematic execution of test cases and defect identification",
      activities: [
        "Test Case Execution",
        "Defect Logging",
        "Progress Tracking",
        "Environment Management",
      ],
    },
    {
      step: "05",
      title: "Test Result Analysis",
      description:
        "Comprehensive analysis of test outcomes and defect patterns",
      activities: [
        "Result Analysis",
        "Defect Analysis",
        "Performance Metrics",
        "Quality Assessment",
      ],
    },
    {
      step: "06",
      title: "Reporting and Tracking",
      description:
        "Detailed reporting and continuous defect tracking until resolution",
      activities: [
        "Test Reporting",
        "Defect Tracking",
        "Stakeholder Updates",
        "Metrics Dashboard",
      ],
    },
    {
      step: "07",
      title: "Re-testing and Closure",
      description: "Verification of fixes and final test cycle completion",
      activities: [
        "Defect Verification",
        "Regression Testing",
        "Closure Report",
        "Lessons Learned",
      ],
    },
  ];

const tools = [
  {
    category: "Test Automation",
    items: [
      {
        name: "Selenium",
        description: "Web automation",
        icon: "/images/qa-tools/selenium.svg",
      },
      {
        name: "Cypress",
        description: "Modern web testing",
        icon: "/images/qa-tools/cypress.svg",
      },
      {
        name: "Appium",
        description: "Mobile automation",
        icon: "/images/qa-tools/appium.svg",
      },
      {
        name: "JUnit/TestNG",
        description: "Java testing",
        icon: "/images/qa-tools/JUnit.svg", // Fixed: matches JUnit.svg in folder
      },
      {
        name: "Jest",
        description: "JavaScript testing",
        icon: "/images/qa-tools/jest.svg",
      },
    ],
  },
  {
    category: "Performance Testing",
    items: [
      {
        name: "JMeter",
        description: "Load testing",
        icon: "/images/qa-tools/jmeter.svg",
      },
      {
        name: "LoadRunner",
        description: "Enterprise performance",
        icon: "/images/qa-tools/loadrunner.svg",
      },
      {
        name: "Gatling",
        description: "Scala-based testing",
        icon: "/images/qa-tools/Gatling.svg", // Fixed: removed /public, matches Gatling.svg
      },
      {
        name: "k6",
        description: "Modern load testing",
        icon: "/images/qa-tools/K6.svg", // Fixed: matches K6.svg in folder
      },
    ],
  },
  {
    category: "Test Management",
    items: [
      {
        name: "JIRA",
        description: "Defect tracking",
        icon: "/images/qa-tools/jira.svg",
      },
      {
        name: "TestRail",
        description: "Test case management",
        icon: "/images/qa-tools/Testrail.svg", // Fixed: matches Testrail.svg in folder
      },
      {
        name: "Zephyr",
        description: "Test management",
        icon: "/images/qa-tools/zephyr.svg",
      },
      {
        name: "qTest",
        description: "Enterprise TMS",
        icon: "/images/qa-tools/qtest.svg",
      },
    ],
  },
];

  const ctaLinks = [
    {
      text: "Start QA Testing",
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
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#f0f4ff] to-[#e8efff] py-20">
          <div 
            className="max-w-[1800px] mx-auto text-center"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Quality Assurance & Testing
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive testing services to ensure software quality,
              reliability, and exceptional user experience across all platforms.
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

        {/* Testing Types Section */}
        <section className="py-20 bg-white">
          <div 
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Testing Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                End-to-end testing solutions covering functional,
                non-functional, and specialized testing requirements
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testingTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#20427f] group"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {type.category}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    {type.description}
                  </p>

                  <div className="space-y-4">
                    {type.tests.map((test, testIndex) => (
                      <div
                        key={testIndex}
                        className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl flex-shrink-0">
                            {test.icon}
                          </span>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">
                              {test.name}
                            </h4>
                            <p className="text-gray-600 text-xs">
                              {test.description}
                            </p>
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

        {/* Testing Process Section */}
        <section className="py-20 bg-gray-50">
          <div 
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Testing Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A systematic approach to ensure comprehensive test coverage and
                software quality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processes.map((process, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-[#20427f] text-white rounded-full flex items-center justify-center text-lg font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {process.description}
                  </p>
                  <ul className="space-y-1">
                    {process.activities.map((activity, activityIndex) => (
                      <li
                        key={activityIndex}
                        className="flex items-center text-xs text-gray-600"
                      >
                        <svg
                          className="w-3 h-3 text-[#20427f] mr-2 flex-shrink-0"
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

        {/* Tools & Technologies Section */}
        <section className="py-20 bg-white">
          <div 
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tools & Technologies
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Industry-leading tools and frameworks we use for comprehensive
                testing solutions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {tools.map((toolCategory, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                    {toolCategory.category}
                  </h3>
                  <div className="space-y-4">
                    {toolCategory.items.map((tool, toolIndex) => (
                      <div
                        key={toolIndex}
                        className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={tool.icon}
                            alt={tool.name}
                            className="w-8 h-8"
                          />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">
                              {tool.name}
                            </div>
                            <div className="text-xs text-gray-600">
                              {tool.description}
                            </div>
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

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-50">
          <div 
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our QA Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Expertise and methodologies that ensure superior software
                quality and reliability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Bug Detection Rate",
                  description:
                    "Comprehensive testing identifying critical issues early",
                  metric: "98%",
                },
                {
                  title: "Test Coverage",
                  description:
                    "Thorough coverage across all functional and non-functional aspects",
                  metric: "95%",
                },
                {
                  title: "Automation Coverage",
                  description:
                    "Efficient automated testing for faster release cycles",
                  metric: "80%",
                },
                {
                  title: "Client Satisfaction",
                  description:
                    "Consistently delivering quality that exceeds expectations",
                  metric: "99%",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-[#20427f] mb-2">
                    {item.metric}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceProjects
          categoryName="Technology"
          subCategoryName="Quality Assurance & Testing"
        />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#20427f] to-[#2c5aa0]">
          <div 
            className="max-w-[1800px] mx-auto text-center"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Ensure Software Quality?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's implement comprehensive testing strategies that guarantee
              exceptional software performance and reliability.
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
      <Footer />
    </>
  );
}

export const metadata = {
  title: "Quality Assurance & Testing - YourZerosAndOnes",
  description:
    "Comprehensive QA and testing services including functional, performance, and security testing for software excellence",
};
