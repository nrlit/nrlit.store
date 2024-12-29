"use server";

import { CheckOutFormData } from "@/components/checkout-form";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";

export const createOrder = async ({
  values,
  product,
}: {
  values: CheckOutFormData;
  product: {
    name: string;
    id: string;
    variant: string;
    image: string;
    userId: string;
  };
}) => {
  try {
    const order = await db.order.create({
      data: {
        orderEmail: values.orderEmail,
        userContactNumber: values.userContactNumber,
        userAdditionalNote: values.userAdditionalNote ?? "",
        paymentMethod: values.paymentMethod,
        variation: product.variant,
        productId: product.id,
        orderStatus: OrderStatus.pending,
        invoiceNumber: `INV_NRLIT_${Date.now()}_${
          Math.floor(Math.random()) * 10
        }`,
        userId: product.userId,
      },
    });

    return order;
  } catch (error) {
    console.error(error);
    return false;
  }
};
