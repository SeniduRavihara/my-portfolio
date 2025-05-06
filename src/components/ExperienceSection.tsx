"use client"

// components/ExperienceSection.jsx
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const ExperienceCard = ({ experience }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold">{experience.role}</h3>
          <p className="text-blue-600 dark:text-blue-400">
            {experience.company}
          </p>
        </div>
        <div className="mt-2 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{experience.period}</span>
          </div>
          <div className="flex items-center mt-1">
            <MapPin size={14} className="mr-1" />
            <span>{experience.location}</span>
          </div>
        </div>
      </div>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
        {experience.responsibilities.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {experience.technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const experiences = [
    {
      role: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      period: "Jan 2022 - Present",
      location: "Seattle, WA (Remote)",
      responsibilities: [
        "Lead a team of 5 developers in building and maintaining enterprise SaaS applications",
        "Architected and implemented microservices-based backend systems using Node.js and Express",
        "Developed React component libraries and design systems used across multiple products",
        "Improved CI/CD pipelines resulting in 40% faster deployment cycles",
        "Mentored junior developers and conducted code reviews to maintain code quality",
      ],
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "AWS", "Docker"],
    },
    {
      role: "Full Stack Developer",
      company: "WebSolutions Ltd.",
      period: "Mar 2019 - Dec 2021",
      location: "San Francisco, CA",
      responsibilities: [
        "Built responsive web applications using React and Laravel",
        "Implemented authentication and authorization systems",
        "Created RESTful APIs and integrated third-party services",
        "Optimized database queries leading to 30% improved performance",
        "Participated in agile development processes with bi-weekly sprints",
      ],
      technologies: ["React", "Laravel", "MySQL", "Redis", "AWS"],
    },
    {
      role: "Junior Web Developer",
      company: "CreativeTech Studios",
      period: "Jun 2017 - Feb 2019",
      location: "Portland, OR",
      responsibilities: [
        "Developed and maintained client websites using HTML, CSS, and JavaScript",
        "Created custom WordPress themes and plugins",
        "Collaborated with designers to implement UI/UX designs",
        "Assisted in troubleshooting and fixing bugs in existing applications",
        "Participated in client meetings and gathered requirements",
      ],
      technologies: ["JavaScript", "WordPress", "PHP", "HTML/CSS", "jQuery"],
    },
  ];

  return (
    <section id="experience" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">Work Experience</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeIn}
            >
              <ExperienceCard experience={experience} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
