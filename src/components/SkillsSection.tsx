"use client"

// components/SkillsSection.jsx
import { motion } from "framer-motion";

const SkillCard = ({ title, icon, color, skills }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <span
          className={`bg-${color}-100 dark:bg-${color}-900 text-${color}-600 dark:text-${color}-400 p-2 rounded mr-3`}
        >
          {icon}
        </span>
        {title}
      </h3>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{skill.name}</span>
            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`bg-${color}-600 dark:bg-${color}-400 h-2 rounded-full`}
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const SkillsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const skills = {
    frontend: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 80 },
    ],
    backend: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 85 },
      { name: "Laravel", level: 75 },
      { name: "Python", level: 70 },
      { name: "API Development", level: 90 },
    ],
    database: [
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Firebase", level: 90 },
      { name: "PostgreSQL", level: 75 },
      { name: "Redis", level: 65 },
    ],
    devops: [
      { name: "Git", level: 95 },
      { name: "Docker", level: 80 },
      { name: "CI/CD", level: 85 },
      { name: "AWS", level: 70 },
      { name: "Vercel", level: 90 },
    ],
  };

  return (
    <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeIn}
          >
            <SkillCard
              title="Frontend"
              icon="🎨"
              color="purple"
              skills={skills.frontend}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <SkillCard
              title="Backend"
              icon="⚙️"
              color="green"
              skills={skills.backend}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            variants={fadeIn}
          >
            <SkillCard
              title="Databases"
              icon="🗄️"
              color="blue"
              skills={skills.database}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={fadeIn}
          >
            <SkillCard
              title="DevOps & Tools"
              icon="🛠️"
              color="orange"
              skills={skills.devops}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
