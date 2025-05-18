// app/jpg-to-pdf/page.jsx
import JPGToPDFTool from '@/components/JPGToPDFTool';

export async function generateMetadata() {
  return {
    title: 'JPG to PDF - File Utility Tools',
    description: 'Convert JPG images to PDF documents quickly and easily.',
    keywords: ['JPG to PDF', 'image to PDF', 'file converter', 'PDF tools'],
    openGraph: {
      title: 'JPG to PDF - File Utility Tools',
      description: 'Convert JPG images to PDF documents quickly and easily.',
      url: 'https://your-site.com/jpg-to-pdf',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'JPG to PDF - File Utility Tools',
      description: 'Convert JPG images to PDF documents quickly and easily.',
    },
  };
}

export default function JPGToPDFPage() {
  return <JPGToPDFTool />;
}