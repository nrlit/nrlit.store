"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

type NavigatorWithStandalone = Navigator & { standalone?: boolean };

const isIOS = (): boolean => {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as Window & { MSStream?: unknown }).MSStream
    );
  }
  return false;
};

const isInStandaloneMode = (): boolean => {
  if (typeof window !== "undefined" && typeof navigator !== "undefined") {
    const nav = navigator as NavigatorWithStandalone;
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      nav.standalone === true ||
      document.referrer.includes("android-app://") ||
      window.matchMedia("(display-mode: window-controls-overlay)").matches
    );
  }
  return false;
};

const isAppInstalled = (): boolean => {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("appInstalled") === "true" || isInStandaloneMode()
    );
  }
  return false;
};

export function PWAInstallButton() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [isPWA, setIsPWA] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const checkInstallState = () => {
      const iOS = isIOS();
      setIsIOSDevice(iOS);
      const installed = isAppInstalled();
      const standalone = isInStandaloneMode();
      setIsInstalled(installed);
      setIsPWA(standalone);
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    checkInstallState();
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const intervalId = setInterval(checkInstallState, 1000);
    window.addEventListener("focus", checkInstallState);

    const displayModeHandler = () => {
      checkInstallState();
    };
    window
      .matchMedia("(display-mode: standalone)")
      .addListener(displayModeHandler);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("focus", checkInstallState);
      window
        .matchMedia("(display-mode: standalone)")
        .removeListener(displayModeHandler);
      clearInterval(intervalId);
    };
  }, []);

  const handleClick = async () => {
    if (isInstalled) {
      // If installed, open the PWA by using the manifest start_url
      window.open(window.location.origin, "_blank");
      return;
    }

    if (isIOSDevice) {
      alert("Tap the share button and then 'Add to Home Screen' to install");
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        localStorage.setItem("appInstalled", "true");
        setIsInstalled(true);
      }

      setDeferredPrompt(null);
    }
  };

  // Don't render anything if we're in PWA mode
  if (isPWA) {
    return null;
  }

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
    >
      {isInstalled ? (
        <>
          <ExternalLink className="mr-2 h-4 w-4" />
          Open App
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Install App
        </>
      )}
    </Button>
  );
}
