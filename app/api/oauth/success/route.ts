// src/app/oauth/route.js

import { createAdminClient, createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId") ?? "";
  const secret = request.nextUrl.searchParams.get("secret") ?? "";

  const { account, databases } = await createAdminClient();
  const session = await account.createSession(userId, secret);

  (await cookies()).set("session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  const { currentUserAccount } = await createSessionClient(session.secret);
  const user: IUser = await currentUserAccount.get();

  try {
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
      process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION!,
      user.$id,
      {
        userName: user.name,
        userEmail: user.email,
        orders: [],
        totalSpent: 0,
        isAdmin: false,
      }
    );
  } catch {
    try {
      console.log(
        "Attempting to update user data instead of creating new data"
      );
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION!,
        user.$id,
        {
          userName: user.name,
          userEmail: user.email,
        }
      );
    } catch (fallbackError) {
      console.error("Fallback function also failed:", fallbackError);
    }
  }

  return NextResponse.redirect(`${request.nextUrl.origin}/`);
}
