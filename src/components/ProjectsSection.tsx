"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create stacked card effect for projects
      const projects = gsap.utils.toArray(".project-card");

      if (projects.length > 0) {
        // Set initial positions - stacked with perspective
        gsap.set(projects, {
          position: "absolute",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          z: (i) => i * -300, // Stack them in 3D space
          opacity: (i) => 1 - i * 0.2, // Fade out as they go back
          scale: (i) => 1 - i * 0.05, // Slightly smaller as they go back
          rotationY: (i) => (i % 2 === 0 ? 3 : -3), // Slight alternating rotation
        });

        // Create the sequence as you scroll
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=" + projects.length * 300,
          pin: true,
          scrub: 1,
          animation: gsap.to(projects, {
            z: (i, target) => (projects.length - i) * 300, // Move to front
            opacity: 1,
            scale: 1,
            rotationY: 0,
            stagger: 0.5,
            ease: "power1.inOut",
          }),
        });
      }

      // Title animation
      gsap.from(".section-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Floating elements animation
      gsap.to(".floating-element", {
        y: (i) => (i % 2 === 0 ? 20 : -20),
        rotation: (i) => (i % 2 === 0 ? 10 : -10),
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  // Sample project data
  const projects = [
    {
      id: 1,
      title: "AI-Driven Portfolio",
      description:
        "Interactive portfolio with GSAP animations and AI-powered features.",
      tags: ["React", "GSAP", "AI", "TailwindCSS"],
      image: "/project1.jpg",
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description:
        "Modern e-commerce solution with real-time inventory and AR product views.",
      tags: ["Next.js", "3D", "API", "Payments"],
      image: "/project2.jpg",
    },
    {
      id: 3,
      title: "Web3 Dashboard",
      description:
        "Crypto portfolio tracker with animated data visualizations.",
      tags: ["Web3", "React", "Charts", "API"],
      image: "/project3.jpg",
    },
    {
      id: 4,
      title: "Digital Twin Application",
      description: "IoT monitoring system with real-time 3D visualization.",
      tags: ["Three.js", "IoT", "React", "WebSockets"],
      image: "/project4.jpg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900 py-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="floating-element absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-bl from-cyan-500/10 to-blue-500/10 rounded-full blur-xl"></div>

        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 gap-4 opacity-20">
          {Array(6)
            .fill()
            .map((_, i) => (
              <div key={i} className="border-l border-cyan-500/20 h-full"></div>
            ))}
          {Array(6)
            .fill()
            .map((_, i) => (
              <div
                key={i}
                className="absolute border-t border-cyan-500/20 w-full"
                style={{ top: `${i * 20}%` }}
              ></div>
            ))}
        </div>
      </div>

      {/* Section content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-16">
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Projects
          </span>
        </h2>

        {/* 3D stacked project cards */}
        <div ref={projectsRef} className="relative h-[500px] perspective-1000">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card w-full max-w-2xl mx-auto bg-gray-800/80 backdrop-blur-md rounded-xl overflow-hidden shadow-xl"
            >
              <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-30 text-9xl font-bold">
                  {project.id}
                </div>
              </div>

              <div className="p-8 text-left">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-5">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-cyan-400 text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:translate-y-[-2px]">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation indicators */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === 0 ? "bg-cyan-500" : "bg-gray-600"
              }`}
              aria-label={`Go to project ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
