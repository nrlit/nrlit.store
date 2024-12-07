import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// This would typically come from a database or API
const allProducts = [
  {
    id: "1",
    name: "Premium Streaming Package",
    description: "High-quality streaming tools for professionals",
    price: 99.99,
    image: "/placeholder.svg",
    slug: "premium-streaming-package",
    category: "Streaming",
  },
  {
    id: "2",
    name: "Beginner Streaming Kit",
    description: "Everything you need to start streaming",
    price: 49.99,
    image: "/placeholder.svg",
    slug: "beginner-streaming-kit",
    category: "Streaming",
  },
  {
    id: "3",
    name: "Pro Webcam",
    description: "Full HD webcam for crystal clear video",
    price: 79.99,
    image: "/placeholder.svg",
    slug: "pro-webcam",
    category: "Streaming",
  },
  {
    id: "4",
    name: "Studio Microphone",
    description: "Professional-grade microphone for streamers",
    price: 129.99,
    image: "/placeholder.svg",
    slug: "studio-microphone",
    category: "Streaming",
  },
  {
    id: "5",
    name: "Advanced Learning Course",
    description: "Comprehensive online course bundle",
    price: 149.99,
    image: "/placeholder.svg",
    slug: "advanced-learning-course",
    category: "Learning",
  },
  {
    id: "6",
    name: "Language Learning Software",
    description: "Learn a new language fast",
    price: 59.99,
    image: "/placeholder.svg",
    slug: "language-learning-software",
    category: "Learning",
  },
  {
    id: "7",
    name: "Coding Bootcamp",
    description: "Intensive coding course for beginners",
    price: 299.99,
    image: "/placeholder.svg",
    slug: "coding-bootcamp",
    category: "Learning",
  },
  {
    id: "8",
    name: "Digital Marketing Course",
    description: "Master digital marketing strategies",
    price: 89.99,
    image: "/placeholder.svg",
    slug: "digital-marketing-course",
    category: "Learning",
  },
  {
    id: "9",
    name: "Creative Suite Pro",
    description: "Full set of creative tools for designers",
    price: 199.99,
    image: "/placeholder.svg",
    slug: "creative-suite-pro",
    category: "Creativity",
  },
  {
    id: "10",
    name: "Digital Drawing Tablet",
    description: "Professional drawing tablet for artists",
    price: 149.99,
    image: "/placeholder.svg",
    slug: "digital-drawing-tablet",
    category: "Creativity",
  },
  {
    id: "11",
    name: "Video Editing Software",
    description: "Powerful video editing tool for creators",
    price: 89.99,
    image: "/placeholder.svg",
    slug: "video-editing-software",
    category: "Creativity",
  },
  {
    id: "12",
    name: "3D Modeling Package",
    description: "Comprehensive 3D modeling and rendering suite",
    price: 249.99,
    image: "/placeholder.svg",
    slug: "3d-modeling-package",
    category: "Creativity",
  },
];

const categories = ["Streaming", "Learning", "Creativity"];

export default function ShopPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input id="search" placeholder="Search products..." />
            </div>
            <div>
              <Label>Categories</Label>
              {categories.map((category) => (
                <div
                  key={category}
                  className="flex items-center space-x-2 mt-2"
                >
                  <Checkbox id={category} />
                  <label
                    htmlFor={category}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <Label htmlFor="sort">Sort by Price</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Low to High</SelectItem>
                  <SelectItem value="desc">High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Reset Filters</Button>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product, index) => (
              <ProductCard key={product.id} {...product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
