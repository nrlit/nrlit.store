import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NRLIT Store - A Digital Shop",
  description:
    "Discover Digital Excellence, Shop Smart, Shop Digital, Elevate Your Digital Experience with NRLIT Store",
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
    images: ["twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
