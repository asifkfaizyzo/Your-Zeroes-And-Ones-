import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Link from "next/link";
import ServiceProjects from "@/components/ServiceProjects";

export default function CyberSecurity() {
  // Icon components for Services
  const DetectionIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );

  const NetworkSecurityIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  );

  const CloudSecurityIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      />
    </svg>
  );

  const IdentityIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
      />
    </svg>
  );

  const ServerIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
      />
    </svg>
  );

  const DatabaseSecurityIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
      />
    </svg>
  );

  const MobileAppIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );

  const TechnicalSupportIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  // Icon components for Security Frameworks
  const NISTIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );

  const ISOIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  const CISIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  );

  const ZeroTrustIcon = () => (
    <svg
      className="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1a3568"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );

  // Updated services array
  const services = [
    {
      title: "Managed Detection and Response",
      description:
        "24/7 threat monitoring, detection, and response services with advanced security analytics and rapid incident response.",
      icon: <DetectionIcon />,
      features: [
        "24/7 Monitoring",
        "Threat Hunting",
        "Incident Response",
        "Security Analytics",
      ],
    },
    {
      title: "Network Security",
      description:
        "Comprehensive network protection including firewall management, intrusion detection, and network segmentation.",
      icon: <NetworkSecurityIcon />,
      features: [
        "Firewall Management",
        "Intrusion Detection",
        "Network Segmentation",
        "VPN Security",
      ],
    },
    {
      title: "Cloud Security",
      description:
        "End-to-end cloud security solutions for AWS, Azure, and GCP with compliance and data protection.",
      icon: <CloudSecurityIcon />,
      features: [
        "Cloud Compliance",
        "Data Protection",
        "Identity Management",
        "Configuration Auditing",
      ],
    },
    {
      title: "Identity and Access Management",
      description:
        "Secure identity management with multi-factor authentication, role-based access control, and privileged access management.",
      icon: <IdentityIcon />,
      features: [
        "MFA Implementation",
        "RBAC Systems",
        "Privileged Access",
        "Single Sign-On",
      ],
    },
    {
      title: "Server Security and Hardening",
      description:
        "Comprehensive server security including OS hardening, patch management, and configuration auditing.",
      icon: <ServerIcon />,
      features: [
        "OS Hardening",
        "Patch Management",
        "Configuration Auditing",
        "Vulnerability Scanning",
      ],
    },
    {
      title: "Database Hardening",
      description:
        "Database security solutions including encryption, access controls, and activity monitoring.",
      icon: <DatabaseSecurityIcon />,
      features: [
        "Database Encryption",
        "Access Controls",
        "Activity Monitoring",
        "Backup Security",
      ],
    },
    {
      title: "Web and Mobile App Security Testing",
      description:
        "Comprehensive security testing including penetration testing, code review, and vulnerability assessment.",
      icon: <MobileAppIcon />,
      features: [
        "Penetration Testing",
        "Code Review",
        "Vulnerability Assessment",
        "Security Scanning",
      ],
    },
    {
      title: "Technical Support",
      description:
        "Ongoing security support, maintenance, and expert guidance for all your cybersecurity needs.",
      icon: <TechnicalSupportIcon />,
      features: [
        "24/7 Support",
        "Security Maintenance",
        "Expert Guidance",
        "Quick Response",
      ],
    },
  ];

  // Updated security frameworks array
  const securityFrameworks = [
    {
      name: "NIST Cybersecurity Framework",
      description: "Comprehensive framework for managing cybersecurity risk",
      components: ["Identify", "Protect", "Detect", "Respond", "Recover"],
      icon: <NISTIcon />,
    },
    {
      name: "ISO 27001",
      description: "International standard for information security management",
      components: [
        "Risk Assessment",
        "Security Controls",
        "Continuous Improvement",
        "Compliance",
      ],
      icon: <ISOIcon />,
    },
    {
      name: "CIS Controls",
      description: "Critical security controls for effective cyber defense",
      components: [
        "Basic Controls",
        "Foundational Controls",
        "Organizational Controls",
      ],
      icon: <CISIcon />,
    },
    {
      name: "Zero Trust Architecture",
      description:
        "Security model assuming no trust for any entity inside or outside the network",
      components: [
        "Verify Explicitly",
        "Least Privilege",
        "Assume Breach",
        "Micro-segmentation",
      ],
      icon: <ZeroTrustIcon />,
    },
  ];
  const processes = [
    {
      step: "01",
      title: "Initial Consultation",
      description:
        "Understanding your business needs, current security posture, and specific security requirements",
      activities: [
        "Business Analysis",
        "Requirement Gathering",
        "Scope Definition",
        "Objective Setting",
      ],
    },
    {
      step: "02",
      title: "Risk Assessment",
      description:
        "Comprehensive security assessment to identify vulnerabilities and potential threats",
      activities: [
        "Vulnerability Scanning",
        "Threat Analysis",
        "Risk Evaluation",
        "Gap Analysis",
      ],
    },
    {
      step: "03",
      title: "Customised Security Strategy",
      description:
        "Developing tailored security strategies aligned with your business objectives and risk profile",
      activities: [
        "Strategy Development",
        "Roadmap Creation",
        "Technology Selection",
        "Implementation Plan",
      ],
    },
    {
      step: "04",
      title: "Implementation Planning",
      description:
        "Detailed planning for security solution deployment with minimal business disruption",
      activities: [
        "Project Planning",
        "Resource Allocation",
        "Timeline Creation",
        "Stakeholder Alignment",
      ],
    },
    {
      step: "05",
      title: "Security Solution Deployment",
      description:
        "Systematic implementation of security controls, tools, and protection mechanisms",
      activities: [
        "Tool Deployment",
        "Configuration Setup",
        "Integration Testing",
        "Quality Assurance",
      ],
    },
    {
      step: "06",
      title: "Continuous Monitoring",
      description:
        "24/7 security monitoring with real-time threat detection and alerting systems",
      activities: [
        "Real-time Monitoring",
        "Alert Management",
        "Log Analysis",
        "Performance Tracking",
      ],
    },
    {
      step: "07",
      title: "Threat Detection and Incident Response",
      description:
        "Proactive threat hunting and rapid response to security incidents and breaches",
      activities: [
        "Threat Hunting",
        "Incident Response",
        "Forensic Analysis",
        "Recovery Procedures",
      ],
    },
    {
      step: "08",
      title: "Regular Security Audits",
      description:
        "Periodic security assessments and compliance audits to ensure ongoing protection",
      activities: [
        "Compliance Audits",
        "Security Assessments",
        "Policy Review",
        "Control Testing",
      ],
    },
    {
      step: "09",
      title: "Security Updates and Patch Management",
      description:
        "Regular security updates, patch deployment, and vulnerability management",
      activities: [
        "Patch Deployment",
        "Update Management",
        "Vulnerability Patching",
        "System Updates",
      ],
    },
    {
      step: "10",
      title: "User Education and Training",
      description:
        "Security awareness training and education programs for employees and stakeholders",
      activities: [
        "Security Training",
        "Awareness Programs",
        "Phishing Simulations",
        "Best Practices",
      ],
    },
    {
      step: "11",
      title: "Documentation and Reporting",
      description:
        "Comprehensive security documentation, compliance reports, and performance metrics",
      activities: [
        "Documentation",
        "Compliance Reporting",
        "Performance Metrics",
        "Executive Reports",
      ],
    },
    {
      step: "12",
      title: "Review and Improvement",
      description:
        "Continuous improvement of security posture based on evolving threats and business changes",
      activities: [
        "Performance Review",
        "Strategy Updates",
        "Technology Refresh",
        "Process Improvement",
      ],
    },
  ];

  const benefits = [
    {
      title: "Threat Prevention",
      description:
        "Proactive security measures preventing 99% of common cyber threats",
      metric: "99%",
    },
    {
      title: "Incident Response Time",
      description: "Average response time for security incidents and breaches",
      metric: "< 15 min",
    },
    {
      title: "Compliance Coverage",
      description: "Coverage for major regulatory frameworks and standards",
      metric: "100%",
    },
    {
      title: "Client Satisfaction",
      description: "Satisfaction rate from our security service clients",
      metric: "98%",
    },
  ];

  const ctaLinks = [
    {
      text: "Get Security Assessment",
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
              Cyber Security
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Protect your digital assets with comprehensive security solutions
              and monitoring to safeguard your business from cyber threats.
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

        {/* Services Section */}
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
                Cyber Security Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive security solutions to protect your business from
                evolving cyber threats
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#20427f] group"
                >
                  <div className="text-3xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm text-center">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {service.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="bg-[#20427f] text-white px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Frameworks Section */}
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
                Security Frameworks & Standards
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Industry-proven frameworks and standards we implement for
                comprehensive security
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {securityFrameworks.map((framework, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-3xl mb-4 text-center">
                    {framework.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {framework.name}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm text-center">
                    {framework.description}
                  </p>
                  <ul className="space-y-2">
                    {framework.components.map((component, componentIndex) => (
                      <li
                        key={componentIndex}
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
                        {component}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Process Section */}
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
                Our Security Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A comprehensive 12-step approach to building and maintaining
                robust cybersecurity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processes.map((process, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-[#20427f] text-white rounded-full flex items-center justify-center text-lg font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {process.description}
                  </p>
                  <ul className="space-y-1">
                    {process.activities.map((activity, activityIndex) => (
                      <li
                        key={activityIndex}
                        className="flex items-center text-xs text-gray-600"
                      >
                        <svg
                          className="w-3 h-3 text-[#20427f] mr-2 flex-shrink-0"
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
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
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
                Why Choose Our Cyber Security Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Proven results and expertise that keep your business secure and
                compliant
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Proactive Protection",
                  description:
                    "Advanced threat detection and prevention systems that identify and neutralize cyber threats before they can impact your business.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="#1a3568"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Rapid Response",
                  description:
                    "24/7 security operations center with expert analysts ready to respond to incidents immediately and minimize potential damage.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="#1a3568"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Compliance Expertise",
                  description:
                    "Deep knowledge of regulatory requirements including GDPR, HIPAA, PCI-DSS, and ISO 27001 to keep your business compliant.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="#1a3568"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Trusted Partnership",
                  description:
                    "Long-term security partnerships built on transparency, communication, and a commitment to protecting your digital assets.",
                  icon: (
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="#1a3568"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#20427f] group"
                >
                  <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#20427f] group-hover:scale-110 transition-all duration-300">
                    <div className="group-hover:[&_svg]:stroke-white transition-all duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-[#20427f] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceProjects
          categoryName="Technology"
          subCategoryName="Cyber Security"
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
              Ready to Strengthen Your Security?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's implement comprehensive cyber security solutions that
              protect your business from digital threats.
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
    </>
  );
}

export const metadata = {
  title: "Cyber Security - YourZerosAndOnes",
  description:
    "Comprehensive cyber security services including threat protection, compliance, and incident response for business protection",
};
