// app/about/page.js
"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AboutHero from "./sections/AboutHero";
import {
  Eye,
  Zap,
  Lightbulb,
  Rocket,
  Shield,
  HeadphonesIcon,
  Settings,
  BarChart3,
  CheckCircle,
  Calendar,
  Users,
  Award,
  Clock,
  ArrowRight,
} from "lucide-react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// Animated Section Wrapper
function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Counter Animation Component
function AnimatedCounter({ value, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/\D/g, ""));

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.span>
      ) : (
        "0"
      )}
    </motion.span>
  );
}

// Helper function for initials
function getInitials(name = '') {
  if (!name) return '';
  const parts = name.trim().split(' ').filter(Boolean).slice(0, 2);
  return parts.map((p) => p.charAt(0).toUpperCase()).join('');
}

export default function About() {
  // Static/hardcoded team members (these will always appear first)
  const staticTeamMembers = [
    {
      id: "static-1",
      name: "Sibi Xavier",
      role: "CEO & Founder",
      image: "/images/team/sibi.jpg",
      description: "15+ years in tech leadership and business strategy",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: "static-2",
      name: "Asif K Faizal",
      role: "Senior Developer",
      image: "/images/team/Asif.jpg",
      description: "Expert in cloud architecture and software development",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: "static-3",
      name: "Akhil",
      role: "Lead Designer",
      image: "/images/team/Akhil.jpg",
      description: "Specialized in UX/UI and product design",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: "static-4",
      name: "Kiran S Pradeep",
      role: "Senior Developer",
      image: "/images/team/kiran.jpg",
      description: "Full-stack development and team leadership",
      linkedin: "#",
      twitter: "#",
    },
  ];

  // State for dynamic team members from API
  const [dynamicTeamMembers, setDynamicTeamMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);

  // Fetch additional team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await fetch('/api/team');
        if (res.ok) {
          const data = await res.json();
          setDynamicTeamMembers(data);
        }
      } catch (err) {
        console.error('Failed to fetch team members:', err);
      } finally {
        setTeamLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Combine static members with dynamic members (static first, then dynamic)
  const allTeamMembers = dynamicTeamMembers;

  const timeline = [
    {
      year: "2010",
      title: "The Beginning",
      description:
        "Founded with a vision to make technology accessible to businesses of all sizes. Our first project was a simple e-commerce website that grew into a long-term partnership.",
      Icon: Rocket,
    },
    {
      year: "2015",
      title: "Expansion & Growth",
      description:
        "Expanded our team and services to include mobile app development and cloud solutions. Partnered with major corporations and startups alike.",
      Icon: Users,
    },
    {
      year: "2020",
      title: "Digital Transformation Leaders",
      description:
        "Recognized as industry leaders in digital transformation. Adapted to remote work seamlessly and helped clients navigate the digital-first world.",
      Icon: Award,
    },
    {
      year: "2024",
      title: "Today & Beyond",
      description:
        "Continuing to innovate with AI, machine learning, and cutting-edge technologies. Committed to delivering exceptional value and building lasting partnerships.",
      Icon: Zap,
    },
  ];

  const whyChooseUs = [
    {
      Icon: Lightbulb,
      title: "Innovation First",
      description:
        "We stay at the forefront of technology trends, ensuring your solutions are built with the latest tools and methodologies.",
    },
    {
      Icon: Rocket,
      title: "Rapid Delivery",
      description:
        "Agile development processes and experienced teams ensure your projects are delivered on time and within budget.",
    },
    {
      Icon: Shield,
      title: "Quality & Security",
      description:
        "Rigorous testing protocols and security measures guarantee robust, reliable, and secure applications.",
    },
    {
      Icon: HeadphonesIcon,
      title: "Dedicated Support",
      description:
        "Our relationship doesn't end at delivery. We provide ongoing support and maintenance to ensure your success.",
    },
    {
      Icon: Settings,
      title: "Custom Solutions",
      description:
        "Every project is tailored to your specific needs, ensuring perfect alignment with your business objectives.",
    },
    {
      Icon: BarChart3,
      title: "Proven Results",
      description:
        "Track record of delivering measurable business outcomes and ROI for our diverse client portfolio.",
    },
  ];

  const stats = [
    { value: "50+", label: "Projects Completed", Icon: CheckCircle },
    { value: "15+", label: "Years Experience", Icon: Calendar },
    { value: "30+", label: "Happy Clients", Icon: Users },
    { value: "24/7", label: "Support", Icon: Clock },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <AboutHero />

        {/* Who We Are Section */}
        <section id="who-we-are" className="py-16 sm:py-20 md:py-24 bg-gray-100">
          <div 
            className="w-full"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Content */}
                <motion.div variants={fadeInLeft} className="space-y-6">
                  <div>
                    <motion.span
                      variants={fadeInUp}
                      className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white text-sm font-semibold rounded-full mb-4"
                    >
                      Who We Are
                    </motion.span>
                    <motion.h2
                      variants={fadeInUp}
                      className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    >
                      Crafting Digital{" "}
                      <span className="bg-gradient-to-r from-[#203E7F] to-cyan-600 bg-clip-text text-transparent">
                        Excellence
                      </span>
                    </motion.h2>
                  </div>
                  <motion.p
                    variants={fadeInUp}
                    className="text-gray-600 text-base sm:text-lg leading-relaxed"
                  >
                    Your Zeros and Ones is a premier IT consulting and software
                    development company dedicated to helping businesses thrive in
                    the digital age. We combine technical expertise with business
                    acumen to deliver innovative solutions that drive growth and
                    efficiency.
                  </motion.p>
                  <motion.p
                    variants={fadeInUp}
                    className="text-gray-600 text-base sm:text-lg leading-relaxed"
                  >
                    Our team of passionate developers, designers, and strategists
                    work collaboratively to transform complex challenges into
                    elegant, user-friendly solutions.
                  </motion.p>

                  {/* Stats Grid */}
                  <motion.div
                    variants={staggerContainer}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
                  >
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        variants={scaleIn}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="text-center p-4 bg-white rounded-2xl shadow-lg border border-gray-100 group cursor-default"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <stat.Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#203E7F] to-cyan-600 bg-clip-text text-transparent">
                          <AnimatedCounter value={stat.value} />
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 mt-1">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Image/Video */}
                <motion.div
                  variants={fadeInRight}
                  className="relative"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <div className="aspect-[4/3] relative bg-gradient-to-br from-[#203E7F]/20 to-cyan-600/20">
                      <Image
                        src="/images/about/about-company.png"
                        alt="Your Zeros and Ones Team"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group"
                        >
                          <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-[#203E7F] ml-1" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Our Story / Timeline Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-br from-[#203E7F]/5 to-cyan-600/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-br from-cyan-600/5 to-[#203E7F]/5 rounded-full blur-3xl" />
          </div>

          <div 
            className="relative w-full"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white text-sm font-semibold rounded-full mb-4">
                  Our Journey
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  The Story Behind{" "}
                  <span className="bg-gradient-to-r from-[#203E7F] to-cyan-600 bg-clip-text text-transparent">
                    Our Success
                  </span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
                  From a small startup to an industry leader, discover the milestones
                  that shaped our journey.
                </p>
              </motion.div>

              {/* Timeline */}
              <div className="relative max-w-4xl mx-auto">
                {/* Timeline Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#203E7F] via-cyan-500 to-[#203E7F] transform md:-translate-x-1/2" />

                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                    className={`relative flex items-center mb-12 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="absolute left-4 md:left-1/2 w-8 h-8 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-full transform md:-translate-x-1/2 z-10 flex items-center justify-center shadow-lg"
                    >
                      <item.Icon className="w-4 h-4 text-white" />
                    </motion.div>

                    {/* Content Card */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                        index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                      }`}
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                          <Calendar className="w-3 h-3" />
                          {item.year}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-gray-100">
          <div 
            className="w-full"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white text-sm font-semibold rounded-full mb-4">
                  Our Purpose
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                  Vision &{" "}
                  <span className="bg-gradient-to-r from-[#203E7F] to-cyan-600 bg-clip-text text-transparent">
                    Mission
                  </span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vision */}
                <motion.div
                  variants={fadeInLeft}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-3xl p-8 sm:p-10 text-white h-full relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                          backgroundSize: "30px 30px",
                        }}
                      />
                    </div>

                    <div className="relative">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
                      >
                        <Eye className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-2xl sm:text-3xl font-bold mb-4">Our Vision</h3>
                      <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                        To be the leading catalyst for digital innovation, empowering
                        businesses worldwide to achieve their full potential through
                        transformative technology solutions that create lasting impact
                        and drive sustainable growth.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Mission */}
                <motion.div
                  variants={fadeInRight}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl p-8 sm:p-10 h-full shadow-xl border border-gray-100 relative overflow-hidden">
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#203E7F]/10 to-cyan-600/10 opacity-50" />

                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-16 h-16 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                      >
                        <Zap className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                        Our Mission
                      </h3>
                      <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                        To deliver exceptional, customized IT solutions that solve
                        complex business challenges. We are committed to building
                        long-term partnerships based on trust, innovation, and
                        measurable results that help our clients stay ahead in an
                        ever-evolving digital landscape.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-white">
          <div 
            className="w-full"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white text-sm font-semibold rounded-full mb-4">
                  Our Team
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Meet the{" "}
                  <span className="bg-gradient-to-r from-[#203E7F] to-cyan-600 bg-clip-text text-transparent">
                    Experts
                  </span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
                  Passionate professionals dedicated to delivering excellence in
                  every project.
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
              >
                {allTeamMembers.map((member, index) => (
                  <motion.div
                    key={member.id || index}
                    variants={scaleIn}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                      {/* Image Container */}
                      <div className="relative h-56 sm:h-64 overflow-hidden">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#203E7F] to-cyan-600 flex items-center justify-center">
                            <span className="text-4xl font-bold text-white">
                              {getInitials(member.name)}
                            </span>
                          </div>
                        )}
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#203E7F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <div className="flex gap-3">
                            {member.linkedin && member.linkedin !== "#" && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                              >
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                              </a>
                            )}
                            {member.twitter && member.twitter !== "#" && (
                              <a
                                href={member.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                              >
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6 text-center bg-white">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-transparent bg-gradient-to-r from-[#203E7F] to-cyan-600 bg-clip-text font-semibold mb-3">
                          {member.role}
                        </p>
                        <p className="text-gray-500 text-sm">{member.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Loading indicator for dynamic members */}
              {teamLoading && (
                <div className="flex justify-center mt-8">
                  <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-[#203E7F] rounded-full animate-spin" />
                    Loading more team members...
                  </div>
                </div>
              )}
            </AnimatedSection>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-gray-100">
          <div 
            className="w-full"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white text-sm font-semibold rounded-full mb-4">
                  Why Us
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Why Choose{" "}
                  <span className="bg-gradient-to-r from-[#203E7F] to-cyan-600 bg-clip-text text-transparent">
                    Us?
                  </span>
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
                  Discover what sets us apart and makes us the right partner for
                  your digital journey.
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-14 h-14 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-500/25 transition-all"
                      >
                        <item.Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div 
            className="w-full"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <AnimatedSection>
              <motion.div
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-gray-200 max-w-4xl mx-auto"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#203E7F]/10 to-cyan-600/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-600/10 to-[#203E7F]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl"
                  >
                    <Rocket className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    Ready to Start Your{" "}
                    <span className="bg-gradient-to-r from-[#203E7F] to-cyan-600 bg-clip-text text-transparent">
                      Project?
                    </span>
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-base sm:text-lg">
                    Let's work together to bring your vision to life. Our team is
                    excited to hear about your ideas.
                  </p>
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all"
                  >
                    Get In Touch
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}