// components/home/TestimonialsSection/TestimonialsGrid.jsx
"use client";

import VideoTestimonialCard from "./VideoTestimonialCard";
import QuoteTestimonialCard from "./QuoteTestimonialCard";

export default function TestimonialsGrid({ testimonials, isMobile }) {
  // Calculate grid classes based on number of testimonials
  const getGridClasses = () => {
    const count = testimonials.length;
    if (count === 1) return "grid-cols-1 max-w-sm mx-auto";
    if (count === 2) return "grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto";
    if (count === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  return (
    <div className={`grid ${getGridClasses()} gap-5 lg:gap-6`}>
      {testimonials.map((testimonial, index) => {
        const hasVideo = !!(testimonial.videoUrl && testimonial.thumbnailUrl);
        return hasVideo ? (
          <VideoTestimonialCard 
            key={testimonial._id || index} 
            testimonial={testimonial} 
            isMobile={isMobile} 
          />
        ) : (
          <QuoteTestimonialCard 
            key={testimonial._id || index} 
            testimonial={testimonial} 
            index={index} 
          />
        );
      })}
    </div>
  );
}