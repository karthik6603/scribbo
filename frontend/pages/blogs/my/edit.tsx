"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Placeholder: Replace with your auth solution
const useAuth = () => ({
  isAuthenticated: false,
  user: { id: "", email: "" },
});

interface BlogForm {
  title: string;
  content: string;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  author: { id: string; email: string };
  created_at: string;
}

export default function EditBlog() {
  const router = useRouter();
  const params = useParams();
  const id =
    params && typeof params.id === "string"
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : undefined;
  const { isAuthenticated, user } = useAuth();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BlogForm>({
    mode: "onChange",
  });
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog");
        const data = await response.json();
        if (data.author.id !== user.id) {
          router.push("/blogs");
          return;
        }
        setBlog(data);
        setValue("title", data.title);
        setContent(data.content);
        setValue("content", data.content);
      } catch (error) {
        router.push("/blogs");
      }
    };
    if (id) fetchBlog();
  }, [id, isAuthenticated, user, router, setValue]);

  useEffect(() => {
    register("content", {
      required: "Content is required",
      minLength: { value: 10, message: "Content must be at least 10 characters" },
    });
  }, [register]);

  const onSubmit = async (data: BlogForm) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title.trim(),
          content: data.content,
        }),
      });
      if (response.ok) {
        router.push("/blogs/my");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update blog");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated || !blog) return null;

  return (
    <div className="bg-gradient-to-b from-background to-accent/10 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-8 text-center gradient-text">
          Edit Your Story
        </h2>
        <div className="p-8 bg-white shadow-md rounded-xl">
          <Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Form.Field name="title" className="space-y-2">
              <Form.Label className="block text-sm font-medium text-text">
                Title
              </Form.Label>
              <Form.Control asChild>
                <input
                  type="text"
                  {...register("title", {
                    required: "Title is required",
                    maxLength: { value: 100, message: "Title must be 100 characters or less" },
                  })}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.title ? "border-red-500" : "border-border"
                  }`}
                  aria-invalid={errors.title ? "true" : "false"}
                  aria-describedby={errors.title ? "title-error" : undefined}
                />
              </Form.Control>
              {errors.title && (
                <Form.Message className="text-sm text-red-500 flex items-center gap-1" id="title-error">
                  <AlertCircle className="w-4 h-4" />
                  {errors.title.message}
                </Form.Message>
              )}
            </Form.Field>
            <Form.Field name="content" className="space-y-2">
              <Form.Label className="block text-sm font-medium text-text">
                Content
              </Form.Label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={(value) => {
                  setContent(value);
                  setValue("content", value);
                }}
                className="bg-white rounded-xl"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                  ],
                }}
              />
              {errors.content && (
                <Form.Message className="text-sm text-red-500 flex items-center gap-1" id="content-error">
                  <AlertCircle className="w-4 h-4" />
                  {errors.content.message}
                </Form.Message>
              )}
            </Form.Field>
            {error && (
              <div className="bg-red-50 text-red-600 p-2 rounded flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            <Form.Submit asChild>
              <Button
                disabled={isSubmitting}
                className="w-full text-lg px-8 py-3 bg-primary text-white border-none hover:bg-cta hover:text-text shadow-md hover:shadow-lg hover:scale-105 transition-all rounded-xl"
              >
                {isSubmitting ? "Updating..." : "Update Blog"}
              </Button>
            </Form.Submit>
          </Form.Root>
        </div>
      </div>
    </div>
  );
}