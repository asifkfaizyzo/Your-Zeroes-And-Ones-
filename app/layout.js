// app/layout.js
import { Suspense } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import ConsoleBranding from '@/components/ConsoleBranding'
import PageLoader from '@/components/PageLoader'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'YourZerosAndOnes - IT Company',
  description: 'Innovative IT solutions for your business',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white text-black antialiased">
        <ConsoleBranding />
        <Suspense fallback={null}>
          <PageLoader>
            {children}
            <ToastContainer/>
          </PageLoader>
        </Suspense>
      </body>
    </html>
  )
}