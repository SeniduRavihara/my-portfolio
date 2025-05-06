"use client"

// components/AboutSection.jsx
import { motion } from "framer-motion";

const AboutSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <p className="text-lg mb-4">
              Hi there! I&apos;m a passionate software engineer with a love for
              building clean, efficient, and user-friendly web applications. My
              journey into tech began during college when I built my first
              website, and I&apos;ve been hooked ever since.
            </p>
            <p className="text-lg mb-4">
              With 5+ years of experience across the full stack, I specialize in
              React-based front-end development and Node.js backends. I&apos;m
              constantly learning and exploring new technologies to stay at the
              cutting edge.
            </p>
            <p className="text-lg mb-4">
              When I&apos;m not coding, you can find me hiking, reading about new
              tech trends, or contributing to open-source projects. I believe in
              writing clean code that tells a story and delivers exceptional
              user experiences.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={fadeIn}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-1 rounded mr-3">
                  🎓
                </span>
                <span>Computer Science degree from Tech University</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-1 rounded mr-3">
                  💼
                </span>
                <span>Currently working as a Senior Developer at TechCorp</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-1 rounded mr-3">
                  🌍
                </span>
                <span>Remote worker based in Seattle, Washington</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-1 rounded mr-3">
                  🌱
                </span>
                <span>Currently learning TypeScript and GraphQL</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-1 rounded mr-3">
                  🚀
                </span>
                <span>Contributor to 5+ open source projects</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
