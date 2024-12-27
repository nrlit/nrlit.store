import { ProductCard } from "@/components/product-card";
import { Skeleton } from "./ui/skeleton";
import { Suspense } from "react";
import { getProductByCategory } from "@/app/actions/product";
import { ProductCategory } from "@prisma/client";

const categories = [
  {
    name: "Streaming",
    products: await getProductByCategory(ProductCategory.streaming),
  },
  {
    name: "Learning",
    products: await getProductByCategory(ProductCategory.learning),
  },
  {
    name: "Creativity",
    products: await getProductByCategory(ProductCategory.creativity),
  },
  {
    name: "Utility",
    products: await getProductByCategory(ProductCategory.utility),
  },
  {
    name: "Service",
    products: await getProductByCategory(ProductCategory.service),
  },
  {
    name: "Others",
    products: await getProductByCategory(ProductCategory.others),
  },
];

function ProductGrid({
  products,
}: {
  products: (typeof categories)[0]["products"];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.length === 0 ? (
        <div className="max-w-md mx-auto bg-secondary rounded-lg shadow-lg p-6">
          <div className="text-center text-gray-400">
            <p>Nothing available at the moment for this category.</p>
          </div>
        </div>
      ) : (
        products.map((product, index) => (
          <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
            <ProductCard {...product} index={index} />
          </Suspense>
        ))
      )}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export function CategoryProducts() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Shop by Category
        </h2>
        <Suspense fallback={<CategorySkeleton />}>
          {categories.map((category) => (
            <div key={category.name} className="mb-16">
              <h3 className="text-2xl font-semibold mb-6">{category.name}</h3>
              <ProductGrid products={category.products} />
            </div>
          ))}
        </Suspense>
      </div>
    </section>
  );
}

function CategorySkeleton() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="mb-16">
          <Skeleton className="h-8 w-1/4 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, j) => (
              <ProductCardSkeleton key={j} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
