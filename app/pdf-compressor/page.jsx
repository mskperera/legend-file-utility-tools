// app/pdf-compressor/page.jsx
import PDFCompressorTool from '@/components/PDFCompressorTool';

export async function generateMetadata() {
  return {
    title: 'Compress PDF Files Online - Free PDF Compressor | Legend Utility Tools',
    description:
      'Reduce PDF file size quickly and easily with our free online PDF compressor. Secure, fast, and no software installation needed.',
    openGraph: {
      title: 'Compress PDF Files Online - Free PDF Compressor | Legend Utility Tools',
      description:
        'Reduce PDF file size quickly and easily with our free online PDF compressor. Secure, fast, and no software installation needed.',
      url: 'https://utilitytools.legendbyte.com/pdf-compressor',
      type: 'website',
      siteName: 'Legend Utility Tools',
      images: [
        {
          url: 'https://utilitytools.legendbyte.com/images/og-pdf-compressor.jpg', // Replace with your actual image file
          width: 1200,
          height: 630,
          alt: 'Compress PDF Files Online',
        },
      ],
    },
  };
}

export default function PDFCompressorPage() {
  return <PDFCompressorTool />;
}
