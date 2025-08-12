import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Badal Kumar - Full Stack Developer' },
  siteDescription: { type: String, default: 'Professional portfolio and blog' },
  siteKeywords: { type: String, default: 'full stack developer, web development, portfolio' },
  siteUrl: { type: String, default: 'https://raobadalyadav.com' },
  logoUrl: { type: String, default: '' },
  faviconUrl: { type: String, default: '' },
  socialLinks: {
    github: { type: String, default: 'https://github.com/raobadalyadav11' },
    linkedin: { type: String, default: 'https://linkedin.com/in/raobadalyadav' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    email: { type: String, default: 'raobadalyadav11@gmail.com' },
    phone: { type: String, default: '+91-7779810465' }
  },
  seoSettings: {
    googleAnalyticsId: { type: String, default: '' },
    googleSearchConsoleId: { type: String, default: '' },
    metaRobots: { type: String, default: 'index, follow' }
  },
  emailSettings: {
    smtpHost: { type: String, default: 'smtp.gmail.com' },
    smtpPort: { type: Number, default: 587 },
    smtpUser: { type: String, default: 'raobadalyadav11@gmail.com' },
    smtpPassword: { type: String, default: '' },
    fromEmail: { type: String, default: 'raobadalyadav11@gmail.com' },
    fromName: { type: String, default: 'Badal Kumar' }
  },
  maintenanceMode: { type: Boolean, default: false },
  allowRegistration: { type: Boolean, default: false },
  blogEnabled: { type: Boolean, default: true },
  commentsEnabled: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);