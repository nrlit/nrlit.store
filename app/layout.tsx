import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import { InstallPWA } from "./components/InstallPWA";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nrlit.store"),
  title: "NRLIT Store - A Digital Shop",
  description:
    "Discover Digital Excellence, Shop Smart, Shop Digital, Elevate Your Digital Experience with NRLIT Store",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NRLIT Store",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "NRLIT Store - A Digital Shop",
    description:
      "Discover Digital Excellence, Shop Smart, Shop Digital, Elevate Your Digital Experience with NRLIT Store",
    url: "https://www.nrlit.store",
    type: "website",
    siteName: "NRLIT Store",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "NRLIT Store - A Digital Shop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NRLIT Store - A Digital Shop",
    description:
      "Discover Digital Excellence, Shop Smart, Shop Digital, Elevate Your Digital Experience with NRLIT Store",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  interactiveWidget: "resizes-visual",
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* <link rel="manifest" href="/manifest.json" /> */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="NRLIT Store" />
          <link rel="apple-touch-icon" href="/icons/apple-icon-180x180.png" />
        </head>
        <body className={inter.className} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <InstallPWA />
            {children}
            <Toaster />
            {process.env.NODE_ENV !== "development" && (
              <>
                <SpeedInsights />
              </>
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
