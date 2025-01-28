"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { bkashExecutePayment, bkashGrantToken } from "@/app/actions/bkash";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  getOrderByPaymentIdAndDeleteOrder,
  getOrderByInvoiceNumberAndPaymentIdAndUpdateIsPaidAndTransactionId,
  getOrderByInvoiceNumberAndPaymentId,
} from "@/app/actions/order";
import { sendGTMEvent } from "@next/third-parties/google";
import { getProductById } from "@/app/actions/product";

export default function Callback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

  const status = searchParams.get("status");
  const paymentID = searchParams.get("paymentID");

  useEffect(() => {
    const handlePayment = async () => {
      if (status === "cancel" && paymentID) {
        await getOrderByPaymentIdAndDeleteOrder(paymentID).then(() => {
          router.push("/payment/failed?error=Payment was cancelled by user");
        });
        return;
      }
      if (status === "failure" && paymentID) {
        await getOrderByPaymentIdAndDeleteOrder(paymentID).then(() => {
          router.push("/payment/failed?error=Failed to process payment");
        });
        return;
      }
      if (status !== "success" || !paymentID) {
        router.push(
          "/payment/failed?error=Invalid payment status or missing payment ID"
        );
        return;
      }

      try {
        const grantTokenResponse = await bkashGrantToken();
        if (!grantTokenResponse.success) {
          throw new Error("Failed to obtain token");
        }

        const grantTokenData =
          grantTokenResponse.data as IBkashGrantTokenResponse;
        const id_token = grantTokenData.id_token;

        const executePaymentResponse = await bkashExecutePayment({
          id_token: id_token,
          paymentID: paymentID,
        });

        if (executePaymentResponse.success) {
          const paymentData =
            executePaymentResponse.data as IBkashExecutePaymentSuccessResponse;
          if (paymentData.statusCode === "0000") {
            await getOrderByInvoiceNumberAndPaymentIdAndUpdateIsPaidAndTransactionId(
              {
                invoiceNumber: paymentData.merchantInvoiceNumber,
                paymentId: paymentID,
                transactionId: paymentData.trxID,
              }
            ).then(async () => {
              const order = await getOrderByInvoiceNumberAndPaymentId({
                invoiceId: paymentData.merchantInvoiceNumber,
                paymentId: paymentData.paymentID,
              });
              if (order) {
                const product = await getProductById(order.productId);
                if (product) {
                  const variant = await JSON.parse(order.variation);
                  sendGTMEvent({
                    event: "purchase",
                    content_ids: [order.productId],
                    contents: [
                      {
                        id: order.productId,
                        name: product.name,
                        category: product.category,
                        price: variant.price,
                      },
                    ],
                    currency: "BDT",
                    num_items: 1,
                    value: variant.price,
                    content_type: "product",
                    content_name: product.name,
                    order_id: order.invoiceNumber,
                    transaction_id: paymentData.trxID,
                    content_id: order.productId,
                    content_category: product.category,
                  });
                }
              }
              router.push(
                `/payment/success?trxID=${paymentData.trxID}&amount=${paymentData.amount}&paymentID=${paymentData.paymentID}`
              );
            });
          } else {
            await getOrderByPaymentIdAndDeleteOrder(paymentID).then(() => {
              router.push(
                `/payment/failed?error=${
                  paymentData.statusMessage || "Payment execution failed"
                }`
              );
            });
          }
        } else {
          const errorData =
            executePaymentResponse.data as IBkashExecutePaymentErrorResponse;
          await getOrderByPaymentIdAndDeleteOrder(paymentID).then(() => {
            router.push(
              `/payment/failed?error=${
                errorData.errorMessage || "Payment execution failed"
              }`
            );
          });
        }
      } catch (error) {
        await getOrderByPaymentIdAndDeleteOrder(paymentID).then(() => {
          router.push(
            `/payment/failed?error=${encodeURIComponent(
              (error as Error).message || "An unexpected error occurred"
            )}`
          );
        });
      } finally {
        setIsProcessing(false);
      }
    };

    handlePayment();
  }, [status, paymentID, router]);

  if (isProcessing) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Processing Payment</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center py-8">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto py-10 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Please wait</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center py-8">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
  }
}
