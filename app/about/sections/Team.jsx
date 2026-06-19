// app/about/sections/Team.jsx
"use client";
import { useRef, useState, useEffect, memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BlurText from "@/components/effects/BlurText/BlurText";

function getInitials(name = "") {
  const parts = name.trim().split(" ").filter(Boolean).slice(0, 2);
  return parts.map((p) => p.charAt(0).toUpperCase()).join("");
}

const TeamMemberCard = memo(function TeamMemberCard({ member, index }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const hasSocialLinks =
    (member.linkedin && member.linkedin !== "#") ||
    (member.twitter && member.twitter !== "#");

  return (
    <div
      ref={ref}
      className="group h-full"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 100}ms`,
      }}
    >
      <div className="h-full rounded-3xl border border-[#5b8def]/20 bg-[#060812] overflow-hidden
                      hover:border-[#5b8def]/40 hover:-translate-y-2 transition-all duration-300
                      flex flex-col group-hover:shadow-lg group-hover:shadow-[#5b8def]/10">
        {/* Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden flex-shrink-0 bg-[#0a1628]">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading={index > 3 ? "lazy" : "eager"}
              quality={85}
            />
          ) : (
            <div className="w-full h-full bg-[#1e3a6e] flex items-center justify-center">
              <span className="text-4xl font-bold text-white/60">
                {getInitials(member.name)}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#060812]/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a6e]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {hasSocialLinks && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-10">
              {member.linkedin && member.linkedin !== "#" && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20
                             flex items-center justify-center hover:bg-[#5b8def] hover:border-[#5b8def]
                             transition-all duration-300 hover:scale-110"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              {member.twitter && member.twitter !== "#" && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20
                             flex items-center justify-center hover:bg-[#5b8def] hover:border-[#5b8def]
                             transition-all duration-300 hover:scale-110"
                  aria-label={`${member.name} Twitter`}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 text-center flex-1 flex flex-col border-t border-[#5b8def]/10">
          <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
          <p className="text-[#5b8def] font-semibold text-sm mb-3">{member.role}</p>
          <p className="text-white/40 text-sm leading-relaxed flex-1">
            {member.description}
          </p>
        </div>
      </div>
    </div>
  );
});

export default function Team({ teamMembers, loading }) {
  return (
    <section className="relative py-20 sm:py-24 bg-[#060812] overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-[#5b8def]/5 rounded-full blur-[80px] pointer-events-none" />

      <div
        className="relative z-10 w-full"
        style={{
          paddingLeft: "clamp(2rem, 8vw, 12rem)",
          paddingRight: "clamp(2rem, 8vw, 12rem)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="text-[#5b8def] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              Our Team
            </span>
          </motion.div>
          <div className="mb-4">
            <BlurText
              text="Meet the Experts"
              delay={60}
              animateBy="words"
              direction="top"
              align="center"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Passionate professionals dedicated to delivering excellence in every project.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 bg-[#5b8def] rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id || index}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-[300px]"
              >
                <TeamMemberCard member={member} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}