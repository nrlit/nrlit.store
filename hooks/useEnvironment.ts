"use client";

import { useEffect, useState } from "react";

export const useEnvironment = () => {
  const [isDevelopment, setIsDevelopment] = useState(true);

  useEffect(() => {
    setIsDevelopment(process.env.NODE_ENV === "development");
  }, []);

  return { isDevelopment };
};
