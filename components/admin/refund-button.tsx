"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { type Order, OrderStatus } from "@prisma/client";
import { bkashGrantToken, bkashRefundTransaction } from "@/app/actions/bkash";
import { toast } from "@/hooks/use-toast";
import { getOrderByIdAndUpdateRSRTRARR } from "@/app/actions/order";
import { currency } from "@/lib/constants";

export default function RefundButton({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);

  const orderPrice = JSON.parse(order.variation).price;

  const formSchema = z.object({
    refundAmount: z
      .number()
      .min(1, {
        message: "Refund amount is required.",
      })
      .max(orderPrice, {
        message: `Refund amount cannot exceed ${orderPrice}${currency}.`,
      }),
    reason: z.string().min(1, {
      message: "Reason is required.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      refundAmount: orderPrice,
      reason: "unknown",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (order.isPaid && order.transactionId && order.paymentId) {
        const tokenRes = await bkashGrantToken();
        if (tokenRes.success) {
          const refundRes = await bkashRefundTransaction({
            id_token: tokenRes.data.id_token,
            paymentID: order.paymentId,
            trxID: order.transactionId,
            refundAmount: values.refundAmount.toString(),
            sku: order.id,
            reason: values.reason,
          });
          if (refundRes.success) {
            await getOrderByIdAndUpdateRSRTRARR({
              orderId: order.id,
              isRefunded: true,
              newStatus: OrderStatus.refunded,
              refundTransactionId: refundRes.data.refundTrxID,
              refundAmount: values.refundAmount,
              refundReason: values.reason,
            }).then(() => {
              toast({
                title: "Refund Requested",
                description: "Refund request has been successfully submitted.",
              });
            });
          } else {
            toast({
              variant: "destructive",
              title: "Bkash Error",
              description: "Error while processing the refund request.",
            });
          }
        } else {
          toast({
            variant: "destructive",
            title: "Bkash Error",
            description: "Error while generating token.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Order is not paid.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while processing the refund request.",
      });
      console.error(error);
    } finally {
      setOpen(false);
      window.location.reload();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-yellow-500 text-white hover:bg-yellow-600"
          type="submit"
          disabled={!order.isPaid || order.isRefunded}
        >
          {order.isRefunded ? "Refunded" : "Refund"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Refund</DialogTitle>
          <DialogDescription>
            Please enter the refund amount and reason below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="refundAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Refund Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the amount you wish to refund (max: {orderPrice}
                    {currency}).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide a reason for the refund."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Briefly explain why you&apos;re requesting a refund.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Submit Request</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to refund{" "}
                      <strong>
                        {form.getValues("refundAmount")}
                        {currency}
                      </strong>{" "}
                      for the reason <strong>{form.getValues("reason")}</strong>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
                      Refund
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
