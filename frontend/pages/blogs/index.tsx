"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: { id: string; email: string };
  created_at: string;
}

// Mock blog data generator
const mockBlogs: Blog[] = Array.from({ length: 23 }).map((_, i) => ({
  id: `${i + 1}`,
  title: `Mock Blog Title ${i + 1}`,
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae suscipit lorem. Nulla facilisi. Vivamus volutpat...",
  author: {
    id: `${i + 100}`,
    email: `user${i + 1}@scribbo.dev`,
  },
  created_at: new Date(Date.now() - i * 100000000).toISOString(),
}));

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadMockBlogs = () => {
      setIsLoading(true);
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginated = mockBlogs.slice(start, end);
      setBlogs(paginated);
      setTotalPages(Math.ceil(mockBlogs.length / itemsPerPage));
      setIsLoading(false);
    };
    loadMockBlogs();
  }, [page]);

  const handlePageSelect = (selectedPage: number) => {
    if (selectedPage >= 1 && selectedPage <= totalPages) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="bg-gradient-to-b from-background to-accent/10 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-8 text-center gradient-text">
          Explore Stories
        </h2>

        {isLoading ? (
          <p className="text-lg text-muted-foreground text-center">Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-lg text-muted-foreground text-center">
            No stories yet.{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up to share yours!
            </Link>
          </p>
        ) : (
          <>
            <div className="grid gap-6">
              {blogs.map((blog) => (
                <div key={blog.id} className="p-6 bg-white shadow-md rounded-xl">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-base text-muted-foreground mb-4 line-clamp-3">
                    {blog.content}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    By {blog.author.email} on{" "}
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                  <Button
                    asChild
                    className="text-base px-6 py-2 bg-primary text-white border-none hover:bg-cta hover:text-text shadow-md hover:shadow-lg hover:scale-105 transition-all rounded-xl"
                  >
                    <Link href={`/blogs/${blog.id}`}>
                      <BookOpen className="w-5 h-5 mr-2" />
                      Read More
                    </Link>
                  </Button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center mt-10 space-y-4">
              <p className="text-muted-foreground text-sm">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2 flex-wrap justify-center">
                <Button
                  variant="outline"
                  disabled={page === 1 || isLoading}
                  onClick={() => handlePageSelect(page - 1)}
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? "default" : "outline"}
                    onClick={() => handlePageSelect(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  disabled={page === totalPages || isLoading}
                  onClick={() => handlePageSelect(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* This component can be used in the main blog page (frontend/pages/blogs/index.tsx)

"use client";
import { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/blogs?page=${page}&size=${pageSize}`
        );
        const data = await res.json();
        setBlogs(data.content);
        setTotalPages(data.totalPages);

        // Scroll to top on page change
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };

    fetchBlogs();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Latest Blogs</h1>

      <ul className="space-y-6">
        {blogs.map((blog) => (
          <li key={blog.id} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-sm text-muted-foreground">
              By {blog.author} | {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-700">
              {blog.content.slice(0, 150)}...
            </p>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between mt-8">
        <button
          disabled={page === 0}
          onClick={() => handlePageChange(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex space-x-2 items-center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`px-3 py-1 rounded ${
                index === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}


*/