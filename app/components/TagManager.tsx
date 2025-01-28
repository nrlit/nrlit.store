"use client";
import { GoogleTagManager } from "@next/third-parties/google";

export default function TagManager() {
  return <GoogleTagManager gtmId={process.env.GTM_ID! as string} />;
}
