'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, Target, Trophy, Star } from 'lucide-react';

const achievements = [
  {
    icon: TrendingUp,
    title: '40% Performance Boost',
    description: 'Optimized PostgreSQL queries improving response times',
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Users,
    title: 'Team Leadership',
    description: 'Coordinated with 50+ team members in Team Oorja',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Target,
    title: '₹5,00,000 Budget Management',
    description: 'Achieved 20% cost saving through effective allocation',
    color: 'from-purple-500 to-violet-600'
  },
  {
    icon: Trophy,
    title: 'SaaS Platform Expert',
    description: 'Built scalable platforms with advanced features',
    color: 'from-orange-500 to-red-600'
  }
];

const certifications = [
  {
    title: 'Full-Stack Web Development',
    issuer: 'Vidya Vihar Institute of Technology',
    date: '2024',
    badge: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    title: 'Node.js & Express.js Mastery',
    issuer: 'Self-Certified Projects',
    date: '2024',
    badge: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    title: 'PostgreSQL Database Expert',
    issuer: 'Prachar Prashar',
    date: '2024',
    badge: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

const stats = [
  { number: '1+', label: 'Years Experience' },
  { number: '10+', label: 'Projects Completed' },
  { number: '40%', label: 'Performance Improvement' },
  { number: '50+', label: 'Team Members Led' }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Achievements & <span className="text-gradient">Recognition</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Key milestones and accomplishments in my development journey.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-bold text-gradient mb-2"
              >
                {stat.number}
              </motion.div>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Achievements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 text-center group"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${achievement.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {achievement.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Certifications & Learning
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 flex items-center gap-4"
              >
                <img
                  src={cert.badge}
                  alt={cert.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    {cert.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}