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
          "min-h-[200px] prose focus:outline-none p-4 bg-background rounded-xl border border-border shadow-sm transition-all duration-200 ease-in-out",
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
    <div className="max-w-3xl mx-auto mt-12 bg-white dark:bg-zinc-900 p-6 md:p-10 rounded-3xl shadow-xl transition-all duration-300">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white animate-fade-in">
        {blogId ? "Edit Your Blog ✍️" : "Create a New Blog 📝"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Blog Title"
            {...register("title", { required: "Title is required" })}
            className="w-full px-5 py-3 text-lg rounded-xl border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {editor && (
          <div className="flex flex-wrap gap-3 border border-gray-200 dark:border-zinc-700 p-3 rounded-lg bg-gray-50 dark:bg-zinc-800 transition-all duration-200">
            {[
              { icon: Bold, action: "bold" },
              { icon: Italic, action: "italic" },
              { icon: UnderlineIcon, action: "underline" },
              { icon: Code, action: "codeBlock" },
              { icon: FileText, action: "paragraph" },
            ].map(({ icon: Icon, action }, i) => {
              const commandKey = `toggle${
                action.charAt(0).toUpperCase() + action.slice(1)
              }`;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    (editor.chain().focus() as any)[commandKey]?.().run()
                  }
                  title={action}
                  className="mx-1 p-2 rounded-md bg-gray-600 hover:bg-gray-500 text-white transition-colors"
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-150 ${
                      isActive(action)
                        ? "text-black dark:text-white"
                        : "text-gray-600 dark:text-zinc-400"
                    }`}
                  />
                </button>
              );
            })}

            {/* <button
              type="button"
              onClick={() => {
                const url = prompt("Enter URL");
                if (url) editor.chain().focus().setLink({ href: url }).run();
              }}
              title="Insert Link"
            >
              <LinkIcon className="w-5 h-5 text-gray-600 hover:text-black dark:hover:text-white" />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              title="Remove Link"
            >
              <Unlink className="w-5 h-5 text-gray-600 hover:text-black dark:hover:text-white" />
            </button> */}
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
          className="w-full text-lg font-semibold py-3 rounded-xl bg-primary text-white hover:bg-cta shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {loading ? "Saving..." : blogId ? "Update Blog" : "Publish Blog"}
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
