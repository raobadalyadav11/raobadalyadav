'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle, Code, Database, Smartphone, Cloud, Zap, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

const services = [
  {
    id: 'full-stack',
    title: 'Full-Stack Development',
    icon: Code,
    description: 'End-to-end web application development using modern technologies',
    features: ['Custom Web Applications', 'API Development', 'Database Design', 'Performance Optimization'],
    price: '$5,000 - $25,000',
    timeline: '2-6 months'
  },
  {
    id: 'saas',
    title: 'SaaS Platform Development',
    icon: Database,
    description: 'Scalable Software-as-a-Service platforms with enterprise features',
    features: ['Multi-tenant Architecture', 'Payment Integration', 'User Management', 'Analytics Dashboard'],
    price: '$15,000 - $50,000',
    timeline: '3-8 months'
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    icon: Smartphone,
    description: 'Cross-platform mobile applications using Flutter',
    features: ['iOS & Android Apps', 'Real-time Features', 'Push Notifications', 'Offline Support'],
    price: '$8,000 - $30,000',
    timeline: '2-5 months'
  },
  {
    id: 'microservices',
    title: 'Microservices Architecture',
    icon: Cloud,
    description: 'Design and implement scalable microservices with Docker',
    features: ['Service Design', 'API Gateway', 'Load Balancing', 'Container Orchestration'],
    price: '$10,000 - $40,000',
    timeline: '3-6 months'
  },
  {
    id: 'performance',
    title: 'Performance Optimization',
    icon: Zap,
    description: 'Database optimization, caching, and application performance tuning',
    features: ['Database Optimization', 'Caching Solutions', 'Code Profiling', 'Speed Enhancement'],
    price: '$3,000 - $15,000',
    timeline: '1-3 months'
  },
  {
    id: 'security',
    title: 'Security & Authentication',
    icon: Shield,
    description: 'Implement robust security measures and authentication systems',
    features: ['JWT Authentication', 'RBAC Implementation', 'Data Encryption', 'Security Audits'],
    price: '$5,000 - $20,000',
    timeline: '2-4 months'
  }
];

const budgetRanges = [
  '< $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000+'
];

const timelineOptions = [
  '< 1 month',
  '1-3 months',
  '3-6 months',
  '6+ months'
];

export default function ServicesPage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    setSelectedService(serviceId);
    setFormData(prev => ({ ...prev, service: service?.title || '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit request. Please try again.');
      }
    } catch (error) {
      alert('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950/50 to-purple-950/30 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-700 text-center max-w-md"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Request Submitted!</h2>
          <p className="text-slate-300 mb-6">
            Thank you for your interest. I'll review your requirements and get back to you within 48 hours.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950/50 to-purple-950/30 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/')}
          className="flex items-center gap-2 mb-8 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Let's Build Something <span className="text-gradient">Amazing</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Choose a service and tell me about your project. I'll provide a detailed proposal tailored to your needs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Select a Service</h3>
            <div className="grid gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleServiceSelect(service.id)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all ${
                    selectedService === service.id
                      ? 'border-blue-500 bg-blue-900/20'
                      : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
                      <p className="text-slate-400 text-sm mb-3">{service.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{service.price}</span>
                        <span>•</span>
                        <span>{service.timeline}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Project Details</h3>
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleSubmit}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Selected Service
                </label>
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Select a service above"
                  readOnly
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Budget Range *
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select budget</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Timeline *
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your project requirements, goals, and any specific features you need..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !selectedService}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}