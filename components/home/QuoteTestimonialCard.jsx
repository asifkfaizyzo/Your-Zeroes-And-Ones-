// components/home/TestimonialsSection/QuoteTestimonialCard.jsx
"use client";

import { motion } from "framer-motion";
import TestimonialAvatar from "./TestimonialAvatar";

export default function QuoteTestimonialCard({ testimonial, index }) {
  const rating = Math.min(5, Math.max(0, parseInt(testimonial?.rating) || 5));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl overflow-hidden h-full flex flex-col p-5"
    >
      {/* Content Section - takes available space */}
      <div className="flex-1 flex flex-col">
        {/* Quote Icon - stays at top */}
        <svg
          className="w-8 h-8 text-[#5b8def]/20 mb-3 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        {/* Rating - stays at top */}
        <div className="flex gap-0.5 mb-3 flex-shrink-0">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-white/10 fill-white/10"}`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Message - centered in remaining space */}
        <div className="flex-1 flex items-center">
          <p className="text-white/80 text-sm leading-relaxed ">
            "
            {testimonial.message.length > 100
              ? `${testimonial.message.slice(0, 110)}...`
              : testimonial.message}
            "
          </p>
        </div>
      </div>

      {/* Author Section - always at bottom */}
      <div className="flex items-center gap-3 pt-4 mt-4 border-t border-white/10 flex-shrink-0">
        <TestimonialAvatar testimonial={testimonial} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-semibold text-white text-sm truncate max-w-[120px]">
              {testimonial.name}
            </h4>
            {testimonial.verified && (
              <svg
                className="w-3.5 h-3.5 text-[#5b8def] flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="text-xs text-white/50 truncate max-w-[180px]">
            {testimonial.role}
            {testimonial.company && ` · ${testimonial.company}`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
