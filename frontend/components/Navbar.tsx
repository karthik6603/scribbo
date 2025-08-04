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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

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

  // Skip navbar on auth routes
  if (!pathname || ["/auth/login", "/auth/signup"].includes(pathname)) return null;

  const navLinkClass = (href: string) =>
    `text-base font-medium px-4 py-2 rounded-xl transition-all duration-200 ${
      pathname === href
        ? "text-primary border-b-2 border-primary"
        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
    }`;

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-primary hover:tracking-wide transition-all"
        >
          Scribbo
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 items-center">
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
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl p-4 space-y-2 z-50 animate-fade-in">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
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

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full px-4 pb-6 space-y-4 bg-white border-t border-gray-200 shadow-md animate-slide-down z-40">
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
              <div className="border-t border-gray-200 pt-4 space-y-1">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <Button
                  variant="destructive"
                  className="w-full mt-2"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
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
                className="w-full text-center bg-primary text-white hover:bg-primary/90 rounded-xl py-2"
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
