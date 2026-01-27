import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

// SVG Icons for Processes
const PromptingIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const GeneratingIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const EditingIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const AugmentingIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

const RefiningIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const FinalizingIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const PublishingIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
    />
  </svg>
);

// Feature Icons
const InnovativeIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const EfficientIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const ScalableIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const QualityIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

export default function AIVideoProduction() {
  const processes = [
    {
      name: "Prompting",
      icon: <PromptingIcon />,
      description: "Crafting precise AI instructions and creative direction",
    },
    {
      name: "Generating",
      icon: <GeneratingIcon />,
      description: "AI-powered video creation from text and parameters",
    },
    {
      name: "Editing",
      icon: <EditingIcon />,
      description: "Refining and perfecting AI-generated content",
    },
    {
      name: "Augmenting",
      icon: <AugmentingIcon />,
      description: "Enhancing videos with effects and additional elements",
    },
    {
      name: "Refining",
      icon: <RefiningIcon />,
      description: "Iterative improvement and quality optimization",
    },
    {
      name: "Finalizing",
      icon: <FinalizingIcon />,
      description: "Quality assurance and final touches",
    },
    {
      name: "Publishing",
      icon: <PublishingIcon />,
      description: "Format optimization and platform deployment",
    },
  ];

  const features = [
    {
      icon: <InnovativeIcon />,
      title: "Innovative",
      description: "Cutting-edge AI technology integration",
    },
    {
      icon: <EfficientIcon />,
      title: "Efficient",
      description: "80% faster production timelines",
    },
    {
      icon: <ScalableIcon />,
      title: "Scalable",
      description: "Mass production capabilities",
    },
    {
      icon: <QualityIcon />,
      title: "High Quality",
      description: "Professional-grade results",
    },
  ];

  const aiApplications = [
    {
      category: "Marketing & Advertising",
      items: [
        "AI-Generated Commercials",
        "Product Demo Videos",
        "Personalized Ads",
        "Brand Storytelling",
      ],
    },
    {
      category: "Training & Education",
      items: [
        "Automated Tutorials",
        "Interactive Learning",
        "Corporate Training",
        "Educational Content",
      ],
    },
    {
      category: "Social Media",
      items: [
        "Short-form Videos",
        "Platform-specific Content",
        "Viral Campaigns",
        "Trend Integration",
      ],
    },
    {
      category: "Corporate Communications",
      items: [
        "AI Presentations",
        "Internal Updates",
        "Executive Messages",
        "Company Announcements",
      ],
    },
  ];

  const benefits = [
    {
      title: "Faster Production",
      description: "Reduce production time by up to 80% with AI automation",
      value: "80% Faster",
    },
    {
      title: "Cost Effective",
      description: "Significant savings compared to traditional production",
      value: "60% Savings",
    },
    {
      title: "Scalable Solutions",
      description: "Create multiple video variations quickly and efficiently",
      value: "Unlimited Scale",
    },
    {
      title: "Consistent Quality",
      description: "Maintain high standards across all video content",
      value: "100% Quality",
    },
  ];

  return (
    <>
      
      <main className="min-h-screen bg-white">
        {/* Hero Section with Split Layout */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50/50 py-20">
          <div 
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  AI Video <span className="text-[#20427f]">Production</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Cutting-edge AI-powered video creation and enhancement
                  services that revolutionize content production with
                  unprecedented speed, efficiency, and creative possibilities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="bg-[#20427f] text-white px-8 py-4 rounded-lg hover:bg-[#1a3668] transition-all duration-200 font-medium text-center shadow-lg hover:shadow-xl"
                  >
                    Start AI Video Project
                  </Link>
                  <Link
                    href="#process"
                    className="border border-[#20427f] text-[#20427f] px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium text-center"
                  >
                    Our AI Process
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    {features.slice(0, 2).map((feature, index) => (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-[#20427f]">
                          {feature.icon}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4 mt-8">
                    {features.slice(2, 4).map((feature, index) => (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-[#20427f]">
                          {feature.icon}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
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
                Why Choose AI Video Production?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your video production workflow with artificial
                intelligence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-[#20427f] mb-4">
                    {benefit.value}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-20 bg-white">
          <div 
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our AI Video Production Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A streamlined workflow that combines human creativity with
                artificial intelligence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processes.slice(0, 4).map((process, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-[#20427f] group text-center"
                >
                  <div className="text-[#20427f] group-hover:scale-110 transition-transform duration-300 flex justify-center mb-4">
                    {process.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#20427f] transition-colors duration-300 mb-2">
                    {process.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {process.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
              {processes.slice(4, 7).map((process, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-[#20427f] group text-center"
                >
                  <div className="text-[#20427f] group-hover:scale-110 transition-transform duration-300 flex justify-center mb-4">
                    {process.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#20427f] transition-colors duration-300 mb-2">
                    {process.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {process.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications Section */}
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
                AI Video Applications
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive AI video solutions for diverse industries and use
                cases
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aiApplications.map((app, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {app.category}
                  </h3>
                  <ul className="space-y-3">
                    {app.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center text-gray-600"
                      >
                        <svg
                          className="w-5 h-5 text-[#20427f] mr-3 flex-shrink-0"
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
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceProjects
          categoryName="Branding & Design"
          subCategoryName="AI Video Production"
        />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#20427f] to-[#2a55a8]">
          <div 
            className="max-w-[1800px] mx-auto text-center"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Revolutionize Your Video Production?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Experience the future of video creation with our AI-powered
              production services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-[#20427f] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Start AI Video Project
              </Link>
              <Link
                href="/services/branding-design"
                className="bg-transparent border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#20427f] transition-all duration-200 font-medium"
              >
                Back to Branding Services
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
  title: "AI Video Production - YourZerosAndOnes",
  description:
    "Cutting-edge AI-powered video creation and enhancement services for efficient and innovative content production",
};
