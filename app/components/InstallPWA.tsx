"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, X, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
// import { useEffect as useEffectReact, useState as useStateReact } from 'react';

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
      localStorage.getItem("appInstalled") === "true" ||
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as NavigatorWithStandalone).standalone === true ||
      window.matchMedia("(display-mode: window-controls-overlay)").matches
    );
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getInstallationStatus = (): string => {
  if (isInStandaloneMode()) return "Installed (Standalone)";
  if (window.matchMedia("(display-mode: standalone)").matches)
    return "Installed (Display Mode)";
  if ((navigator as NavigatorWithStandalone).standalone)
    return "Installed (iOS)";
  if (window.matchMedia("(display-mode: window-controls-overlay)").matches)
    return "Installed (Window Controls Overlay)";
  return "Not Installed";
};

export function InstallPWA() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkInstallState = () => {
      const iOS = isIOS();
      setIsIOSDevice(iOS);
      const installed = isAppInstalled();
      setIsInstallable(!installed);
      setIsButtonVisible(!installed);

      // Debug logging
      //   console.log(
      //     "Installation Status:",
      //     installed ? "Installed" : "Not Installed"
      //   );
      //   console.log("Is Installable:", !installed);
      //   console.log("Is Button Visible:", !installed);
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      setIsInstallable(true);
      setIsButtonVisible(true);
      // console.log("Before Install Prompt Event Captured");
    };

    checkInstallState();
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check installation state periodically
    const intervalId = setInterval(checkInstallState, 1000);

    // Check installation state when the window gains focus
    window.addEventListener("focus", checkInstallState);

    // Debug: Log when display mode changes
    const displayModeHandler = () => {
      console.log("Display mode changed");
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

  const handleInstallClick = async () => {
    setIsOpen(false);
    if (isIOSDevice) {
      toast({
        title: "Install on iOS",
        description:
          "Tap the share button and then 'Add to Home Screen' to install the app.",
        className:
          "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none",
        duration: 5000,
      });
    } else if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
      const choiceResult = await deferredPrompt.current.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
        localStorage.setItem("appInstalled", "true");
        toast({
          title: "App Installed",
          description: "Thank you for installing NRLIT Store!",
          className:
            "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none",
        });
        setIsInstallable(false);
        setIsButtonVisible(false);
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt.current = null;
    }
  };

  const handleDismiss = () => {
    setIsButtonVisible(false);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("installPromptDismissed", "true");
    }
  };

  if (!isInstallable || !isButtonVisible) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {isButtonVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <div className="bg-black/90 backdrop-blur-sm rounded-lg shadow-lg shadow-blue-500/20 p-4 flex items-center space-x-4 border border-white/10">
              <Button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center space-x-2 rounded-full"
                aria-label="Open install dialog"
              >
                <Download className="w-5 h-5" />
                <span>Install NRLIT</span>
              </Button>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close install prompt"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-black border border-white/10 text-white">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent pointer-events-none" />
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-full">
                <Store className="w-6 h-6" />
              </div>
              Install NRLIT Store
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {isIOSDevice
                ? "Add NRLIT Store to your Home Screen"
                : "Get quick access to our digital products marketplace"}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {isIOSDevice ? (
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Tap the Share button in Safari</li>
                <li>Scroll down and tap &quot;Add to Home Screen&quot;</li>
                <li>Tap &quot;Add&quot; in the top right corner</li>
              </ol>
            ) : (
              <>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-full">
                    <Image
                      src="/icons/icon-192x192.png"
                      alt="NRLIT Store Icon"
                      className="w-12 h-12 rounded-full"
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">NRLIT Store</h3>
                    <p className="text-sm text-gray-400">
                      Digital Products Marketplace
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">
                      Instant access to digital products
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">
                      Enhanced offline experience
                    </span>
                  </li>
                  <li className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <svg
                        className="w-5 h-5 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-300">
                      Get new product notifications
                    </span>
                  </li>
                </ul>
              </>
            )}
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              Maybe later
            </Button>
            <Button
              onClick={handleInstallClick}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full"
            >
              {isIOSDevice ? "Got it" : "Install Now"}
            </Button>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-6 h-6" />
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
