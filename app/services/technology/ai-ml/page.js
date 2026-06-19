// app/services/technology/ai-ml/page.js
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export const metadata = {
  title: "AI & Machine Learning - YourZerosAndOnes",
  description:
    "Comprehensive AI and Machine Learning services including Prediction, Automation, Recognition, Processing, Generation, Optimization, Analytics, and Recommendation systems",
};

export default function AIML() {
  const services = [
    {
      title: "Prediction",
      description:
        "Forecast future trends and outcomes using advanced ML models. Make data-driven decisions with accurate predictions.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: ["Demand forecasting", "Risk assessment", "Market trend analysis", "Sales prediction"],
    },
    {
      title: "Automation",
      description:
        "Streamline operations with intelligent automation systems. Reduce manual effort and increase operational efficiency.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      ),
      features: ["Process automation", "Workflow optimization", "Task automation", "Smart scheduling"],
    },
    {
      title: "Recognition",
      description:
        "Identify patterns and objects in complex data sets. Enable visual and audio understanding capabilities.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      features: ["Image recognition", "Pattern detection", "Object identification", "Anomaly detection"],
    },
    {
      title: "Processing",
      description:
        "Transform and analyze data for meaningful insights. Clean, process, and prepare data for AI applications.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
      features: ["Data preprocessing", "Feature engineering", "Signal processing", "Data cleaning"],
    },
    {
      title: "Generation",
      description:
        "Create new content and solutions using generative AI. Produce original text, images, and synthetic data.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      features: ["Content generation", "Synthetic data", "Creative design", "Text generation"],
    },
    {
      title: "Optimization",
      description:
        "Enhance performance and efficiency across systems. Optimize algorithms, resources, and business processes.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: ["Algorithm optimization", "Resource allocation", "Performance tuning", "Cost reduction"],
    },
    {
      title: "Analytics",
      description:
        "Extract actionable insights from complex data. Transform raw data into strategic business intelligence.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: ["Predictive analytics", "Behavioral analysis", "Performance metrics", "Data visualization"],
    },
    {
      title: "Recommendation",
      description:
        "Deliver personalized suggestions and experiences. Enhance user engagement with tailored recommendations.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      ),
      features: ["Personalized recommendations", "Content curation", "Product suggestions", "User profiling"],
    },
  ];

  return (
    <main className="min-h-screen bg-[#060010] pt-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#060010] via-[#0a1628] to-[#060010] py-20">
        <div
          className="max-w-[1800px] mx-auto text-center"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
            Technology
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 mt-3">
            AI & Machine Learning
          </h1>
          <p className="text-xl text-white/50 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your business with intelligent AI solutions. From
            prediction to automation, we deliver cutting-edge machine learning
            services that drive innovation and efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/contact"
              className="bg-[#1e3a6e] text-white px-8 py-4 rounded-lg border border-[#5b8def]/30 hover:bg-[#2d5aa8] hover:border-[#5b8def]/60 transition-all duration-200 font-medium shadow-lg hover:shadow-[#5b8def]/10"
            >
              Start AI Project
            </Link>
            <Link
              href="/services/technology"
              className="border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 font-medium"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-[#060812]">
        <div
          className="max-w-[1800px] mx-auto"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Comprehensive AI Services
            </h2>
            <p className="text-xl text-white/50 max-w-3xl mx-auto">
              Our full suite of AI and machine learning services designed to
              solve complex business challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl p-8 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm
                           hover:border-[#5b8def]/40 hover:-translate-y-1 hover:bg-[#5b8def]/10
                           hover:shadow-lg hover:shadow-[#5b8def]/10
                           transition-all duration-300 group"
              >
                <div className="text-[#5b8def] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/50 mb-6 leading-relaxed text-sm">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-white/40">
                      <svg className="w-4 h-4 text-[#5b8def] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our AI Development Process
            </h2>
            <p className="text-xl text-white/50">
              A structured approach to delivering successful AI solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery & Analysis", desc: "Understand business objectives and data landscape. Define project scope and success metrics." },
              { step: "02", title: "Model Development", desc: "Design and train machine learning models. Validate performance and accuracy metrics." },
              { step: "03", title: "Integration", desc: "Seamlessly integrate AI into existing systems. Ensure compatibility and smooth deployment." },
              { step: "04", title: "Optimization", desc: "Continuous improvement and performance monitoring. Scale solutions and maintain AI systems." },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#1e3a6e] border border-[#5b8def]/30 text-[#5b8def] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{process.title}</h3>
                <p className="text-white/40 text-sm">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-[#060812]">
        <div
          className="max-w-[1800px] mx-auto"
          style={{
            paddingLeft: "clamp(2rem, 8vw, 12rem)",
            paddingRight: "clamp(2rem, 8vw, 12rem)",
          }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              AI Success Stories
            </h2>
            <p className="text-xl text-white/50">
              Real-world applications delivering measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: "Predictive Maintenance", result: "85% reduction in equipment downtime", description: "ML models predicting maintenance needs before failures occur. Reduced maintenance costs by 60% annually." },
              { title: "Customer Service AI", result: "40% faster response times", description: "Intelligent chatbots handling customer inquiries 24/7. Improved customer satisfaction scores by 35%." },
              { title: "Sales Forecasting", result: "95% prediction accuracy", description: "AI-powered sales predictions driving inventory optimization. Increased revenue by 25% through better planning." },
            ].map((caseStudy, index) => (
              <div
                key={index}
                className="rounded-xl p-8 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm
                           hover:border-[#5b8def]/40 hover:shadow-lg hover:shadow-[#5b8def]/10
                           transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-3">{caseStudy.title}</h3>
                <div className="text-2xl font-bold text-[#5b8def] mb-3">{caseStudy.result}</div>
                <p className="text-white/50">{caseStudy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceProjects categoryName="Technology" subCategoryName="AI & Machine Learning" />

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
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl text-blue-200/70 mb-8 max-w-2xl mx-auto">
            Let's build intelligent solutions that drive innovation,
            efficiency, and growth for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-[#0f1d32] px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Start Your AI Journey
            </Link>
            <Link
              href="/services/technology"
              className="border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 font-medium"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}