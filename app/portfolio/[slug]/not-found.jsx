// Q:\PROJECTS\YourZeroesAndOnes\YZO_Main\app\portfolio\[slug]\not-found.jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-6">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#20427f]">404</h1>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Project Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the project you're looking for. It may have been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/portfolio">
            <button className="px-6 py-3 bg-[#20427f] text-white rounded-xl font-semibold hover:bg-[#1a3668]">
              View All Projects
            </button>
          </Link>
          <Link href="/">
            <button className="px-6 py-3 border-2 border-[#20427f] text-[#20427f] rounded-xl font-semibold hover:bg-[#20427f]/5">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
