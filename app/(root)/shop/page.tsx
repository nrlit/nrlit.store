import { ShopPageClient } from "@/components/shop-page-client";
import { getAllProducts } from "@/app/actions/product";

export default async function ShopPage() {
  const allProducts = await getAllProducts();
  return <ShopPageClient initialProducts={allProducts} />;
}
