"use client";

import React from "react";
import { AnimationProvider } from "@/lib/animation-context";

export const AnimationWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AnimationProvider>{children}</AnimationProvider>;
};
