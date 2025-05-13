"use client";
import { JSX, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create a timeline that's controlled by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8, // Slightly faster scrub for better response
        },
      });

      // Add animations to the timeline with more conservative ranges
      tl.fromTo(
        imageRef.current,
        { y: 50, rotation: -3 }, // Reduced movement values
        { y: -50, rotation: 3 }, // Reduced movement values
        0
      );

      // Text reveal animation synced with scroll
      if (contentRef.current) {
        const textLines =
          contentRef.current.querySelectorAll<HTMLElement>(".reveal-line");
        textLines.forEach((line, i) => {
          tl.fromTo(
            line,
            { opacity: 0, y: 30 }, // Reduced y-offset
            { opacity: 1, y: 0, duration: 0.4 }, // Faster animation
            i * 0.15 // Slightly faster stagger
          );
        });
      }

      // Animated lines that grow with scroll
      if (linesRef.current) {
        const lines = linesRef.current.querySelectorAll<HTMLElement>(".line");
        lines.forEach((line, i) => {
          tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, i * 0.2);
        });
      }

      // Create parallax effect for elements inside the section with reduced effect
      gsap.utils.toArray<HTMLElement>(".parallax-item").forEach((element) => {
        const speed = parseFloat(element.dataset.speed || "0.08"); // Reduced default speed
        gsap.to(element, {
          y: () => window.innerHeight * speed * -0.5, // More conservative movement
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });

      // Counter animation that increases as you scroll
      const counter = document.querySelector<HTMLElement>(".counter");
      if (counter) {
        const counterVal = { value: 0 };
        tl.to(
          counterVal,
          {
            value: 100,
            duration: 0.8, // Faster animation
            onUpdate: () => {
              counter.textContent = Math.round(counterVal.value) + "%";
            },
          },
          0.3
        );
      }

      // 3D rotation effect based on scroll position with reduced rotation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          // Map progress (0-1) to a smaller rotation value
          const rotationX = (progress - 0.5) * 5; // -2.5 to 2.5 degrees, reduced from -5 to 5
          gsap.set(contentRef.current, {
            rotateX: rotationX,
          });
        },
      });

      // Horizontal scrolling text with reduced speed
      gsap.to(".scrolling-text", {
        xPercent: -25, // Reduced from -50
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-black"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

        {/* Scrolling text at the bottom */}
        <div className="absolute bottom-10 left-0 whitespace-nowrap w-[200%] overflow-hidden">
          <div className="scrolling-text text-[120px] font-bold text-gray-800/10 tracking-tighter">
            CREATIVE DEVELOPER • INTERACTIVE DESIGNER • MOTION ARTIST • UI
            EXPERT • CREATIVE DEVELOPER • INTERACTIVE DESIGNER • MOTION ARTIST •
            UI EXPERT
          </div>
        </div>
      </div>

      {/* Animated lines */}
      <div ref={linesRef} className="absolute inset-0 z-10 pointer-events-none">
        <div className="line absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent origin-left"></div>
        <div className="line absolute top-1/2 right-0 w-full h-px bg-gradient-to-l from-transparent via-purple-500/30 to-transparent origin-right"></div>
        <div className="line absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent origin-left"></div>
      </div>

      {/* Main content with 3D perspective */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center perspective-800">
          {/* Text content that reveals as you scroll */}
          <div ref={contentRef} className="text-white transform-3d">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 reveal-line">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Me
              </span>
            </h2>

            <div className="space-y-4">
              <p className="text-lg text-gray-300 reveal-line">
                I craft immersive digital experiences through code and design,
                merging creativity with technical precision.
              </p>

              <p className="text-lg text-gray-300 reveal-line">
                With a passion for animation and interactive interfaces, I build
                websites that leave lasting impressions.
              </p>

              <p className="text-lg text-gray-300 reveal-line">
                My approach combines cutting-edge technologies with thoughtful
                design principles to create seamless user journeys.
              </p>
            </div>

            <div className="mt-8 reveal-line">
              <div className="flex items-center gap-4 mb-2">
                <div className="counter text-3xl font-bold text-cyan-400">
                  0%
                </div>
                <div className="text-gray-300">Client satisfaction</div>
              </div>

              <div className="flex items-center gap-6 mt-6">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:translate-y-[-2px]">
                  Learn More
                </button>

                <button className="px-6 py-3 bg-transparent border border-cyan-500/50 rounded-lg text-cyan-400 font-medium transition-all duration-300 hover:bg-cyan-500/10">
                  My Resume
                </button>
              </div>
            </div>
          </div>

          {/* Image with parallax effect */}
          <div ref={imageRef} className="relative">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden transform rotate-2 border-4 border-cyan-500/20 shadow-xl shadow-cyan-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 mix-blend-multiply"></div>

              {/* Decorative elements that move at different speeds */}
              <div
                className="parallax-item absolute -top-10 -right-10 w-32 h-32 rounded-full bg-cyan-500/30 blur-xl"
                data-speed="0.04"
              ></div>
              <div
                className="parallax-item absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-500/30 blur-xl"
                data-speed="0.06"
              ></div>

              {/* Grid decoration */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 opacity-30">
                {Array(16)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="border border-white/20 rounded-md"
                    ></div>
                  ))}
              </div>

              {/* Placeholder for profile image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl text-white/50">👨‍💻</div>
              </div>
            </div>

            {/* Floating badges that move with scroll - reduced speed */}
            <div
              className="parallax-item absolute -top-5 -left-5 px-4 py-2 bg-gray-900/80 backdrop-blur-md rounded-lg border border-cyan-500/20 shadow-lg"
              data-speed="0.08"
            >
              <div className="text-cyan-500 font-semibold">
                5+ Years Experience
              </div>
            </div>

            <div
              className="parallax-item absolute -bottom-5 -right-5 px-4 py-2 bg-gray-900/80 backdrop-blur-md rounded-lg border border-purple-500/20 shadow-lg"
              data-speed="0.07"
            >
              <div className="text-purple-500 font-semibold">
                50+ Projects Completed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
