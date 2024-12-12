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
import { getAllAdminOrders } from "@/lib/admin/orders";
import { currency } from "@/constants/currency";

export default async function AdminOrdersPage() {
  const data = await getAllAdminOrders();

  const orders: OrderData[] = data;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Product ID</TableHead>
            <TableHead>Customer ID  </TableHead>
            <TableHead>Validity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const rawVariation = orders[0].variation;
            const formatedVariation = JSON.parse(rawVariation);
            return (
              <TableRow key={order.$id}>
                <TableCell>{order.$id}</TableCell>
                <TableCell>{order.productId}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell className="uppercase">{formatedVariation.validity}</TableCell>
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
                    <Link href={`/admin/orders/${order.$id}`}>Edit</Link>
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
