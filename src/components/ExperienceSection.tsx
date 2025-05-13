"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Define experience data type
interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const ctx = gsap.context(() => {
      // Create main section animation
      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          backgroundColor: "#050816",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          duration: 1,
        });
      }

      // Get timeline items and dots
      const timelineItems = gsap.utils.toArray(".timeline-item");
      const timelineDots = gsap.utils.toArray(".timeline-dot");

      // Set initial state - all cards and dots visible but dots not highlighted
      gsap.set(timelineItems, { opacity: 1 });
      gsap.set(timelineDots, {
        scale: 1,
        backgroundColor: "#4338ca",
        boxShadow: "0 0 10px rgba(67, 56, 202, 0.5)",
      });

      // Highlight first dot by default
      gsap.set(timelineDots[0] as Element, {
        scale: 1.5,
        backgroundColor: "#00FFFF",
        boxShadow: "0 0 20px rgba(0, 255, 255, 0.7)",
      });

      // Initialize progress bar to first position
      gsap.set(".timeline-progress", {
        height: `${(1 / timelineItems.length) * 100}%`,
      });

      // Create separate scroll triggers for each timeline item
      timelineItems.forEach((item, index) => {
        // Create scroll trigger for this item
        ScrollTrigger.create({
          trigger: item as Element,
          start: "top center", // Adjusted for better alignment
          end: "bottom center", // Adjusted for better triggering area
          onEnter: () => {
            highlightDot(index, timelineDots as Element[]);
            updateProgress(index, timelineItems.length);
            setActiveIndex(index);
          },
          onEnterBack: () => {
            highlightDot(index, timelineDots as Element[]);
            updateProgress(index, timelineItems.length);
            setActiveIndex(index);
          },
          markers: false, // Set to true for debugging
        });
      });

      // Function to highlight the correct dot
      function highlightDot(index: number, dots: Element[]) {
        // Reset all dots
        gsap.to(dots, {
          scale: 1,
          backgroundColor: "#4338ca",
          boxShadow: "0 0 10px rgba(67, 56, 202, 0.5)",
          duration: 0.3,
        });

        // Highlight the active dot
        gsap.to(dots[index], {
          scale: 1.5,
          backgroundColor: "#00FFFF",
          boxShadow: "0 0 20px rgba(0, 255, 255, 0.7)",
          duration: 0.5,
        });
      }

      // Function to update progress bar
      function updateProgress(index: number, total: number) {
        const progress = ((index + 1) / total) * 100;
        gsap.to(".timeline-progress", {
          height: `${progress}%`,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }

      // Make dots clickable
      timelineDots.forEach((dot, i) => {
        if (dot instanceof HTMLElement) {
          dot.addEventListener("click", () => {
            // Get the position of the related timeline item
            const targetItem = timelineItems[i];
            if (targetItem instanceof HTMLElement) {
              gsap.to(window, {
                duration: 0.8,
                scrollTo: {
                  y: targetItem,
                  offsetY: window.innerHeight / 2 - targetItem.offsetHeight / 2,
                },
                ease: "power2.inOut",
              });
            }
          });
        }
      });

      // Background grid animation
      const gridTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current as Element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gridTl.to(
        ".grid-line-h",
        {
          scaleX: 1.2,
          opacity: 0.6,
          stagger: 0.1,
          ease: "power1.inOut",
        },
        0
      );

      gridTl.to(
        ".grid-line-v",
        {
          scaleY: 1.2,
          opacity: 0.6,
          stagger: 0.1,
          ease: "power1.inOut",
        },
        0
      );

      // Floating particles animation
      const particles = gsap.utils.toArray<HTMLElement>(".particle");
      particles.forEach((particle) => {
        gsap.to(particle, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          rotation: "random(-180, 180)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Experience data
  const experiences: Experience[] = [
    {
      period: "2023 - Present",
      role: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      description:
        "Led the development of interactive web applications using Next.js, GSAP, and Three.js. Implemented advanced scroll-based animations and WebGL effects.",
      skills: ["Next.js", "GSAP", "Three.js", "React", "WebGL"],
    },
    {
      period: "2021 - 2023",
      role: "UI/UX Developer",
      company: "Creative Studio",
      description:
        "Created immersive digital experiences with a focus on motion design and interaction. Developed microsites and landing pages for major brands.",
      skills: ["Framer Motion", "CSS Animation", "User Experience", "Figma"],
    },
    {
      period: "2019 - 2021",
      role: "Frontend Developer",
      company: "Digital Agency",
      description:
        "Built responsive websites and e-commerce platforms. Integrated animations and transitions to enhance user experience and engagement.",
      skills: [
        "JavaScript",
        "CSS3",
        "Responsive Design",
        "Shopify",
        "WordPress",
      ],
    },
    {
      period: "2017 - 2019",
      role: "Web Developer",
      company: "Startup Hub",
      description:
        "Developed MVPs and web applications for startups. Collaborated with designers to implement pixel-perfect interfaces with smooth animations.",
      skills: ["HTML5", "jQuery", "Bootstrap", "SASS", "PHP"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 overflow-hidden bg-black transition-colors duration-1000"
    >
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="relative w-full h-full">
          {/* Horizontal grid lines */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="grid-line-h absolute h-px w-full bg-cyan-500 opacity-20"
              style={{ top: `${i * 8}%`, left: 0, transformOrigin: "center" }}
            ></div>
          ))}

          {/* Vertical grid lines */}
          {[...Array(12)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="grid-line-v absolute w-px h-full bg-indigo-500 opacity-20"
              style={{ left: `${i * 8}%`, top: 0, transformOrigin: "center" }}
            ></div>
          ))}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={`p-${i}`}
            className="particle absolute w-1 h-1 rounded-full bg-blue-500"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.7)",
            }}
          ></div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-2">
            <span className="px-3 py-1 text-sm font-medium text-cyan-400 bg-cyan-900/30 rounded-full backdrop-blur-sm">
              MY JOURNEY
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Work </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Experience
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore my professional journey through interactive timeline
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Vertical Timeline */}
            <div className="hidden md:block md:w-1/5 relative">
              {/* Timeline line with progress */}
              <div className="absolute top-0 left-4 w-1 h-full bg-gray-700">
                <div className="timeline-progress absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 to-blue-600"></div>
              </div>
            </div>

            {/* Right: Timeline Items */}
            <div className="w-full md:w-4/5">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`timeline-item relative mb-16 ${
                    activeIndex === index ? "active" : ""
                  }`}
                >
                  {/* Timeline dot for each item */}
                  <div className="hidden md:block absolute -left-[11.5%] top-0 transform -translate-x-1/2">
                    <div
                      className={`timeline-dot z-10 w-4 h-4 rounded-full bg-indigo-700 
                                border-2 border-indigo-400 cursor-pointer transition-all duration-300
                                ${
                                  activeIndex === index
                                    ? "scale-150 !bg-cyan-400"
                                    : ""
                                }`}
                    ></div>

                    {/* Year label */}
                    <div className="absolute left-8 top-0 whitespace-nowrap">
                      <span
                        className={`font-mono text-sm transition-colors ${
                          activeIndex === index
                            ? "text-cyan-300"
                            : "text-cyan-500"
                        }`}
                      >
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`timeline-details bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden border shadow-xl transition-all duration-500 
                                ${
                                  activeIndex === index
                                    ? "border-cyan-500/50 shadow-cyan-900/30 transform md:scale-105"
                                    : "border-gray-800"
                                }`}
                  >
                    <div className="relative p-6">
                      {/* Mobile period display */}
                      <div className="md:hidden mb-2">
                        <span className="text-cyan-400 font-mono text-sm">
                          {exp.period}
                        </span>
                      </div>

                      {/* Company and Role */}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                        {exp.role}
                      </h3>
                      <h4 className="text-lg md:text-xl font-medium text-cyan-400 mb-3">
                        {exp.company}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-300 mb-4">{exp.description}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-indigo-900/40 text-indigo-300 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full"></div>
                    </div>

                    {/* Bottom indicator bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation hint */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800">
            <svg
              className="w-4 h-4 text-cyan-400 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
            <span className="text-sm text-gray-400">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
