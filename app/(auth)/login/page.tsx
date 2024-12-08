import auth from "@/auth";
import { GoogleLoginButton } from "@/components/google-login-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await auth.getUser();
  if (user) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-sm space-y-6 py-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>
      <form action={auth.createSession} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            required
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="********"
            required
            type="password"
          />
        </div>
        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>
      <GoogleLoginButton />
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="underline" href="/register">
          Sign up
        </Link>
      </div>
    </div>
  );
}
