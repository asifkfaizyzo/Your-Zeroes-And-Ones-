// hooks/useGSAP.js
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Hook for scroll-triggered animations
export function useScrollAnimation() {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Kill any existing animations on this element
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === element) {
        trigger.kill();
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, []);

  return elementRef;
}

// Utility to create staggered animations
export function createStaggerAnimation(
  elements,
  { fromVars, toVars, scrollTrigger, stagger = 0.1 }
) {
  return gsap.fromTo(elements, fromVars, {
    ...toVars,
    stagger,
    scrollTrigger: {
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      ...scrollTrigger,
    },
  });
}

export { gsap, ScrollTrigger };