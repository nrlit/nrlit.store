import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ShopNotFound() {
  return (
    <div className="container mx-auto py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Shop Not Found</h2>
      <p className="text-muted-foreground mb-4">
        We couldn&apos;t find the shop page you&apos;re looking for.
      </p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
