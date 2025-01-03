"use client";

import { Order } from "@prisma/client";
import { Button } from "./ui/button";

export function PaymentButton({ order }: { order: Order }) {
  return (
    <Button
      onClick={() => {
        alert("Payment button clicked!" + order.orderStatus);
      }}
    >
      Pay Now
    </Button>
  );
}
