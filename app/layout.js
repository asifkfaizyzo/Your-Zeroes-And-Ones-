// app/layout.js
import { Suspense } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsoleBranding from "@/components/ConsoleBranding";
import PageLoader from "@/components/PageLoader";
import { ToastContainer } from "react-toastify";
import ReCaptchaProvider from "../components/ReCaptchaProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "YourZerosAndOnes - IT Company",
  description: "Innovative IT solutions for your business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white text-black antialiased">
        <ConsoleBranding />
        <Suspense fallback={null}>
          <PageLoader>
            <ReCaptchaProvider>
              <Header />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </ReCaptchaProvider>
            <ToastContainer />
          </PageLoader>
        </Suspense>
      </body>
    </html>
  );
}