import { Suspense } from "react";
import { ShopPageClient } from "@/components/shop-page-client";
import { getAllProducts } from "@/app/actions/product";
import { ProductSkeleton } from "@/components/product-skeleton";

export default async function ShopPage() {
  const allProducts = await getAllProducts();
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ShopPageClient initialProducts={allProducts} />
    </Suspense>
  );
}
