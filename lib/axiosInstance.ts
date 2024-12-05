import axios from "axios";
import { cookies } from "next/headers";

interface Props {
  url: string;
  method: "get" | "post" | "put" | "delete";
}

const axiosInstance = async ({ url, method }: Props) => {
  const sessionCookie = (await cookies()).get("session");
  const headers = {
    Cookie: `session=${sessionCookie!.value}`,
  };

  return axios({
    url,
    method,
    headers,
  });
};

export default axiosInstance;
