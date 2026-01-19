// Q:\PROJECTS\YourZeroesAndOnes\YZO_Main\app\testimonials\ui\TestimonialCard.jsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

// Animation variant for individual cards
const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// Gradient backgrounds for variety
const gradientStyles = [
  "from-blue-500/10 to-purple-500/10",
  "from-emerald-500/10 to-teal-500/10",
  "from-orange-500/10 to-rose-500/10",
  "from-violet-500/10 to-indigo-500/10",
  "from-cyan-500/10 to-blue-500/10",
  "from-pink-500/10 to-fuchsia-500/10",
];

// Badge colors based on role/category
const getBadgeStyle = (role) => {
  const lowerRole = role?.toLowerCase() || "";
  if (lowerRole.includes("ceo") || lowerRole.includes("founder")) {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }
  if (lowerRole.includes("manager") || lowerRole.includes("director")) {
    return "bg-blue-100 text-blue-700 border-blue-200";
  }
  if (lowerRole.includes("developer") || lowerRole.includes("engineer")) {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }
  return "bg-gray-100 text-gray-700 border-gray-200";
};

export default function TestimonialCard({ item, index = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  // ✅ Safe data extraction with fallbacks
  const name = item?.name || "Anonymous";
  const role = item?.role || "Client";
  const company = item?.company;
  const message = item?.message || "No testimonial provided.";
  const image = item?.image;
  const rating = Math.min(5, Math.max(0, parseInt(item?.rating) || 5)); // ✅ Validate rating 0-5
  const verified = item?.verified || false;
  const date = item?.date;

  const gradientStyle = gradientStyles[index % gradientStyles.length];
  const shouldTruncate = message.length > 100;
  const displayMessage =
    shouldTruncate && !isExpanded ? `${message.slice(0, 75)}...` : message;

  // ✅ Generate initials for fallback avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative h-full"
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradientStyle} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500`}
      />

      <div className="relative h-full p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 overflow-hidden">
        {/* Decorative gradient corner */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${gradientStyle} rounded-bl-full opacity-50 z-0`}
        />

        {/* Decorative quote icon */}
        <motion.div
          initial={{ rotate: 0 }}
          whileHover={{ rotate: -12, scale: 1.1 }}
          className="absolute top-13 right-4 z-0"
          style={{ transform: "scaleX(-1)" }}
        >
          <svg
            className="w-12 h-12 text-gray-200 group-hover:text-blue-200 transition-colors duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </motion.div>

        {/* ✅ Verified badge - TOP RIGHT CORNER */}
        {verified && (
          <div className="absolute top-4 right-4 z-20">
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg border border-green-400"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verified
            </motion.span>
          </div>
        )}

        <div className="relative z-10">
          {/* Header with avatar and info */}
          <div className="flex gap-4 items-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative flex-shrink-0"
            >
              {/* Avatar with status ring */}
              <div className="relative">
                {image && !imageError ? (
                  <img
                    src={image}
                    alt={name}
                    onError={() => setImageError(true)} // ✅ Handle image errors
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
                  />
                ) : (
                  // ✅ Fallback avatar with initials
                  <div className="w-14 h-14 rounded-full border-2 border-white shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {getInitials(name)}
                    </span>
                  </div>
                )}
                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-sm" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-bold text-lg text-gray-900 truncate group-hover:text-blue-600 transition-colors"
                    title={name} // ✅ Show full name on hover if truncated
                  >
                    {name}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle(
                      role
                    )}`}
                    title={role} // ✅ Show full role on hover
                  >
                    {role.length > 30 ? `${role.slice(0, 30)}...` : role}
                  </span>
                  {company && (
                    <p
                      className="text-sm text-gray-500 mt-0.5 flex items-center gap-1 truncate"
                      title={company} // ✅ Show full company on hover if truncated
                    >
                      <svg
                        className="w-3 h-3 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="truncate">{company}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial message */}
          <div className="mt-5">
            <p className="text-gray-600 leading-relaxed text-[15px] break-words">
              {" "}
              {/* ✅ break-words for long words */}
              <span className="text-2xl text-blue-500 font-serif leading-none">
                "
              </span>
              {displayMessage}
              <span className="text-2xl text-blue-500 font-serif leading-none">
                "
              </span>
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    Show less
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    Read more
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Footer with rating and actions */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            {/* Star Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-5 h-5 ${
                      i < rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200 fill-gray-200"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-500">
                {rating.toFixed(1)} {/* ✅ Always show one decimal */}
              </span>
            </div>
          </div>

          {/* Date if available */}
          {date && (
            <p className="mt-3 text-xs text-gray-400 flex items-center gap-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {date}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
