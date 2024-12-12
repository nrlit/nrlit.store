import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "../../../utils/api-response";
import { resetPasswordSchema } from "@/app/(auth)/schemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = resetPasswordSchema.safeParse(body);

    if (!result.success) {
      return errorResponse(result.error.message, 400);
    }

    const { password, token } = result.data;
    console.log("Password", password);
    console.log("Token", token);

    // TODO: Implement actual password reset logic here
    // This is a mock implementation
    if (token === "valid_token") {
      // Simulate password reset
      console.log(`Password reset for token: ${token}`);
      return successResponse(null, "Password reset successful");
    } else {
      return errorResponse("Invalid or expired token", 400);
    }
  } catch (error) {
    console.error("Reset password error:", error);
    return errorResponse("An unexpected error occurred", 500);
  }
}
