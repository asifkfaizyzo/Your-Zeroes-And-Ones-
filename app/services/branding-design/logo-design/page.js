import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

function LogoDesign() {
  const processSteps = [
    {
      number: "1",
      title: "Discover",
      description: "Understanding your vision, audience, and brand values",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      number: "2",
      title: "Research",
      description: "Analyzing industry, competitors, and market trends",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      number: "3",
      title: "Brainstorm",
      description: "Generating creative directions and concepts",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      number: "4",
      title: "Sketch",
      description: "Creating initial concepts and rough mockups",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      ),
    },
    {
      number: "5",
      title: "Design",
      description: "Developing refined versions with precise details",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      number: "6",
      title: "Present",
      description: "Showcasing concepts with application examples",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    {
      number: "7",
      title: "Deliver",
      description: "Providing all file formats and guidelines",
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#20427f] to-[#1a3566] py-16 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-10 left-10 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full"></div>

          <div 
            className="max-w-[1800px] mx-auto text-center relative z-10"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Logo Design
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Memorable and impactful logo designs that perfectly represent your
              brand identity.
            </p>
          </div>
        </section>

        {/* Process Section with Image */}
        <section className="py-12 bg-white">
          <div 
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Our 7-Step Process
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Streamlined approach to create exceptional logos
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Image */}
              <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <svg
                      className="w-24 h-24 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">
                      Logo Design Process Image
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Visual representation of our design workflow
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Process Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-[#20427f] transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#20427f] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        {step.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="text-[#20427f]">{step.icon}</div>
                          <h3 className="font-bold text-gray-900 text-sm">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServiceProjects
          categoryName="Branding & Design"
          subCategoryName="Logo Design"
        />

        {/* CTA Section */}
        <section className="py-12 bg-[#20427f]">
          <div 
            className="max-w-[1800px] mx-auto text-center"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready for a Standout Logo?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Let's create a logo that represents your brand's excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-white text-[#20427f] px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium text-sm"
              >
                Start Design
              </Link>
              <Link
                href="/services/branding-design"
                className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200 font-medium text-sm"
              >
                View Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default LogoDesign;

export const metadata = {
  title: "Logo Design - YourZerosAndOnes",
  description:
    "Professional logo design services to create memorable and impactful brand identities",
};
