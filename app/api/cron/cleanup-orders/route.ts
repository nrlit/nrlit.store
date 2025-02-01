import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Verify the request is coming from Vercel Cron Job
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const deletedOrders = await prisma.order.deleteMany({
      where: {
        isPaid: false,
        createdAt: {
          lt: twentyFourHoursAgo,
        },
      },
    });

    return NextResponse.json({
      success: true,
      deletedCount: deletedOrders.count,
    });
  } catch (error) {
    console.error("Error in cleanup-orders cron job:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
