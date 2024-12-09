import { createAdminClient } from "@/appwrite/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { databases } = await createAdminClient();
    const { documents } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
      process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION!
    );

    return NextResponse.json(documents);
  } catch (error) {
    console.error(error);
    return NextResponse.json("Unable to fetch products", { status: 500 });
  }
}
