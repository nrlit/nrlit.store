"use server";
import { createAdminClient } from "@/appwrite/config";
import { ProductFormData } from "@/components/product-form";
import { ID } from "node-appwrite";

export const getAllAdminProducts = async () => {
  try {
    const { databases } = await createAdminClient();

    const { documents }: { documents: ProductData[] } =
      await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
        process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION!
      );

    return documents;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const addNewProduct = async (data: ProductFormData) => {
  try {
    const { databases } = await createAdminClient();

    const product = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
      process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION!,
      ID.unique(),
      {
        productSlug: data.productSlug,
        productName: data.name,
        productDescription: data.description,
        productCategory: data.category,
        variations: JSON.stringify(data.variation),
        productMetaTitle: data.metaTitle,
        productMetaDescription: data.metaDescription,
        productImage: data.image,
        tags: data.tags,
        available: data.available,
        isFeatured: data.isFeatured,
      }
    );

    if (!product.$id) {
      return JSON.stringify({
        success: false,
        message: "Error adding product",
      });
    }

    return JSON.stringify({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return JSON.stringify({ success: false, message: "Error adding product" });
  }
};

export const getProductById = async (productId: string) => {
  try {
    const { databases } = await createAdminClient();

    const product = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
      process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION!,
      productId
    );

    return JSON.stringify(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return JSON.stringify({
      success: false,
      message: "Error fetching product",
    });
  }
};
