// app/contact/sections/ContactCTA.jsx
'use client'

export default function ContactCTA() {
  const ctaButtons = [
    {
      href: 'tel:+919605305453',
      label: 'Call Now',
      primary: true,
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      href: 'mailto:info@yourzerosandones.com',
      label: 'Send Email',
      primary: false,
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 2xl:py-24 bg-gradient-to-br from-[#203E7F] to-cyan-600 relative overflow-hidden">
      {/* Background Decorations */}
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
          {ctaButtons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 group ${
                button.primary
                  ? 'bg-white text-[#203E7F] hover:bg-gray-100 shadow-lg hover:shadow-xl'
                  : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#203E7F]'
              }`}
            >
              {button.icon}
              {button.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}