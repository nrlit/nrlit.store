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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <div>
      {/* Mobile view */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {orders.map((order) => {
          const variation = JSON.parse(order.variation);
          return (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle>Invoice No. {order.invoiceNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="font-medium">Product</dt>
                    <dd>{order.productId}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Date</dt>
                    <dd>{new Date(order.createdAt).toLocaleDateString()}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Status</dt>
                    <dd>
                      <Badge
                        variant={
                          order.orderStatus === OrderStatus.completed
                            ? "default"
                            : "secondary"
                        }
                      >
                        {order.orderStatus}
                      </Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Validity</dt>
                    <dd>{variation.validity}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Price</dt>
                    <dd>
                      {currency}
                      {variation.price}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Transaction No.</dt>
                    <dd>{order.transactionId}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
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
      </div>
    </div>
  );
}
