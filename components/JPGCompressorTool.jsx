// components/JPGCompressorTool.jsx
'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';

export default function JPGCompressorTool() {
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
      setError('Please upload a JPG file.');
      return;
    }
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/compress-jpg', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to compress JPG.');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'compressed.jpg';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || 'Error compressing JPG. Please try again.');
    }
    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="JPG Compressor"
      description="Reduce the file size of your JPG images."
    >
      <input
        type="file"
        accept="image/jpeg"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded w-full"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleCompress}
        disabled={isProcessing}
        className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700 disabled:bg-gray-400"
      >
        {isProcessing ? 'Processing...' : 'Compress JPG'}
      </button>
    </ToolLayout>
  );
}