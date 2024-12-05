"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  ArrowUpDown,
  CheckCircle2,
  Truck,
  PackageOpen,
  Clock,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

interface Order {
  id: string;
  customerName: string;
  email: string;
  date: string;
  status: OrderStatus;
  total: number;
}

const initialOrders: Order[] = [
  {
    id: "ORD001",
    customerName: "John Smith",
    email: "john.smith@example.com",
    date: "2024-01-15",
    status: "Delivered",
    total: 234.56,
  },
  {
    id: "ORD002",
    customerName: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2024-01-16",
    status: "Processing",
    total: 89.99,
  },
  {
    id: "ORD003",
    customerName: "Michael Brown",
    email: "m.brown@example.com",
    date: "2024-01-17",
    status: "Shipped",
    total: 175.5,
  },
  {
    id: "ORD004",
    customerName: "Emma Wilson",
    email: "emma.w@example.com",
    date: "2024-01-18",
    status: "Pending",
    total: 59.99,
  },
  {
    id: "ORD005",
    customerName: "David Lee",
    email: "david.lee@example.com",
    date: "2024-01-19",
    status: "Cancelled",
    total: 129.99,
  },
];

const statusConfig = {
  Delivered: {
    icon: CheckCircle2,
    color: "text-green-400",
    bgColor: "bg-green-500/20",
  },
  Shipped: { icon: Truck, color: "text-blue-400", bgColor: "bg-blue-500/20" },
  Processing: {
    icon: PackageOpen,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
  },
  Pending: {
    icon: Clock,
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
  },
  Cancelled: { icon: XCircle, color: "text-red-400", bgColor: "bg-red-500/20" },
};

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="w-full p-6" style={{ background: "#1C1C1C" }}>
      <div className="rounded-md border bg-[#242424]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#2A2A2A]">
              <TableHead className="text-gray-300">
                <Button
                  variant="ghost"
                  className="p-0 text-gray-300 hover:text-white"
                >
                  Order ID
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-gray-300">Customer Name</TableHead>
              <TableHead className="text-gray-300">Email</TableHead>
              <TableHead className="text-gray-300">Date</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-right text-gray-300">Total</TableHead>
              <TableHead className="text-gray-300"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;
              return (
                <TableRow key={order.id} className="hover:bg-[#2A2A2A]">
                  <TableCell className="font-medium text-white">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {order.customerName}
                  </TableCell>
                  <TableCell className="text-gray-300">{order.email}</TableCell>
                  <TableCell className="text-gray-300">{order.date}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value: OrderStatus) =>
                        handleStatusChange(order.id, value)
                      }
                    >
                      <SelectTrigger className="w-[180px] bg-[#242424] border-gray-600 text-gray-300">
                        <SelectValue>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              statusConfig[order.status].bgColor
                            } ${statusConfig[order.status].color}`}
                          >
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {order.status}
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-[#242424] border-gray-600">
                        {Object.entries(statusConfig).map(
                          ([status, config]) => (
                            <SelectItem
                              key={status}
                              value={status}
                              className="text-gray-300 focus:bg-gray-700 focus:text-white"
                            >
                              <div
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bgColor} ${config.color}`}
                              >
                                <config.icon className="mr-1 h-3 w-3" />
                                {status}
                              </div>
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right text-gray-300">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 text-gray-300 hover:text-white"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-[#242424] text-gray-300"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="hover:bg-[#2A2A2A] cursor-pointer">
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-[#2A2A2A] cursor-pointer">
                          Update status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-[#2A2A2A] cursor-pointer text-red-400">
                          Cancel order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
