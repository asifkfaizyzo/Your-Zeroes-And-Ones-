// app/page.js
"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  HeroSection,
  StatsSection,
  ServicesSection,
  ClientsSection,
  ProcessSection,
  TestimonialsSection,
  CTASection,
} from "../components/landingpages";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white overflow-hidden">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <ClientsSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />

      <style jsx global>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow {
          0%,100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }

        @keyframes twinkle {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }

        @keyframes bounce-slow {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes blob {
          0% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
          100% { transform: translate(0,0) scale(1); }
        }

        @keyframes gradient-x {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%,100% { transform: translate(0,0); }
          25% { transform: translate(10px,-20px); }
          50% { transform: translate(-10px,-10px); }
          75% { transform: translate(5px,-30px); }
        }

        @keyframes float-delayed {
          0%,100% { transform: translate(0,0); }
          33% { transform: translate(-15px,-25px); }
          66% { transform: translate(15px,-15px); }
        }

        @keyframes float-slow {
          0%,100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-40px) scale(1.05); }
        }

        .animate-scale-in { animation: scale-in .5s ease-out forwards; }
        .animate-fade-in { animation: fade-in .3s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up .6s ease-out forwards; }
        .animate-slide-up { animation: slide-up .5s ease-out forwards; }

        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }

        .animate-progress { animation: progress linear forwards; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-float { animation: float 12s ease-in-out infinite; }
        .animate-float-delayed {
          animation: float-delayed 15s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
          animation-delay: 4s;
        }

        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        .line-clamp-2,
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 { -webkit-line-clamp: 2; }
        .line-clamp-3 { -webkit-line-clamp: 3; }
      `}</style>
    </>
  );
}