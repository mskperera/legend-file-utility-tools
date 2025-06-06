// app/pdf-join/page.jsx
import PDFJoinTool from "@/components/PDFJoinTool";

export async function generateMetadata() {
  return {
    title: 'Join PDF Files Online – Fast & Secure | Legend Utility Tools',
    description: 'Merge multiple PDF files into one PDF document quickly, securely, and for free. Easy online PDF joiner tool.',
    keywords: [
      'PDF join',
      'merge PDF files',
      'combine PDFs',
      'online PDF joiner',
      'free PDF merge',
      'file utility tools',
    ],
    openGraph: {
      title: 'Join PDF Files Online – Fast & Secure | Legend Utility Tools',
      description: 'Merge multiple PDF files into one PDF document quickly, securely, and for free. Easy online PDF joiner tool.',
      url: 'https://utilitytools.legendbyte.com/pdf-join',
      type: 'website',
      siteName: 'Legend Utility Tools',
      images: [
        {
          url: 'https://utilitytools.legendbyte.com/images/og-pdf-join.jpg', // Replace with your OG image URL
          width: 1200,
          height: 630,
          alt: 'Join PDF Files Online',
        },
      ],
    },
  };
}

export default function PDFJoinPage() {
  return <PDFJoinTool />;
}
