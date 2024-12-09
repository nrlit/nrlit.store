// import { ProductCard } from "@/components/product-card";

// const featuredProducts = [
//   {
//     id: "1",
//     name: "Premium Streaming Package",
//     description: "High-quality streaming tools for professionals",
//     price: 99.99,
//     image: "/placeholder.svg",
//     slug: "premium-streaming-package",
//     category: "Streaming",
//   },
//   {
//     id: "2",
//     name: "Advanced Learning Course",
//     description: "Comprehensive online course bundle",
//     price: 149.99,
//     image: "/placeholder.svg",
//     slug: "advanced-learning-course",
//     category: "Learning",
//   },
//   {
//     id: "3",
//     name: "Creative Suite Pro",
//     description: "Full set of creative tools for designers",
//     price: 199.99,
//     image: "/placeholder.svg",
//     slug: "creative-suite-pro",
//     category: "Creativity",
//   },
//   {
//     id: "4",
//     name: "Productivity Boost Pack",
//     description: "Essential tools to increase your productivity",
//     price: 79.99,
//     image: "/placeholder.svg",
//     slug: "productivity-boost-pack",
//     category: "Utility",
//   },
// ];

export function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="transform transition duration-300 hover:scale-105"
            >
              <ProductCard {...product} index={index} />
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
}
