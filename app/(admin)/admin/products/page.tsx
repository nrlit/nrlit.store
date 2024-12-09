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

// This is a mock function to simulate fetching products data
// In a real application, you would fetch this data from your API
const getProducts = () => [
  {
    id: "1",
    name: "Premium Streaming Package",
    category: "Streaming",
    price: 99.99,
    available: true,
  },
  {
    id: "2",
    name: "Advanced Learning Course",
    category: "Learning",
    price: 149.99,
    available: true,
  },
  {
    id: "3",
    name: "Creative Suite Pro",
    category: "Creativity",
    price: 199.99,
    available: false,
  },
  {
    id: "4",
    name: "Productivity Boost Pack",
    category: "Utility",
    price: 79.99,
    available: true,
  },
];

export default function AdminProductsPage() {
  const products = getProducts();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button asChild>
          <Link href="/admin/products/add">Add New Product</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={product.available ? "outline" : "destructive"}>
                  {product.available ? "Available" : "Unavailable"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button asChild variant="outline" size="sm" className="mr-2">
                  <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                </Button>
                <Button variant="outline" size="sm">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
