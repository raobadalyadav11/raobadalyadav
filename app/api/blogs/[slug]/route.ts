import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    
    const blog = await Blog.findOneAndUpdate(
      { slug: params.slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Get related posts
    const relatedPosts = await Blog.find({
      _id: { $ne: (blog as any)._id },
      published: true,
      $or: [
        { category: (blog as any).category },
        { tags: { $in: (blog as any).tags } }
      ]
    })
    .limit(3)
    .select('-content')
    .sort({ views: -1, createdAt: -1 })
    .lean();

    return NextResponse.json({ ...blog, relatedPosts });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    
    const { action } = await request.json();
    
    if (action === 'like') {
      const blog = await Blog.findOneAndUpdate(
        { slug: params.slug, published: true },
        { $inc: { likes: 1 } },
        { new: true }
      );
      
      if (!blog) {
        return NextResponse.json(
          { error: 'Blog not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ likes: blog.likes });
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const blog = await Blog.findOneAndDelete({ slug: params.slug });
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}