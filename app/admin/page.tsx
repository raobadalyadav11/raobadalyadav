'use client';

import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Dashboard from '@/components/admin/Dashboard';
import ContactsManager from '@/components/admin/ContactsManager';
import BlogsManager from '@/components/admin/BlogsManager';
import ServiceRequestsManager from '@/components/admin/ServiceRequestsManager';
import NewsletterManager from '@/components/admin/NewsletterManager';
import Settings from '@/components/admin/Settings';
import Analytics from '@/components/admin/Analytics';
import SiteSettings from '@/components/admin/SiteSettings';
import UsersManager from '@/components/admin/UsersManager';
import MediaLibrary from '@/components/admin/MediaLibrary';
import BackupRestore from '@/components/admin/BackupRestore';
import SystemLogs from '@/components/admin/SystemLogs';
import TiptapEditor from '@/components/TiptapEditor';
import { motion } from 'framer-motion';
import { Save, Eye, ArrowLeft } from 'lucide-react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    tags: '',
    category: 'Web Development',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    featured: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()),
          keywords: formData.keywords.split(',').map(keyword => keyword.trim()),
        }),
      });

      if (response.ok) {
        alert('Blog post created successfully!');
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          image: '',
          tags: '',
          category: 'Web Development',
          metaTitle: '',
          metaDescription: '',
          keywords: '',
          featured: false,
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to create blog post: ${errorData.error || 'Unknown error'}`);
        console.error('API Error:', errorData);
      }
    } catch (error) {
      alert('Error creating blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Admin Access Required
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Please sign in to access the admin panel.
          </p>
          <button
            onClick={() => signIn()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow duration-300"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'blogs':
        return <BlogsManager />;
      case 'contacts':
        return <ContactsManager />;
      case 'services':
        return <ServiceRequestsManager />;
      case 'newsletter':
        return <NewsletterManager />;
      case 'settings':
        return <Settings />;
      case 'analytics':
        return <Analytics />;
      case 'site-settings':
        return <SiteSettings />;
      case 'users':
        return <UsersManager />;
      case 'media':
        return <MediaLibrary />;
      case 'backup':
        return <BackupRestore />;
      case 'logs':
        return <SystemLogs />;
      case 'create-blog':
        return (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Create New Blog Post
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Write and publish a new blog post
                  </p>
                </div>
                <button
                  onClick={() => setPreview(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
                >
                  <Eye size={20} />
                  Preview
                </button>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        placeholder="Enter blog title..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="SaaS">SaaS</option>
                        <option value="Database">Database</option>
                        <option value="Performance">Performance</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Tutorial">Tutorial</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Excerpt
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      placeholder="Brief description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      placeholder="React, Next.js, TypeScript"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Content
                    </label>
                    <TiptapEditor
                      content={formData.content}
                      onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow duration-300 disabled:opacity-50"
                  >
                    <Save size={20} />
                    {isSubmitting ? 'Publishing...' : 'Publish Post'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      
      case 'users':
      case 'media':
      case 'backup':
      case 'logs':
      default:
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Coming Soon
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                This feature is under development.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}