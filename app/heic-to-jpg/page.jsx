// app/heic-to-jpg/page.jsx
import HEICToJPGTool from '@/components/HEICToJPGTool';

export async function generateMetadata() {
  return {
    title: 'Convert HEIC to JPG Online - Fast & Free | Legend Utility Tools',
    description:
      'Quickly convert HEIC and HEIF images to JPG format online for free. Secure, easy, and no software installation required.',
    keywords: [
      'HEIC to JPG',
      'HEIF to JPG converter',
      'convert HEIC images',
      'online image converter',
      'free HEIC converter',
      'file utility tools',
    ],
    openGraph: {
      title: 'Convert HEIC to JPG Online - Fast & Free | Legend Utility Tools',
      description:
        'Quickly convert HEIC and HEIF images to JPG format online for free. Secure, easy, and no software installation required.',
      url: 'https://utilitytools.legendbyte.com/heic-to-jpg',
      type: 'website',
      siteName: 'Legend Utility Tools',
      images: [
        {
          url: 'https://utilitytools.legendbyte.com/images/og-heic-to-jpg.jpg', // Replace with your actual OG image URL
          width: 1200,
          height: 630,
          alt: 'Convert HEIC to JPG Online',
        },
      ],
    }
  };
}

export default function HEICToJPGPage() {
  return <HEICToJPGTool />;
}
