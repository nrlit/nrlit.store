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
import { getAllProducts } from "@/app/actions/product";

// This would typically come from a database or API
// const allProducts = [
//   {
//     $id: "1",
//     productName: "Premium Streaming Package",
//     productDescription: "High-quality streaming tools for professionals",
//     variations: JSON.stringify([
//       { name: "Monthly", price: 19.99 },
//       { name: "Yearly", price: 199.99 },
//     ]),
//     productImage: "/placeholder.svg",
//     productSlug: "premium-streaming-package",
//     productCategory: "Streaming",
//   },
//   {
//     $id: "2",
//     productName: "Beginner Streaming Kit",
//     productDescription: "Everything you need to start streaming",
//     variations: JSON.stringify([
//       { name: "Monthly", price: 19.99 },
//       { name: "Yearly", price: 199.99 },
//     ]),
//     productImage: "/placeholder.svg",
//     productSlug: "beginner-streaming-kit",
//     productCategory: "Streaming",
//   },
//   {
//     $id: "3",
//     productName: "Pro Webcam",
//     productDescription: "Full HD webcam for crystal clear v$ideo",
//     variations: JSON.stringify([
//       { name: "Monthly", price: 19.99 },
//       { name: "Yearly", price: 199.99 },
//     ]),
//     productImage: "/placeholder.svg",
//     productSlug: "pro-webcam",
//     productCategory: "Streaming",
//   },
//   {
//     $id: "4",
//     productName: "Studio Microphone",
//     productDescription: "Professional-grade microphone for streamers",
//     variations: JSON.stringify([
//       { name: "Monthly", price: 19.99 },
//       { name: "Yearly", price: 199.99 },
//     ]),
//     productImage: "/placeholder.svg",
//     productSlug: "studio-microphone",
//     productCategory: "Streaming",
//   },
//   {
//     $id: "5",
//     productName: "Advanced Learning Course",
//     productDescription: "Comprehensive online course bundle",
//     variations: JSON.stringify([
//       { name: "Monthly", price: 19.99 },
//       { name: "Yearly", price: 199.99 },
//     ]),
//     productImage: "/placeholder.svg",
//     productSlug: "advanced-learning-course",
//     productCategory: "Learning",
//   },
//   {
//     $id: "6",
//     productName: "Language Learning Software",
//     productDescription: "Learn a new language fast",
//     variations: JSON.stringify([
//       { name: "Monthly", price: 19.99 },
//       { name: "Yearly", price: 199.99 },
//     ]),
//     productImage: "/placeholder.svg",
//     productSlug: "language-learning-software",
//     productCategory: "Learning",
//   },
//   {
//     $id: "7",
//     productName: "Coding Bootcamp",
//     productDescription: "Intensive coding course for beginners",
//     variations: JSON.stringify([
//       { name: "Monthly", price: 19.99 },
//       { name: "Yearly", price: 199.99 },
//     ]),
//     productImage: "/placeholder.svg",
//     productSlug: "coding-bootcamp",
//     productCategory: "Learning",
//   },
//   {
//     $id: "8",
//     productName: "Digital Marketing Course",
//     productDescription: "Master digital marketing strategies",
//     variations: JSON.stringify([
//       { name: "Monthly", price: 19.99 },
//       { name: "Yearly", price: 199.99 },
//     ]),
//     productImage: "/placeholder.svg",
//     productSlug: "digital-marketing-course",
//     productCategory: "Learning",
//   },
//   {
//     $id: "9",
//     productName: "Creative Suite Pro",
//     productDescription: "Full set of creative tools for designers",
//     variations: JSON.stringify([
//       { name: "Monthly", price: 19.99 },
//       { name: "Yearly", price: 199.99 },
//     ]),
//     productImage: "/placeholder.svg",
//     productSlug: "creative-suite-pro",
//     productCategory: "Creativity",
//   },
//   {
//     $id: "10",
//     productName: "Digital Drawing Tablet",
//     productDescription: "Professional drawing tablet for artists",
//     variations: JSON.stringify([
//       { name: "Monthly", price: 19.99 },
//       { name: "Yearly", price: 199.99 },
//     ]),
//     productImage: "/placeholder.svg",
//     productSlug: "digital-drawing-tablet",
//     productCategory: "Creativity",
//   },
//   {
//     $id: "11",
//     productName: "V$ideo Editing Software",
//     productDescription: "Powerful v$ideo editing tool for creators",
//     variations: JSON.stringify([
//       { name: "Monthly", price: 19.99 },
//       { name: "Yearly", price: 199.99 },
//     ]),
//     productImage: "/placeholder.svg",
//     productSlug: "v$ideo-editing-software",
//     productCategory: "Creativity",
//   },
//   {
//     $id: "12",
//     productName: "3D Modeling Package",
//     productDescription: "Comprehensive 3D modeling and rendering suite",
//     variations: JSON.stringify([
//       { name: "Monthly", price: 19.99 },
//       { name: "Yearly", price: 199.99 },
//     ]),
//     productImage: "/placeholder.svg",
//     productSlug: "3d-modeling-package",
//     productCategory: "Creativity",
//   },
// ];

const categories = [
  "Streaming",
  "Learning",
  "Creativity",
  "Utility",
  "Service",
  "Others",
];

export default async function ShopPage() {
  const allProducts = await getAllProducts();
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
