// app/not-found.js
import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found - 404 Error | YourZerosAndOnes',
  description: 'The page you are looking for cannot be found. Return to the homepage or explore our services.',
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#20427f]/5 via-white to-[#20427f]/10 overflow-hidden relative">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#20427f]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#20427f]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#20427f]/5 rounded-full blur-3xl" />
        
        {/* Floating Binary Numbers */}
        <div className="absolute top-[10%] left-[5%] text-[#20427f]/10 text-6xl font-mono animate-bounce">0</div>
        <div className="absolute top-[20%] right-[10%] text-[#20427f]/10 text-4xl font-mono animate-pulse">1</div>
        <div className="absolute bottom-[30%] left-[15%] text-[#20427f]/10 text-5xl font-mono animate-bounce">1</div>
        <div className="absolute bottom-[20%] right-[20%] text-[#20427f]/10 text-7xl font-mono animate-pulse">0</div>
        <div className="absolute top-[40%] left-[8%] text-[#20427f]/10 text-3xl font-mono animate-bounce">0</div>
        <div className="absolute top-[60%] right-[5%] text-[#20427f]/10 text-5xl font-mono animate-pulse">1</div>
      </div>

      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          
          {/* 404 Display */}
          <div className="relative mb-8">
            {/* Shadow layer */}
            <div className="text-[140px] sm:text-[180px] md:text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-200 select-none leading-none">
              404
            </div>
            
            {/* Main 404 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl sm:text-8xl md:text-9xl font-black text-[#20427f] drop-shadow-lg">
                404
              </span>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 border-4 border-[#20427f]/10 rounded-full animate-spin-slow" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-72 md:h-72 border-2 border-dashed border-[#20427f]/10 rounded-full animate-spin-slow-reverse" />
          </div>

          {/* Confused Face Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#20427f] to-[#1a3566] rounded-full flex items-center justify-center shadow-2xl shadow-[#20427f]/30 animate-bounce-gentle">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#20427f]/20 rounded-full animate-ping" />
              <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-[#20427f]/30 rounded-full animate-ping" style={{ animationDelay: '500ms' }} />
            </div>
          </div>

          {/* Content */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Lost in <span className="text-[#20427f]">Cyberspace</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
            Looks like this page took a wrong turn at the digital crossroads.
          </p>
          
          <p className="text-gray-500 mb-10 max-w-xl mx-auto">
            Don&apos;t worry, even the best explorers get lost sometimes. 
            Let&apos;s navigate you back to familiar territory.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/"
              className="group relative bg-[#20427f] text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-[#20427f]/30 hover:shadow-xl hover:shadow-[#20427f]/40 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center overflow-hidden"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Take Me Home
            </Link>
            
            <Link
              href="/contact"
              className="group border-2 border-[#20427f] text-[#20427f] px-8 py-4 rounded-xl font-semibold hover:bg-[#20427f] hover:text-white transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Get Help
            </Link>
          </div>

          {/* Quick Links Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-[#20427f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Navigation
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Services', href: '/services', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
                { name: 'About', href: '/about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { name: 'Portfolio', href: '/portfolio', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
                { name: 'Blog', href: '/blog', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex flex-col items-center p-4 rounded-xl hover:bg-[#20427f]/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-[#20427f]/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#20427f] group-hover:shadow-lg group-hover:shadow-[#20427f]/30 transition-all duration-300">
                    <svg className="w-6 h-6 text-[#20427f] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#20427f] transition-colors duration-300">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Fun Message */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Error Code: 404 • Page not found in the matrix
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}