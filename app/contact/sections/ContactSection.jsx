// app/contact/sections/ContactSection.jsx
'use client'

import ContactInfo from './ContactInfo'
import ContactForm from './ContactForm'

export default function ContactSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 2xl:py-24 bg-gray-100">
      <div 
        className="w-full max-w-[1800px] mx-auto"
        style={{
          paddingLeft: 'clamp(2rem, 8vw, 12rem)',
          paddingRight: 'clamp(2rem, 8vw, 12rem)'
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  )
}