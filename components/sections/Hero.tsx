'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Phone, MapPin, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const roles = [
  'Full-Stack Developer',
  'SaaS Platform Architect', 
  'Node.js & React Specialist',
  'Microservices Expert'
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = roles[currentRole];
      
      if (!isDeleting) {
        setDisplayText(current.substring(0, displayText.length + 1));
        
        if (displayText === current) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(current.substring(0, displayText.length - 1));
        
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Badal Kumar
            </span>
          </motion.h1>
          
          <div className="h-16 mb-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl lg:text-3xl font-semibold text-slate-700 dark:text-slate-300"
            >
              {displayText}
              <span className="animate-pulse text-blue-600">|</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
          >
            Passionate full-stack developer with 1+ years of experience building scalable SaaS platforms.
            Expert in Next.js, Node.js, PostgreSQL, and modern web technologies with a focus on performance and user experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8"
          >
            <Link href="/BadalKumarResume.pdf" scroll={false}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-2"
            >
              <Download size={20} />
              Download CV
            </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-full font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors duration-300"
            >
              Contact Me
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base"
          >
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-blue-600" />
              <span>raobadalyadav11@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-blue-600" />
              <span>+91-7779810465</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-blue-600" />
              <span>Bihar, India</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="relative z-10">
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                rotate: [-1, 1, -1]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-80 h-80 lg:w-96 lg:h-96 mx-auto bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full p-1"
            >
              <div className="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center">
                <div className="w-72 h-72 lg:w-88 lg:h-88 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-6xl lg:text-7xl font-bold">
                  BK
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Floating elements */}
          <motion.div
            animate={{ 
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-4 right-4 w-20 h-20 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg"
          >
            <span className="text-2xl">⚡</span>
          </motion.div>
          
          <motion.div
            animate={{ 
              x: [0, -15, 0],
              y: [0, 15, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-4 left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg"
          >
            <span className="text-xl">🚀</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}