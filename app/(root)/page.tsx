import { CategoryGrid } from "@/components/category-grid";
import { CategoryProducts } from "@/components/category-products";
import { FeaturedProducts } from "@/components/featured-products";
import { Hero } from "@/components/hero";
import { LoadingSkeleton } from "@/app/components/loading-skeleton";
import { Suspense } from "react";
import ClientOnly from "../components/ClientOnly";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<LoadingSkeleton />}>
        <Hero />

        <CategoryGrid />

        <FeaturedProducts />

        <CategoryProducts />
        <ClientOnly>
          <ServiceWorkerRegistration />
        </ClientOnly>
      </Suspense>
    </div>
  );
}
