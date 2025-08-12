'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, Users, Eye, TrendingUp, Calendar } from 'lucide-react';

interface DashboardStats {
  totalBlogs: number;
  totalContacts: number;
  totalViews: number;
  recentBlogs: any[];
  recentContacts: any[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    totalContacts: 0,
    totalViews: 0,
    recentBlogs: [],
    recentContacts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [blogsRes, contactsRes] = await Promise.all([
        fetch('/api/blogs?limit=5'),
        fetch('/api/contact')
      ]);

      const blogsData = await blogsRes.json();
      const contactsData = contactsRes.ok ? await contactsRes.json() : { contacts: [] };

      const totalViews = blogsData.blogs?.reduce((sum: number, blog: any) => sum + (blog.views || 0), 0) || 0;

      setStats({
        totalBlogs: blogsData.pagination?.total || 0,
        totalContacts: contactsData.contacts?.length || 0,
        totalViews,
        recentBlogs: blogsData.blogs || [],
        recentContacts: contactsData.contacts?.slice(0, 5) || []
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Blogs', value: stats.totalBlogs, icon: FileText, color: 'blue' },
    { title: 'Contact Messages', value: stats.totalContacts, icon: Mail, color: 'green' },
    { title: 'Total Views', value: stats.totalViews, icon: Eye, color: 'purple' },
    { title: 'This Month', value: new Date().getDate(), icon: Calendar, color: 'orange' }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {card.value}
                </p>
              </div>
              <div className={`w-12 h-12 bg-${card.color}-100 dark:bg-${card.color}-900/20 rounded-lg flex items-center justify-center`}>
                <card.icon className={`w-6 h-6 text-${card.color}-600 dark:text-${card.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Recent Blog Posts
          </h3>
          <div className="space-y-3">
            {stats.recentBlogs.map((blog) => (
              <div key={blog._id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-white truncate">
                    {blog.title}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {blog.views || 0} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Recent Messages
          </h3>
          <div className="space-y-3">
            {stats.recentContacts.length > 0 ? (
              stats.recentContacts.map((contact) => (
                <div key={contact._id} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {contact.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                    {contact.subject}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-center py-4">
                No messages yet
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}