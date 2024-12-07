import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-primary-foreground py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Skeleton className="h-12 w-[300px] mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-[500px] mx-auto mb-8" />
          <Skeleton className="h-10 w-[150px] mx-auto" />
        </div>
      </section>

      <div className="container mx-auto py-16">
        <Skeleton className="h-8 w-[200px] mx-auto mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[150px] w-full" />
          ))}
        </div>
      </div>

      <div className="container mx-auto py-16">
        <Skeleton className="h-8 w-[250px] mx-auto mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
