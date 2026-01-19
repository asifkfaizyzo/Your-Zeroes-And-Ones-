import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export default function Ecommerce() {
  const services = [
    {
      title: "Custom Store Development",
      description:
        "Tailored e-commerce solutions designed specifically for your unique business requirements and brand identity.",
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Platform Migration",
      description:
        "Seamless transition between e-commerce platforms with zero data loss and minimal downtime.",
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
      title: "Payment Integration",
      description:
        "Secure payment gateway setup with multiple payment options and fraud protection systems.",
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
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
    {
      title: "Inventory Management",
      description:
        "Advanced inventory tracking, stock management, and automated replenishment systems.",
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
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      title: "Mobile Commerce",
      description:
        "Optimized mobile shopping experiences with PWA capabilities and app-like performance.",
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
      title: "Analytics & Reporting",
      description:
        "Comprehensive analytics dashboard with sales tracking and customer behavior insights.",
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  const technologies = [
    {
      category: "Frontend Technologies",
      items: [
        { name: "React", icon: "/images/tech-icons/react.svg" },
        { name: "Next.js", icon: "/images/tech-icons/nextjs.svg" },
        { name: "Vue.js", icon: "/images/tech-icons/vue.svg" },
        { name: "TypeScript", icon: "/images/tech-icons/typescript.svg" },
        { name: "Tailwind CSS", icon: "/images/tech-icons/tailwind.svg" },
      ],
    },
    {
      category: "Backend Technologies",
      items: [
        { name: "Node.js", icon: "/images/tech-icons/nodejs.svg" },
        { name: "Python", icon: "/images/tech-icons/python.svg" },
        { name: "PHP", icon: "/images/tech-icons/php.svg" },
        { name: "MySQL", icon: "/images/tech-icons/mysql.svg" },
        { name: "MongoDB", icon: "/images/tech-icons/mongodb.svg" },
      ],
    },
    {
      category: "Payment & Security",
      items: [
        { name: "Stripe", icon: "/images/tech-icons/stripe.svg" },
        { name: "PayPal", icon: "/images/tech-icons/paypal.svg" },
        { name: "SSL", icon: "/images/tech-icons/ssl.svg" },
        { name: "PCI DSS", icon: "/images/tech-icons/pci.svg" },
        { name: "OAuth", icon: "/images/tech-icons/oauth.svg" },
      ],
    },
  ];

  const platforms = [
    {
      name: "Shopify",
      description:
        "All-in-one commerce platform with easy setup and extensive app ecosystem",
      features: ["Easy Setup", "App Store", "Secure Hosting", "24/7 Support"],
      icon: "/images/ecommerce-platforms/shopify.svg",
    },
    {
      name: "WooCommerce",
      description:
        "Flexible WordPress e-commerce solution with complete customization control",
      features: [
        "WordPress Integration",
        "Full Customization",
        "SEO Friendly",
        "Cost Effective",
      ],
      icon: "/images/ecommerce-platforms/woocommerce.svg",
    },
    {
      name: "Magento",
      description:
        "Enterprise-grade platform for large-scale businesses with complex requirements",
      features: [
        "Enterprise Ready",
        "High Scalability",
        "Advanced Features",
        "B2B Capabilities",
      ],
      icon: "/images/ecommerce-platforms/magento.svg",
    },
    {
      name: "Custom Solutions",
      description:
        "Tailored e-commerce platforms built from scratch for unique business needs",
      features: [
        "Complete Control",
        "Brand Alignment",
        "Scalable Architecture",
        "Future Proof",
      ],
      icon: "/images/ecommerce-platforms/custom.svg",
    },
  ];

  const solutions = [
    {
      title: "B2C E-Commerce",
      description:
        "Consumer-focused online stores with engaging shopping experiences and conversion optimization",
      useCases: [
        "Retail Stores",
        "Fashion Brands",
        "Consumer Goods",
        "Digital Products",
      ],
    },
    {
      title: "B2B E-Commerce",
      description:
        "Business-to-business platforms with bulk ordering, custom pricing, and account management",
      useCases: [
        "Wholesale Distributors",
        "Manufacturers",
        "Service Providers",
        "Corporate Sales",
      ],
    },
    {
      title: "Marketplace Platforms",
      description:
        "Multi-vendor marketplaces connecting buyers and sellers with secure transaction handling",
      useCases: [
        "Multi-vendor Stores",
        "Service Marketplaces",
        "Rental Platforms",
        "Freelance Markets",
      ],
    },
    {
      title: "Subscription Services",
      description:
        "Recurring revenue models with subscription management and automated billing systems",
      useCases: [
        "SaaS Products",
        "Membership Sites",
        "Box Subscriptions",
        "Digital Content",
      ],
    },
  ];

  const benefits = [
    {
      title: "Increased Conversion Rates",
      description:
        "Optimized user experiences and streamlined checkout processes that boost sales",
      metric: "40%",
    },
    {
      title: "Faster Load Times",
      description:
        "Lightning-fast store performance that reduces bounce rates and improves SEO",
      metric: "< 2s",
    },
    {
      title: "Mobile Revenue Growth",
      description:
        "Mobile-optimized experiences capturing the growing mobile commerce market",
      metric: "73%",
    },
    {
      title: "Customer Satisfaction",
      description:
        "Intuitive interfaces and seamless shopping journeys that keep customers coming back",
      metric: "95%",
    },
  ];

  const ctaLinks = [
    {
      text: "Start E-Commerce Project",
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
              E-Commerce Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Complete e-commerce platforms and online store solutions that
              drive sales and provide seamless shopping experiences for
              businesses of all sizes.
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

        {/* Ecommerce Development Services */}
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
                Ecommerce Development Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive e-commerce solutions tailored to your business
                needs and growth objectives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Technologies We Use */}
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
                Technologies We Use
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Modern technologies and frameworks that power high-performance
                e-commerce solutions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {technologies.map((techCategory, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    {techCategory.category}
                  </h3>
                  <div className="space-y-4">
                    {techCategory.items.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-10 h-10"
                        />
                        <span className="font-semibold text-gray-900">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ecommerce Development Platforms */}
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
                Ecommerce Development Platforms
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Leading platforms we specialize in for building robust and
                scalable online stores
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platforms.map((platform, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="flex justify-center mb-4">
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className="w-16 h-16"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 text-center">
                    {platform.description}
                  </p>
                  <ul className="space-y-2">
                    {platform.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
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
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceProjects
          categoryName="Technology"
          subCategoryName="E-Commerce"
        />

        {/* Ecommerce Development Solutions We Offer */}
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
                Ecommerce Solutions We Offer
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tailored e-commerce solutions for different business models and
                industries
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    {solution.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {solution.useCases.map((useCase, useCaseIndex) => (
                      <span
                        key={useCaseIndex}
                        className="bg-[#20427f] text-white px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
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
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Proven results and expertise that drive e-commerce success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-[#20427f] mb-2">
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
              Ready to Launch Your Online Store?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's build an e-commerce solution that drives sales and provides
              exceptional shopping experiences.
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
  title: "E-Commerce Solutions - YourZerosAndOnes",
  description:
    "Professional e-commerce development services including custom stores, platform migration, and payment integration",
};
