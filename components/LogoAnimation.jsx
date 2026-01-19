// components/LogoAnimation.jsx
'use client'

import { useEffect, useState, useMemo } from 'react'

const LOGO_PATH = "M916.5,332.6c-76.51,56.19-237.56,109.17-254.26,213.63-14.62,91.46-3.15,162.2-46.36,252.65-105.83,221.53-465.15,216.14-564.17-14C-3.01,657.69-2.75,410.19,66.46,288.21c114.49-201.8,453.78-201.33,545.96,18.71-44.05,29.43-83.34,71.2-105.73,119.8-7.86,5.35-25.43-62.45-30.18-72.17-55.83-114.25-217.6-120.32-276.35-4.63-58.15,114.51-65.92,465.19,109.81,481.25,86.48,7.9,146-24.88,175.66-107.18,45.79-127.1-3.95-241.52,112.24-352.88,23.77-22.78,317.96-215.69,338.02-215.69h130.12v797.34h-149.5V332.6Z"

// Fixed particle configurations with pre-calculated final values
// Full mode: 24 particles
const particleConfigsFull = [
  { startX: 80, startY: 0, startRotate: -45, startScale: 0.42, size: 6, colorIndex: 0 },
  { startX: 74, startY: 31, startRotate: 78, startScale: 0.58, size: 9, colorIndex: 1 },
  { startX: 57, startY: 57, startRotate: -120, startScale: 0.35, size: 5, colorIndex: 2 },
  { startX: 31, startY: 74, startRotate: 156, startScale: 0.65, size: 11, colorIndex: 0 },
  { startX: 0, startY: 80, startRotate: -88, startScale: 0.48, size: 7, colorIndex: 1 },
  { startX: -31, startY: 74, startRotate: 45, startScale: 0.62, size: 8, colorIndex: 2 },
  { startX: -57, startY: 57, startRotate: -165, startScale: 0.38, size: 5, colorIndex: 0 },
  { startX: -74, startY: 31, startRotate: 92, startScale: 0.55, size: 10, colorIndex: 1 },
  { startX: -80, startY: 0, startRotate: -32, startScale: 0.52, size: 7, colorIndex: 2 },
  { startX: -74, startY: -31, startRotate: 134, startScale: 0.68, size: 11, colorIndex: 0 },
  { startX: -57, startY: -57, startRotate: -78, startScale: 0.45, size: 6, colorIndex: 1 },
  { startX: -31, startY: -74, startRotate: 67, startScale: 0.60, size: 9, colorIndex: 2 },
  { startX: 0, startY: -80, startRotate: -145, startScale: 0.32, size: 5, colorIndex: 0 },
  { startX: 31, startY: -74, startRotate: 112, startScale: 0.70, size: 12, colorIndex: 1 },
  { startX: 57, startY: -57, startRotate: -55, startScale: 0.50, size: 7, colorIndex: 2 },
  { startX: 74, startY: -31, startRotate: 88, startScale: 0.58, size: 9, colorIndex: 0 },
  { startX: 95, startY: 0, startRotate: -98, startScale: 0.40, size: 6, colorIndex: 1 },
  { startX: 88, startY: 36, startRotate: 145, startScale: 0.65, size: 10, colorIndex: 2 },
  { startX: 67, startY: 67, startRotate: -22, startScale: 0.48, size: 7, colorIndex: 0 },
  { startX: 36, startY: 88, startRotate: 178, startScale: 0.62, size: 9, colorIndex: 1 },
  { startX: 0, startY: 95, startRotate: -135, startScale: 0.42, size: 6, colorIndex: 2 },
  { startX: -36, startY: 88, startRotate: 55, startScale: 0.68, size: 10, colorIndex: 0 },
  { startX: -67, startY: 67, startRotate: -68, startScale: 0.55, size: 8, colorIndex: 1 },
  { startX: -88, startY: 36, startRotate: 122, startScale: 0.60, size: 10, colorIndex: 2 },
];

// Minimal mode: 12 particles
const particleConfigsMinimal = [
  { startX: 50, startY: 0, startRotate: -52, startScale: 0.45, size: 4, colorIndex: 0 },
  { startX: 43, startY: 25, startRotate: 85, startScale: 0.62, size: 6, colorIndex: 1 },
  { startX: 25, startY: 43, startRotate: -128, startScale: 0.38, size: 4, colorIndex: 2 },
  { startX: 0, startY: 50, startRotate: 142, startScale: 0.68, size: 7, colorIndex: 0 },
  { startX: -25, startY: 43, startRotate: -75, startScale: 0.50, size: 5, colorIndex: 1 },
  { startX: -43, startY: 25, startRotate: 58, startScale: 0.58, size: 5, colorIndex: 2 },
  { startX: -50, startY: 0, startRotate: -155, startScale: 0.35, size: 3, colorIndex: 0 },
  { startX: -43, startY: -25, startRotate: 98, startScale: 0.65, size: 6, colorIndex: 1 },
  { startX: -25, startY: -43, startRotate: -42, startScale: 0.48, size: 4, colorIndex: 2 },
  { startX: 0, startY: -50, startRotate: 168, startScale: 0.70, size: 7, colorIndex: 0 },
  { startX: 25, startY: -43, startRotate: -95, startScale: 0.42, size: 4, colorIndex: 1 },
  { startX: 43, startY: -25, startRotate: 72, startScale: 0.60, size: 5, colorIndex: 2 },
];

const colors = ['#06b6d4', '#3b82f6', '#20427f'];

export function LogoMorphAnimation({ size = 120, onComplete, isExiting = false, isMinimal = false }) {
  const [phase, setPhase] = useState('waiting')
  const [isMounted, setIsMounted] = useState(false)
  
  // Only compute particles after mount to avoid hydration mismatch
  const particles = useMemo(() => {
    const configs = isMinimal ? particleConfigsMinimal : particleConfigsFull;
    const delayMultiplier = isMinimal ? 0.02 : 0.04;
    
    return configs.map((config, i) => ({
      id: i,
      startX: config.startX,
      startY: config.startY,
      startRotate: config.startRotate,
      startScale: config.startScale,
      delay: Number((i * delayMultiplier).toFixed(2)),
      size: config.size,
      color: colors[config.colorIndex]
    }));
  }, [isMinimal]);

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    
    if (isExiting) {
      setPhase('exiting')
      return
    }

    const timers = []
    
    const assembleTime = isMinimal ? 600 : 1200
    const glowTime = isMinimal ? 800 : 1600
    
    timers.push(setTimeout(() => setPhase('assembling'), 50))
    timers.push(setTimeout(() => setPhase('assembled'), assembleTime))
    timers.push(setTimeout(() => {
      setPhase('glowing')
      onComplete?.()
    }, glowTime))

    return () => timers.forEach(clearTimeout)
  }, [onComplete, isExiting, isMinimal, isMounted])

  // Helper to get transform string with consistent formatting
  const getParticleTransform = (particle, currentPhase) => {
    if (currentPhase === 'waiting') {
      return `translate(calc(-50% + ${particle.startX}px), calc(-50% + ${particle.startY}px)) rotate(${particle.startRotate}deg) scale(${particle.startScale})`;
    }
    if (currentPhase === 'exiting') {
      const exitX = Math.round(particle.startX * 1.5);
      const exitY = Math.round(particle.startY * 1.5);
      const exitRotate = particle.startRotate * 2;
      return `translate(calc(-50% + ${exitX}px), calc(-50% + ${exitY}px)) rotate(${exitRotate}deg) scale(0)`;
    }
    return 'translate(-50%, -50%) rotate(0deg) scale(0)';
  };

  // Don't render particles until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div 
        className="relative"
        style={{ 
          width: size, 
          height: size,
        }}
      >
        {/* Render a simple placeholder during SSR */}
        <svg 
          viewBox="0 0 1080 1080" 
          className="relative z-10 w-full h-full opacity-0"
        >
          <path d={LOGO_PATH} fill="url(#morphGradient)" />
        </svg>
      </div>
    )
  }

  return (
    <div 
      className="relative transition-all duration-500 ease-out"
      style={{ 
        width: size, 
        height: size,
        transform: isExiting ? 'scale(0.8)' : 'scale(1)',
        opacity: isExiting ? 0 : 1
      }}
    >
      {/* Ambient glow
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-700 ease-out ${
          phase === 'glowing' ? 'opacity-60' : 'opacity-0'
        }`}
        style={{
          transform: phase === 'glowing' ? 'scale(1.5)' : 'scale(1)',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
          filter: 'blur(20px)'
        }}
      /> */}

      {/* Orbiting ring - only for full mode */}
      {!isMinimal && (
        <div 
          className={`absolute inset-[-20%] transition-all duration-1000 ${
            phase === 'assembled' || phase === 'glowing' ? 'opacity-30' : 'opacity-0'
          }`}
        >
          <div className="w-full h-full rounded-full border border-cyan-400/30 animate-spin-slow" />
          <div className="absolute inset-[15%] rounded-full border border-blue-400/20 animate-spin-slow-reverse" />
        </div>
      )}

      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute left-1/2 top-1/2 rounded-full transition-all ease-out"
            style={{
              width: particle.size,
              height: particle.size,
              background: `radial-gradient(circle, ${particle.color}, ${particle.color}88)`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}66`,
              transitionDuration: isMinimal ? '0.6s' : '1.2s',
              transitionDelay: `${particle.delay}s`,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: getParticleTransform(particle, phase),
              opacity: phase === 'waiting' ? 0.8 : 0
            }}
          />
        ))}
      </div>

      {/* Central pulse during assembly */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          phase === 'assembling' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div 
          className={`rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-ping ${
            isMinimal ? 'w-4 h-4' : 'w-8 h-8'
          }`}
          style={{ animationDuration: isMinimal ? '0.6s' : '1s' }}
        />
      </div>

      {/* Main logo */}
      <svg 
        viewBox="0 0 1080 1080" 
        className="relative z-10 w-full h-full transition-all ease-out"
        style={{
          transitionDuration: isMinimal ? '0.4s' : '0.8s',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          opacity: (phase === 'assembled' || phase === 'glowing') && !isExiting ? 1 : 0,
          transform: (phase === 'assembled' || phase === 'glowing') && !isExiting 
            ? 'scale(1)' 
            : 'scale(0.5)',
          filter: phase === 'glowing' 
            ? 'drop-shadow(0 0 30px rgba(59, 131, 246, 0.15))' 
            : 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))'
        }}
      >
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#20427f" />
            <stop offset="50%" stopColor="#20427f" />
            <stop offset="100%" stopColor="#20427f" />
          </linearGradient>
          
          <linearGradient id="shimmerGradient" x1="-100%" y1="0%" x2="200%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="transparent" />
            <animate 
              attributeName="x1" 
              values="-100%;200%" 
              dur={isMinimal ? "1.5s" : "2s"}
              repeatCount="indefinite" 
            />
            <animate 
              attributeName="x2" 
              values="0%;300%" 
              dur={isMinimal ? "1.5s" : "2s"}
              repeatCount="indefinite" 
            />
          </linearGradient>
        </defs>
        
        <path d={LOGO_PATH} fill="url(#morphGradient)" />
        
        {phase === 'glowing' && (
          <path d={LOGO_PATH} fill="url(#shimmerGradient)" />
        )}
      </svg>

      {/* Burst particles */}
      {phase === 'assembled' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(isMinimal ? 6 : 12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-burst-out"
              style={{
                background: `linear-gradient(135deg, ${i % 2 === 0 ? '#3b82f6' : '#06b6d4'}, transparent)`,
                '--angle': `${i * (isMinimal ? 60 : 30)}deg`,
                animationDelay: `${i * 0.03}s`,
                animationDuration: isMinimal ? '0.4s' : '0.6s'
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes burst-out {
          0% { 
            transform: rotate(var(--angle)) translateX(0) scale(1);
            opacity: 1;
          }
          100% { 
            transform: rotate(var(--angle)) translateX(40px) scale(0);
            opacity: 0;
          }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 15s linear infinite; }
        .animate-burst-out { animation: burst-out cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      `}</style>
    </div>
  )
}

export default LogoMorphAnimation