export default function Footer() {
  return (
    <footer className="bg-sky-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Legend Utility Tools. Powerd by Legendbyte.com.</p>
        {/* <div className="mt-2">
          <a href="/" className="hover:underline mx-2">Privacy Policy</a>
          <a href="/terms" className="hover:underline mx-2">Terms of Service</a>
        </div> */}
      </div>
    </footer>
  );
}