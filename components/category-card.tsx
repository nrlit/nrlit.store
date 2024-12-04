import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface CategoryCardProps {
  name: string;
  href: string;
  index: number;
  Icon: React.ElementType;
}

export function CategoryCard({ name, href, index, Icon }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card
        className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <CardContent className="p-0">
          <div className="relative h-32 md:h-36 lg:h-40 flex justify-center items-center">
            <div className="relative mx-auto w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-center text-sm sm:text-md md:text-lg">
              {name}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
