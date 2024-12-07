import { ProductCard } from "@/components/product-card";

// This would typically come from a database or API
const categories = [
  {
    name: "Streaming",
    products: [
      {
        id: "1",
        name: "Premium Streaming Package",
        description: "High-quality streaming tools for professionals",
        price: 99.99,
        image: "/placeholder.svg",
        slug: "premium-streaming-package",
      },
      {
        id: "2",
        name: "Beginner Streaming Kit",
        description: "Everything you need to start streaming",
        price: 49.99,
        image: "/placeholder.svg",
        slug: "beginner-streaming-kit",
      },
      {
        id: "3",
        name: "Pro Webcam",
        description: "Full HD webcam for crystal clear video",
        price: 79.99,
        image: "/placeholder.svg",
        slug: "pro-webcam",
      },
      {
        id: "4",
        name: "Studio Microphone",
        description: "Professional-grade microphone for streamers",
        price: 129.99,
        image: "/placeholder.svg",
        slug: "studio-microphone",
      },
    ],
  },
  {
    name: "Learning",
    products: [
      {
        id: "5",
        name: "Advanced Learning Course",
        description: "Comprehensive online course bundle",
        price: 149.99,
        image: "/placeholder.svg",
        slug: "advanced-learning-course",
      },
      {
        id: "6",
        name: "Language Learning Software",
        description: "Learn a new language fast",
        price: 59.99,
        image: "/placeholder.svg",
        slug: "language-learning-software",
      },
      {
        id: "7",
        name: "Coding Bootcamp",
        description: "Intensive coding course for beginners",
        price: 299.99,
        image: "/placeholder.svg",
        slug: "coding-bootcamp",
      },
      {
        id: "8",
        name: "Digital Marketing Course",
        description: "Master digital marketing strategies",
        price: 89.99,
        image: "/placeholder.svg",
        slug: "digital-marketing-course",
      },
    ],
  },
  {
    name: "Creativity",
    products: [
      {
        id: "9",
        name: "Creative Suite Pro",
        description: "Full set of creative tools for designers",
        price: 199.99,
        image: "/placeholder.svg",
        slug: "creative-suite-pro",
      },
      {
        id: "10",
        name: "Digital Drawing Tablet",
        description: "Professional drawing tablet for artists",
        price: 149.99,
        image: "/placeholder.svg",
        slug: "digital-drawing-tablet",
      },
      {
        id: "11",
        name: "Video Editing Software",
        description: "Powerful video editing tool for creators",
        price: 89.99,
        image: "/placeholder.svg",
        slug: "video-editing-software",
      },
      {
        id: "12",
        name: "3D Modeling Package",
        description: "Comprehensive 3D modeling and rendering suite",
        price: 249.99,
        image: "/placeholder.svg",
        slug: "3d-modeling-package",
      },
    ],
  },
];

export function CategoryProducts() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Shop by Category
        </h2>
        {categories.map((category) => (
          <div key={category.name} className="mb-16">
            <h3 className="text-2xl font-semibold mb-6">{category.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.products.map((product, index) => (
                <ProductCard key={product.id} {...product} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
