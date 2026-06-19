// app/services/branding-design/audio-production/page.js
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export const metadata = {
  title: "Audio Production - YourZerosAndOnes",
  description:
    "Professional audio production services including podcasts, voiceovers, sound design, and music production",
};

// SVG Icons for Processes
const ConceptualizationIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const PreProductionIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
  </svg>
);

const RecordingIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const EditingIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const MixingIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const MasteringIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const DistributionIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

// Feature Icons
const QualityIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const TechnicalIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const CreativeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
  </svg>
);

const ProfessionalIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default function AudioProduction() {
  const processes = [
    {
      name: "Conceptualization",
      icon: <ConceptualizationIcon />,
      description: "Developing audio concepts and creative direction",
    },
    {
      name: "Pre-production",
      icon: <PreProductionIcon />,
      description: "Scripting, planning, and technical preparation",
    },
    {
      name: "Recording",
      icon: <RecordingIcon />,
      description: "Studio-quality audio capture and performance",
    },
    {
      name: "Editing",
      icon: <EditingIcon />,
      description: "Cleaning, trimming, and arranging audio tracks",
    },
    {
      name: "Mixing",
      icon: <MixingIcon />,
      description: "Balancing levels, EQ, and spatial placement",
    },
    {
      name: "Mastering",
      icon: <MasteringIcon />,
      description: "Final polish and optimization for distribution",
    },
    {
      name: "Distribution",
      icon: <DistributionIcon />,
      description: "Format delivery and platform publishing",
    },
  ];

  const features = [
    {
      icon: <QualityIcon />,
      title: "Premium Quality",
      description: "Studio-grade audio production",
    },
    {
      icon: <TechnicalIcon />,
      title: "Technical Excellence",
      description: "Expert sound engineering",
    },
    {
      icon: <CreativeIcon />,
      title: "Creative Sound",
      description: "Innovative audio solutions",
    },
    {
      icon: <ProfessionalIcon />,
      title: "Professional",
      description: "Industry-standard equipment",
    },
  ];

  const audioServices = [
    {
      category: "Podcast Production",
      items: [
        "Full Episode Production",
        "Audio Enhancement",
        "Show Notes",
        "Distribution Setup",
      ],
    },
    {
      category: "Voiceover & Narration",
      items: [
        "Commercial Voiceovers",
        "Audiobook Production",
        "Corporate Narration",
        "Character Voices",
      ],
    },
    {
      category: "Sound Design",
      items: [
        "Custom Sound Effects",
        "Audio Branding",
        "Sonic Logos",
        "Atmospheric Audio",
      ],
    },
    {
      category: "Music Production",
      items: [
        "Original Composition",
        "Audio Mixing",
        "Music Licensing",
        "Score Production",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#060010] pt-10">
      {/* Hero Section with Split Layout */}
      <section className="bg-gradient-to-br from-[#060010] via-[#0a1628] to-[#060010] py-20">
        <div
          className="max-w-[1800px] mx-auto"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
                Branding & Design
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight mt-3">
                Audio{" "}
                <span className="text-[#5b8def]">Production</span>
              </h1>
              <p className="text-xl text-white/50 mb-8 leading-relaxed">
                High-quality audio content creation including podcasts,
                voiceovers, sound design, and music production that elevates
                your brand's auditory identity with crystal-clear sound quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-[#1e3a6e] text-white px-8 py-4 rounded-lg border border-[#5b8def]/30 hover:bg-[#2d5aa8] hover:border-[#5b8def]/60 transition-all duration-200 font-medium text-center shadow-lg hover:shadow-[#5b8def]/10"
                >
                  Start Audio Project
                </Link>
                <Link
                  href="#process"
                  className="border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 font-medium text-center"
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
                      className="p-6 rounded-2xl border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 bg-[#1e3a6e] border border-[#5b8def]/30 rounded-lg flex items-center justify-center mb-4 text-[#5b8def]">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-white/50">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 mt-8">
                  {features.slice(2, 4).map((feature, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm"
                    >
                      <div className="w-12 h-12 bg-[#1e3a6e] border border-[#5b8def]/30 rounded-lg flex items-center justify-center mb-4 text-[#5b8def]">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-white/50">
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
      <section id="process" className="py-20 bg-[#060812]">
        <div
          className="max-w-[1800px] mx-auto"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Audio Production Process
            </h2>
            <p className="text-xl text-white/50 max-w-3xl mx-auto">
              A comprehensive workflow that ensures every audio project
              achieves professional quality and impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processes.slice(0, 4).map((process, index) => (
              <div
                key={index}
                className="rounded-xl p-6 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm
                           hover:border-[#5b8def]/40 hover:-translate-y-1 hover:bg-[#5b8def]/10
                           hover:shadow-lg hover:shadow-[#5b8def]/10
                           transition-all duration-300 group text-center"
              >
                <div className="text-[#5b8def] group-hover:scale-110 transition-transform duration-300 flex justify-center mb-4">
                  {process.icon}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-[#5b8def] transition-colors duration-300 mb-2">
                  {process.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
            {processes.slice(4, 7).map((process, index) => (
              <div
                key={index}
                className="rounded-xl p-6 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm
                           hover:border-[#5b8def]/40 hover:-translate-y-1 hover:bg-[#5b8def]/10
                           hover:shadow-lg hover:shadow-[#5b8def]/10
                           transition-all duration-300 group text-center"
              >
                <div className="text-[#5b8def] group-hover:scale-110 transition-transform duration-300 flex justify-center mb-4">
                  {process.icon}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-[#5b8def] transition-colors duration-300 mb-2">
                  {process.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Services Section */}
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
              Audio Production Services
            </h2>
            <p className="text-xl text-white/50 max-w-3xl mx-auto">
              Comprehensive audio solutions tailored to your specific needs
              and platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {audioServices.map((service, index) => (
              <div
                key={index}
                className="rounded-xl p-8 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm
                           hover:border-[#5b8def]/40 hover:shadow-lg hover:shadow-[#5b8def]/10
                           transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-6">
                  {service.category}
                </h3>
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-white/50">
                      <svg
                        className="w-5 h-5 text-[#5b8def] mr-3 flex-shrink-0"
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
        subCategoryName="Audio Production"
      />

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
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Elevate Your Audio Experience?
          </h2>
          <p className="text-xl text-blue-200/70 mb-8 max-w-2xl mx-auto">
            Let's create audio content that captures attention and enhances
            your brand's presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#0f1d32] px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Start Audio Project
            </Link>
            <Link
              href="/services/branding-design"
              className="border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 font-medium"
            >
              Back to Branding Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}