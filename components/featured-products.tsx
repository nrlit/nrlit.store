import { ProductCard } from "@/components/product-card";
import { Suspense } from "react";

const featuredProducts = [
  {
    $id: "1",
    productName: "Premium Streaming Package",
    productDescription: "High-quality streaming tools for professionals",
    variations: JSON.stringify([
      { validity: "Monthly", price: 19.99 },
      { validity: "Yearly", price: 199.99 },
    ]),
    productImage: "/placeholder.svg",
    productSlug: "premium-streaming-package",
  },
  {
    $id: "2",
    productName: "Advanced Learning Course",
    productDescription: "Comprehensive online course bundle",
    variations: JSON.stringify([
      { validity: "Monthly", price: 19.99 },
      { validity: "Yearly", price: 199.99 },
    ]),
    productImage: "/placeholder.svg",
    productSlug: "advanced-learning-course",
  },
  {
    $id: "3",
    productName: "Creative Suite Pro",
    productDescription: "Full set of creative tools for designers",
    variations: JSON.stringify([
      { validity: "Monthly", price: 19.99 },
      { validity: "Yearly", price: 199.99 },
    ]),
    productImage: "/placeholder.svg",
    productSlug: "creative-suite-pro",
  },
  {
    $id: "4",
    productName: "Productivity Boost Pack",
    productDescription: "Essential tools to increase your productivity",
    variations: JSON.stringify([
      { validity: "Monthly", price: 19.99 },
      { validity: "Yearly", price: 199.99 },
    ]),
    productImage: "/placeholder.svg",
    productSlug: "productivity-boost-pack",
  },
];

export async function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <Suspense
              key={product.$id}
              fallback={
                <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200" />
              }
            >
              <div
                key={product.$id}
                className="transform transition duration-300 hover:scale-105"
              >
                <ProductCard {...product} index={index} />
              </div>
            </Suspense>
          ))}
        </div>
      </div>
    </section>
  );
}
