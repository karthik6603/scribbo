"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

// Placeholder: Replace with your auth solution (e.g., next-auth)
const useAuth = () => ({
  isAuthenticated: false,
  user: { id: "0", email: "" },
});

interface Blog {
  id: string;
  title: string;
  content: string;
  author: { id: string; email: string };
  created_at: string;
}

export default function BlogDetail() {
  const params = useParams();
  const id = params && typeof params.id === "string" ? params.id : Array.isArray(params?.id) ? params.id[0] : undefined;
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog");
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        router.push("/blogs");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-background to-accent/10 min-h-screen flex items-center justify-center py-16 px-4">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-gradient-to-b from-background to-accent/10 min-h-screen flex items-center justify-center py-16 px-4">
        <p className="text-lg text-muted-foreground">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-background to-accent/10 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="p-8 bg-white shadow-md rounded-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 gradient-text">
            {blog.title}
          </h1>
          <p className="text-base text-muted-foreground mb-6 whitespace-pre-wrap">
            {blog.content}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            By {blog.author.email} on {new Date(blog.created_at).toLocaleDateString()}
          </p>
          {isAuthenticated && user.id === blog.author.id && (
            <Button
              asChild
              className="text-base px-6 py-2 bg-primary text-white border-none hover:bg-cta hover:text-text shadow-md hover:shadow-lg hover:scale-105 transition-all rounded-xl"
            >
              <Link href={`/blogs/${id}/edit`}>
                <Edit className="w-5 h-5 mr-2" />
                Edit Blog
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}