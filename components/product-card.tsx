import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { currency } from "@/lib/constants";

interface ProductCardProps {
  $id: string;
  productName: string;
  productDescription: string;
  variations: string;
  productImage: string;
  productSlug: string;
  index: number;
}

export function ProductCard({
  $id,
  productName,
  productDescription,
  variations,
  productImage,
  productSlug,
  index,
}: ProductCardProps) {
  const rawVariations = variations;
  const allVariation = JSON.parse(rawVariations);
  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
      key={$id}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-4">
        <Link href={`/products/${productSlug}`}>
          <div className="overflow-hidden rounded-lg">
            <Image
              src={productImage}
              alt={productName}
              width={300}
              height={200}
              className="h-48 w-full object-cover transition-all hover:scale-105"
            />
          </div>
        </Link>
        <Link href={`/products/${productSlug}`} className="hover:underline">
          <h3 className="font-semibold mt-4 text-lg line-clamp-1">
            {productName}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
          {productDescription}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 bg-secondary">
        <span className="text-lg font-bold">
          {currency}
          {allVariation[0].price} - {currency}
          {allVariation[allVariation.length - 1].price}
        </span>
        <Button size="sm" asChild>
          <Link href={`/products/${productSlug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
