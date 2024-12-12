import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "../../../utils/api-response";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  console.log("Token", token);

  if (!token) {
    return errorResponse("Token is required", 400);
  }
  console.log("Token", token);

  try {
    // TODO: Implement actual token validation logic here
    // This is a mock implementation
    const isValid = token.length === 32; // Assuming a valid token is 32 characters long

    return successResponse({ isValid });
  } catch (error) {
    console.error("Token validation error:", error);
    return errorResponse("An unexpected error occurred", 500);
  }
}
