// components/home/CurvedDivider.jsx
"use client";

export default function CurvedDivider() {
  return (
    <div className="relative h-32 bg-[#060812]">
      <svg
        className="absolute bottom-0 w-full h-32"
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64 C480,128 960,0 1440,64 L1440,128 L0,128 Z"
          fill="#141620"
        />
      </svg>
    </div>
  );
}