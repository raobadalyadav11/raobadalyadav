import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';
import { sendNewsletterWelcome } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const subscribers = await Newsletter.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ subscribers });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      if (!existingSubscriber.subscribed) {
        existingSubscriber.subscribed = true;
        await existingSubscriber.save();
        return NextResponse.json({ message: 'Resubscribed successfully' });
      }
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    const subscriber = new Newsletter({
      email,
      name,
    });

    await subscriber.save();

    // Send welcome email
    await sendNewsletterWelcome(email, name);

    return NextResponse.json(
      { message: 'Subscribed successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}