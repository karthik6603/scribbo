"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

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
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [initialContent, setInitialContent] = useState("<p></p>");
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] border border-gray-300 rounded p-3 focus:outline-none prose",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue("content", html, { shouldValidate: true });
    },
  });

  const fetchBlog = async () => {
    if (!blogId) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch blog");

      const data = await res.json();
      setValue("title", data.title);
      setValue("content", data.content);
      setInitialContent(data.content);
      editor?.commands.setContent(data.content);
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
      content: getValues("content").trim(),
    };

    if (!blogPayload.content || blogPayload.content === "<p></p>") {
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

        <div>
          {editor && (
            <div className="mb-3 space-x-2 border border-gray-300 p-2 rounded bg-gray-50 text-sm text-gray-700">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                Bold
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                Italic
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                Underline
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                • List
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                1. List
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = prompt("Enter link URL");
                  if (url) editor.chain().focus().setLink({ href: url }).run();
                }}
              >
                Link
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().unsetLink().run()}
              >
                Remove Link
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              >
                Code
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
              >
                Paragraph
              </button>
            </div>
          )}

          <EditorContent editor={editor} />
          <input
            type="hidden"
            {...register("content", { required: "Content is required" })}
          />
          {errors.content && (
            <p className="text-sm text-red-500 mt-2">
              {errors.content.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full bg-blue-600 text-white">
          {loading ? "Saving..." : blogId ? "Update Blog" : "Publish Blog"}
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
