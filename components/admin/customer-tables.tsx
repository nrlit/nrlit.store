"use client";

import { useState, useTransition, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { CustomerWithOrders } from "@/components/admin/customer-types";
import { useDebounce } from "@/hooks/use-debounce";

interface CustomerTableProps {
  initialCustomers: CustomerWithOrders[];
}

export function CustomerTable({ initialCustomers }: CustomerTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [customers, setCustomers] = useState(initialCustomers);

  const searchQuery = searchParams.get("search") ?? "";
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const handleSearch = useCallback(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }
      router.push(`/admin/users?${params.toString()}`);
    });
  }, [searchTerm, searchParams, router]);

  useDebounce(handleSearch, 300, [handleSearch]);

  useEffect(() => {
    // Update customers when initialCustomers change (i.e., after a search)
    setCustomers(initialCustomers);
  }, [initialCustomers]);

  const sortedCustmer = customers.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="search">Search Customers</Label>
          <Input
            type="search"
            id="search"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={isPending ? "opacity-50" : ""}
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
          {sortedCustmer.map((customer) => (
            <TableRow key={customer.id} className="text-xs">
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.isAdmin ? "Admin" : "Customer"}</TableCell>
              <TableCell>{customer.clerkUserId}</TableCell>
              <TableCell>{customer.orderCount}</TableCell>
              <TableCell>
                {customer.totalSpent.toFixed(2)}
                {currency}
              </TableCell>
              <TableCell>{formatDate(new Date(customer.createdAt))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
