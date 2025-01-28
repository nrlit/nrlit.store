import { CategoryGrid } from "@/components/category-grid";
import { CategoryProducts } from "@/components/category-products";
import { FeaturedProducts } from "@/components/featured-products";
import { Hero } from "@/components/hero";
import { LoadingSkeleton } from "@/app/components/loading-skeleton";
import { Suspense } from "react";
import ClientOnly from "../components/ClientOnly";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";
import TawkMessenger from "@/components/tawk-messenger";
import { GoogleTagManager } from '@next/third-parties/google';

export default async function Home() {
  const tawkPropertyId = process.env.TAWK_PROPERTY_ID!;
  const tawkWidgetId = process.env.TAWK_WIDGET_ID!;

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Suspense fallback={<LoadingSkeleton />}>
        <CategoryGrid />

        <FeaturedProducts />

        <CategoryProducts />
        <ClientOnly>
          <GoogleTagManager gtmId={process.env.GTM_ID! as string} />
          <TawkMessenger propertyID={tawkPropertyId} widgetID={tawkWidgetId} />
          <ServiceWorkerRegistration />
        </ClientOnly>
      </Suspense>
    </div>
  );
}
