// pages/blogs/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Blog = {
  title: string;
  content: string;
  author: {
    email: string;
  };
};

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-gray-600 text-lg font-medium">Loading blog details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-4 text-primary-foreground">{blog.title}</h1>
      <p className="text-sm text-muted-foreground mb-6">By {blog.author.email}</p>

      <div
        className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-800"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
