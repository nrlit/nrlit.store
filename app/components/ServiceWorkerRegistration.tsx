"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "../pwa";
import { sendGTMEvent } from "@next/third-parties/google";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    registerServiceWorker();

    console.log(
      "%cStop!",
      "color: #ff0000; font-size: 40px; font-weight: bold;"
    );
    console.log(
      '%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or "hack" an account on nrlit.store, it is a scam and will give them access to your account.',
      "color: #ffffff; font-size: 20px;"
    );
    console.log(
      "See %chttps://nrlit.store/security-warning",
      "color: #00aaff; text-decoration: underline; font-size: 20px;"
    );

    sendGTMEvent("service-worker-registered");
  }, []);

  return null;
}
