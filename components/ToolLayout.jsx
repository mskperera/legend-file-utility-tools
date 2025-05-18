// components/ToolLayout.jsx
import AdBanner from './AdBanner';

export default function ToolLayout({ title, description, children }) {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
      <p className="text-lg mb-6 text-gray-600">{description}</p>
    
      <div className="bg-white p-6 rounded-lg shadow-md">{children}</div>
        <AdBanner />
    </div>
  );
}