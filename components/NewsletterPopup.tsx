'use client';

import { useState, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('newsletter-popup-seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        toast.success('Successfully subscribed to newsletter!');
        handleClose();
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter-popup-seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-6">
          <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Stay Updated!
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Subscribe to get the latest updates on web development, SaaS, and tech insights.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </form>

        <button
          onClick={handleClose}
          className="w-full mt-3 text-gray-500 hover:text-gray-700 text-sm"
        >
          No thanks, maybe later
        </button>
      </div>
    </div>
  );
}