import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const products = [
  {
    id: 1,
    name: "Premium Streaming Package",
    category: "Streaming",
    price: 99.99,
    stock: 100,
  },
  {
    id: 2,
    name: "Advanced Learning Course",
    category: "Learning",
    price: 149.99,
    stock: 50,
  },
  {
    id: 3,
    name: "Creative Suite Pro",
    category: "Creativity",
    price: 199.99,
    stock: 75,
  },
  {
    id: 4,
    name: "Productivity Boost Pack",
    category: "Utility",
    price: 79.99,
    stock: 200,
  },
];

export default function AdminProductsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button>Add New Product</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">
                  Edit
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
