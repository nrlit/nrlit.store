import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentFailed({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const { error } = searchParams;

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-red-600">
            Payment Failed
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-8">
          <XCircle className="h-16 w-16 text-red-600 mb-4" />
          <p className="text-center">Your payment could not be processed.</p>
          {error && (
            <p className="text-center mt-2 text-sm text-red-500">
              Error: {error}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild>
            <a href="/checkout">Try Again</a>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
