"use client";

// components/EducationSection.tsx
import { motion } from "framer-motion";

const educationData = [
  {
    degree: "Bachelor of Science in Software Engineering",
    university: "University of Technology",
    location: "San Francisco, CA",
    duration: "2022 - Present",
    gpa: "3.9 / 4.0",
    courses: [
      "Data Structures",
      "Web Development",
      "AI Fundamentals",
      "Cloud Computing",
    ],
    logo: "/images/uoft-logo.png",
  },
  {
    degree: "High School Diploma in Computer Science",
    university: "Tech High School",
    location: "Los Angeles, CA",
    duration: "2018 - 2022",
    gpa: "4.0 / 4.0",
    courses: ["Programming Basics", "Mathematics", "Physics"],
    logo: "/images/highschool-logo.png",
  },
];

function EducationSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">🎓 Education</h2>
        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-6 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 relative group"
            >
              {/* Logo */}
              <div className="w-16 h-16 flex-shrink-0">
                {/* <Image
                  fill
                  src={edu.logo}
                  alt={edu.university}
                  className="rounded-full w-full h-full object-cover border border-gray-200 dark:border-gray-700"
                /> */}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{edu.degree}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  {edu.university}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {edu.location} • {edu.duration}
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">GPA:</span> {edu.gpa}
                </p>
                <div className="mt-3">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Relevant Courses:
                  </span>
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {edu.courses.map((course, i) => (
                      <li
                        key={i}
                        className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md"
                      >
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Decorative Line (for timeline look) */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900 hidden md:block"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
