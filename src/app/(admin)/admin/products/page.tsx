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
import { currency } from "@/constants/currency";
import { getAllAdminProducts } from "@/lib/admin/products";

export default async function AdminProductsPage() {
  const data = await getAllAdminProducts();

  const products: ProductData[] = data;

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
          {products.map((product) => {
            const rawVariations = product.variations;
            const variations = JSON.parse(rawVariations);
            return (
              <TableRow key={product.$id}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.productCategory}</TableCell>
                <TableCell>
                  {variations.length > 1 ? (
                    <>
                      {currency}
                      {variations[0].price} - {currency}
                      {variations[variations.length - 1].price}
                    </>
                  ) : (
                    <>
                      {currency}
                      {variations[0].price}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={product.available ? "outline" : "destructive"}
                  >
                    {product.available ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button asChild variant="outline" size="sm" className="mr-2">
                    <Link href={`/admin/products/${product.$id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
