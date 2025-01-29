import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  // Log the metrics
  console.log("Web Vital:", data);

  // Here you could:
  // 1. Store in a database
  // 2. Send to an analytics service
  // 3. Create alerts for poor performance

  return NextResponse.json({ received: true });
}
