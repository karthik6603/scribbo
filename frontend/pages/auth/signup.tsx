"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    mode: "onChange", // Real-time validation
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: SignupForm) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim().toLowerCase(),
          password: data.password,
        }),
      });
      if (response.ok) {
        router.push("/blogs");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Signup failed");
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
        <h2 className="text-3xl font-bold text-text mb-6 text-center">
          Sign Up for <span className="gradient-text">Scribbo</span>
        </h2>
        <Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Form.Field name="name" className="space-y-2">
            <Form.Label className="block text-sm font-medium text-text">
              Name
            </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  maxLength: {
                    value: 50,
                    message: "Name must be 50 characters or less",
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name must contain only letters and spaces",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? "border-red-500" : "border-border"
                }`}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </Form.Control>
            {errors.name && (
              <Form.Message
                className="text-sm text-red-500 flex items-center gap-1"
                id="name-error"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.name.message}
              </Form.Message>
            )}
          </Form.Field>
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
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </Form.Submit>
        </Form.Root>
        <p className="text-sm text-muted-foreground text-center mt-4">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-text hover:text-primary hover:bg-primary/10 rounded px-1 transition"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
