// app/services/technology/devops-consulting/page.js
import Link from "next/link";
import Image from "next/image";
import ServiceProjects from "@/components/ServiceProjects";

export const metadata = {
  title: "DevOps Consulting - YourZerosAndOnes",
  description:
    "Comprehensive DevOps consulting services including CI/CD pipelines, cloud automation, containerization, monitoring, and DevSecOps",
};

export default function DevOps() {
  const services = [
    { title: "DevOps Consulting & Strategy", description: "Develop comprehensive DevOps roadmaps and transformation strategies. Align technology with business objectives for maximum impact.", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    { title: "CI/CD Pipelines Implementation", description: "Automate your software delivery from code commit to production. Ensure fast, reliable, and consistent deployments.", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg> },
    { title: "Cloud & Infrastructure Automation", description: "Automate cloud infrastructure provisioning and management. Scale efficiently with infrastructure as code practices.", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> },
    { title: "Containerization & Orchestration", description: "Containerize applications and manage them at scale. Ensure portability and efficient resource utilization.", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
    { title: "Monitoring, Logging & Observability", description: "Gain deep insights into application performance and system health. Proactively identify and resolve issues.", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    { title: "DevSecOps & Compliance", description: "Integrate security throughout the development lifecycle. Ensure compliance with industry standards and regulations.", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
    { title: "Managed DevOps & SRE", description: "Ongoing DevOps operations and site reliability engineering. Ensure system reliability and performance optimization.", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  ];

  const benefits = [
    { title: "Faster Time to Market", description: "Accelerate feature delivery from months to days with automated pipelines", metric: "Up to 80% faster" },
    { title: "Improved Reliability", description: "Reduce deployment failures and system downtime with automated testing", metric: "99.9% uptime" },
    { title: "Cost Optimization", description: "Optimize cloud spending and resource utilization through automation", metric: "30-50% savings" },
    { title: "Enhanced Security", description: "Integrate security early in development with DevSecOps practices", metric: "60% fewer vulnerabilities" },
  ];

  const toolsByCategory = [
    { category: "Cloud Platforms", tools: [{ name: "AWS", image: "/images/tools/aws.svg" }, { name: "Azure", image: "/images/tools/azure.svg" }, { name: "Google Cloud", image: "/images/tools/gcp.svg" }, { name: "DigitalOcean", image: "/images/tools/digitalocean.svg" }] },
    { category: "Containerization", tools: [{ name: "Docker", image: "/images/tools/docker.svg" }, { name: "Kubernetes", image: "/images/tools/kubernetes.svg" }, { name: "Helm", image: "/images/tools/helm.svg" }, { name: "Istio", image: "/images/tools/istio.svg" }] },
    { category: "CI/CD & Automation", tools: [{ name: "Jenkins", image: "/images/tools/jenkins.svg" }, { name: "GitLab CI", image: "/images/tools/gitlab.svg" }, { name: "GitHub Actions", image: "/images/tools/github.svg" }, { name: "ArgoCD", image: "/images/tools/argocd.svg" }] },
    { category: "Infrastructure as Code", tools: [{ name: "Terraform", image: "/images/tools/terraform.svg" }, { name: "Ansible", image: "/images/tools/ansible.svg" }, { name: "Pulumi", image: "/images/tools/pulumi.svg" }, { name: "CloudFormation", image: "/images/tools/cloudformation.svg" }] },
    { category: "Monitoring & Observability", tools: [{ name: "Prometheus", image: "/images/tools/prometheus.svg" }, { name: "Grafana", image: "/images/tools/grafana.svg" }, { name: "Datadog", image: "/images/tools/datadog.svg" }, { name: "OpenTelemetry", image: "/images/tools/opentelemetry.svg" }] },
    { category: "Security & Compliance", tools: [{ name: "SonarQube", image: "/images/tools/sonarqube.svg" }, { name: "Snyk", image: "/images/tools/snyk.svg" }, { name: "Prisma Cloud", image: "/images/tools/prisma.svg" }, { name: "Open Policy Agent (OPA)", image: "/images/tools/opa.svg" }] },
  ];

  const ToolImage = ({ tool, className = "" }) => {
    if (tool.image) {
      return (
        <div className={`relative ${className}`}>
          <Image src={tool.image} alt={tool.name} width={40} height={40} className="object-contain" />
        </div>
      );
    }
    const initials = tool.name.split(" ").map((word) => word[0]).join("").toUpperCase();
    return (
      <div className={`bg-[#1e3a6e] border border-[#5b8def]/30 text-[#5b8def] rounded-full flex items-center justify-center text-sm font-bold ${className}`}>
        {initials}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#060010] pt-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#060010] via-[#0a1628] to-[#060010] py-20">
        <div className="max-w-[1800px] mx-auto text-center" style={{ paddingLeft: "clamp(2rem, 8vw, 12rem)", paddingRight: "clamp(2rem, 8vw, 12rem)" }}>
          <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">Technology</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 mt-3">DevOps Consulting</h1>
          <p className="text-xl text-white/50 mb-8 max-w-3xl mx-auto leading-relaxed">Streamline your development and operations for faster, more reliable deployments and improved collaboration between teams.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/contact" className="bg-[#1e3a6e] text-white px-8 py-4 rounded-lg border border-[#5b8def]/30 hover:bg-[#2d5aa8] hover:border-[#5b8def]/60 transition-all duration-200 font-medium shadow-lg hover:shadow-[#5b8def]/10">Start DevOps Transformation</Link>
            <Link href="/services/technology" className="border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 font-medium">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Why DevOps Section */}
      <section className="py-20 bg-[#060812]">
        <div className="max-w-[1800px] mx-auto" style={{ paddingLeft: "clamp(2rem, 8vw, 12rem)", paddingRight: "clamp(2rem, 8vw, 12rem)" }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why DevOps Matters</h2>
            <p className="text-xl text-white/50 max-w-3xl mx-auto">DevOps isn't just about tools—it's a cultural shift that transforms how organizations deliver value</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">The Modern Development Imperative</h3>
              <p className="text-white/50 mb-6 text-lg leading-relaxed">In today's competitive landscape, organizations that can deliver software faster and more reliably gain significant competitive advantages. DevOps bridges the gap between development and operations, creating a collaborative environment where innovation thrives.</p>
              <p className="text-white/50 mb-8 text-lg leading-relaxed">By implementing DevOps practices, companies reduce deployment times from weeks to minutes, improve system stability, and enable teams to focus on creating value rather than fighting fires.</p>
              <div className="rounded-xl p-6 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm">
                <h4 className="text-xl font-bold text-white mb-3">Key Business Outcomes</h4>
                <ul className="space-y-2">
                  {["Accelerated innovation and time-to-market", "Improved product quality and reliability", "Enhanced security and compliance", "Better team collaboration and morale"].map((item, i) => (
                    <li key={i} className="flex items-center text-white/50">
                      <svg className="w-5 h-5 text-[#5b8def] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="rounded-xl p-6 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm hover:border-[#5b8def]/40 hover:shadow-lg hover:shadow-[#5b8def]/10 transition-all duration-300">
                  <div className="text-2xl font-bold text-[#5b8def] mb-2">{benefit.metric}</div>
                  <h4 className="font-bold text-white mb-2">{benefit.title}</h4>
                  <p className="text-white/40 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#060010]">
        <div className="max-w-[1800px] mx-auto" style={{ paddingLeft: "clamp(2rem, 8vw, 12rem)", paddingRight: "clamp(2rem, 8vw, 12rem)" }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Comprehensive DevOps Services</h2>
            <p className="text-xl text-white/50 max-w-3xl mx-auto">End-to-end DevOps solutions tailored to your organization's needs and maturity level</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="rounded-2xl p-8 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm hover:border-[#5b8def]/40 hover:-translate-y-1 hover:bg-[#5b8def]/10 hover:shadow-lg hover:shadow-[#5b8def]/10 transition-all duration-300 group">
                <div className="text-[#5b8def] mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Technologies Section */}
      <section className="py-20 bg-[#060812]">
        <div className="max-w-[1800px] mx-auto" style={{ paddingLeft: "clamp(2rem, 8vw, 12rem)", paddingRight: "clamp(2rem, 8vw, 12rem)" }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Tools & Technologies We Use</h2>
            <p className="text-xl text-white/50 max-w-3xl mx-auto">Leveraging industry-leading tools to build robust, scalable, and efficient DevOps solutions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {toolsByCategory.map((category, index) => (
              <div key={index} className="rounded-2xl p-8 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm hover:border-[#5b8def]/40 hover:shadow-lg hover:shadow-[#5b8def]/10 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-6 text-center">{category.category}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="rounded-xl p-4 flex flex-col items-center justify-center text-center border border-[#5b8def]/10 bg-[#5b8def]/5 hover:bg-[#5b8def]/10 hover:border-[#5b8def]/20 transition-all duration-200">
                      <ToolImage tool={tool} className="w-10 h-10 mb-3" />
                      <span className="text-sm font-medium text-white/70">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#060010]">
        <div className="max-w-[1800px] mx-auto" style={{ paddingLeft: "clamp(2rem, 8vw, 12rem)", paddingRight: "clamp(2rem, 8vw, 12rem)" }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our DevOps Transformation Approach</h2>
            <p className="text-xl text-white/50">A structured methodology for successful DevOps implementation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[{ step: "01", title: "Assessment", desc: "Evaluate current processes, tools, and team capabilities" }, { step: "02", title: "Strategy", desc: "Develop customized DevOps roadmap and implementation plan" }, { step: "03", title: "Implementation", desc: "Deploy tools, automate processes, and train teams" }, { step: "04", title: "Optimization", desc: "Continuous improvement and scaling of DevOps practices" }].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#1e3a6e] border border-[#5b8def]/30 text-[#5b8def] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">{process.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{process.title}</h3>
                <p className="text-white/40 text-sm">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceProjects categoryName="Technology" subCategoryName="DevOps Consulting" />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10 max-w-[1800px] mx-auto text-center" style={{ paddingLeft: "clamp(2rem, 8vw, 12rem)", paddingRight: "clamp(2rem, 8vw, 12rem)" }}>
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Accelerate Your Development?</h2>
          <p className="text-xl text-blue-200/70 mb-8 max-w-2xl mx-auto">Let's implement DevOps practices that transform your development process and drive business results.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-[#0f1d32] px-8 py-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium shadow-lg hover:shadow-xl">Start DevOps Journey</Link>
            <Link href="/services/technology" className="border border-white/30 text-white px-8 py-4 rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 font-medium">Explore Services</Link>
          </div>
        </div>
      </section>
    </main>
  );
}