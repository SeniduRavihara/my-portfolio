"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading animation - simplified
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Adjust trigger point to be more responsive
          toggleActions: "play none none reverse",
        },
        y: 30, // Reduced y-movement
        opacity: 0,
        duration: 0.8, // Faster animation
        ease: "power2.out", // Simpler easing
      });

      // Progress bar animations - optimized
      if (skillsRef.current) {
        const skillBars = skillsRef.current.querySelectorAll(".skill-progress");
        skillBars.forEach((bar) => {
          const progressValue = bar.getAttribute("data-progress");
          const progressBar = bar.querySelector(".progress-fill");

          gsap.fromTo(
            progressBar,
            { width: "0%" },
            {
              width: `${progressValue}%`,
              duration: 1.2, // Slightly faster
              ease: "power1.out", // Simpler easing
              scrollTrigger: {
                trigger: bar,
                start: "top 85%", // Earlier trigger point
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Skill icons animation - optimized for better performance
        const skillIcons = skillsRef.current.querySelectorAll(".skill-icon");
        gsap.from(skillIcons, {
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%", // Earlier trigger point
            toggleActions: "play none none reverse",
          },
          scale: 0.8, // Less dramatic scale
          opacity: 0,
          duration: 0.6, // Faster animation
          stagger: 0.08, // Faster stagger
          ease: "back.out(1.5)", // Reduced overshoot
        });
      }

      // Make sure this section integrates properly with scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        markers: false, // Turn on for debugging
        onEnter: () => {
          // Ensure section is visible when entered
          gsap.to(sectionRef.current, { autoAlpha: 1, duration: 0.3 });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 min-h-screen bg-gradient-to-b from-gray-900 to-black relative overflow-hidden flex items-center"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl"></div>

        {/* Added grid background for visual interest */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Technical <span className="text-cyan-400">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
        </div>

        <div ref={skillsRef} className="max-w-4xl mx-auto">
          {/* Technical skills with progress bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div>
              <div className="skill-progress mb-8" data-progress="95">
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-medium text-white">
                    React.js
                  </span>
                  <span className="text-cyan-400 font-semibold">95%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="progress-fill h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full w-0"></div>
                </div>
              </div>

              <div className="skill-progress mb-8" data-progress="85">
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-medium text-white">
                    Next.js
                  </span>
                  <span className="text-cyan-400 font-semibold">85%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="progress-fill h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full w-0"></div>
                </div>
              </div>

              <div className="skill-progress" data-progress="90">
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-medium text-white">
                    JavaScript
                  </span>
                  <span className="text-cyan-400 font-semibold">90%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="progress-fill h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full w-0"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="skill-progress mb-8" data-progress="80">
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-medium text-white">GSAP</span>
                  <span className="text-cyan-400 font-semibold">80%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="progress-fill h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full w-0"></div>
                </div>
              </div>

              <div className="skill-progress mb-8" data-progress="75">
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-medium text-white">
                    Tailwind CSS
                  </span>
                  <span className="text-cyan-400 font-semibold">75%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="progress-fill h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full w-0"></div>
                </div>
              </div>

              <div className="skill-progress" data-progress="88">
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-medium text-white">
                    TypeScript
                  </span>
                  <span className="text-cyan-400 font-semibold">88%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="progress-fill h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full w-0"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Skill icons area */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 text-center">
            {[
              "HTML5",
              "CSS3",
              "Node.js",
              "MongoDB",
              "GraphQL",
              "Git",
              "Figma",
              "AWS",
              "Docker",
              "Redux",
              "Firebase",
              "Three.js",
            ].map((skill, index) => (
              <div key={index} className="skill-icon group">
                <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto flex items-center justify-center mb-3 group-hover:bg-gray-700 transition-all duration-300 transform group-hover:scale-105 shadow-lg group-hover:shadow-cyan-500/20">
                  <div className="text-2xl text-cyan-400">
                    {/* Placeholder for icon */}
                    {skill.charAt(0)}
                  </div>
                </div>
                <p className="text-gray-300 font-medium">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
