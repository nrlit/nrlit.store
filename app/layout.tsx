import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GA4Analytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nrlit.store"),
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
    images: ["/twitter-image.png"],
  },
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
        <body className={inter.className} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
            <SpeedInsights />
            <GA4Analytics />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
