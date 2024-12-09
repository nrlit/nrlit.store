"use client";

import { useRouter } from "next/navigation";
import { ProductForm, ProductFormData } from "@/components/product-form";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

export default function AddProductPage() {
  const router = useRouter();

  const handleSubmit = async (data: ProductFormData) => {
    // Here you would typically send the data to your API
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/products`,
      data
    );
    if (response.data.success) {
      toast({
        title: "Product added",
        description: "The product has been successfully added.",
      });
      router.push("/admin/products");
    } else {
      toast({
        title: "Error adding product",
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
