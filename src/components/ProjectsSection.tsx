"use client"

// components/ProjectsSection.jsx
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
        <Image
          fill
          src={project.image || "/api/placeholder/600/400"}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          {project.badges.map((badge, index) => (
            <span
              key={index}
              className={`bg-${badge.color}-100 dark:bg-${badge.color}-900 text-${badge.color}-600 dark:text-${badge.color}-400 text-xs px-2 py-1 rounded`}
            >
              {badge.text}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          {project.demo && (
            <a
              href={project.demo}
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink size={16} className="mr-1" /> Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              className="flex items-center text-gray-600 dark:text-gray-400 hover:underline"
            >
              <Github size={16} className="mr-1" /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A complete e-commerce solution with product management, cart functionality, and payment processing using Stripe.",
      image: "/api/placeholder/600/400",
      badges: [
        { text: "Full Stack", color: "blue" },
        { text: "React", color: "green" },
      ],
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      demo: "#",
      github: "#",
    },
    {
      title: "Task Management App",
      description:
        "A responsive task manager with drag-and-drop interface, reminders, and collaborative features.",
      image: "/api/placeholder/600/400",
      badges: [
        { text: "Frontend", color: "purple" },
        { text: "Mobile", color: "yellow" },
      ],
      technologies: ["React", "Firebase", "Tailwind CSS"],
      demo: "#",
      github: "#",
    },
    {
      title: "Real Estate Dashboard",
      description:
        "An analytics dashboard for real estate agents with property management and client tracking.",
      image: "/api/placeholder/600/400",
      badges: [
        { text: "Dashboard", color: "red" },
        { text: "SaaS", color: "indigo" },
      ],
      technologies: ["React", "Node.js", "Express", "Chart.js"],
      demo: "#",
      github: "#",
    },
    {
      title: "Social Media App",
      description:
        "A social platform with real-time chat, post management, and user profiles.",
      image: "/api/placeholder/600/400",
      badges: [
        { text: "Full Stack", color: "blue" },
        { text: "Real-time", color: "green" },
      ],
      technologies: ["React", "Socket.io", "Express", "MongoDB"],
      demo: "#",
      github: "#",
    },
    {
      title: "Recipe Finder",
      description:
        "A web app to discover recipes based on available ingredients with favoriting and meal planning.",
      image: "/api/placeholder/600/400",
      badges: [
        { text: "Frontend", color: "purple" },
        { text: "API", color: "teal" },
      ],
      technologies: ["React", "Redux", "Spoonacular API"],
      demo: "#",
      github: "#",
    },
    {
      title: "Fitness Tracker",
      description:
        "A fitness tracking application with workout plans, progress graphs, and social features.",
      image: "/api/placeholder/600/400",
      badges: [
        { text: "Mobile", color: "yellow" },
        { text: "Health", color: "pink" },
      ],
      technologies: ["React Native", "Firebase", "Redux"],
      demo: "#",
      github: "#",
    },
  ];

  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one was carefully crafted
            to solve specific problems and showcase my skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeIn}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
