import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "../../../utils/api-response";
import { forgotPasswordSchema } from "@/app/(auth)/schemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = forgotPasswordSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("Invalid input", 400);
    }

    const { email } = result.data;
    console.log("Email", email);

    // TODO: Implement actual forgot password logic here
    // This is a mock implementation
    if (email === "user@example.com") {
      // Simulate sending reset email
      console.log(`Reset password email sent to ${email}`);
      return successResponse(null, "Password reset email sent");
    } else {
      // For security reasons, don't reveal if the email exists or not
      return successResponse(
        null,
        "If the email exists, a password reset link will be sent"
      );
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    return errorResponse("An unexpected error occurred", 500);
  }
}
