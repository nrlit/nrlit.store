"use client";

import { useRouter } from "next/navigation";
import { ProductForm, ProductFormData } from "@/components/product-form";
import { toast } from "@/hooks/use-toast";
import { createProduct } from "@/app/actions/product";

export default function AddProductPage() {
  const router = useRouter();

  const handleSubmit = async (data: ProductFormData) => {
    const result = await createProduct(data);
    if (result) {
      toast({
        title: "Product Added",
        description: "The product has been successfully added.",
      });
      router.push("/admin/products");
    } else {
      toast({
        title: "Failed to Add Product",
        description: "An error occurred while adding the product.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
