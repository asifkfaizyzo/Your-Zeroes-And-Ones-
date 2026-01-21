// app/components/landingpages/TestimonialsSection.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const fallbackTestimonials = [
  {
    id: "fallback-1",
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    message:
      "Working with this team transformed our digital presence. Their comprehensive approach to branding and technology helped us scale rapidly.",
    image: null,
    rating: 5,
  },
  {
    id: "fallback-2",
    name: "Michael Chen",
    role: "Marketing Director, GrowthCo",
    message:
      "The ROI from their digital marketing strategies exceeded our expectations. Professional, data-driven, and always innovative.",
    image: null,
    rating: 5,
  },
  {
    id: "fallback-3",
    name: "Emily Rodriguez",
    role: "Founder, Creative Studios",
    message:
      "From concept to execution, every detail was perfect. They truly understand how to bring a vision to life.",
    image: null,
    rating: 5,
  },
];

function getInitials(name = "") {
  if (!name) return "";
  const parts = name.trim().split(" ").filter(Boolean).slice(0, 2);
  const letters = parts.map((p) => p.charAt(0).toUpperCase());
  return letters.join("");
}

function TestimonialAvatar({ testimonial, size = "md" }) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(testimonial.name);

  const sizeClasses = {
    sm: "w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-base",
    md: "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-lg sm:text-xl lg:text-2xl",
    lg: "w-16 h-16 sm:w-20 sm:h-20 text-xl sm:text-2xl",
  };

  if (testimonial.image && !imageError) {
    return (
      <img
        src={testimonial.image}
        alt={testimonial.name}
        onError={() => setImageError(true)}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-lg`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-[#20427f] to-cyan-600 rounded-full flex items-center justify-center text-white font-bold`}
    >
      {initials || "?"}
    </div>
  );
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setTestimonialsLoading(true);
        const res = await fetch("/api/testimonials");
        if (!res.ok) throw new Error("Failed to load testimonials");
        const data = await res.json();

        const filtered = data
          .filter((t) => t.verified !== false)
          .sort((a, b) => {
            if (a.date && b.date) {
              return new Date(b.date) - new Date(a.date);
            }
            return (b.id || 0) - (a.id || 0);
          })
          .slice(0, 5);

        setTestimonials(filtered.length > 0 ? filtered : fallbackTestimonials);
      } catch (err) {
        console.error("Testimonials fetch error:", err);
        setTestimonials(fallbackTestimonials);
      } finally {
        setTestimonialsLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonialsLoading || testimonials.length === 0 || isPaused) return;

    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [testimonialsLoading, testimonials.length, isPaused]);

  const currentTestimonial = testimonials[activeTestimonial] || fallbackTestimonials[0];
  const rating = Math.min(5, Math.max(0, parseInt(currentTestimonial?.rating) || 5));

  return (
    <section
      className="py-12 sm:py-16 lg:py-20 2xl:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden"
      data-animate
      id="testimonials"
      onMouseEnter={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#20427f 1px, transparent 1px), linear-gradient(90deg, #20427f 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div
        className="w-full max-w-[1800px] mx-auto relative z-10"
        style={{
          paddingLeft: "clamp(1rem, 4vw, 4rem)",
          paddingRight: "clamp(1rem, 4vw, 4rem)",
        }}
      >
        <div className="text-center mb-10 lg:mb-14">
          <span className="inline-block text-[#20427f] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">
            ★ CLIENT TESTIMONIALS ★
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
        </div>

        {testimonialsLoading ? (
          <div className="flex justify-center py-16">
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-[#20427f] rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No testimonials available yet.
          </div>
        ) : (
          <div className="relative">
            {/* Desktop: 3-Card Layout */}
            <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8">
              {testimonials.length > 1 && (
                <div
                  className="w-80 xl:w-96 flex-shrink-0 cursor-pointer transition-all duration-500 opacity-40 hover:opacity-60 scale-90 hover:scale-95"
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                >
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden">
                    <p 
                      className="text-gray-600 text-sm line-clamp-3 mb-4"
                      style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                    >
                      "
                      {testimonials[
                        (activeTestimonial - 1 + testimonials.length) %
                          testimonials.length
                      ]?.message?.slice(0, 100)}
                      ..."
                    </p>
                    <div className="flex items-center gap-3 min-w-0">
                      <TestimonialAvatar
                        testimonial={
                          testimonials[
                            (activeTestimonial - 1 + testimonials.length) %
                              testimonials.length
                          ]
                        }
                        size="sm"
                      />
                      <span 
                        className="text-sm font-medium text-gray-700 truncate"
                        style={{
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word'
                        }}
                      >
                        {
                          testimonials[
                            (activeTestimonial - 1 + testimonials.length) %
                              testimonials.length
                          ]?.name
                        }
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Card */}
              <div
                key={activeTestimonial}
                className="w-full max-w-2xl xl:max-w-3xl flex-shrink-0 animate-scale-in"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#20427f] via-cyan-500 to-[#20427f] rounded-3xl blur-lg opacity-20 animate-glow" />

                  <div className="relative bg-white rounded-3xl p-8 xl:p-12 shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="absolute top-4 left-8 w-10 h-10 bg-gradient-to-r from-[#20427f] to-cyan-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce-slow">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    {currentTestimonial.verified && (
                      <div className="absolute top-6 right-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Verified
                        </span>
                      </div>
                    )}

                    <div className="flex justify-center gap-1 mb-6 pt-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-6 h-6 ${
                            i < rating ? "text-yellow-400" : "text-gray-200"
                          } animate-twinkle`}
                          style={{ animationDelay: `${i * 100}ms` }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p 
                      className="text-xl xl:text-2xl text-gray-700 text-center leading-relaxed mb-8 animate-fade-in"
                      style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      "{currentTestimonial.message || currentTestimonial.content}"
                    </p>

                    <div className="flex items-center justify-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#20427f] to-cyan-500 rounded-full animate-spin-slow" />
                        <div className="relative bg-white rounded-full p-0.5">
                          <TestimonialAvatar
                            testimonial={currentTestimonial}
                            size="md"
                          />
                        </div>
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <div 
                          className="font-bold text-gray-900 text-lg"
                          style={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word'
                          }}
                        >
                          {currentTestimonial.name}
                        </div>
                        <div 
                          className="text-[#20427f] text-sm font-medium"
                          style={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word'
                          }}
                        >
                          {currentTestimonial.role}
                        </div>
                        {currentTestimonial.company && (
                          <div 
                            className="text-gray-500 text-xs"
                            style={{
                              wordBreak: 'break-word',
                              overflowWrap: 'break-word'
                            }}
                          >
                            {currentTestimonial.company}
                          </div>
                        )}
                      </div>
                    </div>

                    {!isPaused && testimonials.length > 1 && (
                      <div className="mt-8 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#20427f] to-cyan-500 animate-progress"
                          style={{ animationDuration: "3s" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {testimonials.length > 1 && (
                <div
                  className="w-80 xl:w-96 flex-shrink-0 cursor-pointer transition-all duration-500 opacity-40 hover:opacity-60 scale-90 hover:scale-95"
                  onClick={() =>
                    setActiveTestimonial(
                      (prev) => (prev + 1) % testimonials.length
                    )
                  }
                >
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden">
                    <p 
                      className="text-gray-600 text-sm line-clamp-3 mb-4"
                      style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                    >
                      "
                      {testimonials[
                        (activeTestimonial + 1) % testimonials.length
                      ]?.message?.slice(0, 100)}
                      ..."
                    </p>
                    <div className="flex items-center gap-3 min-w-0">
                      <TestimonialAvatar
                        testimonial={
                          testimonials[
                            (activeTestimonial + 1) % testimonials.length
                          ]
                        }
                        size="sm"
                      />
                      <span 
                        className="text-sm font-medium text-gray-700 truncate"
                        style={{
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word'
                        }}
                      >
                        {
                          testimonials[
                            (activeTestimonial + 1) % testimonials.length
                          ]?.name
                        }
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile: Single Card */}
            <div className="lg:hidden">
              <div
                key={activeTestimonial}
                className="bg-white rounded-2xl p-6 shadow-xl animate-slide-up overflow-hidden"
              >
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < rating ? "text-yellow-400" : "text-gray-200"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p 
                  className="text-gray-700 text-center mb-6"
                  style={{
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  "{currentTestimonial.message || currentTestimonial.content}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <TestimonialAvatar
                    testimonial={currentTestimonial}
                    size="sm"
                  />
                  <div className="min-w-0 max-w-[200px]">
                    <div 
                      className="font-bold text-gray-900"
                      style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                    >
                      {currentTestimonial.name}
                    </div>
                    <div 
                      className="text-[#20427f] text-sm"
                      style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                    >
                      {currentTestimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            {testimonials.length > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#20427f] hover:bg-[#20427f] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i === activeTestimonial
                          ? "bg-[#20427f] scale-125"
                          : "bg-gray-300 hover:bg-[#20427f]/50"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setActiveTestimonial(
                      (prev) => (prev + 1) % testimonials.length
                    )
                  }
                  className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#20427f] hover:bg-[#20427f] hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className="text-center mt-10">
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 text-[#20427f] font-semibold hover:gap-3 transition-all"
              >
                View all testimonials
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}