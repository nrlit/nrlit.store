"use client";

import React, { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

const CustomClerkProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme(); // Get the current theme ('light' or 'dark')

  const clerkBaseTheme = theme === "dark" ? dark : undefined;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: clerkBaseTheme,
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default CustomClerkProvider;
