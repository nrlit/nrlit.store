"use client";

import { useFormState } from "react-dom";
import { loginAction } from "@/app/actions/auth";
import { GoogleLoginButton } from "@/components/google-login-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { continueWithGoogle } from "@/lib/server/oauth";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const initialState = {
  success: false,
  errors: {},
};

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, initialState);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });
      router.push("/");
    } else if (state.errors && Object.keys(state.errors).length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(state.errors).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((error) => {
            toast({
              title: "Login Error",
              description: error,
              variant: "destructive",
            });
          });
        }
      });
    }
  }, [state, toast, router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formAction(formData);
  }

  const handleGoogleAuth = async () => {
    await continueWithGoogle();
  };

  return (
    <div className="mx-auto max-w-sm space-y-6 py-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
      <GoogleLoginButton onClick={handleGoogleAuth} />
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="underline" href="/register">
          Sign up
        </Link>
      </div>
    </div>
  );
}
