"use client";

import dynamic from "next/dynamic";

const InstallPWA = dynamic(
  () => import("./InstallPWA").then((mod) => mod.InstallPWA),
  { ssr: false }
);

export function ClientInstallPWA() {
  return <InstallPWA />;
}
