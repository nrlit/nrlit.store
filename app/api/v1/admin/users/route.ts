import { createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";

export async function GET() {
  const sessionCookie = (await cookies()).get("session");

  try {
    const { databases } = await createSessionClient(sessionCookie!.value);
    const { documents } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION!
    );

    return Response.json(documents);
  } catch (error) {
    console.error(error);
    return Response.json("Access denied", { status: 403 });
  }
}
