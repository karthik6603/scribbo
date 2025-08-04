"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as Form from "@radix-ui/react-form";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    mode: "onChange",
  });

  const onSubmit = async (data: SignupForm) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
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
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          router.push("/auth/login");
        }, 2000);
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
    <>
      <div className="bg-gradient-to-b from-background to-accent/10 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-text mb-6 text-center">
            Sign Up for <span className="gradient-text">Scribbo</span>
          </h2>

          <Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <Form.Field name="name" className="space-y-2">
              <Form.Label className="text-sm font-medium text-text">Name</Form.Label>
              <Form.Control asChild>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: { value: 50, message: "Max 50 characters" },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Only letters and spaces allowed",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-150 ${
                    errors.name ? "border-red-500" : "border-border"
                  }`}
                />
              </Form.Control>
              {errors.name && (
                <Form.Message className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name.message}
                </Form.Message>
              )}
            </Form.Field>

            {/* Email */}
            <Form.Field name="email" className="space-y-2">
              <Form.Label className="text-sm font-medium text-text">Email</Form.Label>
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
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-150 ${
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

            {/* Password */}
            <Form.Field name="password" className="space-y-2">
              <Form.Label className="text-sm font-medium text-text">Password</Form.Label>
              <Form.Control asChild>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Use uppercase, lowercase, number, and special char",
                    },
                  })}
                  className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-150 ${
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

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm shadow-sm">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            {/* Submit CTA */}
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

      {/* SUCCESS MODAL */}
      <Dialog open={showSuccessModal}>
        <DialogContent className="max-w-sm text-center bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-green-600 flex items-center justify-center gap-2 text-lg font-semibold">
              <CheckCircle2 className="w-6 h-6" />
              Account Created Successfully!
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mt-2">
            Redirecting to login page...
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
