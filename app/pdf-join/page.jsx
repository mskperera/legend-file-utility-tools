// app/pdf-join/page.jsx

import PDFJoinTool from "@/components/PDFJoinTool";


export async function generateMetadata() {
  return {
    title: 'PDF Join - File Utility Tools',
    description: 'Merge multiple PDF files into a single PDF document quickly and securely.',
  };
}

export default function PDFJoinPage() {
  return <PDFJoinTool />;
}