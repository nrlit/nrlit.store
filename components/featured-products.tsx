import { ProductCard } from "@/components/product-card";

const featuredProducts = [
  {
    id: "1",
    name: "Premium Streaming Package",
    description: "High-quality streaming tools for professionals",
    price: 99.99,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Advanced Learning Course",
    description: "Comprehensive online course bundle",
    price: 149.99,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Creative Suite Pro",
    description: "Full set of creative tools for designers",
    price: 199.99,
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Productivity Boost Pack",
    description: "Essential tools to increase your productivity",
    price: 79.99,
    image: "/placeholder.svg",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 bg-[length:200%_200%] animate-gradient-move text-transparent bg-clip-text">
            Featured Products
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
