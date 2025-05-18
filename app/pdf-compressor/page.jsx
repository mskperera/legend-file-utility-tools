// app/pdf-compressor/page.jsx
import PDFCompressorTool from '@/components/PDFCompressorTool';

export async function generateMetadata() {
  return {
    title: 'PDF Compressor - File Utility Tools',
    description: 'Compress PDF files to reduce file size.',
  };
}

export default function PDFCompressorPage() {
  return <PDFCompressorTool />;
}