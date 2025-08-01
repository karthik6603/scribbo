import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">Scribo</Link>
        <div className="space-x-4">
          <Link href="/blogs" className="text-gray-700 hover:text-blue-600">Blogs</Link>
          <Link href="/auth/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</Link>
        </div>
      </div>
    </nav>
  )
}
