import { type NextRequest, NextResponse } from "next/server";
import { sendServerEvent } from "@/utils/facebookConversionApi";

export async function POST(request: NextRequest) {
  const eventData = await request.json();

  // Add real IP address and user agent
  eventData.user_data.client_ip_address =
    request.headers.get("x-forwarded-for") ?? "";
  eventData.user_data.client_user_agent =
    request.headers.get("user-agent") ?? "";

  await sendServerEvent(eventData);

  return NextResponse.json({ success: true });
}
