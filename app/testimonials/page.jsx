//Q:\PROJECTS\YourZeroesAndOnes\YZO_Main\app\testimonials\page.jsx

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TestimonialHero from "./sections/TestimonialHero";
import TestimonialWrapper from "./sections/TestimonialWrapper";

export const metadata = {
  title: "Testimonials | Kiran S Pradeep",
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen w-full">
       <Header/>
      <TestimonialHero />
      <TestimonialWrapper />
      <Footer/>
    </main>
  );
}
