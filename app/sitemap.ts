import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import {
  Gamepad2,
  BookOpen,
  Palette,
  Wrench,
  Headphones,
  Package,
} from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.nrlit-store.com";

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

async function fetchAllProductSlugs() {
  try {
    const products = await db.product.findMany({
      select: { slug: true },
      where: { available: true },
    });
    return products.map((product) => product.slug);
  } catch (error) {
    console.error("Error fetching product slugs:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms-of-service",
    "/return-refunds",
  ];

  const productSlugs = await fetchAllProductSlugs();

  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" as const : "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const productPages = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}${category.href}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...categoryPages];
}
