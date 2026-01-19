// app/portfolio/components/PortfolioCTA.jsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PortfolioCTA() {
  return (
    <section className="py-20 bg-white">
      <div 
        className="max-w-[1800px] mx-auto"
        style={{
          paddingLeft: 'clamp(2rem, 8vw, 12rem)',
          paddingRight: 'clamp(2rem, 8vw, 12rem)'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#20427f] to-[#0f2544] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          {/* Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Let's Work Together
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Start Your
              <br />
              <span className="text-blue-300">Next Project?</span>
            </h2>

            <p className="text-lg text-blue-100/80 max-w-2xl mx-auto mb-8">
              Let's discuss how we can bring your ideas to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-white text-[#20427f] rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  Start Your Project
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
