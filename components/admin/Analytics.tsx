'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface AnalyticsData {
  overview: {
    totalVisitors: number;
    todayVisitors: number;
    monthlyVisitors: number;
    uniqueVisitors: number;
    uniqueToday: number;
    totalBlogs: number;
    publishedBlogs: number;
    totalContacts: number;
    totalServiceRequests: number;
    totalNewsletterSubs: number;
  };
  topPages: Array<{ _id: string; count: number }>;
  deviceStats: Array<{ _id: string; count: number }>;
  browserStats: Array<{ _id: string; count: number }>;
  dailyVisitors: Array<{ _id: string; count: number }>;
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics');
      if (response.ok) {
        const analyticsData = await response.json();
        setData(analyticsData);
      }
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading analytics...</div>;
  if (!data) return <div className="p-6">Failed to load analytics</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-blue-600 p-4 rounded-lg text-white">
          <h3 className="text-sm font-medium">Total Visitors</h3>
          <p className="text-2xl font-bold">{data.overview.totalVisitors}</p>
        </div>
        <div className="bg-green-600 p-4 rounded-lg text-white">
          <h3 className="text-sm font-medium">Today's Visitors</h3>
          <p className="text-2xl font-bold">{data.overview.todayVisitors}</p>
        </div>
        <div className="bg-purple-600 p-4 rounded-lg text-white">
          <h3 className="text-sm font-medium">Monthly Visitors</h3>
          <p className="text-2xl font-bold">{data.overview.monthlyVisitors}</p>
        </div>
        <div className="bg-orange-600 p-4 rounded-lg text-white">
          <h3 className="text-sm font-medium">Unique Visitors</h3>
          <p className="text-2xl font-bold">{data.overview.uniqueVisitors}</p>
        </div>
        <div className="bg-red-600 p-4 rounded-lg text-white">
          <h3 className="text-sm font-medium">Unique Today</h3>
          <p className="text-2xl font-bold">{data.overview.uniqueToday}</p>
        </div>
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-300">Total Blogs</h3>
          <p className="text-xl font-bold">{data.overview.totalBlogs}</p>
          <p className="text-sm text-green-400">Published: {data.overview.publishedBlogs}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-300">Contact Messages</h3>
          <p className="text-xl font-bold">{data.overview.totalContacts}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-300">Service Requests</h3>
          <p className="text-xl font-bold">{data.overview.totalServiceRequests}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-300">Newsletter Subs</h3>
          <p className="text-xl font-bold">{data.overview.totalNewsletterSubs}</p>
        </div>
      </div>

      {/* Charts and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
          <div className="space-y-2">
            {data.topPages.slice(0, 10).map((page, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm truncate">{page._id || 'Home'}</span>
                <span className="text-sm font-medium">{page.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Stats */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Device Types</h3>
          <div className="space-y-2">
            {data.deviceStats.map((device, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm capitalize">{device._id}</span>
                <span className="text-sm font-medium">{device.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Stats */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Browsers</h3>
          <div className="space-y-2">
            {data.browserStats.map((browser, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{browser._id}</span>
                <span className="text-sm font-medium">{browser.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Visitors Chart */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Daily Visitors (Last 30 Days)</h3>
          <div className="space-y-1">
            {data.dailyVisitors.slice(-7).map((day, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span>{new Date(day._id).toLocaleDateString()}</span>
                <span className="font-medium">{day.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}