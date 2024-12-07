import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  index: number;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  image,
  slug,
  index,
}: ProductCardProps) {
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
              width={300}
              height={200}
              className="h-48 w-full object-cover transition-all hover:scale-105"
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
        <span className="text-lg font-bold">From ${price.toFixed(2)}</span>
        <Button size="sm" asChild>
          <Link href={`/products/${slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
