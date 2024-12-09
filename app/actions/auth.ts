/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import auth from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const result = await auth.createSession(formData);
  if (result.success) {
    redirect("/");
  }
  return result;
}

export async function registerAction(prevState: any, formData: FormData) {
  const result = await auth.createUser(formData);
  if (result.success) {
    redirect("/");
  }
  return result;
}
