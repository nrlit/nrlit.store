"use client";

declare global {
  interface Window {
    fbq: any;
  }
}

export const FB_PIXEL_ID = process.env.FACEBOOK_PIXEL_ID! || "523534143408812"; // Replace with your actual Pixel ID

type FacebookEventType =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase";

export const pageview = (url: string) => {
  if (typeof window.fbq !== "function") return;
  window.fbq("track", "PageView", {
    page_path: url,
  });
};

export const event = <T extends Record<string, any>>(
  name: FacebookEventType,
  options: T = {} as T
) => {
  if (typeof window.fbq !== "function") return;
  window.fbq("track", name, options);
};

export const initFacebookPixel = () => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("init", FB_PIXEL_ID);
  }
};
