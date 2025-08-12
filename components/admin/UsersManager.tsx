'use client';

import { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Shield, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function UsersManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button 
          onClick={() => toast.success('Feature coming soon!')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add User
        </button>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg text-center">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">User Management System</h3>
        <p className="text-gray-400 mb-4">Manage user accounts, roles, and permissions</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-700 p-4 rounded">
            <Shield className="w-8 h-8 text-blue-400 mb-2" />
            <h4 className="font-medium">Role Management</h4>
            <p className="text-sm text-gray-400">Admin, Editor, Viewer roles</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <Mail className="w-8 h-8 text-green-400 mb-2" />
            <h4 className="font-medium">User Invitations</h4>
            <p className="text-sm text-gray-400">Send email invitations</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <Users className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="font-medium">Activity Tracking</h4>
            <p className="text-sm text-gray-400">Monitor user activities</p>
          </div>
        </div>
      </div>
    </div>
  );
}