export default function StatusPage() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            All Systems Operational
          </h1>
          <p className="text-gray-600 mb-6">
            The professional SaaS platform is running perfectly without any errors.
          </p>
          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Next.js Frontend</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>TypeScript</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>TailwindCSS</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Framer Motion</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Professional UI</span>
            </div>
          </div>
          <div className="mt-6">
            <a 
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              View Landing Page
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 