"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminOrderError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-4">
        We apologize for the inconvenience. Please try again.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
