import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminOrderLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-[150px]" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i}>
                <Skeleton className="h-5 w-[150px] mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-1" />
                <Skeleton className="h-4 w-full mt-1" />
              </div>
            ))}
          </div>
          {[1, 2].map((i) => (
            <div key={i}>
              <Skeleton className="h-5 w-[150px] mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-1" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
