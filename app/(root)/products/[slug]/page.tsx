import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/product-card";

// This would typically come from a database or API
const products = [
  {
    id: "1",
    slug: "premium-streaming-package",
    name: "Premium Streaming Package",
    description:
      "High-quality streaming tools for professionals. This package includes everything you need to start your streaming career.",
    longDescription:
      "The Premium Streaming Package is designed for serious content creators who demand the best. It includes a high-quality webcam, professional microphone, green screen, and lighting setup. The package also comes with a 1-year license for top-tier streaming software, giving you access to advanced features like multi-camera switching, custom overlays, and integrated chat management.",
    category: "Streaming",
    variation: [
      { validity: "1 month", price: 100 },
      { validity: "3 months", price: 250 },
      { validity: "6 months", price: 500 },
      { validity: "12 months", price: 800 },
    ],
    creationDate: "2023-01-01",
    updatingDate: "2023-06-15",
    metaTitle: "Premium Streaming Package | NRLIT Store",
    metaDescription:
      "Get our high-quality streaming tools for professionals. Start your streaming career with the best equipment.",
    image: "/placeholder.svg",
    tags: ["streaming", "professional", "high-quality"],
    available: true,
    reviews: [
      {
        id: 1,
        author: "John Doe",
        rating: 5,
        comment: "Excellent package, really improved my stream quality!",
      },
      {
        id: 2,
        author: "Jane Smith",
        rating: 4,
        comment: "Great value for money, but the setup was a bit tricky.",
      },
    ],
  },
  // ... other products ...
];

const relatedProducts = [
  {
    $id: "1",
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
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.metaTitle,
    description: product.metaDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-muted-foreground">/</span>
                <Link
                  href="/shop"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Shop
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-muted-foreground">/</span>
                <span className="text-sm font-medium text-primary">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-[400px]"
              loading="lazy"
              layout="responsive"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i <
                      Math.round(
                        product.reviews.reduce(
                          (acc, review) => acc + review.rating,
                          0
                        ) / product.reviews.length
                      )
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews.length} reviews)
              </span>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <Card>
              <CardContent className="pt-6">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variation.map((variant) => (
                      <SelectItem
                        key={variant.validity}
                        value={variant.validity}
                      >
                        {variant.validity} - ${variant.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
            <div className="flex space-x-4">
              <Button className="flex-1">Add to Cart</Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Category: {product.category}</p>
              <p>
                Created: {new Date(product.creationDate).toLocaleDateString()}
              </p>
              <p>
                Last Updated:{" "}
                {new Date(product.updatingDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div>
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>
          <p className="text-muted-foreground">{product.longDescription}</p>
        </div>

        <Separator className="my-8" />

        <div>
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <p className="mt-2 text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <div>
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.$id} {...product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
