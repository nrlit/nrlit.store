import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AdminSidebar() {
  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <span className="">NRLIT Admin</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-3">
          <div className="flex flex-col gap-2 py-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/admin/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/admin/products">Products</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/admin/orders">Orders</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/admin/customers">Customers</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/admin/analytics">Analytics</Link>
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
