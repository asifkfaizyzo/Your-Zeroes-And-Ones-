// app/not-found.js
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

// ✅ Metadata should be at the top, before the component
export const metadata = {
  title: 'Page Not Found - 404 Error | YourZerosAndOnes',
  description: 'The page you are looking for cannot be found. Return to the homepage or explore our services.',
}

export default function NotFound() {
  return (
    <>
      
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-[#20427f]/10 via-white to-[#20427f]/5 py-6">
          <div className="max-w-4xl mx-auto px-6 text-center">
            {/* Animated 404 Number */}
            <div className="relative mb-8">
              <div className="text-[180px] md:text-[240px] font-bold text-gray-900 opacity-10 select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl md:text-9xl font-bold text-[#20427f]">
                  404
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Page Not Found
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Oops! The page you&apos;re looking for seems to have wandered off. 
              Let&apos;s get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/"
                className="bg-[#20427f] text-white px-8 py-4 rounded-lg hover:bg-[#1a3566] transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Homepage
              </Link>
              <Link
                href="/contact"
                className="border border-[#20427f] text-[#20427f] px-8 py-4 rounded-lg hover:bg-[#20427f]/5 transition-all duration-200 font-medium flex items-center justify-center"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>
       
    </>
  )
}