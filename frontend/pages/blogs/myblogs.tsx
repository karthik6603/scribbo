"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

interface Author {
  id: string;
  email: string;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
}

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();

  const fetchBlogs = async (page: number) => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("No auth token found");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/myblogs?page=${page}&limit=10`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      const data = await response.json();
      setBlogs(data.blogs);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error: unknown) {
      console.error("Error fetching blogs:", (error as Error).message, error);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("No auth token found");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }

      fetchBlogs(currentPage);
    } catch (error: unknown) {
      console.error("Error deleting blog:", (error as Error).message, error);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  return (
    <section className="bg-gradient-to-b from-background to-accent/10 py-16 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 gradient-text">
          My Blogs
        </h1>

        {blogs.length === 0 ? (
          <p className="text-muted-foreground text-center text-lg">
            No blogs found.
          </p>
        ) : (
          <div className="grid gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-6 bg-white shadow-md hover:shadow-lg border border-border rounded-2xl transition-all"
              >
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-xl font-semibold text-primary hover:underline"
                >
                  {blog.title}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  By {blog.author.email}
                </p>
                <p
                  className="text-sm text-muted-foreground mt-2 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                ></p>

                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-xl px-3 py-2 text-sm hover:bg-muted"
                  >
                    <Link href={`/blogs/edit/${blog.id}`}>
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Link>
                  </Button>

                  <Button
                    variant="destructive"
                    className="rounded-xl px-3 py-2 text-sm"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center mt-10 space-y-4">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
