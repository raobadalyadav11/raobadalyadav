import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  visitors: { type: Number, default: 0 },
  pageViews: { type: Number, default: 0 },
  uniqueVisitors: [String],
  topPages: [{
    path: String,
    views: Number
  }],
  referrers: [{
    source: String,
    count: Number
  }],
  devices: {
    mobile: { type: Number, default: 0 },
    desktop: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 }
  },
  browsers: [{
    name: String,
    count: Number
  }]
});

const VisitorSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  page: String,
  referrer: String,
  timestamp: { type: Date, default: Date.now },
  sessionId: String,
  device: String,
  browser: String,
  country: String,
  city: String
});

export const Analytics = mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);
export const Visitor = mongoose.models.Visitor || mongoose.model('Visitor', VisitorSchema);