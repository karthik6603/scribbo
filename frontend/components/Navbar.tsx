// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  // Hide navbar on login or signup pages
  if (pathname === '/auth/login' || pathname === '/auth/signup') {
    return null
  }

  return (
    <nav className="w-full bg-background shadow-sm sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">Scribbo</Link>
        <div className="space-x-4">
          <Link href="/blogs" className="text-text hover:text-primary">Blogs</Link>
          <Link href="/auth/login" className="text-text hover:text-primary">Login</Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-cta text-white rounded hover:bg-orange-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  )
}
