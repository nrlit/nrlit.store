"use client";

import { Order } from "@prisma/client";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { bkashCreatePayment, bkashGrantToken } from "@/app/actions/bkash";
import { getOrderByIdAndUpdatePaymentId } from "@/app/actions/order";
import { sendGTMEvent } from "@next/third-parties/google";
import { getProductById } from "@/app/actions/product";

export function PaymentButton({ order }: { order: Order }) {
  const handlePayment = async () => {
    try {
      const amount = JSON.parse(order.variation).price;
      const tokenRes = await bkashGrantToken();
      if (tokenRes.success) {
        const id_token = tokenRes.data.id_token;
        const bkashCreatePaymentRes = await bkashCreatePayment({
          id_token: id_token,
          amount: amount.toString(),
          invoice: order.invoiceNumber,
          reference: order.id,
        });
        if (bkashCreatePaymentRes.success) {
          const updatedOrder = await getOrderByIdAndUpdatePaymentId({
            orderId: order.id,
            paymentId: bkashCreatePaymentRes.data.paymentID,
          });

          if (updatedOrder) {
            const product = await getProductById(order.productId);
            if (product) {
              // GTM Event
              const rawVariant = JSON.parse(order.variation);
              sendGTMEvent({
                event: "initiate_checkout",
                content_ids: [product.id],
                contents: [
                  {
                    id: product.id,
                    name: product.name,
                    price: rawVariant.price,
                  },
                ],
                currency: "BDT",
                num_items: 1,
                value: rawVariant.price,
                content_type: "product",
                content_name: product.name,
                content_id: product.id,
              });
            }
            window.location.href = bkashCreatePaymentRes.data.bkashURL;
          } else {
            toast({
              title: "Failed to process payment.",
              description: "An error occurred while updating the order.",
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Failed to process payment.",
            description: "An error occurred while creating the payment.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Failed to process payment.",
          description: "An error occurred while generating the token.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to process payment.",
        description: "An error occurred while processing the payment.",
        variant: "destructive",
      });
      console.error(error);
    }
  };
  return <Button onClick={handlePayment}>Pay Now</Button>;
}
