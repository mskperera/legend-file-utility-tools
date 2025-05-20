// app/page.jsx
import CustomLink from '@/components/CustomLink';
import AdBanner from '@/components/AdBanner';

export default function Home() {
  const tools = [
    {
      name: 'PDF Join',
      path: '/pdf-join',
      desc: 'Merge multiple PDFs into one file.',
      icon: '/images/pdfjoin.webp',
    },
    {
      name: 'JPG Compressor',
      path: '/jpg-compressor',
      desc: 'Reduce JPG file size without losing quality.',
      icon: '/icons/jpg-compressor.png',
    },
    {
      name: 'PDF Compressor',
      path: '/pdf-compressor',
      desc: 'Compress PDF files for smaller sizes.',
      icon: '/images/pdfcompress.webp',
    },
    {
      name: 'JPG to PDF',
      path: '/jpg-to-pdf',
      desc: 'Convert JPG images to PDF documents.',
      icon: '/icons/jpg-to-pdf.png',
    },
    {
      name: 'Bitmap to JPG',
      path: '/bitmap-to-jpg',
      desc: 'Convert BMP images to JPG format.',
      icon: '/icons/bitmap-to-jpg.png',
    },
    {
      name: 'HEIC to JPG',
      path: '/heic-to-jpg',
      desc: 'Convert HEIC images to JPG format.',
      icon: '/icons/heic-to-jpg.png',
    },
  ];

  return (
    <div className="text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">Legend Utility Tools</h1>
      <p className="text-base sm:text-lg mb-8 text-gray-600">Fast, secure, and free tools for PDF and image processing.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {tools.map((tool) => (
          <CustomLink
            key={tool.path}
            href={tool.path}
            className="block p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition group"
          >
            <div className="flex items-center justify-center mb-4">
              <img
                src={tool.icon}
                alt={`${tool.name} icon`}
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain group-hover:scale-110 transition-transform"
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{tool.name}</h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">{tool.desc}</p>
          </CustomLink>
        ))}
        {/* <AdBanner /> */}
      </div>
    </div>
  );
}