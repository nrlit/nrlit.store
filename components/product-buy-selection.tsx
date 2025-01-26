"use client";

import { currency } from "@/lib/constants";
import { Card, CardContent } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";
import { useCheckoutProductStore } from "@/stores/checkout-product-store";
import { Button } from "./ui/button";
import { ShareButton } from "./share-button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { addToCart, contentView } from "@/utils/facebookEvents";

interface Props {
  id: string;
  name: string;
  variations: string;
  image: string;
  metaDescription: string;
  userId: string;
}

export function ProductSelectAndBuyAndShare({
  id,
  name,
  variations,
  image,
  metaDescription,
  userId,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { setProduct } = useCheckoutProductStore();
  const variants = JSON.parse(variations);
  const [variant, setVariant] = useState<string>("");

  // Facebook event for product view
  useEffect(() => {
    contentView(name, id, "product");
  }, [id, name]);

  const handleBuyNow = () => {
    if (!variant) {
      toast({
        title: "Please select a plan",
        description: "Please select a plan to continue.",
        variant: "destructive",
      });
    } else if (!userId) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to place an order.",
        variant: "destructive",
      });
    } else {
      setProduct({ name, id, variant, image, userId });
      const price = JSON.parse(variant).price;
      // Facebook event for add to cart
      addToCart(name, id, price, "BDT", 1);
      router.push("/checkout");
    }
  };
  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <Select onValueChange={(value) => setVariant(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
              {variants.map((variant: { validity: string; price: number }) => (
                <SelectItem
                  key={variant.validity}
                  value={JSON.stringify(variant)}
                >
                  {variant.validity} - {currency}
                  {variant.price}&nbsp;
                  <span className="text-sm line-through font-light">
                    {currency}
                    {Math.round(Number(variant.price) * 1.25)}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <div className="flex space-x-4">
        <Button onClick={handleBuyNow} className="flex-1">
          Buy Now
        </Button>
        <ShareButton name={name} description={metaDescription} />
      </div>
    </>
  );
}
