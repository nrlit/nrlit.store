"use server";

import { CheckOutFormData } from "@/components/checkout-form";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import {
  sendOrderConfirmationEmailToAdmin,
  sendOrderConfirmationEmailToCustomer,
} from "./email";

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
  }): Promise<boolean> => {
    try {
      const order = await db.order.findFirst({
        where: { invoiceNumber, paymentId },
      });

      if (!order) {
        return false;
      }

      const updatedOrder = await db.order.update({
        where: { id: order.id },
        data: { transactionId, isPaid: true },
      });

      if (!updatedOrder) {
        return false;
      }

      const [product, user] = await Promise.all([
        db.product.findFirst({ where: { id: updatedOrder.productId } }),
        db.user.findFirst({ where: { clerkUserId: updatedOrder.userId } }),
      ]);

      if (!product || !user) {
        return false;
      }

      const commonEmailData = {
        productName: product.name,
        productImage: product.image,
        productSlug: product.slug,
        variation: JSON.parse(updatedOrder.variation),
        customerName: user.name ?? updatedOrder.orderEmail,
        paidStatus: "Paid",
        invoiceNumber: updatedOrder.invoiceNumber,
        transactionNumber: updatedOrder.transactionId ?? transactionId,
        orderEmail: updatedOrder.orderEmail,
      };

      await Promise.all([
        sendOrderConfirmationEmailToCustomer(commonEmailData),
        sendOrderConfirmationEmailToAdmin({
          ...commonEmailData,
          customerEmail: user.email,
          customerPhone: updatedOrder.userContactNumber,
          orderDate: updatedOrder.createdAt.toDateString(),
          orderTime: updatedOrder.createdAt.toTimeString(),
          paymentId: updatedOrder.paymentId ?? paymentId,
          orderId: updatedOrder.id,
          userId: user.id,
          clerkId: user.clerkUserId,
          productId: updatedOrder.productId,
        }),
      ]);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

export const getOrderByPaymentIdAndDeleteOrder = async (paymentId: string) => {
  try {
    const order = await db.order.findFirst({
      where: {
        paymentId,
      },
    });

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

export const updateOrderStatus = async ({
  orderId,
  newStatus,
}: {
  orderId: string;
  newStatus: OrderStatus;
}) => {
  try {
    const order = await db.order.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus: newStatus,
      },
    });

    return order;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    await db.order.delete({
      where: {
        id: orderId,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getOrderByInvoiceNumberAndPaymentId = async ({
  invoiceId,
  paymentId,
}: {
  invoiceId: string;
  paymentId: string;
}) => {
  try {
    const order = await db.order.findFirst({
      where: {
        invoiceNumber: invoiceId,
        paymentId: paymentId,
      },
    });

    return order;
  } catch (error) {
    console.error(error);
    return false;
  }
};
