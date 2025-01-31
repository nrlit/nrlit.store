import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import { InstallPWA } from "./components/InstallPWA";
import ClientOnly from "./components/ClientOnly";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nrlit.store"),
  title: "NRLIT Store - A Digital Shop | Premium Digital Products & Services",
  description:
    "Transform your digital lifestyle with NRLIT Store. Get premium access to YouTube, Netflix, Spotify, Canva Pro, and more. Discover exclusive streaming, learning, creativity, and utility solutions. Your one-stop destination for authentic digital services. Shop smart, go digital today!",
  manifest: "/manifest.json",
  applicationName: "NRLIT Store",
  keywords: [
    "digital shop",
    "streaming services",
    "YouTube Premium",
    "Canva Pro",
    "Netflix account",
    "Spotify Premium",
    "digital learning",
    "creative tools",
    "utility software",
    "digital services",
    "premium accounts",
    "digital products",
  ],
  category: "e-commerce",
  creator: "NRLIT Store",
  publisher: "NRLIT Store",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NRLIT Store",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "NRLIT Store - Premium Digital Products & Services Hub",
    description:
      "Access premium digital services at NRLIT Store. Get YouTube Premium, Netflix, Spotify Premium, Canva Pro, and more. Your trusted source for authentic digital products. Unlock unlimited streaming, creativity, and learning tools today!",
    url: "https://www.nrlit.store",
    type: "website",
    siteName: "NRLIT Store",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "NRLIT Store - Your Premium Digital Services Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NRLIT Store | Premium Digital Products & Services",
    description:
      "Elevate your digital experience with premium services. Get instant access to YouTube Premium, Netflix, Spotify, Canva Pro, and more. Trusted digital products marketplace for streaming, creativity, and learning.",
    images: ["/twitter-image.png"],
    creator: "@nrlit_store",
    site: "@nrlit_store",
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
  alternates: {
    canonical: "https://www.nrlit.store",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
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
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
              process.env.ADSENSE_CLIENT_ID! as string
            }`}
            strategy="afterInteractive"
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
            <InstallPWA />
            {children}
            <Toaster />
            <ClientOnly>
              <GoogleTagManager gtmId={process.env.GTM_ID! as string} />
            </ClientOnly>
            {process.env.NODE_ENV !== "development" && (
              <>
                <SpeedInsights />
                <Analytics />
                <GoogleAnalytics gaId={process.env.GA4_ID! as string} />
              </>
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
