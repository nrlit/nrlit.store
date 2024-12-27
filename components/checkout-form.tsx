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

// Mock product data
const product = {
  name: "Premium Streaming Package",
  description: "High-quality streaming tools for professionals",
  price: 99.99,
  image: "/placeholder.svg",
};

export function CheckoutForm({ email }: { email: string }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderEmail: email,
      userContactNumber: "",
      userAdditionalNote: "",
      paymentMethod: "bKash",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      toast({
        title: "Order Placed",
        description: "Your order has been successfully placed.",
      });
    }, 2000);
  }

  // Order summary data
  const orderSummary = {
    subtotal: product.price,
    total: product.price,
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="orderEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
      <div className="space-y-6">
        <div className="p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Product Preview</h2>
          <div className="flex items-center space-x-4">
            <Image
              src={product.image}
              alt={product.name}
              width={190}
              height={100}
              className="h-20 w-full object-cover aspect-[1.91/1]"
              loading="lazy"
              layout="responsive"
            />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-lg font-semibold mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className=" p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {currency}
                {orderSummary.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>
                {currency}
                {orderSummary.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}