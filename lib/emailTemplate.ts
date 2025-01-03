import { currency } from "./constants";

export function generateContactEmailTemplate(formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const { name, email, phone, message } = formData;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission - NRLIT Store</title>
    </head>
    <body style="font-family: 'Arial', sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #1a1a1a; color: #e0e0e0;">
      <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #2a2a2a; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
        <tr>
          <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #3b82f6, #1e3a8a);">
            <h1 style="color: #ffffff; font-size: 32px; margin: 0; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">NRLIT Store</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <h2 style="color: #3b82f6; font-size: 24px; margin: 0 0 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Contact Form Submission</h2>
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 100px;">Name:</strong>
                  <span style="color: #ffffff;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 100px;">Email:</strong>
                  <span style="color: #ffffff;">${email}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 100px;">Phone:</strong>
                  <span style="color: #ffffff;">${phone}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 0;">
                  <strong style="color: #3b82f6; display: block; margin-bottom: 10px;">Message:</strong>
                  <p style="margin: 0; white-space: pre-wrap; color: #e0e0e0; background-color: #3a3a3a; padding: 15px; border-radius: 4px; border-left: 4px solid #3b82f6;">${message}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background: linear-gradient(135deg, #1e3a8a, #3b82f6);">
            <p style="margin: 0; font-size: 14px; color: #ffffff;">This is an automated email from the NRLIT Store contact form.</p>
            <p style="margin: 10px 0 0; font-size: 12px; color: #d1d5db;">© ${new Date().getFullYear()} NRLIT Store. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export function generateCustomerOrderConfirmationEmail(orderData: {
  productName: string;
  productImage: string;
  productSlug: string;
  variation: { price: number; validity: string };
  customerName: string;
  paidStatus: string;
  invoiceNumber: string;
  transactionNumber: string;
  orderEmail: string;
}) {
  const {
    productName,
    productImage,
    productSlug,
    variation,
    customerName,
    paidStatus,
    invoiceNumber,
    transactionNumber,
    orderEmail,
  } = orderData;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.nrlit-store.com";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - NRLIT Store</title>
    </head>
    <body style="font-family: 'Arial', sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #1a1a1a; color: #e0e0e0;">
      <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #2a2a2a; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
        <tr>
          <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #3b82f6, #1e3a8a);">
            <h1 style="color: #ffffff; font-size: 32px; margin: 0; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">NRLIT Store</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <h2 style="color: #3b82f6; font-size: 24px; margin: 0 0 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Order Confirmation</h2>
            <p style="color: #ffffff; font-size: 16px; margin-bottom: 20px;">Thank you for your order, ${customerName}! Your order has been confirmed and is being processed.</p>
            
            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 15px; background-color: #3a3a3a; border-radius: 4px;">
                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding-right: 15px;">
                        <img src="${productImage}" alt="${productName}" style="max-width: 150px; height: auto; border-radius: 4px;">
                      </td>
                      <td style="vertical-align: top;">
                        <h3 style="color: #3b82f6; margin: 0 0 10px;">${productName}</h3>
                        <p style="color: #ffffff; margin: 0;">Validity: ${
                          variation.validity
                        }</p>
                        <p style="color: #ffffff; margin: 5px 0 0;">Price: ${currency}${variation.price.toFixed(
    2
  )}</p>
                        <p style="margin: 10px 0 0;">
                          <a href="${baseUrl}/products/${productSlug}" style="color: #3b82f6; text-decoration: none;">View Product</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Invoice Number:</strong>
                  <span style="color: #ffffff;">${invoiceNumber}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Transaction Number:</strong>
                  <span style="color: #ffffff;">${transactionNumber}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Payment Status:</strong>
                  <span style="color: #ffffff;">${paidStatus}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Order Email:</strong>
                  <span style="color: #ffffff;">${orderEmail}</span>
                </td>
              </tr>
            </table>

            <p style="color: #ffffff; font-size: 16px; margin-top: 20px;">If you have any questions about your order, please don't hesitate to contact our customer support team.</p>
            
            <p style="color: #ffffff; font-size: 16px; margin-top: 20px;">
              <a href="${baseUrl}/shop" style="color: #3b82f6; text-decoration: none;">Visit our shop</a> to explore more products!
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background: linear-gradient(135deg, #1e3a8a, #3b82f6);">
            <p style="margin: 0; font-size: 14px; color: #ffffff;">Thank you for shopping with NRLIT Store!</p>
            <p style="margin: 10px 0 0; font-size: 12px; color: #d1d5db;">© ${new Date().getFullYear()} NRLIT Store. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export function generateAdminOrderNotificationEmail(orderData: {
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
}) {
  const {
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
  } = orderData;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.nrlit-store.com";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order Notification - NRLIT Store</title>
    </head>
    <body style="font-family: 'Arial', sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #1a1a1a; color: #e0e0e0;">
      <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #2a2a2a; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
        <tr>
          <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #3b82f6, #1e3a8a);">
            <h1 style="color: #ffffff; font-size: 32px; margin: 0; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">NRLIT Store</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <h2 style="color: #3b82f6; font-size: 24px; margin: 0 0 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Order Notification</h2>
            <p style="color: #ffffff; font-size: 16px; margin-bottom: 20px;">A new order has been placed. Here are the details:</p>
            
            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 15px; background-color: #3a3a3a; border-radius: 4px;">
                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding-right: 15px;">
                        <img src="${productImage}" alt="${productName}" style="max-width: 150px; height: auto; border-radius: 4px;">
                      </td>
                      <td style="vertical-align: top;">
                        <h3 style="color: #3b82f6; margin: 0 0 10px;">${productName}</h3>
                        <p style="color: #ffffff; margin: 0;">Validity: ${
                          variation.validity
                        }</p>
                        <p style="color: #ffffff; margin: 5px 0 0;">Price: ${currency}${variation.price.toFixed(
    2
  )}</p>
                        <p style="margin: 10px 0 0;">
                          <a href="${baseUrl}/products/${productSlug}" style="color: #3b82f6; text-decoration: none;">View Product</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Customer Name:</strong>
                  <span style="color: #ffffff;">${customerName}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Email:</strong>
                  <span style="color: #ffffff;">${customerEmail}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Order Email:</strong>
                  <span style="color: #ffffff;">${orderEmail}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Phone:</strong>
                  <span style="color: #ffffff;">${customerPhone}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Invoice Number:</strong>
                  <span style="color: #ffffff;">${invoiceNumber}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Transaction Number:</strong>
                  <span style="color: #ffffff;">${transactionNumber}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Payment Status:</strong>
                  <span style="color: #ffffff;">${paidStatus}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Order Date:</strong>
                  <span style="color: #ffffff;">${orderDate}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Order Time:</strong>
                  <span style="color: #ffffff;">${orderTime}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Payment ID:</strong>
                  <span style="color: #ffffff;">${paymentId}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Order ID:</strong>
                  <span style="color: #ffffff;">${orderId}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">User ID:</strong>
                  <span style="color: #ffffff;">${userId}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Clerk ID:</strong>
                  <span style="color: #ffffff;">${clerkId}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Product ID:</strong>
                  <span style="color: #ffffff;">${productId}</span>
                </td>
              </tr>
            </table>

            <p style="color: #ffffff; font-size: 16px; margin-top: 20px;">Please process this order according to our standard procedures.</p>
            
            <p style="color: #ffffff; font-size: 16px; margin-top: 20px;">
              <a href="${baseUrl}/shop" style="color: #3b82f6; text-decoration: none;">Visit the shop</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background: linear-gradient(135deg, #1e3a8a, #3b82f6);">
            <p style="margin: 0; font-size: 14px; color: #ffffff;">This is an automated notification from the NRLIT Store system.</p>
            <p style="margin: 10px 0 0; font-size: 12px; color: #d1d5db;">© ${new Date().getFullYear()} NRLIT Store. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export function generateOrderStatusUpdateEmail(orderData: {
  productName: string;
  productImage: string;
  productSlug: string;
  variation: { price: number; validity: string };
  customerName: string;
  invoiceNumber: string;
  newStatus: string;
  additionalInfo?: string;
  orderEmail: string;
}) {
  const {
    productName,
    productImage,
    productSlug,
    variation,
    customerName,
    invoiceNumber,
    newStatus,
    additionalInfo,
    orderEmail,
  } = orderData;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.nrlit-store.com";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Status Update - NRLIT Store</title>
    </head>
    <body style="font-family: 'Arial', sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #1a1a1a; color: #e0e0e0;">
      <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #2a2a2a; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
        <tr>
          <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #3b82f6, #1e3a8a);">
            <h1 style="color: #ffffff; font-size: 32px; margin: 0; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">NRLIT Store</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <h2 style="color: #3b82f6; font-size: 24px; margin: 0 0 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Order Status Update</h2>
            <p style="color: #ffffff; font-size: 16px; margin-bottom: 20px;">Dear ${customerName},</p>
            <p style="color: #ffffff; font-size: 16px; margin-bottom: 20px;">We're writing to inform you that the status of your order has been updated.</p>
            
            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 15px; background-color: #3a3a3a; border-radius: 4px;">
                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding-right: 15px;">
                        <img src="${productImage}" alt="${productName}" style="max-width: 150px; height: auto; border-radius: 4px;">
                      </td>
                      <td style="vertical-align: top;">
                        <h3 style="color: #3b82f6; margin: 0 0 10px;">${productName}</h3>
                        <p style="color: #ffffff; margin: 0;">Validity: ${
                          variation.validity
                        }</p>
                        <p style="color: #ffffff; margin: 5px 0 0;">Price: ${currency}${variation.price.toFixed(
    2
  )}</p>
                        <p style="margin: 10px 0 0;">
                          <a href="${baseUrl}/products/${productSlug}" style="color: #3b82f6; text-decoration: none;">View Product</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Invoice Number:</strong>
                  <span style="color: #ffffff;">${invoiceNumber}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Order Email:</strong>
                  <span style="color: #ffffff;">${orderEmail}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">New Status:</strong>
                  <span style="color: #ffffff;">${newStatus}</span>
                </td>
              </tr>
            </table>

            ${
              additionalInfo
                ? `
            <p style="color: #ffffff; font-size: 16px; margin-top: 20px;">${additionalInfo}</p>
            `
                : ""
            }

            <p style="color: #ffffff; font-size: 16px; margin-top: 20px;">If you have any questions about your order, please don't hesitate to contact our customer support team.</p>
            
            <p style="color: #ffffff; font-size: 16px; margin-top: 20px;">
              <a href="${baseUrl}/orders" style="color: #3b82f6; text-decoration: none;">View your order details</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background: linear-gradient(135deg, #1e3a8a, #3b82f6);">
            <p style="margin: 0; font-size: 14px; color: #ffffff;">Thank you for shopping with NRLIT Store!</p>
            <p style="margin: 10px 0 0; font-size: 12px; color: #d1d5db;">© ${new Date().getFullYear()} NRLIT Store. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export function generateRefundEmail(refundData: {
  customerName: string;
  orderNumber: string;
  refundAmount: number;
  refundReason: string;
  productName: string;
  productImage: string;
  productSlug: string;
  orderDate: string;
  refundDate: string;
  additionalInfo?: string;
}) {
  const {
    customerName,
    orderNumber,
    refundAmount,
    refundReason,
    productName,
    productImage,
    productSlug,
    orderDate,
    refundDate,
    additionalInfo,
  } = refundData;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.nrlit-store.com";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Refund Confirmation - NRLIT Store</title>
    </head>
    <body style="font-family: 'Arial', sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #1a1a1a; color: #e0e0e0;">
      <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse; background-color: #2a2a2a; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
        <tr>
          <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #3b82f6, #1e3a8a);">
            <h1 style="color: #ffffff; font-size: 32px; margin: 0; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">NRLIT Store</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <h2 style="color: #3b82f6; font-size: 24px; margin: 0 0 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Refund Confirmation</h2>
            <p style="color: #ffffff; font-size: 16px; margin-bottom: 20px;">Dear ${customerName},</p>
            <p style="color: #ffffff; font-size: 16px; margin-bottom: 20px;">We're writing to confirm that your refund has been processed for your recent order.</p>
            
            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 15px; background-color: #3a3a3a; border-radius: 4px;">
                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding-right: 15px;">
                        <img src="${productImage}" alt="${productName}" style="max-width: 150px; height: auto; border-radius: 4px;">
                      </td>
                      <td style="vertical-align: top;">
                        <h3 style="color: #3b82f6; margin: 0 0 10px;">${productName}</h3>
                        <p style="color: #ffffff; margin: 5px 0 0;">Refund Amount: ${currency}${refundAmount.toFixed(
    2
  )}</p>
                        <p style="margin: 10px 0 0;">
                          <a href="${baseUrl}/products/${productSlug}" style="color: #3b82f6; text-decoration: none;">View Product</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Order Number:</strong>
                  <span style="color: #ffffff;">${orderNumber}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Order Date:</strong>
                  <span style="color: #ffffff;">${orderDate}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Refund Date:</strong>
                  <span style="color: #ffffff;">${refundDate}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #444444;">
                  <strong style="color: #3b82f6; display: inline-block; width: 150px;">Refund Reason:</strong>
                  <span style="color: #ffffff;">${refundReason}</span>
                </td>
              </tr>
            </table>

            ${
              additionalInfo
                ? `
            <p style="color: #ffffff; font-size: 16px; margin-top: 20px;">${additionalInfo}</p>
            `
                : ""
            }

            <p style="color: #ffffff; font-size: 16px; margin-top: 20px;">The refunded amount should appear in your account within 5-10 business days, depending on your payment method and financial institution.</p>

            <p style="color: #ffffff; font-size: 16px; margin-top: 20px;">If you have any questions about this refund, please don't hesitate to contact our customer support team.</p>
            
            <p style="color: #ffffff; font-size: 16px; margin-top: 20px;">
              <a href="${baseUrl}/orders" style="color: #3b82f6; text-decoration: none;">View your order history</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background: linear-gradient(135deg, #1e3a8a, #3b82f6);">
            <p style="margin: 0; font-size: 14px; color: #ffffff;">Thank you for your understanding and continued support.</p>
            <p style="margin: 10px 0 0; font-size: 12px; color: #d1d5db;">© ${new Date().getFullYear()} NRLIT Store. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
