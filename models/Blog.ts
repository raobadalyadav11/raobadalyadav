import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  category: string;
  readTime: string;
  published: boolean;
  featured: boolean;
  views: number;
  likes: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 160,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  category: {
    type: String,
    required: true,
    enum: ['Web Development', 'SaaS', 'Database', 'Performance', 'Architecture', 'Tutorial'],
  },
  readTime: {
    type: String,
    default: '5 min read',
  },
  published: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  metaTitle: {
    type: String,
    maxlength: 60,
  },
  metaDescription: {
    type: String,
    maxlength: 160,
  },
  keywords: [{
    type: String,
    trim: true,
  }],
  author: {
    name: {
      type: String,
      default: 'Badal Kumar',
    },
    avatar: {
      type: String,
      default: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    bio: {
      type: String,
      default: 'Full-Stack Developer specializing in SaaS platforms',
    },
  },
}, {
  timestamps: true,
});

BlogSchema.index({ slug: 1 });
BlogSchema.index({ published: 1, createdAt: -1 });
BlogSchema.index({ category: 1, published: 1 });
BlogSchema.index({ tags: 1, published: 1 });
BlogSchema.index({ featured: 1, published: 1 });
BlogSchema.index({ views: -1 });
BlogSchema.index({ title: 'text', content: 'text', tags: 'text' });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);