import { createAdminClient } from "@/appwrite/config";
import { Query } from "node-appwrite";

export const getFeaturedProducts = async () => {
  try {
    const { databases } = await createAdminClient();

    const { documents }: { documents: ProductData[] } =
      await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
        process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION!,
        [Query.equal("isFeatured", true)]
      );

    return documents;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getAllProducts = async () => {
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
