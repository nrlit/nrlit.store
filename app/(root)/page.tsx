import { CategoryGrid } from "@/components/category-grid";
import { CategoryProducts } from "@/components/category-products";
import { FeaturedProducts } from "@/components/featured-products";
import { Hero } from "@/components/hero";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <CategoryGrid />

      <FeaturedProducts />

      <CategoryProducts />
    </div>
  );
}
