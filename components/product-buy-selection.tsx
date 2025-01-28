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
import { sendGTMEvent } from "@next/third-parties/google";
import { Product } from "@prisma/client";

interface Props {
  id: string;
  name: string;
  variations: string;
  image: string;
  category: string;
  metaDescription: string;
  userId: string;
  recommendedProducts: Product[];
  currentProduct: Product;
}

export function ProductSelectAndBuyAndShare({
  id,
  name,
  variations,
  image,
  category,
  metaDescription,
  userId,
  recommendedProducts,
  currentProduct,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const { setProduct } = useCheckoutProductStore();
  const variants = JSON.parse(variations);
  const [variant, setVariant] = useState<string>("");

  useEffect(() => {
    function refineProductsArray({
      products,
      product,
    }: {
      products: Product[];
      product: Product;
    }) {
      const index = products.findIndex((item) => item.id === product.id);

      if (index !== -1) {
        const [existingProduct] = products.splice(index, 1);
        products.unshift(existingProduct);
      } else {
        products.unshift(product);
      }

      const mapedProducts = products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          category: product.category,
          variants: JSON.parse(product.variations),
        };
      });

      return mapedProducts;
    }

    const refinedContents = refineProductsArray({
      products: recommendedProducts,
      product: currentProduct,
    });

    sendGTMEvent({
      event: "view_content",
      content_id: id,
      content_type: "product",
      currency: "BDT",
      value: variants[0].price,
      content_name: name,
      content_category: category,
      contents: refinedContents,
    });
  }, [category, currentProduct, id, name, recommendedProducts, variants]);

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
