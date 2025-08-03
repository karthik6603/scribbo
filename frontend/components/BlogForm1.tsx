"use client";

import { useEffect, useRef, useState, FC } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  LexicalComposer,
  InitialConfigType,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $generateHtmlFromNodes } from "@lexical/html";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { EditorState } from "lexical";

import { Button } from "@/components/ui/button";
import "@/pages/blogs/editor.css";

import HTMLInjectionPlugin from "@/components/HTMLInjectionPlugin";
 // Assuming you have this plugin

interface FormData {
  title: string;
  content: string;
}

interface BlogFormProps {
  blogId?: string;
}

const BlogForm: FC<BlogFormProps> = ({ blogId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const contentRef = useRef("");

  const editorConfig: InitialConfigType = {
    namespace: "MinimalEditor",
    theme: {},
    onError: (error) => console.error(error),
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      LinkNode,
      AutoLinkNode,
    ],
  };

  const fetchBlog = async () => {
    if (!blogId) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch blog");

      const data = await res.json();
      setValue("title", data.title);
      setValue("content", data.content);
      contentRef.current = data.content;
    } catch (err) {
      alert("Could not load blog for editing");
      router.push("/blogs");
    }
  };

  const onEditorChange = (editorState: EditorState, editor: any) => {
    editor.read(() => {
      const html = $generateHtmlFromNodes(editor);
      contentRef.current = html;
      setValue("content", html);
    });
  };

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    const blogPayload = {
      title: data.title.trim(),
      content: contentRef.current.trim(),
    };

    if (!blogPayload.content) {
      alert("Blog content cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8080/blogs${blogId ? `/${blogId}` : ""}`,
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

        <LexicalComposer initialConfig={editorConfig}>
          <div className="border rounded">
            <RichTextPlugin
              contentEditable={
                <ContentEditable className="editor-input px-4 py-3 min-h-[200px] outline-none" />
              }
              placeholder={
                <div className="editor-placeholder px-4 py-3 text-gray-400">
                  Write your blog content here...
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <OnChangePlugin onChange={onEditorChange} />
          </div>
        </LexicalComposer>

        {/* <FroalaEditorComponent tag='textarea'/> */}

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
