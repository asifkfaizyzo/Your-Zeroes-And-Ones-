// components/Header.js
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(false) // NEW
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 20)
      
      // Detect if we're over a dark section
      const sections = document.querySelectorAll('section, div[class*="bg-"]')
      let overDarkSection = false
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        const headerHeight = 80
        
        // Check if section intersects with header area
        if (rect.top < headerHeight && rect.bottom > 0) {
          const bgColor = window.getComputedStyle(section).backgroundColor
          const classes = section.className
          
          // Detect dark backgrounds
          if (
            classes.includes('bg-gray-900') ||
            classes.includes('bg-black') ||
            classes.includes('bg-slate-900') ||
            classes.includes('bg-zinc-900') ||
            classes.includes('bg-blue-900') ||
            classes.includes('bg-[#20427f]') ||
            bgColor.includes('rgb(0') || // Very dark colors
            bgColor.includes('rgb(17') ||
            bgColor.includes('rgb(32')
          ) {
            overDarkSection = true
          }
        }
      })
      
      setIsDarkSection(overDarkSection)
    }
    
    handleScroll() // Initial check
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/services', label: 'Services', hasDropdown: true },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
  ]

  const services = [
    {
      category: 'Branding & Design',
      href: '/services/branding-design',
      description: 'Build a memorable brand identity that resonates with your audience',
      subServices: [
        { name: 'Brand Consulting', href: '/services/branding-design/brand-consulting' },
        { name: 'Logo Design', href: '/services/branding-design/logo-design' },
        { name: 'Graphic Design', href: '/services/branding-design/graphic-design' },
        { name: '2D & 3D Visualization', href: '/services/branding-design/2d-3d-visualization' },
        { name: 'Video Production', href: '/services/branding-design/video-production' },
        { name: 'Audio Production', href: '/services/branding-design/audio-production' },
        { name: 'AI Video Production', href: '/services/branding-design/ai-video-production' }
      ]
    },
    {
      category: 'Digital Marketing',
      href: '/services/digital-marketing',
      description: 'Reach and engage your target audience across all digital channels',
      subServices: [
        { name: 'SEO', href: '/services/digital-marketing/seo' },
        { name: 'Social Media Management', href: '/services/digital-marketing/social-media-management' },
        { name: 'Performance Marketing', href: '/services/digital-marketing/performance-marketing' },
        { name: 'Content Marketing', href: '/services/digital-marketing/content-marketing' },
        { name: 'Marketing Automations', href: '/services/digital-marketing/marketing-automation' },
        { name: 'Analytics', href: '/services/digital-marketing/analytics' }
      ]
    },
    {
      category: 'Technology',
      href: '/services/technology',
      description: 'Develop cutting-edge solutions to power your digital transformation',
      subServices: [
        { name: 'AI & Machine Learning', href: '/services/technology/ai-ml' },
        { name: 'DevOps Consulting', href: '/services/technology/devops-consulting' },
        { name: 'Web Development', href: '/services/technology/web-development' },
        { name: 'Mobile App Development', href: '/services/technology/mobile-app-development' },
        { name: 'E-Commerce', href: '/services/technology/ecommerce' },
        { name: 'QA & Testing', href: '/services/technology/qa-testing' },
        { name: 'Cloud Services', href: '/services/technology/cloud-services' },
        { name: 'Data & Analytics', href: '/services/technology/data-analytics' },
        { name: 'Cyber Security', href: '/services/technology/cyber-security' }
      ]
    }
  ]

  const closeAllMenus = () => {
    setIsServicesOpen(false)
    setIsMenuOpen(false)
  }

  const isActivePath = (href) => {
    if (!mounted) return false
    if (href === '/services') return pathname?.startsWith('/services')
    return pathname === href
  }

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50">
        <nav className="w-full max-w-[1800px] mx-auto py-4" style={{
          paddingLeft: "clamp(2rem, 8vw, 12rem)",
          paddingRight: "clamp(2rem, 8vw, 12rem)",
        }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-6 w-40 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="hidden md:flex gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </nav>
      </header>
    )
  }

  // Dynamic color classes based on section
  const textColor = isDarkSection ? 'text-white' : 'text-gray-900'
  const textColorSecondary = isDarkSection ? 'text-gray-200' : 'text-gray-600'
  const hoverBg = isDarkSection ? 'hover:bg-white/10' : 'hover:bg-gray-100'
  const borderColor = isDarkSection ? 'border-white/10' : 'border-gray-200/50'
  const bgColor = scrolled 
    ? (isDarkSection ? 'bg-gray-900/80' : 'bg-white/80')
    : (isDarkSection ? 'bg-gray-900/50' : 'bg-white/50')
  const shadowColor = scrolled && !isDarkSection ? 'shadow-sm shadow-gray-200/50' : ''

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgColor} backdrop-blur-xl ${shadowColor} border-b ${borderColor}`}
      >
        <nav className="w-full max-w-[1800px] mx-auto" style={{
          paddingLeft: "clamp(2rem, 8vw, 12rem)",
          paddingRight: "clamp(2rem, 8vw, 12rem)",
        }}>
          <div className={`flex justify-between items-center transition-all duration-300 ${
            scrolled ? 'py-3' : 'py-4'
          }`}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src="/logo.svg" 
                alt="YourZerosAndOnes" 
                width={scrolled ? 36 : 44}
                height={scrolled ? 36 : 44}
                className={`object-contain transition-all duration-500 ${
                  isDarkSection ? 'brightness-0 invert' : ''
                }`}
                priority
              />
              <span className={`font-bold transition-all duration-500 ${textColor} ${
                scrolled ? 'text-base' : 'text-lg'
              }`}>
                Your Zeros and Ones
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  {item.hasDropdown ? (
                    <div 
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <button
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          isActivePath('/services') 
                            ? 'bg-[#20427f] text-white shadow-lg shadow-[#20427f]/25' 
                            : `${textColorSecondary} ${hoverBg} hover:${textColor}`
                        }`}
                      >
                        {item.label}
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Mega Menu - Always white background for readability */}
                      <div 
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 ${
                          isServicesOpen 
                            ? 'opacity-100 visible' 
                            : 'opacity-0 invisible'
                        }`}
                      >
                        <div className="w-[700px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                          <div className="flex">
                            {/* Left: Categories */}
                            <div className="w-1/3 bg-gray-50 p-4">
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                Categories
                              </p>
                              {services.map((service, idx) => (
                                <button
                                  key={service.category}
                                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                    activeService === idx 
                                      ? 'bg-[#20427f] text-white shadow-lg' 
                                      : 'text-gray-700 hover:bg-gray-100'
                                  }`}
                                  onMouseEnter={() => setActiveService(idx)}
                                >
                                  {service.category}
                                </button>
                              ))}
                              
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <Link
                                  href="/services"
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-[#20427f] font-medium hover:underline"
                                  onClick={closeAllMenus}
                                >
                                  View All Services
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </Link>
                              </div>
                            </div>
                            
                            {/* Right: Sub-services */}
                            <div className="w-2/3 p-6">
                              <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-900">
                                  {services[activeService].category}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {services[activeService].description}
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                {services[activeService].subServices.map((sub, idx) => (
                                  <Link
                                    key={idx}
                                    href={sub.href}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-[#20427f]/5 hover:text-[#20427f] transition-colors"
                                    onClick={closeAllMenus}
                                  >
                                    <svg className="w-4 h-4 text-[#20427f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                              
                              <div className="mt-6 pt-4 border-t border-gray-100">
                                <Link
                                  href={services[activeService].href}
                                  className="inline-flex items-center gap-2 text-sm font-medium text-[#20427f]"
                                  onClick={closeAllMenus}
                                >
                                  Explore {services[activeService].category}
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActivePath(item.href) 
                          ? 'bg-[#20427f] text-white shadow-lg shadow-[#20427f]/25' 
                          : `${textColorSecondary} ${hoverBg} hover:${textColor}`
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Contact Us Button */}
              <Link
                href="/contact"
                className="ml-4 bg-gradient-to-r from-[#20427f] to-[#2d5aa8] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-[#20427f]/30 transition-all hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                isDarkSection ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                  isDarkSection ? 'bg-white' : 'bg-gray-700'
                } ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                  isDarkSection ? 'bg-white' : 'bg-gray-700'
                } ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                  isDarkSection ? 'bg-white' : 'bg-gray-700'
                } ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu - Always white for readability */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-gray-100 max-h-[calc(80vh-64px)] overflow-y-auto">
            <div 
              className="py-4 space-y-2"
              style={{
                paddingLeft: "clamp(2rem, 8vw, 12rem)",
                paddingRight: "clamp(2rem, 8vw, 12rem)",
              }}
            >
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          isActivePath('/services') 
                            ? 'bg-[#20427f] text-white' 
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                      >
                        <span>{item.label}</span>
                        <svg 
                          className={`w-5 h-5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <div className={`transition-all duration-300 overflow-hidden ${
                        isServicesOpen ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                          {services.map((service) => (
                            <div key={service.category} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                              <Link
                                href={service.href}
                                className="font-semibold text-gray-900 mb-3 block"
                                onClick={closeAllMenus}
                              >
                                {service.category}
                              </Link>
                              <div className="grid grid-cols-2 gap-2">
                                {service.subServices.map((sub, idx) => (
                                  <Link
                                    key={idx}
                                    href={sub.href}
                                    className="text-sm text-gray-600 hover:text-[#20427f] py-1"
                                    onClick={closeAllMenus}
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                          <Link
                            href="/services"
                            className="block w-full text-center py-3 bg-white rounded-xl font-medium text-[#20427f] border border-gray-200"
                            onClick={closeAllMenus}
                          >
                            View All Services
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActivePath(item.href) 
                          ? 'bg-[#20427f] text-white' 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={closeAllMenus}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/contact"
                  className="block w-full text-center bg-gradient-to-r from-[#20427f] to-[#2d5aa8] text-white py-3 rounded-xl font-medium"
                  onClick={closeAllMenus}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer for fixed header */}
      <div className={`transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`} />
    </>
  )
}