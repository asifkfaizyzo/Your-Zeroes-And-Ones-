import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

// SVG Icons for Processes
const ResearchIcon = () => (
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
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const ConceptIcon = () => (
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

const StoryboardIcon = () => (
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
      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
    />
  </svg>
);

const StylingIcon = () => (
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
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    />
  </svg>
);

const VoiceOverIcon = () => (
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
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
    />
  </svg>
);

const AnimationIcon = () => (
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
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const SoundEffectsIcon = () => (
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
      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-1.414m-1.414-2.829a5 5 0 010-7.072m-2.828 9.9a9 9 0 010-12.728"
    />
  </svg>
);

const DeliveryIcon = () => (
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

// Feature Icons
const RealisticIcon = () => (
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

const TechnicalIcon = () => (
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
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const CreativeIcon = () => (
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
      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
    />
  </svg>
);

const ProfessionalIcon = () => (
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

export default function Visualization() {
  const processes = [
    {
      name: "Research",
      icon: <ResearchIcon />,
      description:
        "In-depth analysis and understanding of project requirements",
    },
    {
      name: "Concept & Script",
      icon: <ConceptIcon />,
      description: "Developing core ideas and narrative structure",
    },
    {
      name: "Story Board",
      icon: <StoryboardIcon />,
      description: "Visual planning of scenes and sequences",
    },
    {
      name: "Styling",
      icon: <StylingIcon />,
      description: "Defining visual aesthetics and design language",
    },
    {
      name: "Voice-over",
      icon: <VoiceOverIcon />,
      description: "Professional narration and audio recording",
    },
    {
      name: "Animation",
      icon: <AnimationIcon />,
      description: "Bringing visuals to life with motion and dynamics",
    },
    {
      name: "Sound Effects",
      icon: <SoundEffectsIcon />,
      description: "Adding audio elements for immersion",
    },
    {
      name: "Delivers",
      icon: <DeliveryIcon />,
      description: "Final output delivery in required formats",
    },
  ];

  const features = [
    {
      icon: <RealisticIcon />,
      title: "Photorealistic",
      description: "Lifelike renders that mirror reality",
    },
    {
      icon: <TechnicalIcon />,
      title: "Precise",
      description: "Accurate technical representations",
    },
    {
      icon: <CreativeIcon />,
      title: "Innovative",
      description: "Creative solutions for complex concepts",
    },
    {
      icon: <ProfessionalIcon />,
      title: "Polished",
      description: "High-quality final deliverables",
    },
  ];

  const applications = [
    {
      category: "Architectural Visualization",
      items: [
        "Building Exteriors",
        "Interior Designs",
        "Landscape Planning",
        "Urban Development",
      ],
    },
    {
      category: "Product Design",
      items: [
        "3D Product Models",
        "Packaging Designs",
        "Prototype Visualization",
        "Technical Drawings",
      ],
    },
    {
      category: "Marketing & Advertising",
      items: [
        "Campaign Visuals",
        "Concept Art",
        "Promotional Materials",
        "Brand Storytelling",
      ],
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
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  2D & 3D <span className="text-[#20427f]">Visualization</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transforming abstract ideas into stunning visual experiences.
                  We bridge the gap between imagination and reality with
                  cutting-edge 2D and 3D visualization techniques.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="bg-[#20427f] text-white px-8 py-4 rounded-lg hover:bg-[#1a3668] transition-all duration-200 font-medium text-center shadow-lg hover:shadow-xl"
                  >
                    Start Visualization Project
                  </Link>
                  <Link
                    href="#process"
                    className="border border-[#20427f] text-[#20427f] px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium text-center"
                  >
                    Our Process
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

        {/* Process Section */}
        <section id="process" className="py-20 bg-gray-50">
          <div
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Visualization Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A comprehensive workflow that ensures every project achieves the
                highest quality and impact
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {processes.slice(4, 8).map((process, index) => (
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
                Visualization Applications
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Serving diverse industries with tailored visualization solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {applications.map((app, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {app.category}
                  </h3>
                  <ul className="space-y-2">
                    {app.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center text-gray-600"
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
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item}
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
          subCategoryName="2D & 3D Visualization"
        />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#20427f] to-[#2a55a8]">
          <div
            className="max-w-[1800px] mx-auto text-center"
            style={{
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's transform your concepts into stunning visual representations
              that captivate and communicate effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-[#20427f] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Start Visualization Project
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
    </>
  );
}

export const metadata = {
  title: "2D & 3D Visualization - YourZerosAndOnes",
  description:
    "Professional 2D and 3D visualization services for architecture, product design, and concept development",
};
