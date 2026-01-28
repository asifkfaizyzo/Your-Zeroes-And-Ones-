// components/PageLoader.jsx
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { LogoMorphAnimation } from './LogoAnimation'

// ============================================
// CONFIGURATION - Set these to true/false
// ============================================
const LOADER_CONFIG = {
  enableFirstLoad: true,
  enableNavigation: false,
  firstLoadDuration: 2500,
  navigationDuration: 800,
  firstLoadLogoSize: 160,
  navigationLogoSize: 100,
}

const STATES = {
  HIDDEN: 'hidden',
  ENTERING: 'entering',
  VISIBLE: 'visible',
  EXITING: 'exiting'
}

export default function PageLoader({ children }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [loaderState, setLoaderState] = useState(
    LOADER_CONFIG.enableFirstLoad ? STATES.ENTERING : STATES.HIDDEN
  )
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [showContent, setShowContent] = useState(!LOADER_CONFIG.enableFirstLoad)
  const prevPathnameRef = useRef(pathname)
  const hasInitialized = useRef(false)

  const transitionToState = useCallback((newState) => {
    return new Promise((resolve) => {
      setLoaderState(newState)
      setTimeout(resolve, 10)
    })
  }, [])

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    if (!LOADER_CONFIG.enableFirstLoad) {
      setShowContent(true)
      setIsFirstLoad(false)
      return
    }

    const runInitialSequence = async () => {
      await transitionToState(STATES.ENTERING)
      await new Promise(resolve => setTimeout(resolve, 300))
      
      await transitionToState(STATES.VISIBLE)
      await new Promise(resolve => setTimeout(resolve, LOADER_CONFIG.firstLoadDuration))
      
      await transitionToState(STATES.EXITING)
      await new Promise(resolve => setTimeout(resolve, 600))
      
      setShowContent(true)
      await new Promise(resolve => setTimeout(resolve, 100))
      await transitionToState(STATES.HIDDEN)
      setIsFirstLoad(false)
    }

    runInitialSequence()
  }, [transitionToState])

  useEffect(() => {
    if (isFirstLoad) return
    if (!LOADER_CONFIG.enableNavigation) return
    if (pathname === prevPathnameRef.current) return
    
    prevPathnameRef.current = pathname

    const runTransitionSequence = async () => {
      setShowContent(false)
      await new Promise(resolve => setTimeout(resolve, 150))
      
      await transitionToState(STATES.ENTERING)
      await new Promise(resolve => setTimeout(resolve, 200))
      
      await transitionToState(STATES.VISIBLE)
      await new Promise(resolve => setTimeout(resolve, LOADER_CONFIG.navigationDuration))
      
      await transitionToState(STATES.EXITING)
      await new Promise(resolve => setTimeout(resolve, 400))
      
      setShowContent(true)
      await new Promise(resolve => setTimeout(resolve, 50))
      await transitionToState(STATES.HIDDEN)
    }

    runTransitionSequence()
  }, [pathname, searchParams, isFirstLoad, transitionToState])

  const getOverlayClasses = () => {
    switch (loaderState) {
      case STATES.HIDDEN:
        return 'opacity-0 pointer-events-none'
      case STATES.ENTERING:
      case STATES.VISIBLE:
        return 'opacity-100'
      case STATES.EXITING:
        return 'opacity-0'
      default:
        return 'opacity-0'
    }
  }

  const getContentClasses = () => {
    switch (loaderState) {
      case STATES.VISIBLE:
        return 'opacity-100 translate-y-0'
      case STATES.EXITING:
        return 'opacity-0 translate-y-[-20px] scale-95'
      default:
        return 'opacity-0 translate-y-4'
    }
  }

  if (!LOADER_CONFIG.enableFirstLoad && !LOADER_CONFIG.enableNavigation) {
    return <>{children}</>
  }

  const renderFullLoader = () => (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center 
                  transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${getOverlayClasses()}`}
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 50%, #e8eef5 100%)',
        visibility: loaderState === STATES.HIDDEN ? 'hidden' : 'visible'
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            opacity: loaderState === STATES.VISIBLE ? 1 : 0
          }}
        />
        
        <div 
          className={`absolute top-1/4 left-1/4 w-72 h-72 rounded-full transition-all duration-1000
                      ${loaderState === STATES.VISIBLE ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: loaderState === STATES.VISIBLE ? 'float-orb-1 8s ease-in-out infinite' : 'none'
          }}
        />
        <div 
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full transition-all duration-1000 delay-150
                      ${loaderState === STATES.VISIBLE ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          style={{
            background: 'radial-gradient(circle, rgba(15,23,42,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: loaderState === STATES.VISIBLE ? 'float-orb-2 10s ease-in-out infinite' : 'none'
          }}
        />
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full 
                      transition-all duration-1000 delay-300
                      ${loaderState === STATES.VISIBLE ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            filter: 'blur(100px)'
          }}
        />
      </div>

      <div 
        className={`relative z-10 flex flex-col items-center transition-all duration-500 
                    ease-[cubic-bezier(0.34,1.56,0.64,1)] ${getContentClasses()}`}
      >
        <div className="mb-8">
          <LogoMorphAnimation 
            size={LOADER_CONFIG.firstLoadLogoSize} 
            isExiting={loaderState === STATES.EXITING}
            invertColors={true}
          />
        </div>

        <div className="mb-6 overflow-hidden">
          <div 
            className={`transition-all duration-700 delay-200 ease-out ${
              loaderState === STATES.VISIBLE 
                ? 'translate-y-0 opacity-100' 
                : loaderState === STATES.EXITING
                ? 'translate-y-[-20px] opacity-0'
                : 'translate-y-[30px] opacity-0'
            }`}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#20427f] via-[#20427f] to-[#20427f]">
              Your Zeros And Ones
            </h1>
          </div>
        </div>

        <div 
          className={`mb-8 transition-all duration-700 delay-300 ease-out ${
            loaderState === STATES.VISIBLE 
              ? 'translate-y-0 opacity-100' 
              : loaderState === STATES.EXITING
              ? 'translate-y-[-10px] opacity-0'
              : 'translate-y-[20px] opacity-0'
          }`}
        >
          <p className="text-slate-500 text-sm tracking-widest uppercase">
            We Complete Your Zeros And Ones
          </p>
        </div>

        <div 
          className={`flex flex-col items-center gap-4 transition-all duration-500 delay-400 ${
            loaderState === STATES.VISIBLE ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#20427f] via-[#20427f] to-[#20427f] rounded-full"
              style={{
                width: loaderState === STATES.VISIBLE ? '100%' : '0%',
                transition: `width ${LOADER_CONFIG.firstLoadDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                backgroundSize: '200% 100%',
                animation: 'shimmer-bar 1.5s linear infinite'
              }}
            />
          </div>
        </div>
      </div>

      <div className={`absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-[#0f172a]/20 rounded-tl-lg
                      transition-all duration-700 ${loaderState === STATES.VISIBLE ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-[#0f172a]/20 rounded-tr-lg
                      transition-all duration-700 ${loaderState === STATES.VISIBLE ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-[#0f172a]/20 rounded-bl-lg
                      transition-all duration-700 ${loaderState === STATES.VISIBLE ? 'opacity-100' : 'opacity-0'}`} />
      <div className={`absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-[#0f172a]/20 rounded-br-lg
                      transition-all duration-700 ${loaderState === STATES.VISIBLE ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  )

  const renderMinimalLoader = () => (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center 
                  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${getOverlayClasses()}`}
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 50%, #e8eef5 100%)',
        visibility: loaderState === STATES.HIDDEN ? 'hidden' : 'visible'
      }}
    >
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full 
                    transition-all duration-500 ${loaderState === STATES.VISIBLE ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      <div 
        className={`relative z-10 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          loaderState === STATES.VISIBLE 
            ? 'opacity-100 scale-100' 
            : loaderState === STATES.EXITING 
            ? 'opacity-0 scale-90'
            : 'opacity-0 scale-110'
        }`}
      >
        <LogoMorphAnimation 
          size={LOADER_CONFIG.navigationLogoSize} 
          isExiting={loaderState === STATES.EXITING}
          isMinimal={true}
          invertColors={true}
        />
      </div>
    </div>
  )

  const shouldShowLoader = loaderState !== STATES.HIDDEN
  const showFullLoader = isFirstLoad && LOADER_CONFIG.enableFirstLoad
  const showMinimalLoader = !isFirstLoad && LOADER_CONFIG.enableNavigation

  return (
    <>
      {/* Loader */}
      {shouldShowLoader && showFullLoader && renderFullLoader()}
      {shouldShowLoader && showMinimalLoader && renderMinimalLoader()}

      {/* 
        IMPORTANT: No wrapper div with transform! 
        Transform creates a new stacking context that breaks position:fixed in children.
        Instead, render children directly and use CSS classes for animation.
      */}
      <div 
        className={`transition-opacity duration-500 ease-out ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>

      <style jsx global>{`
        @keyframes float-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.05); }
          66% { transform: translate(30px, -30px) scale(0.9); }
        }
        @keyframes shimmer-bar {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </>
  )
}