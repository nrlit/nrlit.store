import { createAdminClient, createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { ID } from "node-appwrite";

// POST Product Admin
export async function POST(request: NextRequest) {
  const data = await request.json();
  const { databases } = await createAdminClient();

  try {
    await databases.createDocument(
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
  } catch (error) {
    console.error(error);
    return Response.json("Error adding product", { status: 500 });
  }

  return Response.json({ success: true }, { status: 201 });
}

// GET Products Admin
export async function GET() {
  const sessionCookie = (await cookies()).get("session");

  try {
    const { databases } = await createSessionClient(sessionCookie!.value);
    const { documents } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
      process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION!
    );

    return Response.json(documents);
  } catch (error) {
    console.error(error);
    return Response.json("Access denied", { status: 403 });
  }
}
