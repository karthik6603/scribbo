"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const getInitials = (name?: string) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "👤";
  };

  if (!pathname || ["/auth/login", "/auth/signup"].includes(pathname)) return null;

  const navLinkClass = (href: string) =>
    `block w-full text-left px-4 py-2 text-base font-medium rounded-lg ${
      pathname === href
        ? "text-primary bg-primary/10"
        : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
    }`;

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold gradient-text">
          Scribbo
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/blogs" className={navLinkClass("/blogs")}>
            Blogs
          </Link>

          {isAuthenticated && user ? (
            <>
              <Link href="/blogs/create" className={navLinkClass("/blogs/create")}>
                Create
              </Link>
              <Link href="/blogs/myblogs" className={navLinkClass("/blogs/myblogs")}>
                My Blogs
              </Link>

              <div className="relative">
                <Button
                  variant="ghost"
                  className="rounded-full p-0 w-9 h-9"
                  onClick={toggleDropdown}
                >
                  <div className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {getInitials(user.name)}
                  </div>
                </Button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg p-4 space-y-2 z-50">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.name}</p>
                    </div>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                        router.push("/auth/login");
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={navLinkClass("/auth/login")}>
                Login
              </Link>
              <Button
                asChild
                className="px-6 py-2 bg-primary text-white hover:bg-primary/90 rounded-xl"
              >
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-6 bg-white w-full space-y-3 animate-slide-down">
          <Link href="/blogs" className={navLinkClass("/blogs")} onClick={toggleMenu}>
            Blogs
          </Link>

          {isAuthenticated && user ? (
            <>
              <Link
                href="/blogs/create"
                className={navLinkClass("/blogs/create")}
                onClick={toggleMenu}
              >
                Create
              </Link>
              <Link
                href="/blogs/myblogs"
                className={navLinkClass("/blogs/myblogs")}
                onClick={toggleMenu}
              >
                My Blogs
              </Link>

              <div className="border-t pt-4 space-y-1">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    logout();
                    toggleMenu();
                    router.push("/blogs");
                  }}
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={navLinkClass("/auth/login")}
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Button
                asChild
                className="w-full bg-primary text-white hover:bg-primary/90 py-2 rounded-xl"
              >
                <Link href="/auth/signup" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
