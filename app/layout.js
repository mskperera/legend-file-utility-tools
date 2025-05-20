// app/layout.jsx
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import './globals.css';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Legend Utility Tools - PDF & Image Processing',
    template: '%s | Legend Utility Tools',
  },
description: 'Free online tools to compress JPG and PDF files, convert HEIC, BMP, and JPG to PDF, and merge PDF documents. Fast, secure, and easy to use with no installation needed.',
keywords: [
  'compress JPG online',
  'compress PDF online',
  'JPG to PDF converter',
  'merge PDF files',
  'HEIC to JPG converter',
  'BMP to JPG converter',
  'reduce image file size',
  'free image compressor',
  'online PDF combiner',
  'file conversion tools'
],
 openGraph: {
    title: 'Legend Utility Tools',
    description: 'Free online tools for PDF and image processing.',
    url: 'https://fileutilitytools.legendbyte.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legend Utility Tools',
    description: 'Free online tools for PDF and image processing.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/nprogress.css" />
      <style>{`
  #nprogress .bar {
    background: #fffb96;
    height: 5px;
    position: fixed; /* Ensure position is fixed */
    top: 0; /* Explicitly set to top */
    left: 0;
    width: 100%;
    z-index: 9999; /* Ensure it appears above other content */
  }
  #nprogress .peg {
    box-shadow: 0 0 10px #2563eb, 0 0 5px #2563eb;
  }
  #nprogress .spinner-icon {
    border-top-color: #2563eb;
    border-left-color: #2563eb;
  }
`}</style>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-100`} suppressHydrationWarning>
      <Suspense fallback={null}>
        <ProgressBar />
        </Suspense>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}