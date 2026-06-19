// app/testimonials/page.jsx
import TestimonialHero from "./sections/TestimonialHero";
import TestimonialWrapper from "./sections/TestimonialWrapper";

export const metadata = {
  title: "Testimonials | YourZerosAndOnes",
};

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen w-full bg-[#060010]">
      <TestimonialHero />
      <TestimonialWrapper />
    </main>
  );
}