"use client";

import { useState } from "react";
import { Order, OrderStatus, Product, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { deleteOrder, updateOrderStatus } from "@/app/actions/order";
import { sendOrderStatusUpdateEmail } from "@/app/actions/email";
import { useRouter } from "next/navigation";

interface Props {
  order: Order;
  product: Product;
  user: User;
}

export function OrderActions({ order, product, user }: Props) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus>(order.orderStatus);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = () => {
    setIsUpdateModalOpen(false);
    setIsConfirmDialogOpen(true);
  };

  const confirmStatusUpdate = async () => {
    const updatedOrder = await updateOrderStatus({
      orderId: order.id,
      newStatus: newStatus,
    });

    if (updatedOrder) {
      await sendOrderStatusUpdateEmail({
        productName: product.name,
        productImage: product.image,
        productSlug: product.slug,
        variation: JSON.parse(updatedOrder.variation),
        customerName: user.name ?? updatedOrder.orderEmail,
        invoiceNumber: order.invoiceNumber,
        newStatus,
        additionalInfo: "Order status updated by admin",
        orderEmail: order.orderEmail,
      });
      toast({
        title: "Order status updated successfully.",
        description: `The order status has been updated to ${newStatus}.`,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast({
        title: "Failed to update order status.",
        description: "An error occurred while updating the order status.",
        variant: "destructive",
      });
    }
    setIsConfirmDialogOpen(false);
  };

  const handleDeleteOrder = async () => {
    const result = await deleteOrder(order.id);
    if (result) {
      toast({
        title: "Order deleted successfully.",
        description: "The order has been deleted successfully.",
      });
      router.push("/admin/orders");
    } else {
      toast({
        title: "Failed to delete order.",
        description: "An error occurred while deleting the order.",
        variant: "destructive",
      });
    }
  };

  const handlePayment = () => {
    // TODO: Implement the payment gateway integration
  };

  const handleRefund = () => {
    // TODO: Implement the refund functionality
  };

  return (
    <div>
      <h3 className="font-semibold mb-4">Order Actions:</h3>
      <div className="flex gap-2">
        <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-green-500 text-white hover:bg-green-600"
              disabled={
                order.orderStatus === OrderStatus.completed ||
                order.orderStatus === OrderStatus.cancelled
              }
            >
              Update Status
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Order Status</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Select
                value={newStatus}
                onValueChange={(value) => setNewStatus(value as OrderStatus)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(OrderStatus).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleStatusUpdate}
              className="w-full"
              disabled={
                order.orderStatus === OrderStatus.completed ||
                order.orderStatus === OrderStatus.cancelled
              }
            >
              Update Status
            </Button>
          </DialogContent>
        </Dialog>
        <AlertDialog
          open={isConfirmDialogOpen}
          onOpenChange={setIsConfirmDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Status Update</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to update the order status to {newStatus}?
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmStatusUpdate}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="bg-red-500 text-white hover:bg-red-600"
              disabled={
                order.orderStatus === OrderStatus.completed ||
                (order.isPaid && order.orderStatus === OrderStatus.confirmed) ||
                (order.isPaid && order.orderStatus === OrderStatus.pending)
              }
            >
              Delete Order
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                order and remove all associated data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteOrder}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={handlePayment}
          disabled={order.isPaid}
        >
          Pay Now
        </Button>
        <Button
          className="bg-yellow-500 text-white hover:bg-yellow-600"
          onClick={handleRefund}
          disabled={!order.isPaid}
        >
          Refund
        </Button>
      </div>
    </div>
  );
}
