"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { currency } from "@/lib/constants";
import { Separator } from "./ui/separator";
import { useCheckoutProductStore } from "@/stores/checkout-product-store";
import { useRouter } from "next/navigation";
import {
  createOrder,
  getOrderByInvoiceNumberAndUpdatePaymentId,
} from "@/app/actions/order";
import { bkashCreatePayment, bkashGrantToken } from "@/app/actions/bkash";

export type CheckOutFormData = z.infer<typeof formSchema>;

const formSchema = z.object({
  orderEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  userContactNumber: z
    .string()
    .min(11, {
      message: "Phone number must be at least 11 digits.",
    })
    .max(11, {
      message: "Phone number must be at most 11 digits.",
    }),
  userAdditionalNote: z.string().optional(),
  paymentMethod: z.enum(["bKash"], {
    required_error: "Please select a payment method.",
  }),
});

export function CheckoutForm({ email }: { email: string }) {
  const { toast } = useToast();
  const { product } = useCheckoutProductStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderEmail: email,
      userContactNumber: "",
      userAdditionalNote: "",
      paymentMethod: "bKash",
    },
  });

  if (!email) {
    toast({
      title: "Sign In Required",
      description: "Please sign in to place an order.",
      variant: "destructive",
    });
    router.push("/sign-in");
    return null;
  }

  if (!product) {
    toast({
      title: "Product Not Found",
      description: "Please select a product to place an order.",
      variant: "destructive",
    });
    router.push("/shop");
    return null;
  }

  const variation = JSON.parse(product?.variant);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      if (product) {
        // Generate invoice number
        const invoiceNumber = `INV_${Date.now().toString()}`;
        // Set New Order Data to Database
        const response = await createOrder({ values, product, invoiceNumber });
        if (response) {
          // Generate bKash Token
          const grantToken = (await bkashGrantToken()) as {
            data: IBkashGrantTokenResponse;
            success: boolean;
          };
          if (grantToken.success) {
            const id_token = grantToken.data.id_token;
            // Create Payment Request
            const createPayment = (await bkashCreatePayment({
              id_token: id_token,
              invoice: invoiceNumber,
              amount: variation.price.toFixed(2).toString(),
            })) as {
              data: IBkashCreatePaymentSuccessResponse;
              success: boolean;
            };

            if (createPayment.success) {
              const createPaymentResponse = createPayment.data;
              // Update Order with Payment ID
              const updatePaymentId =
                await getOrderByInvoiceNumberAndUpdatePaymentId({
                  invoiceNumber: invoiceNumber,
                  paymentId: createPaymentResponse.paymentID,
                });

              if (updatePaymentId) {
                // Redirect to bKash Payment Page
                window.location.href = createPaymentResponse.bkashURL;
              } else {
                toast({
                  title: "Error",
                  description: "Something went wrong. Please try again.",
                  variant: "destructive",
                });
              }
            } else {
              toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
              });
            }
          } else {
            const data = grantToken.data;
            toast({
              title: "Error",
              description: data.statusMessage,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Product not found. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Order summary data
  const orderSummary = {
    priceWithoutOff: Math.round(variation.price * 1.25).toFixed(2),
    subtotal: Math.round(variation.price).toFixed(2),
    total: Math.round(variation.price).toFixed(2),
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="md:p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Product Preview</h2>
          <div className="flex flex-col sm:flex-row md:space-x-4">
            <Image
              src={product.image}
              alt={product.name}
              width={190}
              height={100}
              className="w-full sm:max-w-fit object-cover rounded-md aspect-[1.91/1]"
              loading="lazy"
            />
            <div className="ml-0 sm:ml-4 mt-4 md:mt-0">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-md font-semibold mt-2">{variation.validity}</p>
              <p className="text-md font-semibold mt-2">
                {currency}
                {variation.price.toFixed(2)}
                &nbsp;
                <span className="line-through font-light">
                  {currency}
                  {orderSummary.priceWithoutOff}
                </span>
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="md:p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Price</span>
              <span>
                {currency}
                {orderSummary.priceWithoutOff}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Off</span>
              <span>25%</span>
            </div>
            <div className="flex justify-between">
              <span>SubTotal</span>
              <span>
                {currency}
                {orderSummary.subtotal}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>
                {currency}
                {orderSummary.total}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="orderEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email&nbsp;&nbsp;
                    <span className="text-red-700 text-xs">
                      *Note: Put the email you want to order.
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userContactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="01XXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userAdditionalNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any special instructions or notes"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="bKash" />
                        </FormControl>
                        <FormLabel className="font-normal">bKash</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Pay with bKash"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
