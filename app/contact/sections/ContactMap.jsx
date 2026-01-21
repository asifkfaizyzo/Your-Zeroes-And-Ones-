// app/contact/sections/ContactMap.jsx
'use client'

export default function ContactMap() {
  return (
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
  )
}