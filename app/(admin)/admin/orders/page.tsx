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
            <TableHead>Order ID</TableHead>
            <TableHead>Invoice No.</TableHead>
            <TableHead>Order Email</TableHead>
            <TableHead>Validity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const rawVariation = order.variation;
            const formatedVariation = JSON.parse(rawVariation);
            return (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.invoiceNumber}</TableCell>
                <TableCell>{order.orderEmail}</TableCell>
                <TableCell className="uppercase">
                  {formatedVariation.validity}
                </TableCell>
                <TableCell>
                  {currency}
                  {formatedVariation.price}
                </TableCell>
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
                    <Link href={`/admin/orders/${order.id}`}>View</Link>
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
