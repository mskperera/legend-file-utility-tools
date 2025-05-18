// components/OCRTool.jsx
'use client';
import { useState, useRef } from 'react';
import ToolLayout from '@/components/ToolLayout';

export default function OCRTool() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const textareaRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setExtractedText('');
      setError(null);
    }
  };

  const handleExtract = async () => {
    if (!file) {
      setError('Please upload an image file.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    setExtractedText('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Sending request to /api/ocr', { fileName: file.name, fileSize: file.size });
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status, 'OK:', response.ok);

      if (!response.ok) {
        let errorMessage = `Server error: ${response.status}`;
        try {
          const text = await response.text();
          console.log('Response body:', text.substring(0, 200));
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

      const data = await response.json();
      if (data.text.trim() === '') {
        setExtractedText('Image has no characters.');
      } else {
        setExtractedText(data.text);
      }
    } catch (err) {
      setError(err.message || 'Error extracting text. Please try again.');
      console.error('Client-side error:', err.message, err.stack);
    }
    setIsProcessing(false);
  };

  const handleCopyText = async () => {
    if (extractedText && textareaRef.current) {
      try {
        await navigator.clipboard.writeText(extractedText);
        alert('Text copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy text:', err);
        setError('Failed to copy text. Please copy manually.');
      }
    }
  };

  return (
    <ToolLayout
      title="OCR Text Extraction"
      description="Convert handwritten or printed text from images to editable text."
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded w-full"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleExtract}
        disabled={isProcessing}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 mb-4"
      >
        {isProcessing ? 'Processing...' : 'Extract Text'}
      </button>
      {extractedText && (
        <div className="bg-gray-100 p-4 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Extracted Text:</h3>
            <button
              onClick={handleCopyText}
              disabled={!extractedText || extractedText === 'Image has no characters.'}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              Copy Text
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={extractedText}
            onChange={(e) => setExtractedText(e.target.value)}
            className="w-full h-64 p-2 border rounded-md bg-white text-sm resize-y"
            placeholder="Extracted text will appear here..."
            readOnly={extractedText === 'Image has no characters.'}
          />
        </div>
      )}
    </ToolLayout>
  );
}