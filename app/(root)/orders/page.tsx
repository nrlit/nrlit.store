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
  if (!orders) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <OrderList orders={orders} />
    </div>
  );
}
