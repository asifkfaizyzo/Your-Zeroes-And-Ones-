import Link from "next/link";
import { 
  Shield, 
  Database, 
  Settings, 
  Lock, 
  ArrowLeft,
  Users, 
  ExternalLink, 
  UserCheck, 
  Baby, 
  RefreshCw, 
  Mail,
  ChevronRight,
  Palette,
  TrendingUp,
  Code
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | YourZerosAndOnes",
  description:
    "Learn how YourZerosAndOnes collects, uses, and protects your personal information. We are committed to safeguarding your privacy.",
};

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: (
      <>
        <p className="text-gray-600 mb-4">
          We may collect personal information that you voluntarily provide to us when using our IT services, including but not limited to:
        </p>
        <ul className="space-y-2">
          {[
            "Name and contact details",
            "Email address",
            "Phone number",
            "Company/Organization name",
            "Project requirements and specifications",
            "Service inquiries and consultation details",
            "Messages sent through contact forms",
            "Technical requirements for development projects",
            "Marketing and branding preferences",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-600">
              <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: Settings,
    title: "How We Use Your Information",
    content: (
      <>
        <p className="text-gray-600 mb-4">Your information may be used to:</p>
        <ul className="space-y-2">
          {[
            "Respond to your service inquiries and consultation requests",
            "Provide our Branding & Design services (Logo Design, Video Production, etc.)",
            "Deliver Digital Marketing solutions (SEO, SMM, Performance Marketing)",
            "Execute Technology projects (Web Development, Mobile Apps, AI/ML solutions)",
            "Improve our website and overall customer experience",
            "Send project updates and service-related communication",
            "Provide technical support and maintenance services",
            "Send promotional updates (only with your explicit consent)",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-600">
              <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: Palette,
    title: "Services We Provide",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600">
          YourZerosAndOnes is a comprehensive IT company offering services across three main categories. Information collected is used specifically for delivering these services:
        </p>
        
        {/* Branding & Design */}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-purple-900">Branding & Design</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Brand Consulting",
              "Logo Design",
              "Graphic Design",
              "2D & 3D Visualization",
              "Video Production",
              "Audio Production",
              "AI Video Production"
            ].map((service, i) => (
              <span key={i} className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm border border-purple-200">
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Digital Marketing */}
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h4 className="font-semibold text-orange-900">Digital Marketing</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "SEO",
              "Social Media Management",
              "Performance Marketing",
              "Content Marketing",
              "Marketing Automations",
              "Analytics"
            ].map((service, i) => (
              <span key={i} className="bg-white text-orange-700 px-3 py-1 rounded-full text-sm border border-orange-200">
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-900">Technology</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "AI & Machine Learning",
              "DevOps Consulting",
              "Web Development",
              "Mobile App Development",
              "E-Commerce",
              "QA & Testing",
              "Cloud Services",
              "Data & Analytics",
              "Cyber Security"
            ].map((service, i) => (
              <span key={i} className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200">
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Shield,
    title: "Cookies and Tracking Technologies",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          We may use cookies and similar tracking technologies to enhance functionality and improve user experience on our website. These technologies help us:
        </p>
        <ul className="space-y-2">
          {[
            "Remember your preferences and settings",
            "Analyze website traffic and usage patterns",
            "Improve our services and user interface",
            "Provide personalized content and recommendations",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-600">
              <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600">
          Cookies do not reveal your identity unless you choose to share it. You can manage your cookie preferences through your browser settings at any time.
        </p>
      </div>
    ),
  },
  {
    icon: Lock,
    title: "How We Protect Your Data",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          At YourZerosAndOnes, we prioritize data security. As a technology company specializing in Cyber Security, we implement industry-leading security practices to ensure your data is protected:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "SSL/TLS Encryption",
            "Secure Data Storage",
            "Regular Security Audits",
            "Access Controls & Authentication",
            "Data Backup & Recovery",
            "Firewall Protection",
            "Intrusion Detection Systems",
            "Employee Security Training",
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium"
            >
              <Shield className="w-4 h-4" />
              {item}
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-sm italic">
          While we implement robust security measures leveraging our expertise in Cloud Services and Cyber Security, no method of internet transmission is 100% secure. We continuously update our security protocols to address emerging threats.
        </p>
      </div>
    ),
  },
  {
    icon: Users,
    title: "Sharing Your Information",
    content: (
      <div className="space-y-4">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-blue-800 font-medium">
            We do NOT sell, trade, or rent your personal information to third parties.
          </p>
        </div>
        <p className="text-gray-600">
          Your data may only be shared in the following circumstances:
        </p>
        <ul className="space-y-2">
          {[
            "With trusted service providers essential for delivering our services (e.g., cloud hosting, email services)",
            "When required by law or legal process",
            "To protect the rights, property, or safety of YourZerosAndOnes and our clients",
            "With your explicit consent for specific purposes",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600">
              <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600">
          All third-party providers we work with are bound by strict confidentiality agreements and are only given access to information necessary to perform their services.
        </p>
      </div>
    ),
  },
  {
    icon: ExternalLink,
    title: "Third-Party Links",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          Our website may contain links to third-party websites, including but not limited to:
        </p>
        <ul className="space-y-2">
          {[
            "Social media platforms (for our Social Media Management services)",
            "Analytics tools and platforms",
            "Cloud service providers",
            "Technology partner websites",
            "Portfolio and case study references",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-600">
              <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600">
          We are not responsible for the content or privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
        </p>
      </div>
    ),
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: (
      <>
        <p className="text-gray-600 mb-4">
          We respect your rights regarding your personal data. You have the right to:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { text: "Request access to your personal data", color: "bg-purple-50 text-purple-700" },
            { text: "Request corrections to inaccurate information", color: "bg-indigo-50 text-indigo-700" },
            { text: "Request deletion of your information", color: "bg-pink-50 text-pink-700" },
            { text: "Withdraw consent at any time", color: "bg-orange-50 text-orange-700" },
            { text: "Object to data processing", color: "bg-teal-50 text-teal-700" },
            { text: "Request data portability", color: "bg-cyan-50 text-cyan-700" },
            { text: "Opt-out of marketing communications", color: "bg-rose-50 text-rose-700" },
            { text: "Lodge a complaint with authorities", color: "bg-amber-50 text-amber-700" },
          ].map((item, i) => (
            <div
              key={i}
              className={`${item.color} px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2`}
            >
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
              {item.text}
            </div>
          ))}
        </div>
        <p className="text-gray-600 mt-4">
          To exercise any of these rights, please contact us at{" "}
          <a href="mailto:yourzerosandones@gmail.com" className="text-blue-600 hover:underline font-medium">
            yourzerosandones@gmail.com
          </a>
        </p>
      </>
    ),
  },
  {
    icon: Baby,
    title: "Children's Privacy",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          Our IT services, including Branding & Design, Digital Marketing, and Technology solutions, are intended for businesses and individuals who are 18 years of age or older.
        </p>
        <p className="text-gray-600">
          We do not knowingly collect personal information from children under 13 years of age. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately at{" "}
          <a href="mailto:yourzerosandones@gmail.com" className="text-blue-600 hover:underline font-medium">
            yourzerosandones@gmail.com
          </a>
          , and we will take steps to delete such information.
        </p>
      </div>
    ),
  },
  {
    icon: RefreshCw,
    title: "Changes to This Policy",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          We may update this Privacy Policy periodically to reflect changes in our practices, services, or legal requirements. When we make changes:
        </p>
        <ul className="space-y-2">
          {[
            "The updated policy will be posted on this page",
            "The 'Last Updated' date will be revised",
            "Significant changes will be communicated via email (for subscribed users)",
            "Continued use of our services constitutes acceptance of the updated policy",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-600">
              <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600">
          We encourage you to review this policy regularly to stay informed about how we protect your information.
        </p>
      </div>
    ),
  },
  {
    icon: Mail,
    title: "Contact Us",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please don't hesitate to contact us:
        </p>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">YourZerosAndOnes</h4>
              <p className="text-gray-600 text-sm">Your Trusted IT Partner</p>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Email us at:</p>
              <a
                href="mailto:yourzerosandones@gmail.com"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0A2342] to-[#1a4a7a] text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                yourzerosandones@gmail.com
              </a>
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          We aim to respond to all inquiries within 24-48 business hours.
        </p>
      </div>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-10 md:py-13 overflow-hidden">

        {/* Back Button - Styled */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full text-white border border-white/20 hover:bg-white hover:text-[#0A2342] hover:border-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2342] via-[#0F3A62] to-[#1a5a8a]" />

        {/* Decorative Elements - Smaller */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-8">
          {/* Smaller Icon */}
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl mb-4 border border-white/20">
            <Shield className="w-7 h-7 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Privacy Policy
          </h1>
          
          <p className="text-base text-blue-200 max-w-xl mx-auto">
            Your privacy matters to us. Learn how YourZerosAndOnes collects, uses, and protects your personal information.
          </p>
          
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-blue-100 border border-white/10">
            <RefreshCw className="w-3 h-3" />
            Last updated: January {new Date().getFullYear()}
          </div>
        </div>
      </section>

      {/* Quick Summary Card */}
      <section className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Our Commitment to You
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At <strong className="text-[#0A2342]">YourZerosAndOnes</strong>, 
                we are committed to protecting your privacy. As a comprehensive IT company 
                providing Branding & Design, Digital Marketing, and Technology services, 
                we understand the importance of data security. This Privacy Policy 
                explains how we collect, use, and safeguard your information when 
                you interact with our website or utilize our services.
              </p>
            </div>
          </div>
          
          {/* Service Categories Preview */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">Our Service Categories:</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                <Palette className="w-3 h-3" /> Branding & Design
              </span>
              <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                <TrendingUp className="w-3 h-3" /> Digital Marketing
              </span>
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                <Code className="w-3 h-3" /> Technology
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Quick Navigation
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {sections.map((section, index) => (
              <a
                key={index}
                href={`#section-${index + 1}`}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-white px-3 py-2 rounded-lg transition-all duration-200"
              >
                <span className="w-5 h-5 bg-[#0A2342] text-white text-xs rounded flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <span className="truncate">{section.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <article
                key={index}
                id={`section-${index + 1}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden scroll-mt-8"
              >
                {/* Section Header */}
                <div className="flex items-center gap-4 p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50/50 to-transparent">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A2342] to-[#1a4a7a] text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Section {index + 1}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                </div>
                
                {/* Section Content */}
                <div className="p-6">{section.content}</div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-gradient-to-r from-[#0A2342] to-[#1a4a7a] rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Have Questions?</h3>
          <p className="text-blue-200 mb-4">
            We're here to help. Reach out to us for any privacy-related inquiries.
          </p>
          <a
            href="mailto:yourzerosandones@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-[#0A2342] px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-[#0A2342] text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">YourZerosAndOnes</span>
          </div>
          <p className="text-blue-200 text-sm mb-2">
            Branding & Design • Digital Marketing • Technology
          </p>
          <p className="text-blue-200 text-sm">
            © {new Date().getFullYear()} YourZerosAndOnes. All rights reserved.
          </p>
          <p className="text-blue-300/60 text-xs mt-2">
            Protecting your privacy while delivering exceptional IT solutions.
          </p>
          <div className="mt-4 pt-4 border-t border-white/10">
            <a 
              href="mailto:yourzerosandones@gmail.com" 
              className="text-blue-300 hover:text-white text-sm transition-colors"
            >
              yourzerosandones@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}