'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { FileText } from 'lucide-react';
import FileDropzone from './FileDropzone';

export default function BitmapToJPGTool() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'image/bmp') {
        setFile(droppedFile);
        setError(null);
      } else {
        setError('Please drop a valid BMP file.');
      }
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please upload a BMP file.');
      return;
    }
    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Sending request to /api/convert-bitmap-to-jpg', { fileName: file.name, fileSize: file.size });
      const response = await fetch('/api/convert-bitmap-to-jpg', {
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

      const blob = await response.blob();
      if (blob.type !== 'image/jpeg') {
        throw new Error(`Invalid response type: ${blob.type}`);
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'converted.jpg';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || 'Error converting BMP to JPG. Please try again.');
      console.error('Client-side error:', err.message, err.stack);
    }
    setIsProcessing(false);
  };

  return (
    <ToolLayout
      title="Bitmap to JPG"
      description="Convert your BMP images to JPG format."
    >

           <FileDropzone
              accept="image/bmp"
              onDrop={handleDrop}
              onFileChange={handleFileChange}
              inputId="bmp-upload"
              label="Drag and drop a BMP file here or click to upload"
              subLabel="Supports BMP files only"
            />

      {/* <div
        className="mb-6 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <input
          type="file"
          accept="image/bmp"
          onChange={handleFileChange}
          className="hidden"
          id="bmp-upload"
        />
        <label
          htmlFor="bmp-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <FileText className="w-12 h-12 text-sky-600 mb-2" />
          <p className="text-sm font-medium text-gray-700">
            Drag and drop a BMP file here or click to upload
          </p>
          <p className="text-xs text-gray-500 mt-1">Supports BMP files only</p>
        </label>
      </div> */}

      {file && (
        <div className="mb-6 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <FileText className="w-5 h-5 text-sky-600 mr-3" />
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <button
        onClick={handleConvert}
        disabled={isProcessing || !file}
        className="w-full bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
      >
        {isProcessing ? 'Processing...' : 'Convert to JPG'}
      </button>
    </ToolLayout>
  );
}