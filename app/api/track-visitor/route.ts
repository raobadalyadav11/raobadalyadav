import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Visitor } from '@/models/Analytics';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { page, referrer } = await request.json();
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    
    // Parse device and browser from user agent
    const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
    const isTablet = /iPad|Tablet/.test(userAgent);
    const device = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
    
    let browser = 'unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    await Visitor.create({
      ip,
      userAgent,
      page,
      referrer,
      device,
      browser,
      sessionId: `${ip}-${Date.now()}`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track visitor' }, { status: 500 });
  }
}