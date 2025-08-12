'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Smartphone, Cloud, Zap, Shield } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Full-Stack Development',
    description: 'End-to-end web application development using Next.js, React, Node.js, and modern technologies.',
    features: ['Custom Web Applications', 'API Development', 'Database Design', 'Performance Optimization'],
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Database,
    title: 'SaaS Platform Development',
    description: 'Scalable Software-as-a-Service platforms with advanced features and enterprise-grade architecture.',
    features: ['Multi-tenant Architecture', 'Payment Integration', 'User Management', 'Analytics Dashboard'],
    color: 'from-purple-500 to-violet-600'
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Cross-platform mobile applications using Flutter with seamless user experience.',
    features: ['iOS & Android Apps', 'Real-time Features', 'Push Notifications', 'Offline Support'],
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Cloud,
    title: 'Microservices Architecture',
    description: 'Design and implement scalable microservices with Docker, APIs, and cloud deployment.',
    features: ['Service Design', 'API Gateway', 'Load Balancing', 'Container Orchestration'],
    color: 'from-orange-500 to-red-600'
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Database query optimization, caching strategies, and application performance tuning.',
    features: ['Database Optimization', 'Caching Solutions', 'Code Profiling', 'Speed Enhancement'],
    color: 'from-yellow-500 to-orange-600'
  },
  {
    icon: Shield,
    title: 'Security & Authentication',
    description: 'Implement robust security measures, JWT authentication, and role-based access control.',
    features: ['JWT Authentication', 'RBAC Implementation', 'Data Encryption', 'Security Audits'],
    color: 'from-indigo-500 to-purple-600'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            My <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Comprehensive development services to bring your ideas to life with modern technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group hover:border-blue-300 dark:hover:border-blue-700"
            >
              <div className={`w-16 h-16 mb-6 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-gradient transition-all duration-300">
                {service.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.a
                href="/services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow duration-300 inline-block text-center"
              >
                Get Started
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}