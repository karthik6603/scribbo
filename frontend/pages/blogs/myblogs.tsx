"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Author {
  id: string;
  email: string;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string; // CamelCase to match backend Java field
}

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();

  const fetchBlogs = async (page: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No auth token found");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/blogs/myblogs?page=${page}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched blogs:", data);

      setBlogs(data.blogs);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error: any) {
      console.error("Error fetching blogs:", error.message, error);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No auth token found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }

      // Refresh blog list after deletion
      fetchBlogs(currentPage);
    } catch (error: any) {
      console.error("Error deleting blog:", error.message, error);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Blogs</h1>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="border rounded-md p-4 mb-4 shadow-sm">
            <Link
              href={`/blogs/${blog.id}`}
              className="text-xl font-semibold hover:underline"
            >
              {blog.title}
            </Link>
            <p className="text-sm text-gray-500 mt-1">By {blog.author.email}</p>
            <p
              className="mt-2 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></p>

            <div className="mt-4 flex space-x-2">
              <Link href={`/blogs/edit/${blog.id}`}>Edit</Link>

              <Button
                variant="destructive"
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
        >
          Prev
        </Button>
        <span className="self-center text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
