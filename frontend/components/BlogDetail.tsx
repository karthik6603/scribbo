// pages/blogs/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => setBlog(data))
        .catch((err) => console.error("Failed to fetch blog:", err));
    }
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">By {blog.author}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}
