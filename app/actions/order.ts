"use server";

import { CheckOutFormData } from "@/components/checkout-form";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";

export const createOrder = async ({
  values,
  product,
  invoiceNumber,
}: {
  values: CheckOutFormData;
  product: {
    name: string;
    id: string;
    variant: string;
    image: string;
    userId: string;
  };
  invoiceNumber: string;
}) => {
  try {
    const order = await db.order.create({
      data: {
        orderEmail: values.orderEmail,
        userContactNumber: values.userContactNumber,
        variation: product.variant,
        orderStatus: OrderStatus.pending,
        userAdditionalNote: values.userAdditionalNote ?? "",
        invoiceNumber: invoiceNumber,
        paymentMethod: values.paymentMethod,
        isPaid: false,
        productId: product.id,
        userId: product.userId,
      },
    });

    return order;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getOrdersForUser = async (userId: string) => {
  try {
    const orders = await db.order.findMany({
      where: {
        userId,
      },
    });

    return orders;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getOrderByInvoiceNumber = async (invoiceNumber: string) => {
  try {
    const order = await db.order.findFirst({
      where: {
        invoiceNumber,
      },
    });

    return order;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getOrderByInvoiceNumberAndUpdatePaymentId = async ({
  invoiceNumber,
  paymentId,
}: {
  invoiceNumber: string;
  paymentId: string;
}) => {
  try {
    const order = await db.order.findFirst({
      where: {
        invoiceNumber,
      },
    });

    if (order) {
      await db.order.update({
        where: {
          id: order.id,
        },
        data: {
          paymentId: paymentId,
        },
      });
    }

    return order;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getOrderByInvoiceNumberAndPaymentIdAndUpdateIsPaidAndTransactionId =
  async ({
    invoiceNumber,
    paymentId,
    transactionId,
  }: {
    invoiceNumber: string;
    paymentId: string;
    transactionId: string;
  }) => {
    try {
      const order = await db.order.findFirst({
        where: {
          invoiceNumber,
          paymentId,
        },
      });

      if (order) {
        await db.order.update({
          where: {
            id: order.id,
          },
          data: {
            transactionId: transactionId,
            isPaid: true,
          },
        });
      }

      return order;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const getOrderByPaymentIdAndDeleteOrder = async (paymentId: string) => {
  console.log("paymentId from actions", paymentId);
  try {
    const order = await db.order.findFirst({
      where: {
        paymentId,
      },
    });
    console.log("order from actions", order);

    if (order) {
      await db.order.delete({
        where: {
          id: order.id,
        },
      });
    }

    return order;
  } catch (error) {
    console.error(error);
    return false;
  }
};
