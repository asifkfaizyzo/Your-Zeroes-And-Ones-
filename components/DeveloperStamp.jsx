'use client';

import React from 'react';
import { X } from 'lucide-react';

const DeveloperStamp = ({ isOpen, onClose }) => {
  const teamMembers = [
    {
      name: "Asif K Faizal",
      role: "Full Stack Developer",
    },
    {
      name: "Kiran S Pradeep",
      role: "Full Stack Developer",
    },
    {
      name: "Akhilkrishna K B",
      role: "UI/UX Designer",
    }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          
          {/* Round Seal */}
          <div className="relative w-36 h-36 mx-auto mb-8">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-gray-800" />
            
            {/* Inner Ring */}
            <div className="absolute inset-2.5 rounded-full border border-gray-800" />
            
            {/* Circular Text */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 144 144">
              <defs>
                <path
                  id="topCirclePath"
                  d="M 72,72 m -50,0 a 50,50 0 1,1 100,0"
                  fill="none"
                />
                <path
                  id="bottomCirclePath"
                  d="M 72,72 m 50,0 a 50,50 0 1,1 -100,0"
                  fill="none"
                />
              </defs>
              
              {/* Top Text */}
              <text
                className="fill-gray-800 uppercase"
                style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '0.12em' }}
              >
                <textPath href="#topCirclePath" startOffset="50%" textAnchor="middle">
                  Your Zeroes And Ones
                </textPath>
              </text>
              
              {/* Bottom Text */}
              <text
                className="fill-gray-800 uppercase"
                style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '0.12em' }}
              >
                <textPath href="#bottomCirclePath" startOffset="50%" textAnchor="middle">
                  Software Company
                </textPath>
              </text>
              
              {/* Stars */}
              <text x="12" y="75" className="fill-gray-800" style={{ fontSize: '8px' }}>★</text>
              <text x="126" y="75" className="fill-gray-800" style={{ fontSize: '8px' }}>★</text>
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 tracking-wider">YZO</div>
                <div className="text-[8px] text-gray-500 tracking-[0.15em] uppercase mt-0.5">Est. 2024</div>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 tracking-wide">
            Your Zeroes And Ones
          </h1>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
            A software development company crafting digital solutions with precision and passion.
          </p>

          {/* Divider */}
          <div className="w-10 h-px bg-gray-300 mx-auto mb-8" />

          {/* Team Section */}
          <div className="mb-8">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
              The Team
            </h2>
            
            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <div key={index} className="py-1.5">
                  <p className="text-gray-800 font-medium text-sm">{member.name}</p>
                  <p className="text-gray-400 text-xs">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-10 h-px bg-gray-300 mx-auto mb-6" />

          {/* Project Info */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperStamp;