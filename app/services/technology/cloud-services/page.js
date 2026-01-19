import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export default function CloudServices() {
// Icon components with smaller, fixed sizes
const InfrastructureIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const PlatformIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SoftwareIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ComputeIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const StorageIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const AIIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const NetworkIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const IoTIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#1a3568" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
  </svg>
);

// Updated cloudModels and cloudServices arrays remain the same
const cloudModels = [
  {
    type: "IaaS (Infrastructure)",
    managedByYou: ["Applications", "Data", "Runtime", "Middleware", "OS"],
    managedByProvider: ["Virtualization", "Servers", "Storage", "Networking"],
    analogy:
      "You get a kitchen space and appliances. You bring your own ingredients and cook the pizza yourself.",
    useCases: [
      "Migrating enterprise workloads",
      "Hosting complex websites",
      "Big Data analysis",
      "Disaster recovery solutions",
    ],
    icon: <InfrastructureIcon />,
  },
  {
    type: "PaaS (Platform)",
    managedByYou: ["Applications", "Data"],
    managedByProvider: [
      "Runtime",
      "Middleware",
      "OS",
      "Virtualization",
      "Servers",
      "Storage",
      "Networking",
    ],
    analogy:
      "You get a delivered pizza kit (dough, sauce, toppings). You assemble and bake it.",
    useCases: [
      "Application development & deployment",
      "API development and management",
      "Internet of Things (IoT) applications",
      "Containerized applications",
    ],
    icon: <PlatformIcon />,
  },
  {
    type: "SaaS (Software)",
    managedByYou: ["Nothing - just use it"],
    managedByProvider: [
      "Applications",
      "Data",
      "Runtime",
      "Middleware",
      "OS",
      "Virtualization",
      "Servers",
      "Storage",
      "Networking",
    ],
    analogy: "You get a fully cooked pizza delivered. You just eat it.",
    useCases: [
      "Web-based email (Gmail)",
      "Collaboration tools (Slack, Microsoft 365)",
      "CRM systems (Salesforce)",
      "Project management tools",
    ],
    icon: <SoftwareIcon />,
  },
];

const cloudServices = [
  {
    category: "Compute Services",
    description:
      "The fundamental processing power for running applications and workloads",
    services: [
      { name: "AWS EC2", provider: "AWS" },
      { name: "Azure Virtual Machines", provider: "Azure" },
      { name: "Google Compute Engine", provider: "GCP" },
      { name: "AWS Lambda", provider: "AWS" },
      { name: "Azure Functions", provider: "Azure" },
      { name: "Google Cloud Functions", provider: "GCP" },
    ],
    icon: <ComputeIcon />,
  },
  {
    category: "Storage Services",
    description:
      "Object, block, and file storage for data of all types and sizes",
    services: [
      { name: "AWS S3", provider: "AWS" },
      { name: "Azure Blob Storage", provider: "Azure" },
      { name: "Google Cloud Storage", provider: "GCP" },
      { name: "AWS EBS", provider: "AWS" },
      { name: "Azure Disk Storage", provider: "Azure" },
      { name: "Google Persistent Disk", provider: "GCP" },
    ],
    icon: <StorageIcon />,
  },
  {
    category: "Database Services",
    description:
      "Managed relational (SQL) and non-relational (NoSQL) databases",
    services: [
      { name: "Amazon RDS", provider: "AWS" },
      { name: "Azure SQL Database", provider: "Azure" },
      { name: "Google Cloud SQL", provider: "GCP" },
      { name: "Amazon DynamoDB", provider: "AWS" },
      { name: "Azure Cosmos DB", provider: "Azure" },
      { name: "Google Firestore", provider: "GCP" },
    ],
    icon: <DatabaseIcon />,
  },
  {
    category: "AI & Machine Learning",
    description:
      "Pre-built APIs and custom model training tools for artificial intelligence",
    services: [
      { name: "AWS SageMaker", provider: "AWS" },
      { name: "Azure AI", provider: "Azure" },
      { name: "Google AI Platform", provider: "GCP" },
      { name: "AWS Rekognition", provider: "AWS" },
      { name: "Azure Cognitive Services", provider: "Azure" },
      { name: "Google Vision AI", provider: "GCP" },
    ],
    icon: <AIIcon />,
  },
  {
    category: "Networking Services",
    description: "Virtual networks, load balancers, CDNs, and DNS management",
    services: [
      { name: "AWS VPC", provider: "AWS" },
      { name: "Azure Virtual Network", provider: "Azure" },
      { name: "Google VPC", provider: "GCP" },
      { name: "CloudFront", provider: "AWS" },
      { name: "Azure CDN", provider: "Azure" },
      { name: "Google Cloud CDN", provider: "GCP" },
    ],
    icon: <NetworkIcon />,
  },
  {
    category: "IoT & Serverless",
    description: "Platforms for connected devices and event-driven computing",
    services: [
      { name: "AWS IoT Core", provider: "AWS" },
      { name: "Azure IoT Hub", provider: "Azure" },
      { name: "Google Cloud IoT Core", provider: "GCP" },
      { name: "Serverless Computing", provider: "All" },
      { name: "Event-driven Architecture", provider: "All" },
      { name: "Microservices", provider: "All" },
    ],
    icon: <IoTIcon />,
  },
];

  const platforms = [
    {
      name: "Amazon Web Services (AWS)",
      description:
        "Comprehensive cloud platform with extensive global infrastructure and service catalog",
      strengths: [
        "Market Leader",
        "Extensive Services",
        "Global Reach",
        "Enterprise Focus",
      ],
      icon: "/images/cloud-platforms/aws.svg",
    },
    {
      name: "Microsoft Azure",
      description:
        "Enterprise-grade cloud platform with strong integration with Microsoft ecosystem",
      strengths: [
        "Hybrid Cloud",
        "Enterprise Integration",
        "Microsoft Stack",
        "Security",
      ],
      icon: "/images/cloud-platforms/azure.svg",
    },
    {
      name: "Google Cloud Platform (GCP)",
      description:
        "Innovative cloud services with strong data analytics and AI/ML capabilities",
      strengths: ["Data Analytics", "AI/ML", "Kubernetes", "Open Source"],
      icon: "/images/cloud-platforms/gcp.svg",
    },
    {
      name: "Multi-Cloud Solutions",
      description:
        "Hybrid and multi-cloud strategies for optimal performance and risk mitigation",
      strengths: [
        "Flexibility",
        "Risk Mitigation",
        "Best-of-Breed",
        "Cost Optimization",
      ],
      icon: "/images/cloud-platforms/multi-cloud.svg",
    },
  ];

  const benefits = [
    {
      title: "Scalability & Flexibility",
      description:
        "Easily scale resources up or down based on demand with pay-as-you-go pricing",
      metric: "Auto-scaling",
    },
    {
      title: "Cost Efficiency",
      description:
        "Reduce capital expenditure with operational expense model and optimized resource usage",
      metric: "60% Savings",
    },
    {
      title: "Security & Compliance",
      description:
        "Enterprise-grade security with compliance certifications for various industries",
      metric: "99.9% Uptime",
    },
    {
      title: "Global Reach",
      description:
        "Deploy applications closer to your users with global data center presence",
      metric: "200+ Regions",
    },
  ];

  const ctaLinks = [
    {
      text: "Start Cloud Migration",
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
              Cloud Services
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Cloud infrastructure, migration, and management services for
              scalable, secure, and cost-effective solutions.
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

        {/* Cloud Service Models Section */}
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
                Cloud Service Models
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding the shared responsibility model from
                Infrastructure to Software as a Service
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {cloudModels.map((model, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#20427f] group"
                >
                  <div className="text-4xl mb-4 text-center">{model.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    {model.type}
                  </h3>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Managed by You:
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {model.managedByYou.map((item, itemIndex) => (
                        <span
                          key={itemIndex}
                          className="bg-[#20427f] text-white px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-2">
                      Managed by Provider:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {model.managedByProvider.map((item, itemIndex) => (
                        <span
                          key={itemIndex}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700 italic">
                      {model.analogy}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Use Cases:
                    </h4>
                    <ul className="space-y-2">
                      {model.useCases.map((useCase, useCaseIndex) => (
                        <li
                          key={useCaseIndex}
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
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cloud Services Catalog */}
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
                Cloud Services Catalog
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive cloud services across computing, storage,
                databases, AI, and networking
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cloudServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.category}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.services.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                      >
                        <span className="font-medium text-gray-900 text-sm">
                          {item.name}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            item.provider === "AWS"
                              ? "bg-orange-100 text-orange-800"
                              : item.provider === "Azure"
                              ? "bg-blue-100 text-blue-800"
                              : item.provider === "GCP"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {item.provider}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cloud Platforms Section */}
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
                Cloud Platforms We Support
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Expertise across leading cloud providers with multi-cloud and
                hybrid solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className="w-16 h-16"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {platform.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {platform.strengths.map((strength, strengthIndex) => (
                      <span
                        key={strengthIndex}
                        className="bg-[#20427f] text-white px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
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
                Why Choose Our Cloud Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your business with scalable, secure, and
                cost-effective cloud solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-[#20427f] mb-2">
                    {benefit.metric}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceProjects
          categoryName="Technology"
          subCategoryName="Cloud Services"
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
              Ready to Move to the Cloud?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's design and implement cloud solutions that drive efficiency
              and support your business growth.
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
  title: "Cloud Services - YourZerosAndOnes",
  description:
    "Comprehensive cloud services including migration, architecture, and management for AWS, Azure, and Google Cloud",
};
