import { CategoryGrid } from "@/components/category-grid";
import { FeaturedProducts } from "@/components/featured-products";
import { Hero } from "@/components/hero";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <CategoryGrid />

      <FeaturedProducts />
    </div>
  );
}
