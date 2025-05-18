// components/ProgressBar.jsx
'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

// Configure NProgress for better visibility
NProgress.configure({ showSpinner: false, speed: 500, trickleSpeed: 200 });

export default function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('ProgressBar: Route changed', { pathname, searchParams: searchParams.toString() });
    NProgress.start();

    const timer = setTimeout(() => {
      console.log('ProgressBar: Completed', { pathname, searchParams: searchParams.toString() });
      NProgress.done();
    }, 500); // Increased delay for visibility

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  return null;
}