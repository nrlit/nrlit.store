"use client";

import { useRouter } from "next/navigation";
import { ProductForm, ProductFormData } from "@/components/product-form";
import { toast } from "@/hooks/use-toast";

export default function AddProductPage() {
  const router = useRouter();

  const handleSubmit = async (data: ProductFormData) => {
    // Here you would typically send the data to your API
    console.log(data);
    toast({
      title: "Product added",
      description: "The product has been successfully added.",
    });
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
