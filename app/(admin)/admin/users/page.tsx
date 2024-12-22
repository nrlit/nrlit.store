import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currency } from "@/lib/constants";
import { db } from "@/lib/db";

export default async function AdminCustomersPage() {
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
      };
    })
    .sort((a, b) => {
      // Sort first by createdAt (oldest first) and then by totalSpent (highest first)
      if (a.createdAt < b.createdAt) return -1;
      if (a.createdAt > b.createdAt) return 1;
      return b.totalSpent - a.totalSpent;
    });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
      </div>
      <div className="flex items-center space-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="search">Search Customers</Label>
          <Input
            type="search"
            id="search"
            placeholder="Search by name or email"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Clerk ID</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => {
            const userOrders = orders.filter(
              (order) => order.userId === user.clerkUserId
            );

            const totalPrice = userOrders.reduce((total, order) => {
              const variation = JSON.parse(order.variation);
              return total + parseFloat(variation.price);
            }, 0);
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? "Admin" : "Customer"}</TableCell>
                <TableCell>{user.clerkUserId}</TableCell>
                <TableCell>{userOrders.length}</TableCell>
                <TableCell>
                  {totalPrice.toFixed(2)}
                  {currency}
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
