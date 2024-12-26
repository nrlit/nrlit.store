"use client";

import React, { useEffect, useState } from "react";
import { SplashScreen } from "./SplashScreen";
import ClientOnly from "./ClientOnly";

interface PWAWrapperProps {
  children: React.ReactNode;
}

export function PWAWrapper({ children }: PWAWrapperProps) {
  const [isPWA, setIsPWA] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const checkIfPWA = () => {
      const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      const isIOSPWA = (window.navigator as Navigator & { standalone: boolean }).standalone;
      const isAndroidPWA = document.referrer.includes("android-app://");
      return isStandalone || isIOSPWA || isAndroidPWA;
    };

    setIsPWA(checkIfPWA());

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Only show splash screen in PWA mode
  if (!isPWA) return <>{children}</>;

  return (
    <ClientOnly>
      {showSplash && <SplashScreen />}
      {children}
    </ClientOnly>
  );
}
