import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeaturedProducts } from "@/app/actions/product";

function ProductCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
              <div className="transform transition duration-300 hover:scale-105">
                <ProductCard {...product} index={index} />
              </div>
            </Suspense>
          ))}
        </div>
      </div>
    </section>
  );
}
