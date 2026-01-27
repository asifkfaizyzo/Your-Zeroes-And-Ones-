import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";

import ServiceProjects from "@/components/ServiceProjects";

// SVG Icons Components
const BrochureIcon = () => (
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
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const SocialMediaIcon = () => (
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
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const PackagingIcon = () => (
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
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
);

const StationeryIcon = () => (
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
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const AdvertisementIcon = () => (
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

const SignageIcon = () => (
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

const IllustrationIcon = () => (
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

const WebBannerIcon = () => (
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

const BookCoverIcon = () => (
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
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const InfographicIcon = () => (
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
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const CustomIconIcon = () => (
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
      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

// Feature Icons
const StrategicIcon = () => (
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

const ImpactfulIcon = () => (
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

const VersatileIcon = () => (
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
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

const PremiumIcon = () => (
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
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

export default function GraphicDesign() {
  const deliverables = [
    {
      name: "Brochures",
      icon: <BrochureIcon />,
      description:
        "Informative multi-page layouts for marketing and information",
    },
    {
      name: "Social Media Designs",
      icon: <SocialMediaIcon />,
      description: "Engaging graphics for all social platforms",
    },
    {
      name: "Packaging Labels",
      icon: <PackagingIcon />,
      description: "Eye-catching product packaging and labels",
    },
    {
      name: "Stationery Designs",
      icon: <StationeryIcon />,
      description: "Business cards, letterheads, and envelopes",
    },
    {
      name: "Advertisements",
      icon: <AdvertisementIcon />,
      description: "Print and digital ads that convert",
    },
    {
      name: "Graphics & Signage",
      icon: <SignageIcon />,
      description: "Indoor and outdoor signage solutions",
    },
    {
      name: "Custom illustrations",
      icon: <IllustrationIcon />,
      description: "Unique hand-drawn and digital illustrations",
    },
    {
      name: "Web Banners",
      icon: <WebBannerIcon />,
      description: "Responsive banner ads and web graphics",
    },
    {
      name: "Book & Magazine Covers",
      icon: <BookCoverIcon />,
      description: "Compelling cover designs for publications",
    },
    {
      name: "Info Graphics",
      icon: <InfographicIcon />,
      description: "Data visualization and informational graphics",
    },
    {
      name: "Custom icons",
      icon: <CustomIconIcon />,
      description: "Branded icon sets for digital products",
    },
  ];

  const features = [
    {
      icon: <StrategicIcon />,
      title: "Strategic",
      description: "Designs that align with your business goals",
    },
    {
      icon: <ImpactfulIcon />,
      title: "Impactful",
      description: "Visuals that capture attention and drive action",
    },
    {
      icon: <VersatileIcon />,
      title: "Versatile",
      description: "Multiple formats for all platforms and uses",
    },
    {
      icon: <PremiumIcon />,
      title: "Premium",
      description: "High-quality designs that elevate your brand",
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
                  Graphic <span className="text-[#20427f]">Design</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your ideas into compelling visual stories. We create
                  designs that not only look beautiful but also drive engagement
                  and communicate your brand's essence effectively.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="bg-[#20427f] text-white px-8 py-4 rounded-lg hover:bg-[#1a3668] transition-all duration-200 font-medium text-center shadow-lg hover:shadow-xl"
                  >
                    Start Your Project
                  </Link>
                  <Link
                    href="#services"
                    className="border border-[#20427f] text-[#20427f] px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium text-center"
                  >
                    View Services
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

        {/* Deliverables Grid Section */}
        <section id="services" className="py-20 bg-gray-50">
          <div 
            className="max-w-[1800px] mx-auto"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Design Deliverables
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive graphic design solutions tailored to your specific
                needs and objectives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-[#20427f] group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-[#20427f] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#20427f] transition-colors duration-300 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceProjects
          categoryName="Branding & Design"
          subCategoryName="Graphic Design"
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
              Ready to Elevate Your Visual Identity?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's collaborate to create stunning designs that capture
              attention and communicate your message effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-[#20427f] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Start Your Design Project
              </Link>
              <Link
                href="/services/branding-design"
                className="bg-transparent border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#20427f] transition-all duration-200 font-medium"
              >
                Explore Branding Services
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
  title: "Graphic Design - YourZerosAndOnes",
  description:
    "Professional graphic design services including brochures, social media designs, packaging labels, custom illustrations, infographics and more",
};
