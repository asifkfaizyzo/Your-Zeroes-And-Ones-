// app/privacy-policy/page.js
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
  Code,
  Clock,
  CheckCircle2,
  ArrowUp,
  Sparkles
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
    id: "information-collection",
    content: (
      <>
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          We may collect personal information that you voluntarily provide to us when using our IT services, including but not limited to:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
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
            <div 
              key={i} 
              className="flex items-center gap-3 text-gray-600 bg-gray-50 hover:bg-blue-50 px-4 py-3 rounded-xl transition-all duration-300 group"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    icon: Settings,
    title: "How We Use Your Information",
    id: "information-usage",
    content: (
      <>
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          Your information may be used to:
        </p>
        <div className="space-y-3">
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
            <div 
              key={i} 
              className="flex items-start gap-4 text-gray-600 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-300 group border-l-2 border-transparent hover:border-blue-500"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A2342] to-[#1a4a7a] flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-xs font-bold">{i + 1}</span>
              </div>
              <span className="pt-1">{item}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    icon: Palette,
    title: "Services We Provide",
    id: "our-services",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 text-lg leading-relaxed">
          YourZerosAndOnes is a comprehensive IT company offering services across three main categories. Information collected is used specifically for delivering these services:
        </p>
        
        {/* Branding & Design */}
        <div className="group bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0A2342] to-[#1a4a7a] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-[#0A2342] text-lg">Branding & Design</h4>
              <p className="text-sm text-gray-500">Creative solutions for your brand</p>
            </div>
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
              <span 
                key={i} 
                className="bg-white text-[#0A2342] px-4 py-2 rounded-full text-sm font-medium border border-blue-200 hover:bg-[#0A2342] hover:text-white hover:border-[#0A2342] transition-all duration-300 cursor-default"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Digital Marketing */}
        <div className="group bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0A2342] to-[#1a4a7a] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-[#0A2342] text-lg">Digital Marketing</h4>
              <p className="text-sm text-gray-500">Grow your online presence</p>
            </div>
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
              <span 
                key={i} 
                className="bg-white text-[#0A2342] px-4 py-2 rounded-full text-sm font-medium border border-blue-200 hover:bg-[#0A2342] hover:text-white hover:border-[#0A2342] transition-all duration-300 cursor-default"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Technology */}
        <div className="group bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border border-blue-100 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0A2342] to-[#1a4a7a] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-[#0A2342] text-lg">Technology</h4>
              <p className="text-sm text-gray-500">Cutting-edge tech solutions</p>
            </div>
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
              <span 
                key={i} 
                className="bg-white text-[#0A2342] px-4 py-2 rounded-full text-sm font-medium border border-blue-200 hover:bg-[#0A2342] hover:text-white hover:border-[#0A2342] transition-all duration-300 cursor-default"
              >
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
    id: "cookies",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 text-lg leading-relaxed">
          We may use cookies and similar tracking technologies to enhance functionality and improve user experience on our website. These technologies help us:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { text: "Remember your preferences and settings", icon: Settings },
            { text: "Analyze website traffic and usage patterns", icon: TrendingUp },
            { text: "Improve our services and user interface", icon: Sparkles },
            { text: "Provide personalized content and recommendations", icon: UserCheck },
          ].map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <div 
                key={i} 
                className="flex items-start gap-4 bg-gradient-to-br from-gray-50 to-blue-50/50 p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0A2342] transition-colors duration-300">
                  <ItemIcon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-gray-600 text-sm leading-relaxed pt-2">{item.text}</span>
              </div>
            );
          })}
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-gray-600">
            <span className="font-semibold text-[#0A2342]">Note:</span> Cookies do not reveal your identity unless you choose to share it. You can manage your cookie preferences through your browser settings at any time.
          </p>
        </div>
      </div>
    ),
  },
  {
    icon: Lock,
    title: "How We Protect Your Data",
    id: "data-protection",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 text-lg leading-relaxed">
          At YourZerosAndOnes, we prioritize data security. As a technology company specializing in Cyber Security, we implement industry-leading security practices:
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "SSL/TLS Encryption", icon: Lock },
            { name: "Secure Data Storage", icon: Database },
            { name: "Regular Security Audits", icon: Shield },
            { name: "Access Controls", icon: UserCheck },
            { name: "Data Backup & Recovery", icon: RefreshCw },
            { name: "Firewall Protection", icon: Shield },
            { name: "Intrusion Detection", icon: Lock },
            { name: "Security Training", icon: Users },
          ].map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={i}
                className="group relative bg-gradient-to-br from-[#0A2342] to-[#1a4a7a] text-white p-5 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <ItemIcon className="w-6 h-6 mb-3 relative z-10" />
                <span className="text-sm font-medium relative z-10">{item.name}</span>
              </div>
            );
          })}
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-gray-50 border-l-4 border-[#0A2342] p-5 rounded-r-xl">
          <p className="text-gray-500 text-sm italic">
            While we implement robust security measures leveraging our expertise in Cloud Services and Cyber Security, no method of internet transmission is 100% secure. We continuously update our security protocols to address emerging threats.
          </p>
        </div>
      </div>
    ),
  },
  {
    icon: Users,
    title: "Sharing Your Information",
    id: "information-sharing",
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#0A2342] to-[#1a4a7a] text-white p-6 rounded-2xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <p className="font-bold text-lg">
              We do NOT sell, trade, or rent your personal information to third parties.
            </p>
          </div>
        </div>
        <p className="text-gray-600 text-lg">
          Your data may only be shared in the following circumstances:
        </p>
        <div className="space-y-3">
          {[
            "With trusted service providers essential for delivering our services (e.g., cloud hosting, email services)",
            "When required by law or legal process",
            "To protect the rights, property, or safety of YourZerosAndOnes and our clients",
            "With your explicit consent for specific purposes",
          ].map((item, i) => (
            <div 
              key={i} 
              className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-gray-600 pt-1">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-500 bg-gray-50 p-4 rounded-xl text-sm">
          All third-party providers we work with are bound by strict confidentiality agreements and are only given access to information necessary to perform their services.
        </p>
      </div>
    ),
  },
  {
    icon: ExternalLink,
    title: "Third-Party Links",
    id: "third-party",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 text-lg leading-relaxed">
          Our website may contain links to third-party websites, including:
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "Social media platforms (for our Social Media Management services)",
            "Analytics tools and platforms",
            "Cloud service providers",
            "Technology partner websites",
            "Portfolio and case study references",
          ].map((item, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 bg-gray-50 hover:bg-blue-50 p-4 rounded-xl transition-all duration-300 group border border-gray-100 hover:border-blue-200"
            >
              <ExternalLink className="w-4 h-4 text-blue-500 flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-gray-600 text-sm">{item}</span>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-600">
            We are not responsible for the content or privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>
        </div>
      </div>
    ),
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    id: "your-rights",
    content: (
      <>
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          We respect your rights regarding your personal data. You have the right to:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Request access to your personal data",
            "Request corrections to inaccurate information",
            "Request deletion of your information",
            "Withdraw consent at any time",
            "Object to data processing",
            "Request data portability",
            "Opt-out of marketing communications",
            "Lodge a complaint with authorities",
          ].map((item, i) => (
            <div
              key={i}
              className="group flex items-center gap-4 bg-gradient-to-r from-blue-50 to-gray-50 hover:from-[#0A2342] hover:to-[#1a4a7a] p-4 rounded-xl transition-all duration-300 border border-blue-100 hover:border-transparent cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                <CheckCircle2 className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-white transition-colors duration-300">
                {item}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-100">
          <p className="text-gray-600">
            To exercise any of these rights, please contact us at{" "}
            <a 
              href="mailto:yourzerosandones@gmail.com" 
              className="text-[#0A2342] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
              yourzerosandones@gmail.com
            </a>
          </p>
        </div>
      </>
    ),
  },
  {
    icon: Baby,
    title: "Children's Privacy",
    id: "childrens-privacy",
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-2xl border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Baby className="w-6 h-6 text-blue-600" />
            </div>
            <div className="space-y-3">
              <p className="text-gray-600 leading-relaxed">
                Our IT services, including Branding & Design, Digital Marketing, and Technology solutions, are intended for businesses and individuals who are <strong className="text-[#0A2342]">18 years of age or older</strong>.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We do not knowingly collect personal information from children under 13 years of age. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.
              </p>
            </div>
          </div>
        </div>
        <a
          href="mailto:yourzerosandones@gmail.com"
          className="inline-flex items-center gap-2 bg-[#0A2342] text-white px-6 py-3 rounded-xl hover:bg-[#1a4a7a] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <Mail className="w-5 h-5" />
          Report Concerns
        </a>
      </div>
    ),
  },
  {
    icon: RefreshCw,
    title: "Changes to This Policy",
    id: "policy-changes",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 text-lg leading-relaxed">
          We may update this Privacy Policy periodically to reflect changes in our practices, services, or legal requirements. When we make changes:
        </p>
        <div className="relative border-l-2 border-blue-200 ml-4 space-y-6">
          {[
            "The updated policy will be posted on this page",
            "The 'Last Updated' date will be revised",
            "Significant changes will be communicated via email",
            "Continued use of our services constitutes acceptance",
          ].map((item, i) => (
            <div key={i} className="relative pl-8">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-md" />
              <p className="text-gray-600 bg-gray-50 hover:bg-blue-50 p-4 rounded-xl transition-colors duration-300">
                {item}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
          <p className="text-gray-600 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            We encourage you to review this policy regularly to stay informed.
          </p>
        </div>
      </div>
    ),
  },
  {
    icon: Mail,
    title: "Contact Us",
    id: "contact",
    content: (
      <div className="space-y-6">
        <p className="text-gray-600 text-lg leading-relaxed">
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please don't hesitate to contact us:
        </p>
        <div className="bg-gradient-to-br from-[#0A2342] to-[#1a4a7a] rounded-2xl p-8 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-xl">YourZerosAndOnes</h4>
                <p className="text-blue-200">Your Trusted IT Partner</p>
              </div>
            </div>
            
            <div className="h-px bg-white/10" />
            
            <div>
              <p className="text-blue-200 text-sm mb-3">Get in touch:</p>
              <a
                href="mailto:yourzerosandones@gmail.com"
                className="group inline-flex items-center gap-3 bg-white text-[#0A2342] px-6 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-semibold">yourzerosandones@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-500 bg-gray-50 p-4 rounded-xl">
          <Clock className="w-5 h-5 text-blue-500" />
          <span className="text-sm">We aim to respond to all inquiries within 24-48 business hours.</span>
        </div>
      </div>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] text-[#0A2342]/[0.03] text-8xl font-mono">0</div>
        <div className="absolute top-[30%] right-[8%] text-[#0A2342]/[0.03] text-6xl font-mono">1</div>
        <div className="absolute bottom-[40%] left-[10%] text-[#0A2342]/[0.03] text-7xl font-mono">1</div>
        <div className="absolute bottom-[20%] right-[15%] text-[#0A2342]/[0.03] text-9xl font-mono">0</div>
        <div className="absolute top-[60%] left-[3%] text-[#0A2342]/[0.03] text-5xl font-mono">0</div>
        <div className="absolute top-[80%] right-[5%] text-[#0A2342]/[0.03] text-6xl font-mono">1</div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2342] via-[#0F3A62] to-[#1a5a8a]" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full text-white border border-white/20 hover:bg-white hover:text-[#0A2342] hover:border-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-8">
          {/* Animated Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 border border-white/20 shadow-2xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Privacy Policy
          </h1>
          
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Your privacy matters to us. Learn how YourZerosAndOnes collects, uses, and protects your personal information.
          </p>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-blue-100 border border-white/10">
              <RefreshCw className="w-4 h-4" />
              Last updated: January {new Date().getFullYear()}
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-blue-100 border border-white/10">
              <Clock className="w-4 h-4" />
              ~10 min read
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Card */}
      <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#0A2342] to-[#1a4a7a] rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Our Commitment to You
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                At <strong className="text-[#0A2342]">YourZerosAndOnes</strong>, 
                we are committed to protecting your privacy. As a comprehensive IT company 
                providing Branding & Design, Digital Marketing, and Technology services, 
                we understand the importance of data security. This Privacy Policy 
                explains how we collect, use, and safeguard your information when 
                you interact with our website or utilize our services.
              </p>
            </div>
          </div>
          
          {/* Service Categories */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wider">Our Service Categories</p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Palette, name: "Branding & Design" },
                { icon: TrendingUp, name: "Digital Marketing" },
                { icon: Code, name: "Technology" },
              ].map((item, i) => {
                const ItemIcon = item.icon;
                return (
                  <div 
                    key={i}
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-gray-50 hover:from-[#0A2342] hover:to-[#1a4a7a] text-[#0A2342] hover:text-white px-5 py-3 rounded-xl transition-all duration-300 border border-blue-100 hover:border-transparent cursor-default"
                  >
                    <ItemIcon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </div>
            Quick Navigation
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((section, index) => {
              const SectionIcon = section.icon;
              return (
                <a
                  key={index}
                  href={`#${section.id}`}
                  className="group flex items-center gap-3 text-gray-600 hover:text-[#0A2342] hover:bg-blue-50 px-4 py-3 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-100"
                >
                  <div className="w-8 h-8 bg-gray-100 group-hover:bg-[#0A2342] rounded-lg flex items-center justify-center transition-all duration-300">
                    <SectionIcon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-medium truncate">{section.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <article
                key={index}
                id={section.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden scroll-mt-8"
              >
                {/* Section Header */}
                <div className="relative flex items-center gap-5 p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-transparent overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute right-0 top-0 w-40 h-40 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A2342] to-[#1a4a7a] text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="relative">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      Section {index + 1} of {sections.length}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 mt-1">
                      {section.title}
                    </h2>
                  </div>
                </div>
                
                {/* Section Content */}
                <div className="p-8">{section.content}</div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="relative bg-gradient-to-br from-[#0A2342] via-[#0F3A62] to-[#1a4a7a] rounded-3xl p-10 md:p-14 text-center text-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold mb-3">Have Questions?</h3>
            <p className="text-blue-200 mb-8 max-w-lg mx-auto text-lg">
              We're here to help. Reach out to us for any privacy-related inquiries or concerns.
            </p>
            <a
              href="mailto:yourzerosandones@gmail.com"
              className="group inline-flex items-center gap-3 bg-white text-[#0A2342] px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Contact Us Today
            </a>
          </div>
        </div>
      </section>

      {/* Back to Top */}
      <div className="fixed bottom-8 right-8 z-50">
        <a
          href="#"
          className="group flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#0A2342] to-[#1a4a7a] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
        </a>
      </div>

      {/* Footer */}
      <section className="bg-[#0A2342] text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <span className="font-bold text-xl">YourZerosAndOnes</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <span className="text-blue-300 text-sm px-4 py-2 bg-white/5 rounded-full">Branding & Design</span>
            <span className="text-blue-300 text-sm px-4 py-2 bg-white/5 rounded-full">Digital Marketing</span>
            <span className="text-blue-300 text-sm px-4 py-2 bg-white/5 rounded-full">Technology</span>
          </div>
          
          <p className="text-blue-200 mb-6">
            © {new Date().getFullYear()} YourZerosAndOnes. All rights reserved.
          </p>
          <p className="text-blue-300/60 text-sm">
            Protecting your privacy while delivering exceptional IT solutions.
          </p>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <a 
              href="mailto:yourzerosandones@gmail.com" 
              className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              yourzerosandones@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}