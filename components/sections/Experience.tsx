'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const experiences = [
  {
    company: 'Prachar Prashar',
    position: 'Full-Stack Developer',
    duration: 'Nov 2024 - Present',
    location: 'Purnia, India',
    description: 'Led development of scalable SaaS platforms with JWT-based authentication and OTP systems. Integrated advanced features such as role-based access control, ElasticSearch, and WebSocket communication.',
    technologies: ['Node.js', 'PostgreSQL', 'JWT', 'ElasticSearch', 'WebSocket', 'Flutter'],
    highlights: [
      'Optimized PostgreSQL queries, improving response times by 40%',
      'Developed influencer marketing and mentorship platforms',
      'Built custom Node.js APIs and Flutter mobile applications',
      'Implemented advanced RBAC and real-time communication features'
    ]
  }
];

const education = [
  {
    degree: 'Bachelor of Computer Application',
    school: 'Vidya Vihar Institute of Technology',
    duration: 'Jun 2022 - Jun 2025',
    location: 'India',
    description: 'Currently pursuing BCA with focus on modern web technologies and software development. Active in technical events and mentorship programs.',
    coursework: ['Data Structures', 'Algorithms', 'Database Systems', 'Web Development', 'Software Engineering', 'Mobile App Development']
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            My professional experience and educational background in software development.
          </p>
        </motion.div>

        {/* Experience Section */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center"
          >
            Work Experience
          </motion.h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 hidden md:block"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative mb-12 md:ml-16"
              >
                {/* Timeline dot */}
                <div className="absolute -left-20 top-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hidden md:block"></div>
                
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                        {exp.position}
                      </h4>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-2">
                        <ExternalLink size={16} />
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex flex-col sm:text-right text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar size={16} />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="mb-6">
                    <h5 className="font-semibold text-slate-900 dark:text-white mb-3">Key Achievements:</h5>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center"
          >
            Education
          </motion.h3>

          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {edu.degree}
                  </h4>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    <ExternalLink size={16} />
                    {edu.school}
                  </div>
                </div>
                <div className="flex flex-col sm:text-right text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={16} />
                    {edu.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {edu.location}
                  </div>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                {edu.description}
              </p>

              <div>
                <h5 className="font-semibold text-slate-900 dark:text-white mb-3">Relevant Coursework:</h5>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}