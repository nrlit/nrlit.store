"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthForm } from "@/components/auth/auth-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/password-input";
import Link from "next/link";
import { resetPasswordSchema, type ResetPasswordInput } from "../schemas";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    const urlToken = searchParams.get("token");
    setToken(urlToken);

    if (urlToken) {
      // Validate the token
      validateToken(urlToken);
    } else {
      setIsTokenValid(false);
    }
  }, [searchParams]);

  const validateToken = async (token: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-reset-token?token=${token}`
      );
      const data = await response.json();
      setIsTokenValid(data.isValid);
    } catch (error) {
      console.error("Error validating token:", error);
      setIsTokenValid(false);
    }
  };

  const onSubmit = async (data: ResetPasswordInput) => {
    if (!token) {
      toast({
        title: "Error",
        description: "Reset token is missing",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, token }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to reset password");
      }
      toast({
        title: "Success",
        description: "Your password has been reset successfully.",
      });
      router.push("/login");
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isTokenValid === null) {
    return <div>Validating reset token...</div>;
  }

  if (isTokenValid === false) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Invalid or Expired Reset Link
        </h1>
        <p className="mb-4">
          The password reset link is invalid or has expired.
        </p>
        <Link href="/forgot-password" className="text-blue-500 hover:underline">
          Request a new password reset link
        </Link>
      </div>
    );
  }

  return (
    <AuthForm
      title="Reset Password"
      description="Enter your new password below."
      footer={
        <p className="text-sm text-center">
          Remember your password?{" "}
          <Link href="/login" className="font-semibold hover:underline">
            Login
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <PasswordInput
            id="password"
            register={register("password")}
            error={errors.password?.message}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <PasswordInput
            id="confirmPassword"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>
        <input type="hidden" {...register("token")} value={token || ""} />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </AuthForm>
  );
}
