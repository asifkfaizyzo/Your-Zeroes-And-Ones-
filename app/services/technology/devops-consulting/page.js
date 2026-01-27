import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import Image from "next/image";
import ServiceProjects from "@/components/ServiceProjects";

export default function DevOps() {
  const services = [
    {
      title: "DevOps Consulting & Strategy",
      description:
        "Develop comprehensive DevOps roadmaps and transformation strategies. Align technology with business objectives for maximum impact.",
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
    {
      title: "CI/CD Pipelines Implementation",
      description:
        "Automate your software delivery from code commit to production. Ensure fast, reliable, and consistent deployments.",
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
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
    },
    {
      title: "Cloud & Infrastructure Automation",
      description:
        "Automate cloud infrastructure provisioning and management. Scale efficiently with infrastructure as code practices.",
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
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
    },
    {
      title: "Containerization & Orchestration",
      description:
        "Containerize applications and manage them at scale. Ensure portability and efficient resource utilization.",
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
      title: "Monitoring, Logging & Observability",
      description:
        "Gain deep insights into application performance and system health. Proactively identify and resolve issues.",
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
    {
      title: "DevSecOps & Compliance",
      description:
        "Integrate security throughout the development lifecycle. Ensure compliance with industry standards and regulations.",
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: "Managed DevOps & SRE",
      description:
        "Ongoing DevOps operations and site reliability engineering. Ensure system reliability and performance optimization.",
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  const benefits = [
    {
      title: "Faster Time to Market",
      description:
        "Accelerate feature delivery from months to days with automated pipelines",
      metric: "Up to 80% faster",
    },
    {
      title: "Improved Reliability",
      description:
        "Reduce deployment failures and system downtime with automated testing",
      metric: "99.9% uptime",
    },
    {
      title: "Cost Optimization",
      description:
        "Optimize cloud spending and resource utilization through automation",
      metric: "30-50% savings",
    },
    {
      title: "Enhanced Security",
      description:
        "Integrate security early in development with DevSecOps practices",
      metric: "60% fewer vulnerabilities",
    },
  ];

  const toolsByCategory = [
    {
      category: "Cloud Platforms",
      tools: [
        { name: "AWS", image: "/images/tools/aws.svg" },
        { name: "Azure", image: "/images/tools/azure.svg" },
        { name: "Google Cloud", image: "/images/tools/gcp.svg" },
        { name: "DigitalOcean", image: "/images/tools/digitalocean.svg" },
      ],
    },
    {
      category: "Containerization",
      tools: [
        { name: "Docker", image: "/images/tools/docker.svg" },
        { name: "Kubernetes", image: "/images/tools/kubernetes.svg" },
        { name: "Helm", image: "/images/tools/helm.svg" },
        { name: "Istio", image: "/images/tools/istio.svg" },
      ],
    },
    {
      category: "CI/CD & Automation",
      tools: [
        { name: "Jenkins", image: "/images/tools/jenkins.svg" },
        { name: "GitLab CI", image: "/images/tools/gitlab.svg" },
        { name: "GitHub Actions", image: "/images/tools/github.svg" },
        { name: "ArgoCD", image: "/images/tools/argocd.svg" },
      ],
    },
    {
      category: "Infrastructure as Code",
      tools: [
        { name: "Terraform", image: "/images/tools/terraform.svg" },
        { name: "Ansible", image: "/images/tools/ansible.svg" },
        { name: "Pulumi", image: "/images/tools/pulumi.svg" },
        { name: "CloudFormation", image: "/images/tools/cloudformation.svg" },
      ],
    },
    {
      category: "Monitoring & Observability",
      tools: [
        { name: "Prometheus", image: "/images/tools/prometheus.svg" },
        { name: "Grafana", image: "/images/tools/grafana.svg" },
        { name: "Datadog", image: "/images/tools/datadog.svg" },
        { name: "OpenTelemetry", image: "/images/tools/opentelemetry.svg" },
      ],
    },
    {
      category: "Security & Compliance",
      tools: [
        { name: "SonarQube", image: "/images/tools/sonarqube.svg" },
        { name: "Snyk", image: "/images/tools/snyk.svg" },
        { name: "Prisma Cloud", image: "/images/tools/prisma.svg" },
        { name: "Open Policy Agent (OPA)", image: "/images/tools/opa.svg" },
      ],
    },
  ];

  // Fallback component for missing tool images
  const ToolImage = ({ tool, className = "" }) => {
    if (tool.image && tool.image !== "/images/tools/placeholder.svg") {
      return (
        <div className={`relative ${className}`}>
          <Image
            src={tool.image}
            alt={tool.name}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
      );
    }

    // Fallback to colored circle with initials
    const initials = tool.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    return (
      <div
        className={`bg-[#20427f] text-white rounded-full flex items-center justify-center text-sm font-bold ${className}`}
      >
        {initials}
      </div>
    );
  };

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
              DevOps Consulting
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your development and operations for faster, more
              reliable deployments and improved collaboration between teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href="/contact"
                className="bg-[#20427f] text-white px-8 py-4 rounded-lg hover:bg-[#1a3568] transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Start DevOps Transformation
              </Link>
              <Link
                href="/services/technology"
                className="border border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                View All Services
              </Link>
            </div>
          </div>
        </section>

        {/* Why DevOps Section */}
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
                Why DevOps Matters
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                DevOps isn't just about tools—it's a cultural shift that
                transforms how organizations deliver value
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  The Modern Development Imperative
                </h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  In today's competitive landscape, organizations that can
                  deliver software faster and more reliably gain significant
                  competitive advantages. DevOps bridges the gap between
                  development and operations, creating a collaborative
                  environment where innovation thrives.
                </p>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  By implementing DevOps practices, companies reduce deployment
                  times from weeks to minutes, improve system stability, and
                  enable teams to focus on creating value rather than fighting
                  fires.
                </p>

                <div className="bg-[#20427f] text-white rounded-xl p-6">
                  <h4 className="text-xl font-bold mb-3">
                    Key Business Outcomes
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-400 mr-3"
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
                      Accelerated innovation and time-to-market
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-400 mr-3"
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
                      Improved product quality and reliability
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-400 mr-3"
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
                      Enhanced security and compliance
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-400 mr-3"
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
                      Better team collaboration and morale
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="text-2xl font-bold text-[#20427f] mb-2">
                      {benefit.metric}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
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
                Comprehensive DevOps Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                End-to-end DevOps solutions tailored to your organization's
                needs and maturity level
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#20427f] group"
                >
                  <div className="text-[#20427f] mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {service.description}
                  </p>
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
              paddingLeft: "clamp(2rem, 8vw, 12rem)",
              paddingRight: "clamp(2rem, 8vw, 12rem)",
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tools & Technologies We Use
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Leveraging industry-leading tools to build robust, scalable, and
                efficient DevOps solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {toolsByCategory.map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-200"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {category.tools.map((tool, toolIndex) => (
                      <div
                        key={toolIndex}
                        className="bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow duration-200"
                      >
                        <ToolImage tool={tool} className="w-10 h-10 mb-3" />
                        <span className="text-sm font-medium text-gray-700">
                          {tool.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
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
                Our DevOps Transformation Approach
              </h2>
              <p className="text-xl text-gray-600">
                A structured methodology for successful DevOps implementation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Assessment",
                  desc: "Evaluate current processes, tools, and team capabilities",
                },
                {
                  step: "02",
                  title: "Strategy",
                  desc: "Develop customized DevOps roadmap and implementation plan",
                },
                {
                  step: "03",
                  title: "Implementation",
                  desc: "Deploy tools, automate processes, and train teams",
                },
                {
                  step: "04",
                  title: "Optimization",
                  desc: "Continuous improvement and scaling of DevOps practices",
                },
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#20427f] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{process.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceProjects
          categoryName="Technology"
          subCategoryName="DevOps Consulting"
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
              Ready to Accelerate Your Development?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's implement DevOps practices that transform your development
              process and drive business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-[#20427f] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Start DevOps Journey
              </Link>
              <Link
                href="/services/technology"
                className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#20427f] transition-all duration-200 font-medium"
              >
                Explore Services
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
  title: "DevOps Consulting - YourZerosAndOnes",
  description:
    "Comprehensive DevOps consulting services including CI/CD pipelines, cloud automation, containerization, monitoring, and DevSecOps",
};
