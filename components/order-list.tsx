import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Order, OrderStatus } from "@prisma/client";
import { currency } from "@/lib/constants";

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice No.</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Validity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Transaction No.</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => {
          const variation = JSON.parse(order.variation);
          return (
            <TableRow key={order.id}>
              <TableCell>{order.invoiceNumber}</TableCell>
              <TableCell>{order.productId}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.orderStatus === OrderStatus.completed
                      ? "default"
                      : "secondary"
                  }
                >
                  {order.orderStatus}
                </Badge>
              </TableCell>
              <TableCell>{variation.validity}</TableCell>
              <TableCell>
                {currency}
                {variation.price}
              </TableCell>
              <TableCell>{order.transactionId}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
