'use client';

import { useState, useEffect } from 'react';
import { Archive, Download, Upload, Database, Clock, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function BackupRestore() {
  const [loading, setLoading] = useState(true);
  const [backups, setBackups] = useState([
    { id: 1, name: 'Full Backup - Dec 2024', date: '2024-12-15', size: '45.2 MB', type: 'Full' },
    { id: 2, name: 'Database Backup - Dec 2024', date: '2024-12-14', size: '12.8 MB', type: 'Database' },
    { id: 3, name: 'Media Backup - Dec 2024', date: '2024-12-13', size: '128.5 MB', type: 'Media' }
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <div className="p-6">Loading backup system...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Backup & Restore</h2>
        <button 
          onClick={() => toast.success('Backup creation coming soon!')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Archive size={20} />
          Create Backup
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <Database className="w-8 h-8 text-blue-400 mb-3" />
          <h3 className="font-semibold mb-2">Database Backup</h3>
          <p className="text-sm text-gray-400 mb-4">Backup all database content</p>
          <button 
            onClick={() => toast.success('Database backup coming soon!')}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Backup Database
          </button>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <Upload className="w-8 h-8 text-green-400 mb-3" />
          <h3 className="font-semibold mb-2">Media Backup</h3>
          <p className="text-sm text-gray-400 mb-4">Backup all media files</p>
          <button 
            onClick={() => toast.success('Media backup coming soon!')}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Backup Media
          </button>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <Shield className="w-8 h-8 text-purple-400 mb-3" />
          <h3 className="font-semibold mb-2">Full Backup</h3>
          <p className="text-sm text-gray-400 mb-4">Complete system backup</p>
          <button 
            onClick={() => toast.success('Full backup coming soon!')}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Full Backup
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Backups</h3>
        <div className="space-y-3">
          {backups.map((backup) => (
            <div key={backup.id} className="flex items-center justify-between p-4 bg-gray-700 rounded">
              <div className="flex items-center gap-3">
                <Archive className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">{backup.name}</p>
                  <p className="text-sm text-gray-400">{backup.date} • {backup.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded ${
                  backup.type === 'Full' ? 'bg-purple-900 text-purple-200' :
                  backup.type === 'Database' ? 'bg-blue-900 text-blue-200' :
                  'bg-green-900 text-green-200'
                }`}>
                  {backup.type}
                </span>
                <button 
                  onClick={() => toast.success('Download coming soon!')}
                  className="p-2 text-blue-400 hover:bg-gray-600 rounded"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}