import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import dynamic from "next/dynamic";
import { ClientErrorBoundary } from "./components/ClientErrorBoundary";
import { getEnvVariable } from "@/utils/env";
import { metadata, viewport } from "./metadata";
import { ClientInstallPWA } from "./components/ClientInstallPWA";

const inter = Inter({ subsets: ["latin"] });

const Toaster = dynamic(() =>
  import("@/components/ui/toaster").then((mod) => mod.Toaster)
);

interface RootLayoutProps {
  children: ReactNode;
}

export { metadata, viewport };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="NRLIT Store" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-180x180.png" />
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${getEnvVariable(
              "ADSENSE_CLIENT_ID"
            )}`}
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        </head>
        <body className={inter.className} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ClientErrorBoundary>
              <ClientInstallPWA />
              {children}
              <Toaster />
            </ClientErrorBoundary>
            <GoogleTagManager gtmId={getEnvVariable("GTM_ID")} />
            {process.env.NODE_ENV !== "development" && (
              <>
                <SpeedInsights />
                <Analytics />
                <GoogleAnalytics gaId={getEnvVariable("GA4_ID")} />
              </>
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
