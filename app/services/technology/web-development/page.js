// app/services/technology/web-development/page.js
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export const metadata = {
  title: "Web Development - YourZerosAndOnes",
  description:
    "Professional web development services including custom applications, e-commerce, CMS, PWA, API development, and system migrations",
};

export default function WebDevelopment() {
  const services = [
    { title: "Custom Web Application Development", description: "Tailored web applications built to solve specific business challenges. Scalable, secure, and user-focused solutions.", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
    { title: "E-Commerce Development", description: "Complete online store solutions with payment integration, inventory management, and seamless shopping experiences.", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
    { title: "CMS Development", description: "Custom content management systems empowering your team to manage content efficiently without technical expertise.", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
    { title: "Progressive Web Apps (PWA)", description: "Native-like web experiences with offline capabilities, push notifications, and app-like performance.", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
    { title: "API Development & Integration", description: "RESTful and GraphQL APIs with seamless third-party integrations to connect your business ecosystem.", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { title: "Migrations & Revamps", description: "Modernize legacy systems, migrate to new platforms, and revamp outdated interfaces with enhanced functionality.", icon: <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> },
  ];

  const techStacks = {
    frontend: [
      { name: "React", category: "Framework", icon: "/images/tech-icons/react.svg" },
      { name: "Next.js", category: "Full-stack", icon: "/images/tech-icons/nextjs.svg" },
      { name: "Vue.js", category: "Framework", icon: "/images/tech-icons/vue.svg" },
      { name: "TypeScript", category: "Language", icon: "/images/tech-icons/typescript.svg" },
      { name: "Tailwind CSS", category: "Styling", icon: "/images/tech-icons/tailwind.svg" },
      { name: "Redux", category: "State Management", icon: "/images/tech-icons/redux.svg" },
    ],
    backend: [
      { name: "Node.js", category: "Runtime", icon: "/images/tech-icons/nodejs.svg" },
      { name: "Python", category: "Language", icon: "/images/tech-icons/python.svg" },
      { name: "Express.js", category: "Framework", icon: "/images/tech-icons/express.svg" },
      { name: "GraphQL", category: "API", icon: "/images/tech-icons/graphql.svg" },
      { name: "FastAPI", category: "Framework", icon: "/images/tech-icons/fastapi.svg" },
      { name: "NestJS", category: "Framework", icon: "/images/tech-icons/nestjs.svg" },
    ],
    database: [
      { name: "PostgreSQL", category: "SQL", icon: "/images/tech-icons/postgresql.svg" },
      { name: "MongoDB", category: "NoSQL", icon: "/images/tech-icons/mongodb.svg" },
      { name: "Redis", category: "Cache", icon: "/images/tech-icons/redis.svg" },
      { name: "MySQL", category: "SQL", icon: "/images/tech-icons/mysql.svg" },
      { name: "Supabase", category: "Backend-as-a-Service", icon: "/images/tech-icons/supabase.svg" },
      { name: "Firebase", category: "Backend-as-a-Service", icon: "/images/tech-icons/firebase.svg" },
    ],
  };

  const processes = [
    { step: "01", title: "Discovery & Planning", description: "Understand business goals, define requirements, and create detailed project roadmap", activities: ["Requirement Analysis", "Technical Planning", "Project Roadmap"] },
    { step: "02", title: "UI/UX Design", description: "Create intuitive user interfaces and engaging user experiences with wireframes and prototypes", activities: ["Wireframing", "Prototyping", "User Testing"] },
    { step: "03", title: "Development", description: "Agile development with regular iterations, code reviews, and continuous integration", activities: ["Sprint Planning", "Code Development", "Code Review"] },
    { step: "04", title: "Testing & Quality Assurance", description: "Comprehensive testing including unit, integration, and user acceptance testing", activities: ["Automated Testing", "Performance Testing", "Security Audit"] },
    { step: "05", title: "Deployment & Launch", description: "Seamless deployment to production with monitoring and performance optimization", activities: ["CI/CD Pipeline", "Production Deployment", "Performance Monitoring"] },
    { step: "06", title: "Maintenance & Support", description: "Ongoing support, updates, and feature enhancements to ensure long-term success", activities: ["Bug Fixing", "Feature Updates", "Security Patches"] },
  ];

  const ctaLinks = [
    { text: "Start Web Project", href: "/contact", variant: "primary" },
    { text: "Explore Services", href: "/services/technology", variant: "secondary" },
  ];

  return (
    <main className="min-h-screen bg-[#060010] pt-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#060010] via-[#0a1628] to-[#060010] py-20">
        <div className="max-w-[1800px] mx-auto text-center" style={{ paddingLeft: "clamp(2rem, 8vw, 12rem)", paddingRight: "clamp(2rem, 8vw, 12rem)" }}>
          <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">Technology</span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 mt-3">Web Development</h1>
          <p className="text-xl text-white/50 mb-8 max-w-3xl mx-auto leading-relaxed">Custom web applications built with modern technologies and best practices to deliver exceptional user experiences and business results.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            {ctaLinks.map((link, index) => (
              <Link key={index} href={link.href} className={`${link.variant === "primary" ? "bg-[#1e3a6e] text-white border border-[#5b8def]/30 hover:bg-[#2d5aa8] hover:border-[#5b8def]/60 shadow-lg hover:shadow-[#5b8def]/10" : "border border-white/30 text-white hover:bg-white/10 hover:border-white/50"} px-8 py-4 rounded-lg transition-all duration-200 font-medium`}>{link.text}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#060812]">
        <div className="max-w-[1800px] mx-auto" style={{ paddingLeft: "clamp(2rem, 8vw, 12rem)", paddingRight: "clamp(2rem, 8vw, 12rem)" }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Web Development Services</h2>
            <p className="text-xl text-white/50 max-w-3xl mx-auto">Comprehensive web solutions tailored to your business needs and user requirements</p>
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

      {/* Tech Stack Section */}
      <section className="py-20 bg-[#060010]">
        <div className="max-w-[1800px] mx-auto" style={{ paddingLeft: "clamp(2rem, 8vw, 12rem)", paddingRight: "clamp(2rem, 8vw, 12rem)" }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technology Stack</h2>
            <p className="text-xl text-white/50 max-w-3xl mx-auto">Modern technologies and frameworks we use to build robust, scalable web applications</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.entries(techStacks).map(([stack, technologies]) => (
              <div key={stack} className="rounded-2xl p-8 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6 capitalize text-center">{stack} Development</h3>
                <div className="grid grid-cols-2 gap-4">
                  {technologies.map((tech, index) => (
                    <div key={index} className="rounded-lg p-4 text-center border border-[#5b8def]/10 bg-[#5b8def]/5 hover:bg-[#5b8def]/10 hover:border-[#5b8def]/20 transition-all duration-200">
                      <div className="flex justify-center mb-2"><img src={tech.icon} alt={tech.name} className="w-10 h-10" /></div>
                      <div className="font-semibold text-white text-sm mb-1">{tech.name}</div>
                      <div className="text-xs text-[#5b8def] bg-[#1e3a6e] border border-[#5b8def]/20 px-2 py-1 rounded-full">{tech.category}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="py-20 bg-[#060812]">
        <div className="max-w-[1800px] mx-auto" style={{ paddingLeft: "clamp(2rem, 8vw, 12rem)", paddingRight: "clamp(2rem, 8vw, 12rem)" }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Development Process</h2>
            <p className="text-xl text-white/50 max-w-3xl mx-auto">A structured approach to delivering successful web projects on time and within budget</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processes.map((process, index) => (
              <div key={index} className="rounded-2xl p-8 border border-[#5b8def]/20 bg-[#5b8def]/5 backdrop-blur-sm hover:border-[#5b8def]/40 hover:-translate-y-1 hover:bg-[#5b8def]/10 hover:shadow-lg hover:shadow-[#5b8def]/10 transition-all duration-300 group">
                <div className="w-16 h-16 bg-[#1e3a6e] border border-[#5b8def]/30 text-[#5b8def] rounded-full flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 group-hover:border-[#5b8def]/60 transition-all duration-300">{process.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{process.title}</h3>
                <p className="text-white/50 mb-4 text-sm">{process.description}</p>
                <ul className="space-y-2">
                  {process.activities.map((activity, i) => (
                    <li key={i} className="flex items-center text-sm text-white/40">
                      <svg className="w-4 h-4 text-[#5b8def] mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceProjects categoryName="Technology" subCategoryName="Web Development" />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-72 lg:w-96 h-72 lg:h-96 bg-[#203E7F] rounded-full filter blur-3xl animate-pulse" />
        </div>
        <div className="relative z-10 max-w-[1800px] mx-auto text-center" style={{ paddingLeft: "clamp(2rem, 8vw, 12rem)", paddingRight: "clamp(2rem, 8vw, 12rem)" }}>
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Your Web Solution?</h2>
          <p className="text-xl text-blue-200/70 mb-8 max-w-2xl mx-auto">Let's create web applications that deliver exceptional user experiences and drive business growth.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaLinks.map((link, index) => (
              <Link key={index} href={link.href} className={`${link.variant === "primary" ? "bg-white text-[#0f1d32] hover:bg-blue-50 shadow-lg hover:shadow-xl" : "border border-white/30 text-white hover:bg-white/10 hover:border-white/50"} px-8 py-4 rounded-lg transition-all duration-200 font-medium`}>{link.text}</Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}