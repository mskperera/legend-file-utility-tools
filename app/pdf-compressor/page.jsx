// app/pdf-compressor/page.jsx
import PDFCompressorTool from '@/components/PDFCompressorTool';

export async function generateMetadata() {
  return {
    title: 'Compress PDF Files Online - Free PDF Compressor | File Utility Tools',
    description:
      'Reduce PDF file size quickly and easily with our free online PDF compressor. Secure, fast, and no software installation needed.',
    openGraph: {
      title: 'Compress PDF Files Online - Free PDF Compressor | File Utility Tools',
      description:
        'Reduce PDF file size quickly and easily with our free online PDF compressor. Secure, fast, and no software installation needed.',
      url: 'https://fileutilitytools.legendbyte.com/pdf-compressor',
      type: 'website',
      siteName: 'File Utility Tools',
      images: [
        {
          url: 'https://fileutilitytools.legendbyte.com/og-pdf-compressor.jpg', // Replace with your actual image file
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
