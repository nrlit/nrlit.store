"use client";

import { useRouter } from "next/navigation";
import { ProductForm, ProductFormData } from "@/components/product-form";
import { toast } from "@/hooks/use-toast";
import { addNewProduct } from "@/lib/admin/products";

export default function AddProductPage() {
  const router = useRouter();

  const handleSubmit = async (data: ProductFormData) => {
    const response = await addNewProduct(data);
    const resData = await JSON.parse(response);

    if (resData.success) {
      toast({
        title: resData.message,
        description: "The product has been successfully added.",
      });
      router.push("/admin/products");
    } else {
      toast({
        title: resData.message,
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
