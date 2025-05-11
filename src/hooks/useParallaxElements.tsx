"use client"

import { useEffect } from "react";

export function useParallaxElements(elements, options = {}) {
  useEffect(() => {
    if (!elements?.length) return;

    const parallaxElements = gsap.utils.toArray(elements);
    const defaultOptions = {
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      markers: false,
    };

    const mergedOptions = { ...defaultOptions, ...options };

    parallaxElements.forEach((element) => {
      const depth = element.dataset.depth || 0.2;

      gsap.to(element, {
        y: () => ScrollTrigger.maxScroll(window) * depth * -1,
        ease: "none",
        scrollTrigger: {
          trigger: element.parentElement,
          start: mergedOptions.start,
          end: mergedOptions.end,
          scrub: mergedOptions.scrub,
          markers: mergedOptions.markers,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [elements, options]);
}
