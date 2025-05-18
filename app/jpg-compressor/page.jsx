// app/jpg-compressor/page.jsx
import JPGCompressorTool from '@/components/JPGCompressorTool';

export async function generateMetadata() {
  return {
    title: 'JPG Compressor - File Utility Tools',
    description: 'Compress JPG images to reduce file size while maintaining quality.',
  };
}

export default function JPGCompressorPage() {
  return <JPGCompressorTool />;
}