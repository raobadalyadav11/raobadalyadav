'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import TiptapEditor from '@/components/TiptapEditor';

export default function AdminPage() {
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
        alert('Failed to create blog post');
      }
    } catch (error) {
      alert('Error creating blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (preview) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setPreview(false)}
            className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={20} />
            Back to Editor
          </button>
          
          <article className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
            <img
              src={formData.image || 'https://via.placeholder.com/800x400'}
              alt={formData.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {formData.title || 'Blog Title'}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
              {formData.excerpt || 'Blog excerpt...'}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                {formData.category}
              </span>
              {formData.tags.split(',').filter(tag => tag.trim()).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
            <div
              className="prose prose-slate dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            />
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Create New Blog Post
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setPreview(true)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
              >
                <Eye size={20} />
                Preview
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                Excerpt
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="Brief description of the blog post..."
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

            <div className="grid md:grid-cols-2 gap-6">
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
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">SEO Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Meta Title (60 chars max)
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    maxLength={60}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="Leave empty to use title"
                  />
                  <p className="text-xs text-slate-500 mt-1">{formData.metaTitle.length}/60</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Meta Description (160 chars max)
                  </label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    maxLength={160}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="Leave empty to use excerpt"
                  />
                  <p className="text-xs text-slate-500 mt-1">{formData.metaDescription.length}/160</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Keywords (comma separated)
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="Leave empty to use tags"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Featured Post
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Content
              </label>
              <TiptapEditor
                content={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
              />
              <p className="text-xs text-slate-500 mt-2">
                Word count: {formData.content.replace(/<[^>]*>/g, '').split(' ').filter(word => word.length > 0).length} words
              </p>
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
        </motion.div>
      </div>
    </div>
  );
}