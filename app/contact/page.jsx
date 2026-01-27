// app/contact/page.jsx
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactHero from './sections/ContactHero'
import ContactSection from './sections/ContactSection'
import ContactMap from './sections/ContactMap'
import ContactCTA from './sections/ContactCTA'

export default function ContactPage() {
  return (
    <>
      
      <main className="min-h-screen bg-gray-100">
        <ContactHero />
        <ContactSection />
        <ContactMap />
        <ContactCTA />
      </main>
      <Footer />
    </>
  )
}