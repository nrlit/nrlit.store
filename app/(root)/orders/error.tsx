"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function OrdersError({
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
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
        <p className="text-muted-foreground mb-4">
          We couldn&apos;t load your orders. Please try again.
        </p>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
