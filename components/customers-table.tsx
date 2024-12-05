import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Customer {
  id: string;
  name: string;
  email: string;
  lastOrder: string;
  totalSpent: number;
}

export default function CustomersTable({
  customers,
}: {
  customers: Customer[];
}) {
  return (
    <div className="w-full p-6" style={{ background: "#1C1C1C" }}>
      <div className="rounded-md border bg-[#242424]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#2A2A2A]">
              <TableHead className="text-gray-300">ID</TableHead>
              <TableHead className="text-gray-300">
                <Button
                  variant="ghost"
                  className="p-0 text-gray-300 hover:text-white"
                >
                  Name
                </Button>
              </TableHead>
              <TableHead className="text-gray-300">Email</TableHead>
              <TableHead className="text-gray-300">Last Order</TableHead>
              <TableHead className="text-right text-gray-300">
                Total Spent
              </TableHead>
              <TableHead className="text-gray-300"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-[#2A2A2A]">
                <TableCell className="text-gray-300">{customer.id}</TableCell>
                <TableCell className="font-medium text-white">
                  {customer.name}
                </TableCell>
                <TableCell className="text-gray-300">
                  {customer.email}
                </TableCell>
                <TableCell className="text-gray-300">
                  {customer.lastOrder}
                </TableCell>
                <TableCell className="text-right text-gray-300">
                  ${customer.totalSpent}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
