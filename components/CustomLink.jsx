// components/CustomLink.jsx
'use client';
import Link from 'next/link';
import NProgress from 'nprogress';

export default function CustomLink({ href, children, ...props }) {
  const handleClick = (e) => {
    console.log('CustomLink: Navigation started', { href });
    NProgress.start();
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}