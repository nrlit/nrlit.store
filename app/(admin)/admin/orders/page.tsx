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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
      </div>
      <div className="flex items-center space-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="search">Search Orders</Label>
          <Input
            type="search"
            id="search"
            placeholder="Search by invoice or email"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice No.</TableHead>
            <TableHead>Order Email</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Validity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Transaction No.</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(async (order) => {
            const rawVariation = order.variation;
            const formatedVariation = JSON.parse(rawVariation);
            const product = await db.product.findUnique({
              where: {
                id: order.productId,
              },
            });
            return (
              <TableRow key={order.id}>
                <TableCell>{order.invoiceNumber}</TableCell>
                <TableCell>{order.orderEmail}</TableCell>
                <TableCell>{product?.name}</TableCell>
                <TableCell className="uppercase">
                  {formatedVariation.validity}
                </TableCell>
                <TableCell>
                  {currency}
                  {formatedVariation.price}
                </TableCell>
                <TableCell>{order.transactionId}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.orderStatus === "completed"
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {order.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/orders/${order.invoiceNumber}`}>View</Link>
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
