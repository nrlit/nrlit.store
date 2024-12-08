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
const orders = [
  {
    id: "1",
    product: "Premium Streaming Package",
    user: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    variation: {
      validity: "1 month",
      price: 100,
    },
    status: "Completed",
    creationDate: "2023-06-01",
    updatingDate: "2023-06-02",
    paymentMethod: "bKash",
    paymentId: "TXN123456",
  },
  // ... other orders
];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.user}</TableCell>
              <TableCell>${order.variation.price}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "Completed" ? "outline" : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/orders/${order.id}`}>Edit</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
