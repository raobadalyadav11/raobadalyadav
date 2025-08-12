import mongoose, { Document, Schema } from 'mongoose';

export interface IServiceRequest extends Document {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
}

const ServiceRequestSchema = new Schema<IServiceRequest>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  company: {
    type: String,
    trim: true,
  },
  service: {
    type: String,
    required: true,
    enum: ['Full-Stack Development', 'SaaS Platform', 'Mobile App', 'Microservices', 'Performance Optimization', 'Security & Auth'],
  },
  budget: {
    type: String,
    required: true,
    enum: ['< $5,000', '$5,000 - $15,000', '$15,000 - $50,000', '$50,000+'],
  },
  timeline: {
    type: String,
    required: true,
    enum: ['< 1 month', '1-3 months', '3-6 months', '6+ months'],
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

export default mongoose.models.ServiceRequest || mongoose.model<IServiceRequest>('ServiceRequest', ServiceRequestSchema);