'use client';
import { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { joinPDFs } from '@/lib/pdfUtils';
import ToolLayout from './ToolLayout';
import { X, FileText, GripVertical } from 'lucide-react';
import FileDropzone from './FileDropzone';

const ItemType = 'PDF_FILE';

const DraggableFile = ({ file, index, moveFile, removeFile }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item) => {
      if (item.index !== index) {
        moveFile(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`flex items-center p-3 bg-white rounded-lg shadow-sm mb-2 border border-gray-200 hover:bg-gray-50 transition-all duration-200 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <GripVertical className="w-5 h-5 text-gray-400 cursor-move mr-3" />
      <FileText className="w-5 h-5 text-sky-600 mr-3" />
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-900">{file.name}</p>
        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
      <button
        onClick={() => removeFile(index)}
        className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function PDFJoinTool() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
      setError(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
      setError(null);
    }
  };

  const moveFile = useCallback((fromIndex, toIndex) => {
    setFiles((prev) => {
      const updatedFiles = [...prev];
      const [movedFile] = updatedFiles.splice(fromIndex, 1);
      updatedFiles.splice(toIndex, 0, movedFile);
      return updatedFiles;
    });
  }, []);

  const removeFile = useCallback((index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  }, []);

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
    <DndProvider backend={HTML5Backend}>
      <ToolLayout
        title="PDF Join"
        description="Combine multiple PDF files into one document. Drag and drop to reorder."
      >

        <FileDropzone
  accept="application/pdf"
  multiple
  onDrop={handleDrop}
  onFileChange={handleFileChange}
  inputId="pdf-upload"
  label="Drag and drop PDF files here or click to upload"
  subLabel="Supports multiple PDF files"
/>
        {/* <div
          className="mb-6 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <FileText className="w-12 h-12 text-sky-600 mb-2" />
            <p className="text-sm font-medium text-gray-700">
              Drag and drop PDF files here or click to upload
            </p>
            <p className="text-xs text-gray-500 mt-1">Supports multiple PDF files</p>
          </label>
        </div> */}

        {files.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Uploaded Files</h3>
              <p className="text-sm text-sky-600 flex items-center gap-2" aria-label="Drag and drop to reorder PDFs">
                <GripVertical className="w-4 h-4" />
                Drag to reorder PDFs
              </p>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto p-2 bg-gray-50 rounded-lg">
              {files.map((file, index) => (
                <DraggableFile
                  key={`${file.name}-${index}`}
                  file={file}
                  index={index}
                  moveFile={moveFile}
                  removeFile={removeFile}
                />
              ))}
            </div>
          </div>
        )}

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <button
          onClick={handleJoin}
          disabled={isProcessing || files.length < 2}
          className="w-full bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          {isProcessing ? 'Processing...' : 'Join PDFs'}
        </button>
      </ToolLayout>
    </DndProvider>
  );
}