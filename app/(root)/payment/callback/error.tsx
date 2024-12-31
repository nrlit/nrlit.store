"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function CallbackError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-red-600">
            Error Occurred
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-8">
          <XCircle className="h-16 w-16 text-red-600 mb-4" />
          <p className="text-center">
            An error occurred while processing your payment.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button onClick={() => reset()}>Try Again</Button>
          <Button variant="outline" onClick={() => router.push("/checkout")}>
            Return to Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
