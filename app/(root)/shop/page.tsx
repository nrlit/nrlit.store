import { ProductCard } from "@/components/product-card";
import { getAllProducts } from "@/app/actions/product";

// const categories = [
//   "Streaming",
//   "Learning",
//   "Creativity",
//   "Utility",
//   "Service",
//   "Others",
// ];

export default async function ShopPage() {
  const allProducts = await getAllProducts();
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product, index) => (
            <ProductCard key={product.id} {...product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
