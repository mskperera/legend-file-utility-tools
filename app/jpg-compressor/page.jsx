// app/jpg-compressor/page.jsx
import JPGCompressorTool from '@/components/JPGCompressorTool';

export async function generateMetadata() {
  return {
    title: 'Compress JPG Images Online – Fast, Free & High Quality | Legend Utility Tools',
    description:
      'Quickly compress JPG images online to reduce file size without losing quality. Secure, easy-to-use, and completely free.',
    keywords: [
      'JPG compressor',
      'compress JPG online',
      'reduce JPG file size',
      'image compressor',
      'free JPG compressor',
      'file utility tools',
    ],
    openGraph: {
      title: 'Compress JPG Images Online – Fast, Free & High Quality | Legend Utility Tools',
      description:
        'Quickly compress JPG images online to reduce file size without losing quality. Secure, easy-to-use, and completely free.',
      url: 'https://utilitytools.legendbyte.com/jpg-compressor',
      type: 'website',
      siteName: 'Legend Utility Tools',
      images: [
        {
          url: 'https://utilitytools.legendbyte.com/images/og-jpg-compressor.jpg', // Replace with your actual OG image URL
          width: 1200,
          height: 630,
          alt: 'Compress JPG Images Online',
        },
      ],
    }
  };
}

export default function JPGCompressorPage() {
  return <JPGCompressorTool />;
}
