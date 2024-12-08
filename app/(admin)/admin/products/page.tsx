import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// This would typically come from an API or database
const products = [
  {
    id: "1",
    slug: "premium-streaming-package",
    name: "Premium Streaming Package",
    description: "High-quality streaming tools for professionals",
    category: "Streaming",
    variation: [
      { validity: "1 month", price: 100 },
      { validity: "3 months", price: 250 },
      { validity: "6 months", price: 500 },
      { validity: "12 months", price: 800 },
    ],
    creationDate: "2023-01-01",
    updatingDate: "2023-06-15",
    available: true,
  },
  {
    id: "2",
    slug: "advanced-learning-course",
    name: "Advanced Learning Course",
    description: "In-depth learning materials for various subjects",
    category: "Learning",
    variation: [
      { validity: "1 month", price: 150 },
      { validity: "3 months", price: 350 },
      { validity: "6 months", price: 650 },
      { validity: "12 months", price: 1000 },
    ],
    creationDate: "2023-02-15",
    updatingDate: "2023-07-20",
    available: true,
  },
  {
    id: "3",
    slug: "creative-suite-pro",
    name: "Creative Suite Pro",
    description: "Professional creative tools for designers",
    category: "Creativity",
    variation: [
      { validity: "1 month", price: 200 },
      { validity: "3 months", price: 450 },
      { validity: "6 months", price: 800 },
      { validity: "12 months", price: 1200 },
    ],
    creationDate: "2023-03-10",
    updatingDate: "2023-08-10",
    available: false,
  },
  {
    id: "4",
    slug: "productivity-boost-pack",
    name: "Productivity Boost Pack",
    description: "Tools to enhance productivity",
    category: "Utility",
    variation: [
      { validity: "1 month", price: 80 },
      { validity: "3 months", price: 180 },
      { validity: "6 months", price: 350 },
      { validity: "12 months", price: 600 },
    ],
    creationDate: "2023-04-20",
    updatingDate: "2023-09-15",
    available: true,
  },
];

export default function AdminProductsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button asChild>
          <Link href="/admin/products/create">Add New Product</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price Range</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                ${Math.min(...product.variation.map((v) => v.price))} - $
                {Math.max(...product.variation.map((v) => v.price))}
              </TableCell>
              <TableCell>
                <Badge variant={product.available ? "outline" : "destructive"}>
                  {product.available ? "Available" : "Unavailable"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button asChild variant="outline" size="sm" className="mr-2">
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/products/${product.slug}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
