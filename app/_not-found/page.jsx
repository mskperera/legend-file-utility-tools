// app/_not-found/page.jsx
import CustomLink from '@/components/CustomLink';

export const metadata = {
  title: '404 - Page Not Found | File Utility Tools',
  description: 'The page you are looking for does not exist. Explore our file utility tools.',
};

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">Page Not Found</h2>
      <p className="text-gray-500 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <CustomLink
        href="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </CustomLink>
    </div>
  );
}