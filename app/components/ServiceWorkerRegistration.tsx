"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "../pwa";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
}
