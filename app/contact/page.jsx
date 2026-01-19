// app/contact/page.jsx
'use client'

import { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactHero from './sections/ContactHero'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const recaptchaRef = useRef()

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (submitStatus) {
      setSubmitStatus(null)
    }
  }

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token)
  }

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null)
  }

  const handleRecaptchaError = () => {
    setRecaptchaToken(null)
    setSubmitStatus({ 
      type: 'error', 
      message: 'reCAPTCHA failed to load. Please refresh the page and try again.' 
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!recaptchaToken) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please complete the reCAPTCHA verification.' 
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: data.message || 'Thank you for your message! We will get back to you soon.' 
        })
        setFormData({ name: '', email: '', phone: '', message: '' })
        setRecaptchaToken(null)
        recaptchaRef.current?.reset()
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: data.error || 'Something went wrong. Please try again.' 
        })
        setRecaptchaToken(null)
        recaptchaRef.current?.reset()
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      })
      setRecaptchaToken(null)
      recaptchaRef.current?.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/yourzerosandones/',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/yourzerosandone',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/your-zeros-and-ones/',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/yourzerosandones',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@YOURZEROSANDONES',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100">
        {/* Hero Section */}
        <ContactHero />

        {/* Main Contact Section - ✅ UPDATED PADDING */}
        <section className="py-12 sm:py-16 lg:py-20 2xl:py-24 bg-gray-100">
          <div 
            className="w-full max-w-[1800px] mx-auto"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              
              {/* Left Side - Info & Social */}
              <div className="lg:col-span-2 space-y-8">

                {/* Intro */}
                <div>
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white text-xs font-semibold rounded-full mb-3">
                    Get In Touch
                  </span>
                </div>

                {/* Contact Details Section */}
                <div className="space-y-6">

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-[#203E7F]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 text-base">Address</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        1st floor, Valentine Estate,<br />
                        Palachuvadu, Kakkanad,<br />
                        Kochi - Kerala 682030
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-[#203E7F]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28l1.498 4.493-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257 4.493 1.498V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6z" />
                      </svg>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 text-base">Phone</h4>
                      <p className="text-gray-600 text-sm">+91 96053 05453</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-[#203E7F]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 text-base">Email</h4>
                      <p className="text-gray-600 text-sm">info@yourzerosandones.com</p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-[#203E7F]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 text-base">Business Hours</h4>
                      <p className="text-gray-600 text-sm">
                        Monday – Friday: 9 AM – 6 PM<br />
                        Saturday: 10 AM – 4 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>

                </div>

                {/* Social Media Section */}
                <div className="bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-xl p-5 text-white max-w-sm">
                  <h3 className="text-lg font-bold mb-2">Follow Us</h3>

                  <p className="text-cyan-100 text-xs mb-4">
                    Stay connected for the latest updates, tips, and behind-the-scenes content.
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 backdrop-blur-sm hover:bg-white hover:text-[#203E7F] p-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                      >
                        <span className="w-5 h-5 block">{social.icon}</span>
                      </a>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Side - Contact Form */}
              <div className="lg:col-span-3 max-w-lg w-full lg:justify-self-end">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-7 border border-gray-100 relative overflow-hidden">

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-[#203E7F]/5 to-cyan-600/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-600/5 to-[#203E7F]/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                  {/* Header */}
                  <div className="relative pt-5 pb-5">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                      Send us a Message
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">
                      Fill out the form below and we'll respond soon.
                    </p>

                    {/* Status Messages */}
                    {submitStatus && (
                      <div className={`mb-4 p-4 rounded-lg ${
                        submitStatus.type === 'success' 
                          ? 'bg-green-50 text-green-800 border border-green-200' 
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        {submitStatus.message}
                      </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="group">
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Full Name <span className="text-cyan-600">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </span>
                            <input
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#203E7F] focus:ring-2 focus:ring-[#203E7F]/20 bg-gray-50 focus:bg-white transition-all outline-none"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="group">
                          <label className="block text-xs font-semibold text-gray-700 mb-1">
                            Email Address <span className="text-cyan-600">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5z" />
                              </svg>
                            </span>
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#203E7F] focus:ring-2 focus:ring-[#203E7F]/20 bg-gray-50 focus:bg-white transition-all outline-none"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="group">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Phone Number <span className="text-gray-400">(Optional)</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28l1.498 4.493-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257 4.493 1.498V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6z" />
                            </svg>
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#203E7F] focus:ring-2 focus:ring-[#203E7F]/20 bg-gray-50 focus:bg-white transition-all outline-none"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="group">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Your Message <span className="text-cyan-600">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </span>
                          <textarea
                            name="message"
                            rows="4"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-[#203E7F] focus:ring-2 focus:ring-[#203E7F]/20 bg-gray-50 focus:bg-white transition-all resize-none outline-none"
                            placeholder="Tell us about your project..."
                          ></textarea>
                        </div>
                      </div>

                      {/* reCAPTCHA */}
                      <div className="flex justify-center">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={recaptchaSiteKey}
                          onChange={handleRecaptchaChange}
                          onExpired={handleRecaptchaExpired}
                          onErrored={handleRecaptchaError}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting || !recaptchaToken}
                        className="w-full bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white py-3 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>

                    </form>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Map Section - ✅ UPDATED PADDING */}
        <section className="py-12 sm:py-16 lg:py-20 2xl:py-24 bg-white">
          <div 
            className="w-full max-w-[1800px] mx-auto"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#203E7F] to-cyan-600 text-white text-sm font-semibold rounded-full mb-4">
                Our Location
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Find Us on the Map</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Visit our office in Kochi, Kerala. We're always happy to welcome you for a face-to-face meeting.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              {/* Embedded Google Map */}
              <div className="w-full h-80 sm:h-96 md:h-[500px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.2003707053705!2d76.33152317354087!3d10.000301373032597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d00333dc3a7%3A0xb8356b0fecc175f9!2sYour%20Zeroes%20And%20Ones!5e0!3m2!1sen!2sin!4v1765018689443!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Your Zeros and Ones Office Location"
                  className="absolute inset-0"
                />
                
                {/* Overlay Card */}
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm z-10">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#203E7F] to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Your Zeros and Ones</h3>
                        <p className="text-gray-600 text-sm mb-3">
                          1st floor, Valentine Estate,<br />
                          Palachuvadu, Kakkanad,<br />
                          Kochi - Kerala 682030
                        </p>
                        <a
                          href="https://maps.app.goo.gl/RVzAFMLAYKR6dE8z6?g_st=iw"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#203E7F] hover:text-cyan-600 font-semibold text-sm transition-colors group"
                        >
                          <span>Get Directions</span>
                          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Badge */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg z-10">
                  <span className="text-sm font-semibold text-[#203E7F] flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Kochi, Kerala
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - ✅ UPDATED PADDING */}
        <section className="py-12 sm:py-16 lg:py-20 2xl:py-24 bg-gradient-to-br from-[#203E7F] to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
          </div>

          <div 
            className="relative w-full max-w-[1800px] mx-auto text-center"
            style={{
              paddingLeft: 'clamp(2rem, 8vw, 12rem)',
              paddingRight: 'clamp(2rem, 8vw, 12rem)'
            }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg sm:text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Let's work together to bring your vision to life. Our team is excited to hear about your ideas and help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919605305453"
                className="inline-flex items-center justify-center bg-white text-[#203E7F] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
              <a
                href="mailto:info@yourzerosandones.com"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#203E7F] transition-all duration-300 hover:scale-105 group"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  )
}
