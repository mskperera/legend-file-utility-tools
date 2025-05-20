// app/bitmap-to-jpg/page.jsx
import BitmapToJPGTool from '@/components/BitmapToJPGTool';

export async function generateMetadata() {
  return {
    title: 'Convert Bitmap to JPG Online - Fast & Free | Legend Utility Tools',
    description:
      'Easily convert BMP images to high-quality JPG format online for free. Quick, secure, and no installation needed.',
    keywords: [
      'Bitmap to JPG',
      'BMP to JPG converter',
      'image converter online',
      'free BMP to JPG',
      'file conversion tools',
      'image format converter',
    ],
    openGraph: {
      title: 'Convert Bitmap to JPG Online - Fast & Free | Legend Utility Tools',
      description:
        'Easily convert BMP images to high-quality JPG format online for free. Quick, secure, and no installation needed.',
      url: 'https://utilitytools.legendbyte.com/bitmap-to-jpg',
      type: 'website',
      siteName: 'Legend Utility Tools',
      images: [
        {
          url: 'https://utilitytools.legendbyte.com/images/og-bitmap-to-jpg.jpg', // Update this with your actual image URL
          width: 1200,
          height: 630,
          alt: 'Convert Bitmap to JPG Online',
        },
      ],
    },
  };
}

export default function BitmapToJPGPage() {
  return <BitmapToJPGTool />;
}
