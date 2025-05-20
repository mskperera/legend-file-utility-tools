// components/FileDropzone.jsx
import { FileText } from 'lucide-react';
export default function FileDropzone({ accept, multiple, onDrop, onFileChange, inputId, label, subLabel }) {
  return (
    <div
      className="mb-6 p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={onFileChange}
        className="hidden"
        id={inputId}
      />
      <label
        htmlFor={inputId}
        className="flex flex-col items-center justify-center cursor-pointer text-center"
      >
        <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-sky-600 mb-2" />
        <p className="text-sm sm:text-base font-medium text-gray-700">{label}</p>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">{subLabel}</p>
      </label>
    </div>
  );
}


// // components/FileDropzone.tsx
// 'use client';

// import { FileText } from 'lucide-react';

// export default function FileDropzone({
//   accept = '',
//   multiple = false,
//   onDrop,
//   onFileChange,
//   label = 'Drag and drop files here or click to upload',
//   subLabel = 'Supports multiple files',
//   inputId = 'file-upload',
// }) {
//   return (
//     <div
//       className="mb-6 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
//       onDrop={onDrop}
//       onDragOver={(e) => e.preventDefault()}
//     >
//       <input
//         type="file"
//         accept={accept}
//         multiple={multiple}
//         onChange={onFileChange}
//         className="hidden"
//         id={inputId}
//       />
//       <label
//         htmlFor={inputId}
//         className="flex flex-col items-center justify-center cursor-pointer"
//       >
//         <FileText className="w-12 h-12 text-sky-600 mb-2" />
//         <p className="text-sm font-medium text-gray-700">{label}</p>
//         <p className="text-xs text-gray-500 mt-1">{subLabel}</p>
//       </label>
//     </div>
//   );
// }
