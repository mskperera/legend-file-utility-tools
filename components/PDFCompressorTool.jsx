// components/PDFCompressorTool.jsx
'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';

export default function PDFCompressorTool() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCompress = async () => {
    if (!file) {
      setError('Please upload a PDF file.');
      return;
    }
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Sending request to /api/compress-pdf', { fileName: file.name, fileSize: file.size });
      const response = await fetch('/api/compress-pdf', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status, 'OK:', response.ok);

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`;
        try {
          const text = await response.text();
          console.log('Response body:', text.substring(0, 200)); // Log first 200 chars
          try {
            const errorData = JSON.parse(text);
            errorMessage = errorData.error || errorMessage;
          } catch {
            errorMessage = 'Server returned non-JSON response (likely HTML).';
          }
        } catch {
          errorMessage = 'Failed to read server response.';
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      if (blob.type !== 'application/pdf') {
        throw new Error(`Invalid response type: ${blob.type}`);
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'compressed.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || 'Error compressing PDF. Please try again.');
      console.error('Client-side error:', err.message, err.stack);
    }
    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="PDF Compressor"
      description="Reduce the file size of your PDF files."
    >
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded w-full"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleCompress}
        disabled={isProcessing}
        className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 disabled:bg-gray-400"
      >
        {isProcessing ? 'Processing...' : 'Compress PDF'}
      </button>
    </ToolLayout>
  );
}