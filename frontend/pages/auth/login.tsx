"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as Form from "@radix-ui/react-form";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email.trim().toLowerCase(),
          password: data.password,
        }),
      });

      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      if (!isJson) throw new Error("Expected JSON response from backend");

      const payload = await response.json();

      if (response.ok) {
        const token = payload.token;
        if (!token) throw new Error("Token is undefined in payload");

        login(token);
        setShowModal(true);
      } else {
        setError(payload.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unexpected error. Try again later.");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <div className="bg-gradient-to-b from-background to-accent/10 min-h-screen flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 shadow-md rounded-xl p-8">
          <h2 className="text-3xl font-bold text-text mb-6 text-center">
            Log In to <span className="gradient-text">Scribbo</span>
          </h2>

          <Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <Form.Field name="email" className="space-y-2">
              <Form.Label className="block text-sm font-medium text-text">
                Email
              </Form.Label>
              <Form.Control asChild>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email ? "border-red-500" : "border-border"
                  }`}
                />
              </Form.Control>
              {errors.email && (
                <Form.Message className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </Form.Message>
              )}
            </Form.Field>

            {/* Password Field */}
            <Form.Field name="password" className="space-y-2">
              <Form.Label className="block text-sm font-medium text-text">
                Password
              </Form.Label>
              <Form.Control asChild>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                      message:
                        "Include uppercase, lowercase, number, and special character",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.password ? "border-red-500" : "border-border"
                  }`}
                />
              </Form.Control>
              {errors.password && (
                <Form.Message className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password.message}
                </Form.Message>
              )}
            </Form.Field>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 text-red-600 p-2 rounded flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Form.Submit asChild>
              <Button
                disabled={isSubmitting}
                className="w-full text-lg px-8 py-3 bg-primary text-white border-none hover:bg-cta hover:text-text shadow-md hover:shadow-lg hover:scale-105 transition-all rounded-xl"
              >
                {isSubmitting ? "Logging In..." : "Log In"}
              </Button>
            </Form.Submit>
          </Form.Root>

          {/* Sign Up CTA */}
          <p className="text-sm text-muted-foreground text-center mt-4">
            Don’t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-text hover:text-primary hover:bg-primary/10 rounded px-1 transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog.Root
        open={showModal}
        onOpenChange={(open) => {
          if (!open) {
            setShowModal(false);
            router.push("/blogs");
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-sm space-y-4 text-center">
            <CheckCircle className="w-10 h-10 text-green-500 mx-auto" />
            <Dialog.Title className="text-xl font-semibold text-text">
              Login Successful
            </Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground">
              You are being redirected to the blogs page.
            </Dialog.Description>
            <Button
              onClick={() => {
                setShowModal(false);
                router.push("/blogs");
              }}
              className="w-full bg-primary text-white hover:bg-cta hover:text-text transition-all"
            >
              Explore Blogs
            </Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export const getServerSideProps = () => ({ props: {} });
