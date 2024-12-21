import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold mb-4">Dashboard Not Found</h2>
      <p className="text-muted-foreground mb-4">
        We couldn&apos;t find the dashboard you&apos;re looking for.
      </p>
      <Button asChild>
        <Link href="/admin">Back to Admin Home</Link>
      </Button>
    </div>
  );
}
