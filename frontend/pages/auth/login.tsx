"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange", // Real-time validation
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email.trim().toLowerCase(),
          password: data.password,
        }),
      });
      if (response.ok) {
        router.push("/blogs");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-background to-accent/10 min-h-screen flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8">
        <h2 className="text-3xl font-bold text-text mb-6 text-center ">
          Log In to <span className="gradient-text">Scribbo</span>
        </h2>
        <Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Form.Field name="email" className="space-y-2">
            <Form.Label className="block text-sm font-medium text-text">
              Email
            </Form.Label>
            <Form.Control asChild>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </Form.Control>
            {errors.email && (
              <Form.Message
                className="text-sm text-red-500 flex items-center gap-1"
                id="email-error"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </Form.Message>
            )}
          </Form.Field>
          <Form.Field name="password" className="space-y-2">
            <Form.Label className="block text-sm font-medium text-text">
              Password
            </Form.Label>
            <Form.Control asChild>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must include uppercase, lowercase, number, and special character",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.password ? "border-red-500" : "border-border"
                }`}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
            </Form.Control>
            {errors.password && (
              <Form.Message
                className="text-sm text-red-500 flex items-center gap-1"
                id="password-error"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.password.message}
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
              {isSubmitting ? "Logging In..." : "Log In"}
            </Button>
          </Form.Submit>
        </Form.Root>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-text hover:text-primary hover:bg-primary/10 rounded px-1 transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
