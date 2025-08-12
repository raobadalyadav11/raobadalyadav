'use client';

import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React.js', level: 90, color: 'from-blue-500 to-cyan-500' },
      { name: 'Next.js', level: 95, color: 'from-slate-700 to-slate-900' },
      { name: 'TypeScript', level: 85, color: 'from-blue-600 to-blue-800' },
      { name: 'Flutter', level: 80, color: 'from-blue-400 to-blue-600' },
      { name: 'JavaScript', level: 90, color: 'from-yellow-400 to-yellow-600' },
    ]
  },
  {
    title: 'Backend & Database',
    skills: [
      { name: 'Node.js', level: 95, color: 'from-green-500 to-green-700' },
      { name: 'PostgreSQL', level: 90, color: 'from-blue-700 to-blue-900' },
      { name: 'Prisma ORM', level: 85, color: 'from-indigo-500 to-indigo-700' },
      { name: 'MongoDB', level: 80, color: 'from-green-600 to-green-800' },
      { name: 'Redis', level: 75, color: 'from-red-500 to-red-700' },
    ]
  },
  {
    title: 'DevOps & Architecture',
    skills: [
      { name: 'Microservices', level: 85, color: 'from-purple-500 to-purple-700' },
      { name: 'Docker', level: 80, color: 'from-blue-500 to-blue-700' },
      { name: 'WebSocket/WebRTC', level: 85, color: 'from-green-500 to-teal-600' },
      { name: 'JWT Auth', level: 90, color: 'from-orange-500 to-orange-700' },
      { name: 'GitHub Actions', level: 75, color: 'from-gray-700 to-gray-900' },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 group"
            >
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center group-hover:text-gradient transition-all duration-300">
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: categoryIndex * 0.2 + skillIndex * 0.1 
                    }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ 
                          duration: 1.2, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                          ease: "easeOut"
                        }}
                        viewport={{ once: true }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Technologies I Work With
          </h3>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              'Next.js', 'React.js', 'Node.js', 'TypeScript', 'JavaScript', 'Flutter',
              'PostgreSQL', 'MongoDB', 'Prisma ORM', 'Redis', 'REST APIs', 'Express.js',
              'Microservices', 'WebSocket', 'WebRTC', 'JWT', 'OAuth', 'RBAC',
              'Docker', 'GitHub Actions', 'Vercel', 'Netlify', 'Supabase', 'Firebase',
              'Stripe', 'Razorpay', 'BullMQ', 'ElasticSearch', 'Zustand', 'MVC',
              'AI/ML APIs', 'Payment Gateways', 'Real-time Chat', 'Video Calling'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-slate-700 dark:text-slate-300 rounded-full text-xs sm:text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-default border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}