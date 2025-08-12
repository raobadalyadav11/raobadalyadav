'use client';

import { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Info, CheckCircle, Search, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SystemLogs() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [logs] = useState([
    { id: 1, type: 'info', message: 'User login successful', timestamp: '2024-12-15 10:30:25', user: 'admin@example.com' },
    { id: 2, type: 'warning', message: 'High memory usage detected', timestamp: '2024-12-15 10:25:12', user: 'system' },
    { id: 3, type: 'error', message: 'Failed database connection attempt', timestamp: '2024-12-15 10:20:45', user: 'system' },
    { id: 4, type: 'success', message: 'Backup completed successfully', timestamp: '2024-12-15 10:15:30', user: 'system' },
    { id: 5, type: 'info', message: 'New blog post published', timestamp: '2024-12-15 10:10:15', user: 'admin@example.com' }
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'error': return 'border-l-red-500 bg-red-900/10';
      case 'warning': return 'border-l-yellow-500 bg-yellow-900/10';
      case 'success': return 'border-l-green-500 bg-green-900/10';
      default: return 'border-l-blue-500 bg-blue-900/10';
    }
  };

  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type === filter);

  if (loading) {
    return <div className="p-6">Loading system logs...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">System Logs</h2>
        <div className="flex items-center gap-4">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2"
          >
            <option value="all">All Logs</option>
            <option value="error">Errors</option>
            <option value="warning">Warnings</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
          </select>
          <button 
            onClick={() => toast.success('Log export coming soon!')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Export Logs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="font-medium">Errors</span>
          </div>
          <p className="text-2xl font-bold">{logs.filter(l => l.type === 'error').length}</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="font-medium">Warnings</span>
          </div>
          <p className="text-2xl font-bold">{logs.filter(l => l.type === 'warning').length}</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-blue-400" />
            <span className="font-medium">Info</span>
          </div>
          <p className="text-2xl font-bold">{logs.filter(l => l.type === 'info').length}</p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="font-medium">Success</span>
          </div>
          <p className="text-2xl font-bold">{logs.filter(l => l.type === 'success').length}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg">
        <div className="p-4 border-b border-gray-700">
          <h3 className="font-semibold">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-700">
          {filteredLogs.map((log) => (
            <div key={log.id} className={`p-4 border-l-4 ${getLogColor(log.type)}`}>
              <div className="flex items-start gap-3">
                {getLogIcon(log.type)}
                <div className="flex-1">
                  <p className="font-medium">{log.message}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                    <span>{log.timestamp}</span>
                    <span>User: {log.user}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}