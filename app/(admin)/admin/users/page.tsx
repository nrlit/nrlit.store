import { Suspense } from "react";
import { db } from "@/lib/db";
import { CustomerTable } from "@/components/admin/customer-tables";
import { SearchParams } from "@/components/admin/customer-types";

async function getFilteredCustomers(search?: string) {
  return await db.user.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: {
      orders: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function AdminCustomersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const customers = await getFilteredCustomers((await searchParams).search);

  const customersWithMetadata = customers.map((customer) => ({
    ...customer,
    totalSpent: customer.orders.reduce((total, order) => {
      const variation = JSON.parse(order.variation);
      return total + parseFloat(variation.price);
    }, 0),
    orderCount: customer.orders.length,
  }));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CustomerTable initialCustomers={customersWithMetadata} />
      </Suspense>
    </div>
  );
}
