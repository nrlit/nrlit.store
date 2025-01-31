import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.nrlit.store";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/categories/*",
          "/shop",
          "/about",
          "/contact",
          "/products/*",
          "/faq",
          "/terms-of-service",
          "//privacy-policy",
          "/return-refunds",
        ],
        disallow: [
          "/admin*",
          "/api/*",
          "/orders*",
          "/checkout*",
          "/user-profile*",
          "/payment*",
          "/callback*",
          "/auth/*",
          "/dashboard*",
          "/*?fbclid=*",
          "/*?utm_*",
          "/*.json",
          "/private/*",
          "/temp/*",
          "/draft/*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: [
          "/*.js",
          "/*.css",
          "/*.png",
          "/*.jpg",
          "/*.gif",
          "/*.svg",
          "/*.ico",
          "/manifest.json",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
