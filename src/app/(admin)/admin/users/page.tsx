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
import { currency } from "@/constants/currency";
import { getAllAdminUsers } from "@/lib/admin/users";

export default async function AdminCustomersPage() {
  const data = await getAllAdminUsers();

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
