import { currentUser } from "@clerk/nextjs/server";

export default async function checkAdmin() {
  const user = await currentUser();
  const role = await user?.privateMetadata.role;
  if (role === "admin") {
    return true;
  } else {
    return false;
  }
}
