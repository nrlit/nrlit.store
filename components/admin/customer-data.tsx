import { db } from "@/lib/db";

export async function CustomerData() {
  const users = await db.user.findMany();
  const orders = await db.order.findMany();

  const sortedUsers = users
    .map((user) => {
      const userOrders = orders.filter(
        (order) => order.userId === user.clerkUserId
      );

      const totalPrice = userOrders.reduce((total, order) => {
        const variation = JSON.parse(order.variation);
        return total + parseFloat(variation.price);
      }, 0);

      return {
        ...user,
        totalSpent: totalPrice,
        orderCount: userOrders.length,
      };
    })
    .sort((a, b) => {
      if (a.createdAt < b.createdAt) return -1;
      if (a.createdAt > b.createdAt) return 1;
      return b.totalSpent - a.totalSpent;
    });

  return { sortedUsers };
}
