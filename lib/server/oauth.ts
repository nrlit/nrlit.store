"use server";

import { createAdminClient } from "@/appwrite/config";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function continueWithGoogle() {
  const { account } = await createAdminClient();

  const origin = (await headers()).get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/api/oauth/success`,
    `${origin}/signup`
  );

  return redirect(redirectUrl);
}
