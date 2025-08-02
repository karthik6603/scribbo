"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Edit, Trash2 } from "lucide-react";

// Placeholder: Replace with your auth solution
const useAuth = () => ({
  isAuthenticated: false,
  user: { id: "", email: "" },
});

interface Blog {
  id: string;
  title: string;
  content: string;
  author: { id: string; email: string };
  created_at: string;
}

export default function MyBlogs() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/blogs?userId=${user.id}&page=${page}&limit=10`);
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data.blogs || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [page, isAuthenticated, user, router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      } else {
        alert("Failed to delete blog");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="bg-gradient-to-b from-background to-accent/10 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-8 text-center gradient-text">
          My Stories
        </h2>
        {isLoading ? (
          <p className="text-lg text-muted-foreground text-center">Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-lg text-muted-foreground text-center">
            You haven’t written any stories yet.{" "}
            <Link href="/blogs/create" className="text-primary hover:underline">
              Start writing!
            </Link>
          </p>
        ) : (
          <div className="grid gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="p-6 bg-white shadow-md rounded-xl">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {blog.title}
                </h3>
                <p className="text-base text-muted-foreground mb-4 line-clamp-3">
                  {blog.content.replace(/<[^>]+>/g, "")}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  By {blog.author.email} on{" "}
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
                <div className="flex gap-4">
                  <Button
                    asChild
                    className="text-base px-6 py-2 bg-primary text-white border-none hover:bg-cta hover:text-text shadow-md hover:shadow-lg hover:scale-105 transition-all rounded-xl"
                  >
                    <Link href={`/blogs/${blog.id}`}>
                      <BookOpen className="w-5 h-5 mr-2" />
                      Read More
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="text-base px-6 py-2 bg-primary text-white border-none hover:bg-cta hover:text-text shadow-md hover:shadow-lg hover:scale-105 transition-all rounded-xl"
                  >
                    <Link href={`/blogs/${blog.id}/edit`}>
                      <Edit className="w-5 h-5 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    onClick={() => handleDelete(blog.id)}
                    className="text-base px-6 py-2 bg-red-600 text-white border-none hover:bg-red-700 shadow-md hover:shadow-lg hover:scale-105 transition-all rounded-xl"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            disabled={page === 1 || isLoading}
            onClick={() => setPage(page - 1)}
            className="text-base px-6 py-2 bg-primary text-white border-none hover:bg-cta hover:text-text shadow-md hover:shadow-lg hover:scale-105 transition-all rounded-xl"
          >
            Previous
          </Button>
          <Button
            disabled={page === totalPages || isLoading}
            onClick={() => setPage(page + 1)}
            className="text-base px-6 py-2 bg-primary text-white border-none hover:bg-cta hover:text-text shadow-md hover:shadow-lg hover:scale-105 transition-all rounded-xl"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}