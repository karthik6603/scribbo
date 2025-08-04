"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import { TextStyle } from "@tiptap/extension-text-style";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Code,
  FileText,
  Underline as UnderlineIcon,
  Unlink,
} from "lucide-react";

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
      Link.configure({ openOnClick: false }),
      BulletList,
      OrderedList,
      Paragraph,
      TextStyle,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "min-h-[200px] prose focus:outline-none p-4 bg-white rounded-md border border-gray-300 shadow-sm",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue("content", html, { shouldValidate: true });
    },
  });

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs/${blogId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
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

    if (editor) fetchBlog();
  }, [blogId, editor]);

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

  const isActive = (type: string) => editor?.isActive(type);

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {blogId ? "Edit Your Blog ✍️" : "Create a New Blog 📝"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Enter your blog title"
            {...register("title", { required: "Title is required" })}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {editor && (
          <div className="flex flex-wrap gap-3 border border-gray-200 p-3 rounded-md bg-gray-50 items-center">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Bold"
            >
              <Bold
                className={`w-5 h-5 ${
                  isActive("bold") ? "text-black" : "text-gray-600"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Italic"
            >
              <Italic
                className={`w-5 h-5 ${
                  isActive("italic") ? "text-black" : "text-gray-600"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              title="Underline"
            >
              <UnderlineIcon
                className={`w-5 h-5 ${
                  isActive("underline") ? "text-black" : "text-gray-600"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Bullet List"
            >
              <List
                className={`w-5 h-5 ${
                  isActive("bulletList") ? "text-black" : "text-gray-600"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Numbered List"
            >
              <ListOrdered
                className={`w-5 h-5 ${
                  isActive("orderedList") ? "text-black" : "text-gray-600"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => {
                const url = prompt("Enter URL");
                if (url) editor.chain().focus().setLink({ href: url }).run();
              }}
              title="Insert Link"
            >
              <LinkIcon className="w-5 h-5 text-gray-600 hover:text-black" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              title="Remove Link"
            >
              <Unlink className="w-5 h-5 text-gray-600 hover:text-black" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              title="Code Block"
            >
              <Code
                className={`w-5 h-5 ${
                  isActive("codeBlock") ? "text-black" : "text-gray-600"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setParagraph().run()}
              title="Paragraph"
            >
              <FileText
                className={`w-5 h-5 ${
                  isActive("paragraph") ? "text-black" : "text-gray-600"
                }`}
              />
            </button>
          </div>
        )}

        <div>
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

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300"
        >
          {loading ? "Saving..." : blogId ? "Update Blog" : "Publish Blog"}
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
