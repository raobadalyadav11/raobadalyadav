'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteKeywords: string;
  siteUrl: string;
  logoUrl: string;
  faviconUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    email: string;
    phone: string;
  };
  seoSettings: {
    googleAnalyticsId: string;
    googleSearchConsoleId: string;
    metaRobots: string;
  };
  emailSettings: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
  };
  maintenanceMode: boolean;
  allowRegistration: boolean;
  blogEnabled: boolean;
  commentsEnabled: boolean;
}

export default function SiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        toast.success('Settings saved successfully');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading settings...</div>;
  if (!settings) return <div className="p-6">Failed to load settings</div>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Site Settings</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* General Settings */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">General Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({...settings, siteName: e.target.value})}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Site URL</label>
            <input
              type="url"
              value={settings.siteUrl}
              onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Site Description</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded h-20"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Keywords</label>
            <input
              type="text"
              value={settings.siteKeywords}
              onChange={(e) => setSettings({...settings, siteKeywords: e.target.value})}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(settings.socialLinks).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-2 capitalize">{key}</label>
              <input
                type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'url'}
                value={value}
                onChange={(e) => setSettings({
                  ...settings,
                  socialLinks: {...settings.socialLinks, [key]: e.target.value}
                })}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              />
            </div>
          ))}
        </div>
      </div>

      {/* SEO Settings */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">SEO Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Google Analytics ID</label>
            <input
              type="text"
              value={settings.seoSettings.googleAnalyticsId}
              onChange={(e) => setSettings({
                ...settings,
                seoSettings: {...settings.seoSettings, googleAnalyticsId: e.target.value}
              })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Search Console ID</label>
            <input
              type="text"
              value={settings.seoSettings.googleSearchConsoleId}
              onChange={(e) => setSettings({
                ...settings,
                seoSettings: {...settings.seoSettings, googleSearchConsoleId: e.target.value}
              })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Feature Settings</h3>
        <div className="space-y-4">
          {[
            { key: 'maintenanceMode', label: 'Maintenance Mode' },
            { key: 'allowRegistration', label: 'Allow Registration' },
            { key: 'blogEnabled', label: 'Blog Enabled' },
            { key: 'commentsEnabled', label: 'Comments Enabled' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={settings[key as keyof SiteSettings] as boolean}
                onChange={(e) => setSettings({...settings, [key]: e.target.checked})}
                className="mr-3"
              />
              <label className="text-sm font-medium">{label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}