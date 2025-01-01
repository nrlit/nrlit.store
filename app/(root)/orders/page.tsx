import { getOrdersForUser } from "@/app/actions/order";
import { OrderList } from "@/components/order-list";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }
  const orders = await getOrdersForUser(user.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Your Orders
      </h1>
      {!orders || orders.length === 0 ? (
        <p className="text-lg text-gray-600 dark:text-gray-400">
          No orders found.
        </p>
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );
}
