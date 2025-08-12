import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export function generateSEO({
  title = 'Badal Kumar - Full-Stack Developer',
  description = 'Passionate full-stack developer with expertise in Next.js, Node.js, and modern web technologies.',
  keywords = ['Full-Stack Developer', 'Next.js', 'Node.js', 'React', 'TypeScript'],
  image = '/og-image.jpg',
  url = 'https://raobadalyadav.com',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Badal Kumar',
  tags = [],
}: SEOProps): Metadata {
  const siteTitle = title.includes('Badal Kumar') ? title : `${title} | Badal Kumar`;
  
  return {
    title: siteTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: 'en_US',
      url,
      title: siteTitle,
      description,
      siteName: 'Badal Kumar Portfolio',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: [author],
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description,
      images: [image],
      creator: '@raobadalyadav11',
    },
    alternates: {
      canonical: url,
    },
    other: {
      'article:author': author,
      'article:publisher': 'https://raobadalyadav.com',
    },
  };
}

export function generateBlogSEO(blog: {
  title: string;
  metaTitle?: string;
  excerpt: string;
  metaDescription?: string;
  keywords?: string[];
  tags: string[];
  image: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
  };
}): Metadata {
  return generateSEO({
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.keywords || blog.tags,
    image: blog.image,
    url: `https://raobadalyadav.com/blog/${blog.slug}`,
    type: 'article',
    publishedTime: blog.createdAt,
    modifiedTime: blog.updatedAt,
    author: blog.author.name,
    tags: blog.tags,
  });
}

export function generateStructuredData(blog: {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  readTime: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image,
    url: `https://raobadalyadav.com/blog/${blog.slug}`,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    author: {
      '@type': 'Person',
      name: blog.author.name,
      image: blog.author.avatar,
      description: blog.author.bio,
      url: 'https://raobadalyadav.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Badal Kumar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://raobadalyadav.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://raobadalyadav.com/blog/${blog.slug}`,
    },
    timeRequired: blog.readTime,
  };
}