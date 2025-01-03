"use server";

import { db } from "@/lib/db";
import {
  generateAdminOrderNotificationEmail,
  generateCustomerOrderConfirmationEmail,
  generateOrderStatusUpdateEmail,
} from "@/lib/emailTemplate";
import nodemailer from "nodemailer";

export const sendContactEmailToStore = async ({
  mailFrom,
  mailSubject,
  mailHtml,
}: {
  mailFrom: string;
  mailSubject: string;
  mailHtml: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_SMTP_USERNAME,
      pass: process.env.GMAIL_SMTP_PASSWORD,
    },
  });

  const adminEmails = await db.user.findMany({
    where: { isAdmin: true },
    select: { email: true },
  });

  const toAddresses = adminEmails.map((admin) => admin.email);

  try {
    await transporter.sendMail({
      from: mailFrom,
      to:
        toAddresses.length !== 0
          ? toAddresses
          : process.env.GMAIL_SMTP_USERNAME,
      subject: mailSubject,
      html: mailHtml,
    });

    return { message: "Email sent successfully", success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { message: "Failed to send email.", success: false };
  }
};

export const sendOrderConfirmationEmailToCustomer = async ({
  productName,
  productImage,
  productSlug,
  variation,
  customerName,
  paidStatus,
  invoiceNumber,
  transactionNumber,
  orderEmail,
}: {
  productName: string;
  productImage: string;
  productSlug: string;
  variation: { price: number; validity: string };
  customerName: string;
  paidStatus: string;
  invoiceNumber: string;
  transactionNumber: string;
  orderEmail: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_SMTP_USERNAME,
      pass: process.env.GMAIL_SMTP_PASSWORD,
    },
  });

  const mailHtml = generateCustomerOrderConfirmationEmail({
    productName,
    productImage,
    productSlug,
    variation,
    customerName,
    paidStatus,
    invoiceNumber,
    transactionNumber,
    orderEmail,
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_SMTP_USERNAME,
      to: orderEmail,
      subject: `Order Confirmation: ${productName}`,
      html: mailHtml,
    });

    return { message: "Email sent successfully", success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { message: "Failed to send email.", success: false };
  }
};

export const sendOrderConfirmationEmailToAdmin = async ({
  productName,
  productImage,
  productSlug,
  variation,
  customerName,
  customerEmail,
  customerPhone,
  paidStatus,
  invoiceNumber,
  transactionNumber,
  orderDate,
  orderTime,
  paymentId,
  orderId,
  userId,
  clerkId,
  productId,
  orderEmail,
}: {
  productName: string;
  productImage: string;
  productSlug: string;
  variation: { price: number; validity: string };
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paidStatus: string;
  invoiceNumber: string;
  transactionNumber: string;
  orderDate: string;
  orderTime: string;
  paymentId: string;
  orderId: string;
  userId: string;
  clerkId: string;
  productId: string;
  orderEmail: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_SMTP_USERNAME,
      pass: process.env.GMAIL_SMTP_PASSWORD,
    },
  });

  const adminEmails = await db.user.findMany({
    where: { isAdmin: true },
    select: { email: true },
  });

  const toAddresses = adminEmails.map((admin) => admin.email);

  const mailHtml = generateAdminOrderNotificationEmail({
    productName,
    productImage,
    productSlug,
    variation,
    customerName,
    customerEmail,
    customerPhone,
    paidStatus,
    invoiceNumber,
    transactionNumber,
    orderDate,
    orderTime,
    paymentId,
    orderId,
    userId,
    clerkId,
    productId,
    orderEmail,
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_SMTP_USERNAME,
      to:
        toAddresses.length !== 0
          ? toAddresses
          : process.env.GMAIL_SMTP_USERNAME,
      subject: "New Order Notification",
      html: mailHtml,
    });

    return { message: "Email sent successfully", success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { message: "Failed to send email.", success: false };
  }
};

export const sendOrderStatusUpdateEmail = async ({
  productName,
  productImage,
  productSlug,
  variation,
  customerName,
  invoiceNumber,
  newStatus,
  additionalInfo,
  orderEmail,
}: {
  productName: string;
  productImage: string;
  productSlug: string;
  variation: { price: number; validity: string };
  customerName: string;
  invoiceNumber: string;
  newStatus: string;
  additionalInfo?: string;
  orderEmail: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_SMTP_USERNAME,
      pass: process.env.GMAIL_SMTP_PASSWORD,
    },
  });

  const mailHtml = generateOrderStatusUpdateEmail({
    productName,
    productImage,
    productSlug,
    variation,
    customerName,
    invoiceNumber,
    newStatus,
    additionalInfo,
    orderEmail,
  });
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_SMTP_USERNAME,
      to: orderEmail,
      subject: `Order Status Update: ${productName}`,
      html: mailHtml,
    });

    return { message: "Email sent successfully", success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { message: "Failed to send email.", success: false };
  }
};
