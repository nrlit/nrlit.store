"use client";

import { useParams, useRouter } from "next/navigation";
import { ProductForm, ProductFormData } from "@/components/product-form";
import { toast } from "@/hooks/use-toast";


const getProductData = (id: string): ProductFormData => {
  // This is just example data
  console.log(id);
  return {
    productSlug: "example-product",
    name: "Example Product",
    description: "This is an example product",
    category: "streaming",
    variation: [
      { validity: "1 month", price: 9.99 },
      { validity: "3 months", price: 24.99 },
    ],
    metaTitle: "Example Product | NRLIT Store",
    metaDescription: "This is an example product on NRLIT Store",
    image: "https://example.com/image.jpg",
    tags: ["example", "product"],
    available: true,
    isFeatured: false,
  };
};

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const productData = getProductData(params.id);

  const handleSubmit = async (data: ProductFormData) => {
    // Here you would typically send the data to your API
    console.log(data);
    toast({
      title: "Product updated",
      description: "The product has been successfully updated.",
    });
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Product</h1>
      <ProductForm initialData={productData} onSubmit={handleSubmit} />
    </div>
  );
}
