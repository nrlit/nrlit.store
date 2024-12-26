import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { currency } from "@/lib/constants";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  variations: string;
  image: string;
  slug: string;
  index: number;
}

export async function ProductCard({
  id,
  name,
  description,
  variations,
  image,
  slug,
  index,
}: ProductCardProps) {
  const rawVariations = await variations;
  const allVariation = await JSON.parse(rawVariations);
  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
      key={id}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-4">
        <Link href={`/products/${slug}`}>
          <div className="overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={name}
              width={400}
              height={210}
              className="h-48 w-full object-cover transition-all hover:scale-105 aspect-[1.91/1]"
              loading="lazy"
            />
          </div>
        </Link>
        <Link href={`/products/${slug}`} className="hover:underline">
          <h3 className="font-semibold mt-4 text-lg line-clamp-1">{name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-1">
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 bg-secondary">
        <span className="text-lg font-bold">
          {allVariation.length > 1 ? (
            <>
              {currency}
              {allVariation[0].price} - {currency}
              {allVariation[allVariation.length - 1].price}
            </>
          ) : (
            <>
              {currency}
              {allVariation[0].price}
            </>
          )}
        </span>
        <Button size="sm" asChild>
          <Link href={`/products/${slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
