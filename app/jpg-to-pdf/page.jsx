// app/jpg-to-pdf/page.jsx
import JPGToPDFTool from '@/components/JPGToPDFTool';

export async function generateMetadata() {
  return {
    title: 'Convert JPG to PDF Online – Fast & Free | Legend Utility Tools',
    description:
      'Easily convert JPG images to PDF documents online. Quick, secure, and free image-to-PDF converter.',
    keywords: [
      'JPG to PDF',
      'convert JPG to PDF',
      'image to PDF converter',
      'online JPG to PDF',
      'free PDF converter',
      'file utility tools',
    ],
    openGraph: {
      title: 'Convert JPG to PDF Online – Fast & Free | Legend Utility Tools',
      description:
        'Easily convert JPG images to PDF documents online. Quick, secure, and free image-to-PDF converter.',
      url: 'https://utilitytools.legendbyte.com/jpg-to-pdf',
      type: 'website',
      siteName: 'Legend Utility Tools',
      images: [
        {
          url: 'https://utilitytools.legendbyte.com/images/og-jpg-to-pdf.jpg', // Replace with your actual OG image URL
          width: 1200,
          height: 630,
          alt: 'Convert JPG to PDF Online',
        },
      ],
    },
  };
}

export default function JPGToPDFPage() {
  return <JPGToPDFTool />;
}
