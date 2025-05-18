// components/PDFJoinTool.jsx
'use client';
import { useState } from 'react';
import { joinPDFs } from '@/lib/pdfUtils';
import ToolLayout from './ToolLayout';

export default function PDFJoinTool() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleJoin = async () => {
    if (files.length < 2) {
      setError('Please upload at least two PDF files.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const joinedPDF = await joinPDFs(files);
      const url = URL.createObjectURL(joinedPDF);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'joined.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Error joining PDFs. Please try again.');
    }
    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="PDF Join"
      description="Combine multiple PDF files into one document."
    >
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded w-full"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleJoin}
        disabled={isProcessing}
        className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 disabled:bg-gray-400"
      >
        {isProcessing ? 'Processing...' : 'Join PDFs'}
      </button>
    </ToolLayout>
  );
}