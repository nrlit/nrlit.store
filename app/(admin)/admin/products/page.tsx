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
import { currency } from "@/lib/constants";
import { db } from "@/lib/db";
import { DeleteProductButton } from "@/components/delete-product-button";

export default async function AdminProductsPage() {
  const products = await db.product.findMany();

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
            <TableHead>Product ID</TableHead>
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
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
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
                    <Link href={`/admin/products/${product.id}/edit`}>
                      Edit
                    </Link>
                  </Button>
                  <DeleteProductButton id={product.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
