import { createAdminClient } from "@/appwrite/config";

export const getAllAdminUsers = async () => {
  try {
    const { databases } = await createAdminClient();

    const { documents }: { documents: UserData[] } =
      await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION!
      );

    return documents;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
