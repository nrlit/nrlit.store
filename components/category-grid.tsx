import { CategoryCard } from "@/components/category-card";
import {
  Gamepad2,
  BookOpen,
  Palette,
  Wrench,
  Headphones,
  Package,
} from "lucide-react";

const categories = [
  {
    name: "Streaming",
    href: "/categories/streaming",
    Icon: Gamepad2,
  },
  {
    name: "Learning",
    href: "/categories/learning",
    Icon: BookOpen,
  },
  {
    name: "Creativity",
    href: "/categories/creativity",
    Icon: Palette,
  },
  {
    name: "Utility",
    href: "/categories/utility",
    Icon: Wrench,
  },
  {
    name: "Service",
    href: "/categories/service",
    Icon: Headphones,
  },
  {
    name: "Others",
    href: "/categories/others",
    Icon: Package,
  },
];

export function CategoryGrid() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.name} {...category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
