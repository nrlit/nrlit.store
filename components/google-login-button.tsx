"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function GoogleLoginButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      variant="outline"
      type="button"
      className={`w-full ${className}`}
      {...props}
    >
      <Icons.google className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
  );
}
