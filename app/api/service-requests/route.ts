import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ServiceRequest from '@/models/ServiceRequest';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const requests = await ServiceRequest.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch service requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { name, email, company, service, budget, timeline, description } = body;

    if (!name || !email || !service || !budget || !timeline || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const serviceRequest = new ServiceRequest({
      name,
      email,
      company,
      service,
      budget,
      timeline,
      description,
    });

    await serviceRequest.save();

    return NextResponse.json(
      { message: 'Service request submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit service request' },
      { status: 500 }
    );
  }
}