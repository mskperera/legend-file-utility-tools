// app/bitmap-to-jpg/page.jsx
import BitmapToJPGTool from '@/components/BitmapToJPGTool';

export async function generateMetadata() {
  return {
    title: 'Bitmap to JPG - File Utility Tools',
    description: 'Convert BMP images to JPG format quickly and easily.',
    keywords: ['Bitmap to JPG', 'BMP to JPG', 'image converter', 'file tools'],
    openGraph: {
      title: 'Bitmap to JPG - File Utility Tools',
      description: 'Convert BMP images to JPG format quickly and easily.',
      url: 'https://your-site.com/bitmap-to-jpg',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Bitmap to JPG - File Utility Tools',
      description: 'Convert BMP images to JPG format quickly and easily.',
    },
  };
}

export default function BitmapToJPGPage() {
  return <BitmapToJPGTool />;
}