'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Mail, 
  Users, 
  Settings, 
  LogOut,
  PenTool,
  MessageSquare,
  Briefcase,
  BarChart3,
  Globe,
  Database,
  Shield,
  Archive
} from 'lucide-react';
import { signOut } from 'next-auth/react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'blogs', label: 'Blog Posts', icon: FileText },
  { id: 'create-blog', label: 'Create Blog', icon: PenTool },
  { id: 'contacts', label: 'Contact Messages', icon: Mail },
  { id: 'services', label: 'Service Requests', icon: Briefcase },
  { id: 'newsletter', label: 'Newsletter', icon: MessageSquare },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'media', label: 'Media Library', icon: Database },
  { id: 'site-settings', label: 'Site Settings', icon: Globe },
  { id: 'backup', label: 'Backup & Restore', icon: Archive },
  { id: 'logs', label: 'System Logs', icon: Shield },
  { id: 'settings', label: 'Account Settings', icon: Settings },
];

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  return (
    <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-screen flex flex-col">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Admin Panel
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Badal Kumar
        </p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}