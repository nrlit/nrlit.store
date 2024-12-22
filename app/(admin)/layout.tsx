import { AdminSidebar } from "@/components/admin/admin-sidebar";
import checkAdmin from "@/lib/isAdmin";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isUserAdmin = await checkAdmin();
  if (!isUserAdmin) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
