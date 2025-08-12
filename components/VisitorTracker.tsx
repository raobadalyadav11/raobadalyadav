'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await fetch('/api/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: pathname,
            referrer: document.referrer || '',
          }),
        });
      } catch (error) {
        // Silently fail - don't interrupt user experience
      }
    };

    trackVisitor();
  }, [pathname]);

  return null;
}