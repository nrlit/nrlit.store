import { cookies } from "next/headers";
import { createSessionClient } from "./config";

export default async function getLoggedInUser() {
  try {
    const sessionCookie = (await cookies()).get("session");
    const { account } = await createSessionClient(sessionCookie?.value || "");
    return await account.get();
  } catch (error) {
    console.log("Error getting current user", error);
    return null;
  }
}
