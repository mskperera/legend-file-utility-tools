// app/ocr/page.jsx
import OCRTool from '@/components/OCRTool';

export async function generateMetadata() {
  return {
    title: 'OCR Text Extraction - File Utility Tools',
    description: 'Convert handwritten or printed text from images to editable text using OCR.',
    keywords: ['OCR', 'image to text', 'text extraction', 'file tools'],
    openGraph: {
      title: 'OCR Text Extraction - File Utility Tools',
      description: 'Convert handwritten or printed text from images to editable text using OCR.',
      url: 'https://your-site.com/ocr',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'OCR Text Extraction - File Utility Tools',
      description: 'Convert handwritten or printed text from images to editable text using OCR.',
    },
  };
}

export default function OCRPage() {
  return <OCRTool />;
}