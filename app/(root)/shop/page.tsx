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
      <div className="flex flex-col md:flex-row gap-8">
        {/* <div className="w-full md:w-1/4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input id="search" placeholder="Search products..." />
            </div>
            <div>
              <Label>Categories</Label>
              {categories.map((category) => (
                <div
                  key={category}
                  className="flex items-center space-x-2 mt-2"
                >
                  <Checkbox id={category} />
                  <label
                    htmlFor={category}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <Label htmlFor="sort">Sort by Price</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Low to High</SelectItem>
                  <SelectItem value="desc">High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Reset Filters</Button>
          </div>
        </div> */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product, index) => (
              <ProductCard key={product.id} {...product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
