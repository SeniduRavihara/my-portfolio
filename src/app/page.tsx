"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  const smootherRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Register required GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Create smooth scrolling experience with more balanced settings
    const smoother = ScrollSmoother.create({
      smooth: 0.8, // Reduced for better control
      effects: true,
      wrapper: smootherRef.current,
      content: contentRef.current,
      normalizeScroll: false, // Changed to false to avoid interference with default scrolling
      ignoreMobileResize: true,
    });

    // Set up the 3D stacking effect for sections, with improved perspective handling
    gsap.set(".section", {
      transformStyle: "preserve-3d",
      transformOrigin: "center center",
    });

    // Make sure ScrollTrigger knows the total scroll height correctly
    ScrollTrigger.refresh(true);

    // Create the hallway/stacking effect for each section with more conservative values
    const sections = gsap.utils.toArray(".section");
    sections.forEach((section, i) => {
      const nextSection = sections[i + 1];
      if (!nextSection) return;

      // Initial starting position - reduced z depth for better perspective
      gsap.set(nextSection, {
        z: -500, // Reduced from -800 for less extreme perspective
        opacity: 0.7, // Increased from 0.6 for better visibility
        scale: 0.9, // Increased from 0.85 for less dramatic scale effect
      });

      // Create the hallway motion effect with improved parameters
      ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: "bottom top",
        scrub: true, // Smoother scrubbing
        onUpdate: (self) => {
          gsap.to(nextSection, {
            z: self.progress * 500 - 500, // Reduced z-movement for better control
            opacity: 0.7 + self.progress * 0.3,
            scale: 0.9 + self.progress * 0.1,
            ease: "power1.out",
          });
        },
      });
    });

    // Parallax scrolling elements with more conservative settings
    gsap.utils.toArray(".parallax-element").forEach((element) => {
      const depth = element.dataset.depth || 0.1; // Keep default depth reasonable
      gsap.to(element, {
        y: () => window.innerHeight * depth * -0.5, // More conservative movement
        ease: "none",
        scrollTrigger: {
          trigger: element.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Elements that move horizontally with scroll - reduced speed
    gsap.utils.toArray(".horizontal-scroll").forEach((element) => {
      const direction = element.dataset.direction || 1;
      const speed = element.dataset.speed || 50; // Reduced from higher values

      gsap.to(element, {
        x: direction * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Reveal elements on scroll with optimized timing
    gsap.utils.toArray(".reveal-element").forEach((element) => {
      gsap.from(element, {
        autoAlpha: 0,
        y: 20, // Reduced from 30 for subtler movement
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Add scroll-based progress indicator
    const progressBar = document.createElement("div");
    progressBar.className =
      "fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 z-50";
    document.body.appendChild(progressBar);

    ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.to(progressBar, {
          width: `${self.progress * 100}%`,
          duration: 0.1,
          ease: "none",
        });
      },
    });

    // Important: Make sure all sections are properly included in scroll calculations
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      // Clean up all animations when component unmounts
      smoother && smoother.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (document.body.contains(progressBar)) {
        document.body.removeChild(progressBar);
      }
    };
  }, []);

  return (
    <div
      ref={smootherRef}
      id="smooth-wrapper"
      className="fixed top-0 left-0 w-full h-full overflow-hidden"
    >
      <div
        ref={contentRef}
        id="smooth-content"
        className="min-h-screen" // Ensure content has at least viewport height
      >
        {/* Background elements that move with scroll */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div
            className="parallax-element absolute top-10 left-10 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl"
            data-depth="0.1"
          ></div>
          <div
            className="parallax-element absolute top-1/3 right-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"
            data-depth="0.15"
          ></div>
          <div
            className="parallax-element absolute bottom-20 left-1/3 w-40 h-40 rounded-full bg-cyan-500/5 blur-2xl"
            data-depth="0.08"
          ></div>

          {/* Horizontal scrolling elements with reduced speed */}
          <div
            className="horizontal-scroll absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
            data-direction="1"
            data-speed="50"
          ></div>
          <div
            className="horizontal-scroll absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
            data-direction="-1"
            data-speed="80"
          ></div>
        </div>

        {/* Content sections with 3D stacking effect */}
        <section className="section min-h-screen" data-speed="1">
          <HeroSection />
        </section>

        <section className="section min-h-screen" data-speed="1">
          <AboutSection />
        </section>

        <section className="section min-h-screen" data-speed="1.2">
          <SkillsSection />
        </section>

        <section className="section min-h-screen">
          <ProjectsSection />
        </section>

        <section className="section min-h-screen">
          <ExperienceSection />
        </section>

        <section className="section min-h-screen">
          <EducationSection />
        </section>

        <section className="min-h-screen">
          <FooterSection />
        </section>
      </div>
    </div>
  );
}
