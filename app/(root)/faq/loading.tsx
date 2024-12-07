import { Skeleton } from "@/components/ui/skeleton";

export default function FAQLoading() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="h-12 w-[300px] mb-8" />
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
