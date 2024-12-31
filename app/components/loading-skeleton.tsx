import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen ">
      {/* Navigation Loading State */}
      {/* <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <span className="text-2xl font-bold">NRLIT</span>
              <div className="hidden md:flex items-center gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-20 bg-gray-800" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
              <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
            </div>
          </div>
        </div>
      </nav> */}

      {/* Hero Section Loading State */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 text-center bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg my-8 animate-pulse">
            <div className="flex flex-col items-center justify-center gap-4">
              <Skeleton className="h-12 w-3/4 max-w-2xl bg-white/20" />
              <Skeleton className="h-6 w-2/3 max-w-xl bg-white/20" />
              <Skeleton className="h-10 w-32 bg-white/20 rounded-md mt-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Loading State */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center mb-8">
          <Skeleton className="h-8 w-48 bg-gray-800 mb-2" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-6 rounded-lg border border-gray-800 bg-gray-900/50"
            >
              <div className="w-12 h-12 rounded-full bg-gray-800 animate-pulse mb-4" />
              <Skeleton className="h-4 w-20 bg-gray-800" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Loading State */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center mb-8">
          <Skeleton className="h-8 w-48 bg-gray-800 mb-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-800 bg-gray-900/50 p-4"
            >
              <Skeleton className="w-full aspect-square rounded-md bg-gray-800 mb-4" />
              <Skeleton className="h-6 w-3/4 bg-gray-800 mb-2" />
              <Skeleton className="h-4 w-1/2 bg-gray-800" />
            </div>
          ))}
        </div>
      </div>

      {/* Global Loading Spinner */}
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg animate-bounce">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    </div>
  );
}
