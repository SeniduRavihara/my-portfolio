"use client";

import { useEffect } from "react";

export function useStackingSectionsEffect(sections) {
  useEffect(() => {
    if (!sections.length) return;

    // Set 3D properties on all sections
    gsap.set(sections, {
      transformStyle: "preserve-3d",
      transformOrigin: "center center",
    });

    // Create the section-to-section transitions
    sections.forEach((section, i) => {
      const nextSection = sections[i + 1];
      if (!nextSection) return;

      // Set initial state of next section
      gsap.set(nextSection, {
        z: -1000,
        opacity: 0.6,
        scale: 0.8,
      });

      // Create scroll trigger for the transition
      ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(nextSection, {
            z: self.progress * 900 - 1000,
            opacity: 0.6 + self.progress * 0.4,
            scale: 0.8 + self.progress * 0.2,
            ease: "none",
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [sections]);
}
