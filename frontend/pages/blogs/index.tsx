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
  createdAt: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs?page=${page + 1}&limit=${pageSize}`
        );
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();

        setBlogs(data.content || []);
        setTotalPages(data.totalPages ?? 1);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  const handlePageSelect = (selectedPage: number) => {
    if (selectedPage >= 0 && selectedPage < totalPages) {
      setPage(selectedPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gradient-to-b from-background to-accent/10 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center gradient-text">
          Explore Stories
        </h2>

        {isLoading ? (
          <p className="text-lg text-muted-foreground text-center">Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-lg text-muted-foreground text-center">
            No stories found.{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Be the first to share yours!
            </Link>
          </p>
        ) : (
          <>
            <div className="grid gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-6 bg-white shadow-lg hover:shadow-xl border border-border rounded-2xl transition-all"
                >
                  <h3 className="text-2xl font-semibold text-text mb-2">
                    {blog.title}
                  </h3>
                  <p
                    className="text-sm text-muted-foreground mb-3 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  ></p>
                  <p className="text-xs text-gray-500 mb-4">
                    By <span className="font-medium">{blog.author.email}</span> on{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <Button
                    asChild
                    className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-cta hover:scale-105 flex items-center gap-2 transition-all"
                  >
                    <Link href={`/blogs/${blog.id}`}>
                      <BookOpen className="w-4 h-4" />
                      Read More
                    </Link>
                  </Button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center mt-10 space-y-3">
              <p className="text-sm text-muted-foreground">
                Page {page + 1} of {totalPages}
              </p>
              <div className="flex gap-2 flex-wrap justify-center">
                <Button
                  variant="outline"
                  disabled={page === 0 || isLoading}
                  onClick={() => handlePageSelect(page - 1)}
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={page === i ? "default" : "outline"}
                    onClick={() => handlePageSelect(i)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  disabled={page === totalPages - 1 || isLoading}
                  onClick={() => handlePageSelect(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
