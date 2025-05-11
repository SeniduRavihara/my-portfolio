"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const tunnelRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create the main timeline controlled by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000", // Long scroll duration
          pin: true, // Pin the section while scrolling
          scrub: 1, // Smooth scrubbing
          anticipatePin: 1,
        },
      });

      // Get the tunnel layers
      const tunnelLayers = tunnelRef.current.querySelectorAll(".tunnel-layer");

      // Create the tunnel/hall effect animation
      tl.to(
        tunnelLayers,
        {
          z: (i) => 1000 + i * 500,
          opacity: (i) => (i === 0 ? 0.3 : 0.1),
          scale: (i) => 2 + i * 0.5,
          duration: 1,
          stagger: 0.2,
          ease: "none",
        },
        0
      );

      // Experience timeline events animation
      const timelineItems = gsap.utils.toArray(".timeline-item");

      // Set initial state
      gsap.set(timelineItems, {
        opacity: 0,
        scale: 0.8,
        transformOrigin: "center center",
        z: -200,
      });

      // Animate timeline items one by one
      timelineItems.forEach((item, i) => {
        // First item starts visible
        if (i === 0) {
          gsap.set(item, { opacity: 1, scale: 1, z: 0 });
        }

        // Move each item from back to front one at a time
        if (i < timelineItems.length - 1) {
          tl.to(
            item,
            {
              opacity: 0,
              scale: 1.2,
              z: 200,
              duration: 0.15,
              ease: "power1.in",
            },
            i * 0.2
          );

          tl.fromTo(
            timelineItems[i + 1],
            { opacity: 0, scale: 0.8, z: -200 },
            { opacity: 1, scale: 1, z: 0, duration: 0.15, ease: "power1.out" },
            i * 0.2 + 0.15
          );
        }
      });

      // Animate timeline progress bar
      tl.fromTo(
        ".timeline-progress",
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "none" },
        0
      );
    });

    return () => ctx.revert();
  }, []);

  // Experience data
  const experiences = [
    {
      period: "2023 - Present",
      role: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      description:
        "Led the development of interactive web applications using Next.js, GSAP, and Three.js. Implemented advanced scroll-based animations and WebGL effects.",
    },
    {
      period: "2021 - 2023",
      role: "UI/UX Developer",
      company: "Creative Studio",
      description:
        "Created immersive digital experiences with a focus on motion design and interaction. Developed microsites and landing pages for major brands.",
    },
    {
      period: "2019 - 2021",
      role: "Frontend Developer",
      company: "Digital Agency",
      description:
        "Built responsive websites and e-commerce platforms. Integrated animations and transitions to enhance user experience and engagement.",
    },
    {
      period: "2017 - 2019",
      role: "Web Developer",
      company: "Startup Hub",
      description:
        "Developed MVPs and web applications for startups. Collaborated with designers to implement pixel-perfect interfaces with smooth animations.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* 3D Tunnel/Hall Effect */}
      <div
        ref={tunnelRef}
        className="absolute inset-0 perspective-1000 flex items-center justify-center"
      >
        {/* Multiple tunnel layers that scale and move creating the hall effect */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`tunnel-layer absolute w-full h-full transform-3d
                      ${
                        i === 0
                          ? "border-2 border-cyan-500/30"
                          : "border border-cyan-500/20"
                      } 
                      rounded-3xl`}
            style={{
              transform: `translateZ(${-i * 200}px) scale(${1 - i * 0.15})`,
              opacity: 1 - i * 0.15,
            }}
          >
            {/* Grid lines inside each tunnel layer */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
              {[...Array(64)].map((_, j) => (
                <div key={j} className="border border-cyan-500/10"></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Experience content */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
        </div>

        {/* Timeline with 3D effects */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Progress bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
            <div className="timeline-progress h-full bg-gradient-to-r from-cyan-500 to-blue-600 origin-left"></div>
          </div>

          {/* Timeline items that appear from the tunnel */}
          <div className="relative min-h-[400px] flex items-center justify-center perspective-1000">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="timeline-item absolute w-full transform-3d"
              >
                <div className="bg-gray-900/80 backdrop-blur-md rounded-xl p-8 border border-cyan-500/20 shadow-xl shadow-cyan-500/5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm">
                      {exp.period}
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold text-blue-400 mb-4">
                    {exp.company}
                  </h4>

                  <p className="text-gray-300">{exp.description}</p>

                  {/* Decorative elements */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-cyan-500"></div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-blue-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation indicator */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="text-sm text-gray-400">
              Scroll to navigate through timeline
            </span>
            <div className="w-6 h-6 rounded-full border border-cyan-500/50 flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
