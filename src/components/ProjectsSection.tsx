"use client";
import { JSX, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Define TypeScript interfaces for our data structures
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

export default function ProjectsSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const projectsContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeProject, setActiveProject] = useState<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create a dark noise texture effect for the background
    const createNoiseEffect = (): void => {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const imgData = ctx.createImageData(200, 200);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.floor(Math.random() * 30); // Low value for subtle dark noise
        data[i] = value; // red
        data[i + 1] = value; // green
        data[i + 2] = value; // blue
        data[i + 3] = 8; // alpha (very subtle)
      }

      ctx.putImageData(imgData, 0, 0);

      if (sectionRef.current) {
        const noise = document.createElement("div");
        noise.classList.add("noise-texture");
        noise.style.position = "absolute";
        noise.style.inset = "0";
        noise.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
        noise.style.pointerEvents = "none";
        noise.style.opacity = "0.4";
        noise.style.mixBlendMode = "overlay";
        sectionRef.current.appendChild(noise);
      }
    };

    createNoiseEffect();

    const ctx = gsap.context(() => {
      // Section entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".projects-container", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      tl.from(
        ".section-title .word",
        {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.4)",
        },
        "-=0.8"
      );

      // Futuristic border animation
      gsap.to(".border-glow", {
        keyframes: [
          { backgroundPosition: "0% 0%" },
          { backgroundPosition: "100% 100%" },
        ],
        duration: 8,
        ease: "none",
        repeat: -1,
      });

      // Glowing particles animation
      const particles = gsap.utils.toArray<HTMLElement>(".particle");
      particles.forEach((particle) => {
        gsap.to(particle, {
          x: "random(-50, 50)",
          y: "random(-50, 50)",
          opacity: "random(0.3, 0.8)",
          scale: "random(0.8, 1.5)",
          duration: "random(3, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Holographic tilt effect on hover for project cards
      const projectCards = gsap.utils.toArray(".project-card");
      projectCards.forEach((card) => {
        const element = card as HTMLElement;
        const image = element.querySelector(".project-image") as HTMLElement;
        const shine = element.querySelector(".shine-effect") as HTMLElement;

        element.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const xPercent = (x / rect.width) * 100;
          const yPercent = (y / rect.height) * 100;

          // Calculate rotation based on mouse position
          const rotateY = ((xPercent - 50) / 50) * 8;
          const rotateX = ((50 - yPercent) / 50) * 8;

          gsap.to(element, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
          });

          // Parallax effect for image
          gsap.to(image, {
            x: (xPercent - 50) * 0.15,
            y: (yPercent - 50) * 0.1,
            duration: 0.5,
            ease: "power2.out",
          });

          // Shine effect follows mouse
          gsap.to(shine, {
            opacity: 0.2,
            x: xPercent + "%",
            y: yPercent + "%",
            duration: 0.5,
          });
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(element, {
            rotateX: 0,
            rotateY: 0,
            duration: 1,
            ease: "elastic.out(1, 0.8)",
          });

          gsap.to(image, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.8)",
          });

          gsap.to(shine, {
            opacity: 0,
            duration: 0.5,
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Navigate between projects with card stacking effect
  const navigateToProject = (index: number): void => {
    const projects = document.querySelectorAll(".project-card");

    if (index === activeProject) return;

    // Direction of animation
    const isNext =
      (index > activeProject &&
        !(activeProject === 0 && index === projects.length - 1)) ||
      (activeProject === projects.length - 1 && index === 0);

    // Current card animation
    gsap.to(projects[activeProject], {
      opacity: 0,
      rotationY: isNext ? -15 : 15,
      rotationX: 5,
      scale: 0.85,
      y: -20,
      zIndex: 5,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        // Reset position after animation for proper stacking next time
        gsap.set(projects[activeProject], {
          rotationY: 0,
          rotationX: 0,
          y: 0,
          scale: 1,
          zIndex: 0,
        });
      },
    });

    // Next card animation - start from bottom of stack and come to top
    gsap.fromTo(
      projects[index],
      {
        opacity: 0,
        scale: 1.1,
        y: 30,
        zIndex: 15,
        rotationX: isNext ? -10 : 10,
        rotationY: isNext ? 15 : -15,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.75,
        delay: 0.15,
        ease: "power3.out",
        clearProps: "zIndex",
      }
    );

    // Show brief flash of deck edge when changing cards
    const cardDeck = document.querySelector(".projects-deck-edge");
    if (cardDeck) {
      gsap.fromTo(
        cardDeck,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.15,
          onComplete: () => {
            gsap.to(cardDeck, { opacity: 0, duration: 0.3 });
          },
        }
      );
    }

    setActiveProject(index);
  };

  // Sample project data
  const projects: Project[] = [
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 py-16"
    >
      {/* Futuristic background elements */}
      <div className="absolute inset-0 z-0">
        {/* Dark overlay with slight noise texture */}
        <div className="absolute inset-0 bg-black/30 mix-blend-overlay"></div>

        {/* Animated grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-15">
          {Array(12)
            .fill(null)
            .map((_, i) => (
              <div
                key={`col-${i}`}
                className="border-l border-cyan-800/30 h-full"
              ></div>
            ))}
          {Array(12)
            .fill(null)
            .map((_, i) => (
              <div
                key={`row-${i}`}
                className="absolute border-t border-cyan-800/30 w-full"
                style={{ top: `${(i * 100) / 12}%` }}
              ></div>
            ))}
        </div>

        {/* Glowing particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array(20)
            .fill(null)
            .map((_, i) => (
              <div
                key={`particle-${i}`}
                className="particle absolute rounded-full blur-md"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  backgroundColor:
                    i % 3 === 0
                      ? "#0ea5e9"
                      : i % 3 === 1
                      ? "#7dd3fc"
                      : "#0284c7",
                  opacity: Math.random() * 0.5 + 0.2,
                }}
              ></div>
            ))}
        </div>

        {/* Futuristic circular elements */}
        <div className="absolute left-5 top-1/4 w-32 h-32 border border-cyan-600/40 rounded-full"></div>
        <div className="absolute left-10 top-1/4 w-32 h-32 border border-cyan-400/30 rounded-full"></div>
        <div className="absolute right-10 bottom-1/4 w-48 h-48 border border-blue-500/20 rounded-full"></div>
        <div className="absolute right-5 bottom-1/4 w-48 h-48 border border-blue-700/10 rounded-full"></div>

        {/* Diagonal accent lines */}
        <div className="absolute -bottom-10 -left-10 w-64 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent rotate-45"></div>
        <div className="absolute -top-10 -right-10 w-64 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent -rotate-45"></div>
      </div>

      {/* Section content */}
      <div className="relative z-10 container mx-auto px-6">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-16 text-center">
          {["Featured", "Projects"].map((word, i) => (
            <span key={i} className="inline-block mr-3">
              <span className="word inline-block">
                {i === 1 ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            </span>
          ))}
        </h2>

        {/* Modern project showcase */}
        <div
          ref={projectsContainerRef}
          className="projects-container relative max-w-4xl mx-auto"
        >
          {/* Futuristic border effect */}
          <div className="border-glow absolute -inset-px rounded-2xl z-0 opacity-50 bg-gradient-to-r from-cyan-600 via-blue-800 to-cyan-600 blur-sm bg-[length:400%_400%]"></div>
          {/* Inner border glow */}
          <div className="absolute inset-0 rounded-2xl z-0 border border-cyan-900/50"></div>
          {/* Accent lines in corners */}
          <div className="absolute top-0 left-0 w-16 h-px bg-cyan-500/80"></div>
          <div className="absolute top-0 left-0 h-16 w-px bg-cyan-500/80"></div>
          <div className="absolute top-0 right-0 w-16 h-px bg-cyan-500/80"></div>
          <div className="absolute top-0 right-0 h-16 w-px bg-cyan-500/80"></div>
          <div className="absolute bottom-0 left-0 w-16 h-px bg-cyan-500/80"></div>
          <div className="absolute bottom-0 left-0 h-16 w-px bg-cyan-500/80"></div>
          <div className="absolute bottom-0 right-0 w-16 h-px bg-cyan-500/80"></div>
          <div className="absolute bottom-0 right-0 h-16 w-px bg-cyan-500/80"></div>

          <div className="relative backdrop-blur-xl bg-gray-950/90 rounded-2xl p-8 border border-gray-800">
            {/* Project cards - only one visible at a time */}
            <div className="relative h-[450px] perspective-1000">
              {/* Card deck edge effect - visible briefly during transitions */}
              <div className="projects-deck-edge absolute left-0 right-0 h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bottom-0 opacity-0 z-20 blur-sm"></div>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`project-card absolute inset-0 bg-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl ${
                    index === activeProject
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <div className="shine-effect absolute w-40 h-40 bg-white rounded-full blur-3xl opacity-0 -translate-x-1/2 -translate-y-1/2 mix-blend-overlay pointer-events-none"></div>

                  <div className="flex flex-col md:flex-row h-full">
                    <div className="project-image relative w-full md:w-1/2 h-48 md:h-auto overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-purple-900">
                        {/* Project number with tech-inspired pattern */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-8xl font-bold text-white/10">
                            {project.id}
                          </div>
                          <div className="absolute inset-0 opacity-20">
                            {Array(8)
                              .fill(null)
                              .map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute h-px bg-white/50"
                                  style={{
                                    top: `${(i + 1) * 12}%`,
                                    left: "0",
                                    width: "100%",
                                    transform: `rotate(${
                                      i % 2 === 0 ? 5 : -5
                                    }deg)`,
                                  }}
                                ></div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="project-content w-full md:w-1/2 p-6 text-left flex flex-col justify-between bg-gradient-to-b from-transparent to-gray-900/50">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
                          <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                          {project.title}
                        </h3>
                        <p className="text-gray-300 mb-5">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-900/80 text-cyan-400 text-sm font-medium rounded-full border border-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="group px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:translate-y-[-2px]">
                        <span className="relative z-10">View Project</span>
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modern navigation controls */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() =>
                  navigateToProject(
                    (activeProject - 1 + projects.length) % projects.length
                  )
                }
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white border border-gray-800 hover:border-cyan-900 transition-all duration-300 relative group"
                aria-label="Previous project"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div className="flex items-center space-x-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => navigateToProject(index)}
                    className={`relative w-8 h-2 rounded-full transition-all duration-300 ${
                      index === activeProject
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 w-12"
                        : "bg-gray-800 hover:bg-gray-700 border-t border-gray-700"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  >
                    {index === activeProject && (
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-pulse opacity-50 blur-sm"></span>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  navigateToProject((activeProject + 1) % projects.length)
                }
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white border border-gray-800 hover:border-cyan-900 transition-all duration-300 relative group"
                aria-label="Next project"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
