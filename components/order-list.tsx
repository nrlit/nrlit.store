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
import { db } from "@/lib/db";
import { PaymentButton } from "./payment-button";

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <div>
      {/* Mobile view */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {orders.map(async (order) => {
          const variation = JSON.parse(order.variation);
          const product = await db.product.findUnique({
            where: { id: order.productId },
            select: { name: true },
          });
          const productName = product?.name || "Unknown Product";
          return (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle>Invoice No. {order.invoiceNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="font-medium">Product:</dt>
                    <dd>{productName}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Date:</dt>
                    <dd>{new Date(order.createdAt).toLocaleDateString()}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Status:</dt>
                    <dd>
                      <Badge
                        variant={
                          order.orderStatus === OrderStatus.completed
                            ? "default"
                            : order.orderStatus === OrderStatus.cancelled
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {order.orderStatus}
                      </Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Validity:</dt>
                    <dd>{variation.validity}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Price:</dt>
                    <dd>
                      {currency}
                      {variation.price}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Payment:</dt>
                    <dd>
                      <Badge variant={order.isPaid ? "default" : "destructive"}>
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Transaction No:</dt>
                    <dd>
                      {order.isPaid ? (
                        order.transactionId
                      ) : (
                        <PaymentButton order={order} />
                      )}
                    </dd>
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
              <TableHead>Payment</TableHead>
              <TableHead>Transaction No.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map(async (order) => {
              const variation = JSON.parse(order.variation);
              const product = await db.product.findUnique({
                where: { id: order.productId },
                select: { name: true },
              });
              const productName = product?.name || "Unknown Product";
              return (
                <TableRow key={order.id}>
                  <TableCell>{order.invoiceNumber}</TableCell>
                  <TableCell>{productName}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.orderStatus === OrderStatus.completed
                          ? "default"
                          : order.orderStatus === OrderStatus.cancelled
                          ? "destructive"
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
                  <TableCell>
                    <Badge variant={order.isPaid ? "default" : "destructive"}>
                      {order.isPaid ? "Paid" : "Unpaid"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.isPaid ? (
                      order.transactionId
                    ) : (
                      <PaymentButton order={order} />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
