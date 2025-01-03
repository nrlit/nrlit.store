import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OrderStatus } from "@prisma/client";
import { getOrderByInvoiceNumber } from "@/app/actions/order";
import { db } from "@/lib/db";
import { currency } from "@/lib/constants";
import { OrderActions } from "@/components/admin/order-actions";

export default async function AdminOrderPage({
  params,
}: {
  params: Promise<{ invoice: string }>;
}) {
  const order = await getOrderByInvoiceNumber((await params).invoice);

  if (!order) {
    notFound();
  }

  const variation = JSON.parse(order.variation);

  const product = await db.product.findUnique({
    where: {
      id: order.productId,
    },
  });

  const user = await db.user.findUnique({
    where: {
      clerkUserId: order.userId,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Order Details</h2>
        <Button asChild>
          <Link href="/admin/orders">Back to Orders</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice #{order.invoiceNumber}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Customer Information:</h3>
              {user ? (
                <>
                  <p>Username: {user.username}</p>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Phone: {order.userContactNumber}</p>
                  <p>User ID: {user.id}</p>
                  <p>Clerk ID: {user.clerkUserId}</p>
                </>
              ) : (
                <p>User information not available</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold">Order Information:</h3>
              <p>Product: {product?.name}</p>
              <p>Variation: {variation.validity}</p>
              <p>
                Price: {currency}
                {variation.price}
              </p>
              <p>Order Email: {order.orderEmail}</p>
              <p>Order ID: {order.id}</p>
              <p>
                Status:{" "}
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
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" flex flex-col gap-4">
              <div>
                <h3 className="font-semibold">Payment Information:</h3>
                <p>Method: {order.paymentMethod}</p>
                <p>Transaction ID: {order.transactionId}</p>
                <p>Payment ID: {order.paymentId}</p>
                <p>
                  Payment Status:{" "}
                  <Badge variant={order.isPaid ? "default" : "destructive"}>
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </Badge>
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Dates:</h3>
                <p>Created: {new Date(order.createdAt).toLocaleString()}</p>
                <p>
                  Last Updated: {new Date(order.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
            {order && product && user && (
              <OrderActions order={order} product={product} user={user} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
