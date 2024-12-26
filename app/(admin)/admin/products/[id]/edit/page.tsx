"use client";

import { useParams, useRouter } from "next/navigation";
import { ProductForm, ProductFormData } from "@/components/product-form";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { getProductById, updateProduct } from "@/app/actions/product";

const getProductData = async (id: string): Promise<ProductFormData> => {
  const result = await getProductById(id);
  if (!result) {
    toast({
      title: "Error",
      description: "Product not found",
      variant: "destructive",
    });
    throw new Error("Product not found");
  }
  console.log(result);
  return {
    productSlug: result.slug,
    name: result.name,
    description: result.description,
    category: result.category,
    variation: JSON.parse(result.variations),
    metaTitle: result.metaTitle,
    metaDescription: result.metaDescription,
    image: result.image,
    tags: result.tags,
    available: result.available,
    isFeatured: result.isFeatured,
  };
};

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [productData, setProductData] = useState<ProductFormData | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const data = await getProductData(params.id);
        setProductData(data);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        toast({
          title: "Error",
          description: "Failed to load product data. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchProductData();
  }, [params.id]);

  const handleSubmit = async (data: ProductFormData) => {
    const result = await updateProduct(params.id, data);
    if (result) {
      toast({
        title: "Product updated",
        description: "The product has been successfully updated.",
      });
      router.push("/admin/products");
    } else {
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!productData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500 font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Product</h1>
      <ProductForm initialData={productData} onSubmit={handleSubmit} />
    </div>
  );
}
