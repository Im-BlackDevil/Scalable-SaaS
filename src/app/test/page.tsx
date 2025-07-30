export default function TestPage() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          ✅ Frontend is Working!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The Next.js application is running successfully on port 3000
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Professional SaaS Platform
          </h2>
          <p className="text-gray-600 mb-4">
            This is a test page to verify that:
          </p>
          <ul className="text-left text-gray-600 space-y-2">
            <li>✅ Next.js is running properly</li>
            <li>✅ TailwindCSS is working</li>
            <li>✅ TypeScript is configured</li>
            <li>✅ Port 3000 is accessible</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 