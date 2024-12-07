import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  {
    id: 1,
    customer: "John Doe",
    date: "2023-06-01",
    total: 99.99,
    status: "Completed",
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2023-06-02",
    total: 149.99,
    status: "Processing",
  },
  {
    id: 3,
    customer: "Bob Johnson",
    date: "2023-06-03",
    total: 199.99,
    status: "Shipped",
  },
  {
    id: 4,
    customer: "Alice Brown",
    date: "2023-06-04",
    total: 79.99,
    status: "Pending",
  },
];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <Button>Export Orders</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
