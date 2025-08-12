'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, Eye, Heart, Share2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import { generateStructuredData } from '@/lib/seo';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  category: string;
  readTime: string;
  views: number;
  likes: number;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  createdAt: string;
  updatedAt: string;
  relatedPosts?: BlogPost[];
}

export default function BlogPost() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string);
    }
  }, [params.slug]);

  const fetchPost = async (slug: string) => {
    try {
      const response = await fetch(`/api/blogs/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
        setLikeCount(data.likes || 0);
      } else {
        router.push('/404');
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
      router.push('/404');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post || liked) return;
    
    try {
      const response = await fetch(`/api/blogs/${post.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'like' })
      });
      
      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.likes);
        setLiked(true);
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleShare = async () => {
    if (!post) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-lg mb-8"></div>
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Post Not Found
          </h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {post && (
        <Head>
          <title>{post.metaTitle || post.title}</title>
          <meta name="description" content={post.metaDescription || post.excerpt} />
          <meta name="keywords" content={(post.keywords || post.tags).join(', ')} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.excerpt} />
          <meta property="og:image" content={post.image} />
          <meta property="og:url" content={`https://raobadalyadav.com/blog/${post.slug}`} />
          <meta property="og:type" content="article" />
          <meta property="article:author" content={post.author.name} />
          <meta property="article:published_time" content={post.createdAt} />
          <meta property="article:modified_time" content={post.updatedAt} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.excerpt} />
          <meta name="twitter:image" content={post.image} />
          <link rel="canonical" href={`https://raobadalyadav.com/blog/${post.slug}`} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateStructuredData(post))
            }}
          />
        </Head>
      )}
      
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/')}
          className="flex items-center gap-2 mb-8 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          <ArrowLeft size={20} />
          Back to Home
        </motion.button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 lg:h-80 object-cover"
          />
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views} views
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  disabled={liked}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
                    liked 
                      ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' 
                      : 'bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600 dark:bg-slate-700 dark:text-slate-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  {likeCount}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600 dark:bg-slate-700 dark:text-slate-400 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-8 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  {post.author.name}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {post.author.bio}
                </p>
              </div>
            </div>
            
            <div
              className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {post.relatedPosts && post.relatedPosts.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Related Posts
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {post.relatedPosts.map((relatedPost) => (
                    <a
                      key={relatedPost._id}
                      href={`/blog/${relatedPost.slug}`}
                      className="block bg-slate-50 dark:bg-slate-800 rounded-lg p-4 hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.article>
        </div>
      </div>
    </>
  );
}