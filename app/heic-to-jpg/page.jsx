// app/heic-to-jpg/page.jsx
import HEICToJPGTool from '@/components/HEICToJPGTool';

export async function generateMetadata() {
  return {
    title: 'HEIC to JPG - File Utility Tools',
    description: 'Convert HEIC images to JPG format quickly and easily.',
    keywords: ['HEIC to JPG', 'HEIF to JPG', 'image converter', 'file tools'],
    openGraph: {
      title: 'HEIC to JPG - File Utility Tools',
      description: 'Convert HEIC images to JPG format quickly and easily.',
      url: 'https://your-site.com/heic-to-jpg',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'HEIC to JPG - File Utility Tools',
      description: 'Convert HEIC images to JPG format quickly and easily.',
    },
  };
}

export default function HEICToJPGPage() {
  return <HEICToJPGTool />;
}