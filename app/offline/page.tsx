import Link from "next/link";

export default function Offline() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold">NRLIT</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-20 text-center bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg my-8">
          <h1 className="text-4xl font-bold mb-4">
            You&apos;re Currently Offline
          </h1>
          <p className="text-xl mb-8">
            Please check your internet connection to continue exploring our
            digital products.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
          >
            Try Again
          </Link>
        </div>

        {/* Offline Section */}
        <div className="py-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Available Offline
          </h2>
          {/* Offline content */}
          <div className="max-w-md mx-auto bg-gray-900 rounded-lg shadow-lg p-6">
            <div className="text-center text-gray-400">
              <p>Nothing available offline at the moment.</p>
            </div>
          </div>
        </div>

        {/* Cached Content Notice */}
        <div className="py-12 text-center">
          <div className="bg-gray-900/50 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">
              Some content may be available offline
            </h3>
            <p className="text-gray-400">
              Previously viewed products and pages might be accessible while
              you&apos;re offline. Reconnect to the internet to access our full
              catalog of digital products.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} NRLIT Store. All rights
              reserved. Created by NRLIT.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
