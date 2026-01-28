// app/about/sections/Team.jsx
"use client";
import { useRef, useState, useEffect, memo } from "react";
import Image from "next/image";
import { SectionHeader, SectionWrapper, getInitials } from "@/components/ui/AnimatedSection";

// Team Member Card Component
const TeamMemberCard = memo(function TeamMemberCard({ member, index }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // Check if member has any social links
  const hasSocialLinks = 
    (member.linkedin && member.linkedin !== "#") || 
    (member.twitter && member.twitter !== "#");

  return (
    <div
      ref={ref}
      className="group h-full"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 100}ms`
      }}
    >
      <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 h-full flex flex-col">
        {/* Image section - fixed height */}
        <div className="relative h-56 sm:h-64 overflow-hidden flex-shrink-0">
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
            <div className="w-full h-full bg-gradient-to-br from-[#203E7F] to-cyan-600 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {getInitials(member.name)}
              </span>
            </div>
          )}
          
          {/* Gradient overlay - Only on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#203E7F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Social links - Always visible */}
          {hasSocialLinks && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 z-10">
              {member.linkedin && member.linkedin !== "#" && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 group-hover:bg-white/20 group-hover:backdrop-blur-sm transition-all duration-300 group/link shadow-lg group-hover:shadow-none"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <svg 
                    className="w-5 h-5 text-[#203E7F] group-hover:text-white group-hover/link:scale-110 transition-all duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              {member.twitter && member.twitter !== "#" && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 group-hover:bg-white/20 group-hover:backdrop-blur-sm transition-all duration-300 group/link shadow-lg group-hover:shadow-none"
                  aria-label={`${member.name} Twitter`}
                >
                  <svg 
                    className="w-5 h-5 text-[#203E7F] group-hover:text-white group-hover/link:scale-110 transition-all duration-300" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-6 text-center bg-white flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {member.name}
          </h3>
          <p className="text-transparent bg-gradient-to-r from-[#203E7F] to-cyan-600 bg-clip-text font-semibold mb-3">
            {member.role}
          </p>
          <p className="text-gray-500 text-sm flex-1">
            {member.description}
          </p>
        </div>
      </div>
    </div>
  );
});

export default function Team({ teamMembers, loading }) {
  return (
    <SectionWrapper bg="bg-white">
      <SectionHeader
        badge="Our Team"
        title="Meet the"
        highlightedText="Experts"
        description="Passionate professionals dedicated to delivering excellence in every project."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={member.id || index} member={member} index={index} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center mt-8">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-[#203E7F] rounded-full animate-spin" />
            Loading team members...
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}