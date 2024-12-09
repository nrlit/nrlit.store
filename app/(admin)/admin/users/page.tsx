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
import axiosInstance from "@/lib/axiosInstance";
import { currency } from "@/lib/constants";

export default async function AdminCustomersPage() {
  const { data } = await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_API_URL!}/admin/users`,
    method: "get",
  });
  const users: UserData[] = data;

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
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.$id}>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.userEmail}</TableCell>
              <TableCell>{user.$id}</TableCell>
              <TableCell>{user.isAdmin ? "Admin" : "Customer"}</TableCell>
              <TableCell>{user.orders.length}</TableCell>
              <TableCell>
                {user.totalSpent}
                {currency}
              </TableCell>
              <TableCell>
                {new Date(user.$createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
