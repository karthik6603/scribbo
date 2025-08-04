"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext"; // 👈 AuthContext

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated, user, logout } = useAuth(); // ✅ useAuth
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const getInitials = (name?: string) => {
    if (!name) return "👤";
    return name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // ❌ Don't render on auth pages
  if (pathname === "/auth/login" || pathname === "/auth/signup") return null;

  return (
    <nav className="w-full bg-gradient-to-r from-background to-accent/10 shadow-md sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold gradient-text">
          Scribbo
        </Link>
        <div className="md:hidden">
          <Button variant="ghost" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="w-6 h-6 text-text" />
            ) : (
              <Menu className="w-6 h-6 text-text" />
            )}
          </Button>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            href="/blogs"
            className={`text-base font-medium px-3 py-2 rounded transition ${
              pathname === "/blogs"
                ? "gradient-text border-b-2 border-primary"
                : "text-text hover:text-primary hover:bg-primary/10"
            }`}
          >
            Blogs
          </Link>
          {isAuthenticated && user ? (
            <>
              <Link
                href="/blogs/create"
                className={`text-base font-medium px-3 py-2 rounded transition ${
                  pathname === "/blogs/create"
                    ? "gradient-text border-b-2 border-primary"
                    : "text-text hover:text-primary hover:bg-primary/10"
                }`}
              >
                Create Blog
              </Link>
              <Link
                href="/blogs/myblogs"
                className={`text-base font-medium px-3 py-2 rounded transition ${
                  pathname === "/blogs/myblogs"
                    ? "gradient-text border-b-2 border-primary"
                    : "text-text hover:text-primary hover:bg-primary/10"
                }`}
              >
                My Blogs
              </Link>
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={toggleDropdown}
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                    {getInitials(user.name)}
                  </div>
                </Button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-xl p-4 space-y-2 z-50">
                    <p className="text-sm font-semibold text-text">
                      {user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                    <Button
                      variant="destructive"
                      className="w-full text-sm bg-red-600 text-white hover:bg-red-700"
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
              <Link
                href="/auth/login"
                className={`text-base font-medium px-3 py-2 rounded transition ${
                  pathname === "/auth/login"
                    ? "gradient-text border-b-2 border-primary"
                    : "text-text hover:text-primary hover:bg-primary/10"
                }`}
              >
                Login
              </Link>
              <Button
                asChild
                className="text-lg px-8 py-3 bg-primary text-white border-none hover:bg-cta hover:text-text shadow-md hover:shadow-lg hover:scale-105 rounded-xl transition-all duration-300 ease-in-out"
              >
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background px-6 py-4 flex flex-col space-y-4">
          <Link
            href="/blogs"
            className={`text-base font-medium px-3 py-2 rounded transition ${
              pathname === "/blogs"
                ? "gradient-text border-b-2 border-primary"
                : "text-text hover:text-primary hover:bg-primary/10"
            }`}
            onClick={toggleMenu}
          >
            Blogs
          </Link>
          {isAuthenticated && user ? (
            <>
              <Link
                href="/blogs/create"
                className="text-base font-medium px-3 py-2 rounded transition text-text hover:text-primary hover:bg-primary/10"
                onClick={toggleMenu}
              >
                Create Blog
              </Link>
              <Link
                href="/blogs/myblogs"
                className="text-base font-medium px-3 py-2 rounded transition text-text hover:text-primary hover:bg-primary/10"
                onClick={toggleMenu}
              >
                My Blogs
              </Link>
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                  {getInitials(user.name)}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-text">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Button
                    variant="destructive"
                    className="text-sm bg-red-600 text-white hover:bg-red-700 mt-2"
                    onClick={() => {
                      logout();
                      toggleMenu();
                      router.push("/blogs");
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={`text-base font-medium px-3 py-2 rounded transition ${
                  pathname === "/auth/login"
                    ? "gradient-text border-b-2 border-primary"
                    : "text-text hover:text-primary hover:bg-primary/10"
                }`}
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Button
                asChild
                className="text-lg px-8 py-3 bg-primary text-white border-none hover:bg-cta hover:text-text shadow-md hover:shadow-lg hover:scale-105 rounded-xl transition-all duration-300 ease-in-out"
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
