import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryLoading() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="h-12 w-[250px] mb-4" />
      <Skeleton className="h-6 w-full max-w-[600px] mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ))}
      </div>
    </div>
  );
}