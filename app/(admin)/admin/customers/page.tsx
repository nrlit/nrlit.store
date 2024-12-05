import CustomersTable from "@/components/customers-table";
import axiosInstance from "@/lib/axiosInstance";

export default async function CustomersPage() {
  const response = await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_API_URL}/users`,
    method: "get",
  });

  const { users } = response.data;

  return <CustomersTable customers={users} />;
}
