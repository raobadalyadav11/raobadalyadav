import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';
    const sort = searchParams.get('sort') || 'latest';
    const skip = (page - 1) * limit;

    let query: any = { published: true };
    
    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (featured) query.featured = true;
    if (search) {
      query.$text = { $search: search };
    }

    let sortQuery: any = { createdAt: -1 };
    if (sort === 'popular') sortQuery = { views: -1, createdAt: -1 };
    if (sort === 'liked') sortQuery = { likes: -1, createdAt: -1 };
    if (search) sortQuery = { score: { $meta: 'textScore' }, ...sortQuery };

    const blogs = await Blog.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .select('-content')
      .lean();

    const total = await Blog.countDocuments(query);
    const categories = await Blog.distinct('category', { published: true });
    const popularTags = await Blog.aggregate([
      { $match: { published: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      categories,
      popularTags: popularTags.map(tag => ({ name: tag._id, count: tag.count })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { 
      title, 
      excerpt, 
      content, 
      image, 
      tags, 
      category,
      metaTitle,
      metaDescription,
      keywords,
      featured = false
    } = body;

    // Validation
    if (!title || !excerpt || !content || !image || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, excerpt, content, image, category' },
        { status: 400 }
      );
    }

    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Ensure unique slug
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      slug = `${slug}-${Date.now()}`;
    }

    const readTime = Math.ceil(content.replace(/<[^>]*>/g, '').split(' ').length / 200) + ' min read';

    const blog = new Blog({
      title,
      slug,
      excerpt,
      content,
      image,
      tags: Array.isArray(tags) ? tags : [],
      category,
      readTime,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      keywords: Array.isArray(keywords) ? keywords : (Array.isArray(tags) ? tags : []),
      featured,
      published: true,
    });

    await blog.save();

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create blog' },
      { status: 500 }
    );
  }
}