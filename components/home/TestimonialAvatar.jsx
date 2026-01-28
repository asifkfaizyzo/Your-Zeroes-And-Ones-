// components/home/TestimonialsSection/TestimonialAvatar.jsx
"use client";

import { useState } from "react";

function getInitials(name = "") {
  if (!name) return "?";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TestimonialAvatar({ testimonial, size = "md" }) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(testimonial.name);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  if (testimonial.image && !imageError) {
    return (
      <img
        src={testimonial.image}
        alt={testimonial.name}
        onError={() => setImageError(true)}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-[#5b8def]/30`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-[#5b8def] to-[#20427f] rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-[#5b8def]/30`}
    >
      {initials}
    </div>
  );
}