"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

export default function HeroSection() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(TextPlugin);

    // Wait for DOM to be fully ready
    const ctx = gsap.context(() => {
      // Initial animation sequence
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate hero background
      tl.from(".hero-bg", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      // Text reveal animation
      tl.from(
        titleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.8"
      );

      // Typing effect for subtitle
      tl.to(
        subtitleRef.current,
        {
          duration: 2,
          text: {
            value:
              "Creating innovative digital experiences with cutting-edge technology",
            delimiter: "",
          },
          ease: "none",
        },
        "-=0.3"
      );

      // Button appearance
      tl.from(
        ctaRef.current,
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
        },
        "-=0.5"
      );

      // Floating animation for hero elements (continuous)
      gsap.to(".floating", {
        y: "15px",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      // Parallax effect on scroll
      gsap.to(sectionRef.current.querySelectorAll(".parallax"), {
        y: (i, el) => (parseFloat(el.dataset.speed) || 0.1) * -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert(); // Clean up animations
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="hero-bg absolute top-0 left-0 w-full h-full bg-black">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/40 to-purple-900/40"></div>

        {/* Floating shapes with parallax effect */}
        <div
          className="parallax absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl floating"
          data-speed="0.2"
        ></div>
        <div
          className="parallax absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl floating"
          data-speed="0.3"
        ></div>
        <div
          className="parallax absolute top-2/3 left-1/2 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl floating"
          data-speed="0.15"
        ></div>
      </div>

      {/* Hero content */}
      <div className="hero-content relative z-10 text-center px-4 max-w-5xl">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-white mb-6 animate-element"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Next-Gen Portfolio Experience
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-8 h-16 animate-element"
        ></p>

        <div ref={ctaRef} className="animate-element">
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30">
            Explore My Work
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-14 rounded-full border-2 border-white/30 flex justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
