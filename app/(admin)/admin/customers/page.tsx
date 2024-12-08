import Link from "next/link";
import { Button } from "@/components/ui/button";
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

// This would typically come from an API or database
const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    creationDate: "2023-01-01",
    updatingDate: "2023-06-15",
    orders: ["1", "2", "3"],
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    creationDate: "2023-02-15",
    updatingDate: "2023-07-20",
    orders: ["4", "5"],
  },
  {
    id: "3",
    name: "Peter Jones",
    email: "peter@example.com",
    creationDate: "2023-03-10",
    updatingDate: "2023-08-10",
    orders: ["6", "7", "8", "9"],
  },
];

export default function AdminCustomersPage() {
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
            <TableHead>Joined</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>
                {new Date(customer.creationDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{customer.orders.length}</TableCell>
              <TableCell>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/customers/${customer.id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
