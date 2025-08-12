import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import { Analytics, Visitor } from '@/models/Analytics';
import Blog from '@/models/Blog';
import Contact from '@/models/Contact';
import ServiceRequest from '@/models/ServiceRequest';
import Newsletter from '@/models/Newsletter';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Get visitor stats
    const totalVisitors = await Visitor.countDocuments();
    const todayVisitors = await Visitor.countDocuments({
      timestamp: { $gte: new Date(today.setHours(0, 0, 0, 0)) }
    });
    const monthlyVisitors = await Visitor.countDocuments({
      timestamp: { $gte: thirtyDaysAgo }
    });

    // Get unique visitors
    const uniqueVisitors = await Visitor.distinct('ip');
    const uniqueToday = await Visitor.distinct('ip', {
      timestamp: { $gte: new Date(today.setHours(0, 0, 0, 0)) }
    });

    // Get content stats
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ published: true });
    const totalContacts = await Contact.countDocuments();
    const totalServiceRequests = await ServiceRequest.countDocuments();
    const totalNewsletterSubs = await Newsletter.countDocuments();

    // Get top pages
    const topPages = await Visitor.aggregate([
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Get device stats
    const deviceStats = await Visitor.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } }
    ]);

    // Get browser stats
    const browserStats = await Visitor.aggregate([
      { $group: { _id: '$browser', count: { $sum: 1 } } }
    ]);

    // Get daily visitors for chart
    const dailyVisitors = await Visitor.aggregate([
      {
        $match: { timestamp: { $gte: thirtyDaysAgo } }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return NextResponse.json({
      overview: {
        totalVisitors,
        todayVisitors,
        monthlyVisitors,
        uniqueVisitors: uniqueVisitors.length,
        uniqueToday: uniqueToday.length,
        totalBlogs,
        publishedBlogs,
        totalContacts,
        totalServiceRequests,
        totalNewsletterSubs
      },
      topPages,
      deviceStats,
      browserStats,
      dailyVisitors
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}