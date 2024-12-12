import { createAdminClient } from "@/appwrite/config";

export const getAllAdminOrders = async () => {
  try {
    const { databases } = await createAdminClient();

    const { documents }: { documents: OrderData[] } =
      await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
        process.env.NEXT_PUBLIC_APPWRITE_ORDER_COLLECTION!
      );

    return documents;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
