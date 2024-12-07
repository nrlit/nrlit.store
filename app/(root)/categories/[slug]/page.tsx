import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";

// This would typically come from a database or API
const categories = [
  {
    slug: "streaming",
    name: "Streaming",
    description:
      "High-quality tools and software for professional streamers and content creators.",
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
    slug: "learning",
    name: "Learning",
    description:
      "Comprehensive courses and educational software to enhance your skills and knowledge.",
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
    slug: "creativity",
    name: "Creativity",
    description:
      "Tools and software to unleash your creative potential in design, video, and more.",
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const category = categories.find((cat) => cat.slug === params.slug);

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

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((cat) => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
      <p className="text-muted-foreground mb-8">{category.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {category.products.map((product, index) => (
          <ProductCard key={product.id} {...product} index={index} />
        ))}
      </div>
    </div>
  );
}
