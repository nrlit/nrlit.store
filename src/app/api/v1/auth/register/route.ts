import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "../../../utils/api-response";
import { registerSchema } from "@/app/(auth)/schemas";
import { createAdminClient } from "@/appwrite/config";
import { AppwriteException, ID } from "node-appwrite";
import { cookies } from "next/headers";

type RegisterResponseData = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("Invalid input", 400);
    }

    const { name, email, password } = result.data;

    const { account, databases, users } = await createAdminClient();

    const newUser: IUser = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    if (!newUser) {
      return errorResponse("An unexpected error occurred", 500);
    }

    try {
      const newUserData: UserData = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABSE!,
        process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION!,
        newUser.$id,
        {
          userName: newUser.name,
          userEmail: newUser.email,
          orders: [],
          totalSpent: 0,
          isAdmin: false,
        }
      );

      if (!newUserData) {
        await users.delete(newUser.$id);
        return errorResponse("An unexpected error occurred", 500);
      }
    } catch (error) {
      if (error instanceof AppwriteException) {
        await users.delete(newUser.$id);
        console.error("Registration error:", error);
        return errorResponse(error.message, error.code);
      }
      return errorResponse("An unexpected error occurred", 500);
    }

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const responseData: RegisterResponseData = {
      user: { id: newUser.$id, name: newUser.name, email: newUser.email },
    };

    return successResponse(responseData, "Registration successful");
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Registration error:", error);
      return errorResponse(error.message, error.code);
    }
    console.error("Registration error:", error);
    return errorResponse("An unexpected error occurred", 500);
  }
}
