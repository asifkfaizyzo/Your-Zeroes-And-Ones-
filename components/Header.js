// components/Header.js
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { 
      href: '/services', 
      label: 'Services',
      hasDropdown: true
    },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  const services = [
    {
      category: 'Branding & Design',
      href: '/services/branding-design',
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
      subServices: [
        { name: 'Search Engine Optimization (SEO)', href: '/services/digital-marketing/seo' },
        { name: 'Social Media Management (SMM)', href: '/services/digital-marketing/social-media-management' },
        { name: 'Performance Marketing', href: '/services/digital-marketing/performance-marketing' },
        { name: 'Content Marketing', href: '/services/digital-marketing/content-marketing' },
        { name: 'Marketing Automations', href: '/services/digital-marketing/marketing-automation' },
        { name: 'Analytics', href: '/services/digital-marketing/analytics' }
      ]
    },
    {
      category: 'Technology',
      href: '/services/technology',
      subServices: [
        { name: 'AI & Machine Learning', href: '/services/technology/ai-ml' },
        { name: 'DevOps Consulting', href: '/services/technology/devops-consulting' },
        { name: 'Web Development', href: '/services/technology/web-development' },
        { name: 'Mobile App Development', href: '/services/technology/mobile-app-development' },
        { name: 'E-Commerce', href: '/services/technology/ecommerce' },
        { name: 'Quality Assurance & Testing', href: '/services/technology/qa-testing' },
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
    if (href === '/services') {
      return pathname?.startsWith('/services')
    }
    return pathname === href
  }

  // Loading skeleton with dynamic padding
  if (!mounted) {
    return (
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav 
          className="max-w-[1800px] mx-auto py-3 sm:py-4"
          style={{
            paddingLeft: 'clamp(1.5rem, 5vw, 8rem)',
            paddingRight: 'clamp(1.5rem, 5vw, 8rem)'
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 sm:w-14 md:w-16 bg-gray-200 rounded animate-pulse h-10"></div>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="md:hidden h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </nav>
      </header>
    )
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav 
        className="max-w-[1800px] mx-auto py-3 sm:py-4"
        style={{
          // 👇 ADJUST THESE VALUES AS NEEDED
          // clamp(MIN, PREFERRED, MAX)
          paddingLeft: 'clamp(2rem, 8vw, 12rem)',
          paddingRight: 'clamp(2rem, 8vw, 12rem)'
        }}
      >
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 sm:w-14 md:w-16">
              <Image 
                src="/logo.svg" 
                alt="YourZerosAndOnes" 
                width={50} 
                height={11}
                className="w-full h-auto"
                priority
              />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-gray-900 whitespace-nowrap">
              Your Zeros and Ones
            </span>
          </Link>
          
          {/* Navigation Menu - Dynamic spacing */}
          <div 
            className="hidden md:flex items-center"
            style={{
              gap: 'clamp(1.5rem, 2.5vw, 3rem)',  // Dynamic gap between nav items
              marginLeft: 'clamp(2rem, 5vw, 8rem)'  // Dynamic left margin
            }}
          >
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {item.hasDropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className={`flex items-center hover:text-[#20427f] transition-colors ${
                        isActivePath('/services') ? 'text-[#20427f] font-semibold' : 'text-gray-700'
                      }`}
                      style={{
                        fontSize: 'clamp(0.875rem, 1vw, 1rem)'  // Dynamic font size
                      }}
                    >
                      {item.label}
                      <svg 
                        className={`w-4 h-4 ml-1 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Mega Menu Dropdown */}
                    {isServicesOpen && (
                      <div 
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                        style={{
                          width: 'clamp(900px, 90vw, 750px)',  // Dynamic dropdown width
                          padding: 'clamp(1rem, 2vw, 1.5rem)'
                        }}
                      >
                        <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
                        
                        {/* Header */}
                        <div 
                          className="pb-4 border-b border-gray-100"
                          style={{
                            paddingLeft: 'clamp(0.5rem, 1vw, 1rem)',
                            paddingRight: 'clamp(0.5rem, 1vw, 1rem)'
                          }}
                        >
                          <h3 
                            className="font-bold text-gray-900"
                            style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)' }}
                          >
                            Our Services
                          </h3>
                          <p className="text-gray-600 mt-1 text-sm">
                            Comprehensive solutions for your digital needs
                          </p>
                        </div>
                        
                        {/* Services Grid */}
                        <div 
                          className="grid grid-cols-1 md:grid-cols-3 py-4"
                          style={{
                            gap: 'clamp(1rem, 2vw, 2rem)',
                            paddingLeft: 'clamp(0.5rem, 1vw, 1rem)',
                            paddingRight: 'clamp(0.5rem, 1vw, 1rem)'
                          }}
                        >
                          {services.map((service) => (
                            <div 
                              key={service.category} 
                              className="group"
                              onMouseEnter={() => setIsServicesOpen(true)}
                            >
                              <div 
                                className="block rounded-lg hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200"
                                style={{
                                  padding: 'clamp(0.75rem, 1.5vw, 1rem)'
                                }}
                              >
                                <Link
                                  href={service.href}
                                  className="flex items-start mb-4 no-underline"
                                  onClick={closeAllMenus}
                                >
                                  <h4 
                                    className="font-bold text-gray-900 group-hover:text-[#20427f] transition-colors"
                                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
                                  >
                                    {service.category}
                                  </h4>
                                </Link>
                                
                                <ul className="space-y-2">
                                  {service.subServices.map((subService, subIndex) => (
                                    <li key={subIndex}>
                                      <Link
                                        href={subService.href}
                                        className="flex items-center text-gray-600 hover:text-[#20427f] transition-colors group/subservice no-underline"
                                        onClick={closeAllMenus}
                                      >
                                        <svg 
                                          className="w-3 h-3 text-[#20427f] mr-2 flex-shrink-0 group-hover/subservice:scale-110 transition-transform" 
                                          fill="none" 
                                          stroke="currentColor" 
                                          viewBox="0 0 24 24"
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span 
                                          className="hover:underline"
                                          style={{ fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}
                                        >
                                          {subService.name}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Footer */}
                        <div 
                          className="pt-4 border-t border-gray-100"
                          style={{
                            paddingLeft: 'clamp(0.5rem, 1vw, 1rem)',
                            paddingRight: 'clamp(0.5rem, 1vw, 1rem)'
                          }}
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <p className="text-gray-600 text-sm flex-1">
                              Ready to transform your business? Let's discuss your project.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <Link
                                href="/services"
                                className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium no-underline text-center"
                                onClick={closeAllMenus}
                              >
                                View All
                              </Link>
                              <Link
                                href="/contact"
                                className="bg-[#20427f] text-white py-2 px-6 rounded-lg hover:bg-[#1a3566] transition-colors text-sm font-medium no-underline text-center"
                                onClick={closeAllMenus}
                              >
                                Get Started
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`hover:text-[#20427f] transition-colors no-underline ${
                      isActivePath(item.href) ? 'text-[#20427f] font-semibold' : 'text-gray-700'
                    }`}
                    style={{
                      fontSize: 'clamp(0.875rem, 1vw, 1rem)'  // Dynamic font size
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#20427f] hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 border-t border-gray-200">
            <div className="max-h-[80vh] overflow-y-auto py-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <div key={item.href}>
                    {item.hasDropdown ? (
                      <div className="space-y-2">
                        <button
                          className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                            isActivePath('/services') 
                              ? 'bg-[#20427f] text-white' 
                              : 'text-gray-700 hover:bg-gray-100 hover:text-[#20427f]'
                          }`}
                          onClick={() => setIsServicesOpen(!isServicesOpen)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.label}</span>
                            <svg 
                              className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                        
                        {isServicesOpen && (
                          <div className="ml-4 bg-gray-50 rounded-lg p-4">
                            <div className="space-y-4">
                              {services.map((service) => (
                                <div key={service.category} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                                  <Link
                                    href={service.href}
                                    className="block py-2 hover:text-[#20427f] transition-colors mb-2 no-underline"
                                    onClick={closeAllMenus}
                                  >
                                    <h4 className="font-bold text-gray-900 text-base">
                                      {service.category}
                                    </h4>
                                  </Link>
                                  <ul className="space-y-1">
                                    {service.subServices.map((subService, subIndex) => (
                                      <li key={subIndex}>
                                        <Link
                                          href={subService.href}
                                          className="flex items-center text-gray-600 text-sm hover:text-[#20427f] transition-colors py-1 no-underline"
                                          onClick={closeAllMenus}
                                        >
                                          <svg 
                                            className="w-2 h-2 text-[#20427f] mr-2 flex-shrink-0" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                          >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                          </svg>
                                          <span className="hover:underline">{subService.name}</span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4 mt-4 border-t border-gray-200">
                              <Link
                                href="/services"
                                className="text-center bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium no-underline"
                                onClick={closeAllMenus}
                              >
                                View All Services
                              </Link>
                              <Link
                                href="/contact"
                                className="text-center bg-[#20427f] text-white py-2 px-4 rounded-lg hover:bg-[#1a3566] transition-colors text-sm font-medium no-underline"
                                onClick={closeAllMenus}
                              >
                                Contact Us
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors no-underline ${
                          isActivePath(item.href) 
                            ? 'bg-[#20427f] text-white' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-[#20427f]'
                        }`}
                        onClick={closeAllMenus}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}