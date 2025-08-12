'use client';

import { useState, useEffect } from 'react';
import { Image, Upload, Folder, Search, Grid, List } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function MediaLibrary() {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <div className="p-6">Loading media library...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Media Library</h2>
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-700 rounded">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600' : ''} rounded-l`}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-600' : ''} rounded-r`}
            >
              <List size={20} />
            </button>
          </div>
          <button 
            onClick={() => toast.success('Upload feature coming soon!')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Upload size={20} />
            Upload Media
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg text-center">
        <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Media Management System</h3>
        <p className="text-gray-400 mb-4">Upload, organize, and manage your media files</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-700 p-4 rounded">
            <Upload className="w-8 h-8 text-blue-400 mb-2" />
            <h4 className="font-medium">File Upload</h4>
            <p className="text-sm text-gray-400">Drag & drop support</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <Folder className="w-8 h-8 text-green-400 mb-2" />
            <h4 className="font-medium">Organization</h4>
            <p className="text-sm text-gray-400">Folders and categories</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <Search className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="font-medium">Search & Filter</h4>
            <p className="text-sm text-gray-400">Find files quickly</p>
          </div>
        </div>
      </div>
    </div>
  );
}