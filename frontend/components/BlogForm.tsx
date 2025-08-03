"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

        
// Require Editor CSS files.
// import 'froala-editor/css/froala_style.min.css';
// import 'froala-editor/css/froala_editor.pkgd.min.css';
        
// import FroalaEditorComponent from 'react-froala-wysiwyg'


const FroalaEditorComponent = dynamic(
  () => import("react-froala-wysiwyg"),
  { ssr: false }
);

interface FormData {
  title: string;
  content: string;
}

interface BlogFormProps {
  blogId?: string;
}

const BlogForm = ({ blogId }: BlogFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("<p></p>");
  const router = useRouter();

  const config = {
    placeholderText: "Write your blog content here...",
    charCounterCount: false,
    toolbarButtons: [
      ["undo", "redo", "bold", "italic", "underline", "formatOL", "formatUL", "insertLink", "insertImage", "html"]
    ],
  };

  const fetchBlog = async () => {
    if (!blogId) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch blog");

      const data = await res.json();
      setValue("title", data.title);
      setValue("content", data.content);
      setContent(data.content);
    } catch (err) {
      alert("Could not load blog for editing");
      router.push("/blogs");
    }
  };

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    const blogPayload = {
      title: data.title.trim(),
      content: content.trim(),
    };

    if (!blogPayload.content) {
      alert("Blog content cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs${blogId ? `/${blogId}` : ""}`,
        {
          method: blogId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(blogPayload),
        }
      );

      setLoading(false);
      if (res.ok) router.push("/blogs/myblogs");
      else alert((await res.json()).message || "Failed to submit blog.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");
    if (blogId) fetchBlog();
  }, [blogId]);

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {blogId ? "Edit Blog" : "Create New Blog"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Enter blog title"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <FroalaEditorComponent
          tag='textarea'
          model={content}
          onModelChange={(value: string) => {
            setContent(value);
            setValue("content", value);
          }}
          config={config}
        />

        <input
          type="hidden"
          {...register("content", { required: "Content is required" })}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}

        <Button type="submit" className="w-full bg-blue-600 text-white">
          {loading ? "Saving..." : blogId ? "Update Blog" : "Publish Blog"}
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;