import { ProductCard } from "@/components/product-card";

// This would typically come from a database or API
const categories = [
  {
    name: "Streaming",
    products: [
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
        productName: "Beginner Streaming Kit",
        productDescription: "Everything you need to start streaming",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "beginner-streaming-kit",
      },
      {
        $id: "3",
        productName: "Pro Webcam",
        productDescription: "Full HD webcam for crystal clear v$ideo",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "pro-webcam",
      },
      {
        $id: "4",
        productName: "Studio Microphone",
        productDescription: "Professional-grade microphone for streamers",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "studio-microphone",
      },
    ],
  },
  {
    name: "Learning",
    products: [
      {
        $id: "5",
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
        $id: "6",
        productName: "Language Learning Software",
        productDescription: "Learn a new language fast",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "language-learning-software",
      },
      {
        $id: "7",
        productName: "Coding Bootcamp",
        productDescription: "Intensive coding course for beginners",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "coding-bootcamp",
      },
      {
        $id: "8",
        productName: "Digital Marketing Course",
        productDescription: "Master digital marketing strategies",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "digital-marketing-course",
      },
    ],
  },
  {
    name: "Creativity",
    products: [
      {
        $id: "9",
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
        $id: "10",
        productName: "Digital Drawing Tablet",
        productDescription: "Professional drawing tablet for artists",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "digital-drawing-tablet",
      },
      {
        $id: "11",
        productName: "V$ideo Editing Software",
        productDescription: "Powerful v$ideo editing tool for creators",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "v$ideo-editing-software",
      },
      {
        $id: "12",
        productName: "3D Modeling Package",
        productDescription: "Comprehensive 3D modeling and rendering suite",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "3d-modeling-package",
      },
    ],
  },
  {
    name: "Utility",
    products: [
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
        productName: "Beginner Streaming Kit",
        productDescription: "Everything you need to start streaming",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "beginner-streaming-kit",
      },
      {
        $id: "3",
        productName: "Pro Webcam",
        productDescription: "Full HD webcam for crystal clear v$ideo",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "pro-webcam",
      },
      {
        $id: "4",
        productName: "Studio Microphone",
        productDescription: "Professional-grade microphone for streamers",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "studio-microphone",
      },
    ],
  },
  {
    name: "Service",
    products: [
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
        productName: "Beginner Streaming Kit",
        productDescription: "Everything you need to start streaming",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "beginner-streaming-kit",
      },
      {
        $id: "3",
        productName: "Pro Webcam",
        productDescription: "Full HD webcam for crystal clear v$ideo",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "pro-webcam",
      },
      {
        $id: "4",
        productName: "Studio Microphone",
        productDescription: "Professional-grade microphone for streamers",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "studio-microphone",
      },
    ],
  },
  {
    name: "Others",
    products: [
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
        productName: "Beginner Streaming Kit",
        productDescription: "Everything you need to start streaming",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "beginner-streaming-kit",
      },
      {
        $id: "3",
        productName: "Pro Webcam",
        productDescription: "Full HD webcam for crystal clear v$ideo",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "pro-webcam",
      },
      {
        $id: "4",
        productName: "Studio Microphone",
        productDescription: "Professional-grade microphone for streamers",
        variations: JSON.stringify([
          { validity: "Monthly", price: 19.99 },
          { validity: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "studio-microphone",
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
                <ProductCard key={product.$id} {...product} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
