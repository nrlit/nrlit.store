import { notFound } from "next/navigation";

// This would typically come from a database or API
const categories = [
  {
    slug: "streaming",
    name: "Streaming",
    description:
      "High-quality tools and software for professional streamers and content creators.",
    products: [
      {
        $id: "1",
        productName: "Premium Streaming Package",
        productDescription: "High-quality streaming tools for professionals",
        variations: JSON.stringify([
          { name: "Monthly", price: 19.99 },
          { name: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "premium-streaming-package",
      },
      {
        $id: "2",
        productName: "Beginner Streaming Kit",
        productDescription: "Everything you need to start streaming",
        variations: JSON.stringify([
          { name: "Monthly", price: 19.99 },
          { name: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "beginner-streaming-kit",
      },
      {
        $id: "3",
        productName: "Pro Webcam",
        productDescription: "Full HD webcam for crystal clear v$ideo",
        variations: JSON.stringify([
          { name: "Monthly", price: 19.99 },
          { name: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "pro-webcam",
      },
      {
        $id: "4",
        productName: "Studio Microphone",
        productDescription: "Professional-grade microphone for streamers",
        variations: JSON.stringify([
          { name: "Monthly", price: 19.99 },
          { name: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "studio-microphone",
      },
    ],
  },
  {
    slug: "learning",
    name: "Learning",
    description:
      "Comprehensive courses and educational software to enhance your skills and knowledge.",
    products: [
      {
        $id: "1",
        productName: "Premium Streaming Package",
        productDescription: "High-quality streaming tools for professionals",
        variations: JSON.stringify([
          { name: "Monthly", price: 19.99 },
          { name: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "premium-streaming-package",
      },
      {
        $id: "2",
        productName: "Beginner Streaming Kit",
        productDescription: "Everything you need to start streaming",
        variations: JSON.stringify([
          { name: "Monthly", price: 19.99 },
          { name: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "beginner-streaming-kit",
      },
      {
        $id: "3",
        productName: "Pro Webcam",
        productDescription: "Full HD webcam for crystal clear v$ideo",
        variations: JSON.stringify([
          { name: "Monthly", price: 19.99 },
          { name: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "pro-webcam",
      },
      {
        $id: "4",
        productName: "Studio Microphone",
        productDescription: "Professional-grade microphone for streamers",
        variations: JSON.stringify([
          { name: "Monthly", price: 19.99 },
          { name: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "studio-microphone",
      },
    ],
  },
  {
    slug: "creativity",
    name: "Creativity",
    description:
      "Tools and software to unleash your creative potential in design, video, and more.",
    products: [
      {
        $id: "1",
        productName: "Premium Streaming Package",
        productDescription: "High-quality streaming tools for professionals",
        variations: JSON.stringify([
          { name: "Monthly", price: 19.99 },
          { name: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "premium-streaming-package",
      },
      {
        $id: "2",
        productName: "Beginner Streaming Kit",
        productDescription: "Everything you need to start streaming",
        variations: JSON.stringify([
          { name: "Monthly", price: 19.99 },
          { name: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "beginner-streaming-kit",
      },
      {
        $id: "3",
        productName: "Pro Webcam",
        productDescription: "Full HD webcam for crystal clear v$ideo",
        variations: JSON.stringify([
          { name: "Monthly", price: 19.99 },
          { name: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "pro-webcam",
      },
      {
        $id: "4",
        productName: "Studio Microphone",
        productDescription: "Professional-grade microphone for streamers",
        variations: JSON.stringify([
          { name: "Monthly", price: 19.99 },
          { name: "Yearly", price: 199.99 },
        ]),
        productImage: "/placeholder.svg",
        productSlug: "studio-microphone",
      },
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} Products | NRLIT Store`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
      <p className="text-muted-foreground mb-8">{category.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* {category.products.map((product, index) => (
          <ProductCard key={product.id} {...product} index={index} />
        ))} */}
      </div>
    </div>
  );
}
