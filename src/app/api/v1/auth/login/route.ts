import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "../../../utils/api-response";
import { loginSchema } from "@/app/(auth)/schemas";
import { createAdminClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { AppwriteException } from "node-appwrite";

type LoginResponseData = {
  user: {
    id: string;
    email: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("Invalid input", 400);
    }

    const { email, password } = result.data;

    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const responseData: LoginResponseData = {
      user: { id: session.userId, email: session.providerUid },
    };
    return successResponse(responseData, "Login successful");
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Registration error:", error);
      return errorResponse(error.message, error.code);
    }
    console.error("Login error:", error);
    return errorResponse("An unexpected error occurred", 500);
  }
}
