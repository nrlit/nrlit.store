import { cookies } from "next/headers";
import { createSessionClient } from "./config";
import { redirect } from "next/navigation";

export default async function signOut() {
  "use server";

  const sessionCookie = (await cookies()).get("session");
  const { account } = await createSessionClient(sessionCookie?.value || "");

  (await cookies()).delete("session");
  await account.deleteSession("current");

  redirect("/login");
}
