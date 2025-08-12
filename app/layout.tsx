import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Badal Kumar - Full-Stack Developer | SaaS Platform Expert',
  description: 'Passionate full-stack developer with 1+ years of experience building scalable SaaS platforms. Expert in Next.js, Node.js, PostgreSQL, and modern web technologies.',
  keywords: 'Full-Stack Developer, SaaS, Next.js, Node.js, PostgreSQL, React, TypeScript, Microservices',
  authors: [{ name: 'Badal Kumar' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
