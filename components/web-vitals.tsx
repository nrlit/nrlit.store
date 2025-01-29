"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    const { name, value, id } = metric;

    // Log metrics that match PageSpeed Insights
    switch (name) {
      case "LCP":
        console.log(`Largest Contentful Paint: ${value}`);
        break;
      case "INP":
        console.log(`Interaction to Next Paint: ${value}`);
        break;
      case "CLS":
        console.log(`Cumulative Layout Shift: ${value}`);
        break;
      case "FCP":
        console.log(`First Contentful Paint: ${value}`);
        break;
      case "TTFB":
        console.log(`Time to First Byte: ${value}`);
        break;
    }

    // Send to analytics endpoint
    const analyticsEndpoint = "/api/vitals";
    const body = {
      id,
      name,
      value,
      timestamp: Date.now(),
    };

    // Use `navigator.sendBeacon()` if available
    if (navigator.sendBeacon) {
      navigator.sendBeacon(analyticsEndpoint, JSON.stringify(body));
    } else {
      fetch(analyticsEndpoint, {
        body: JSON.stringify(body),
        method: "POST",
        keepalive: true,
      });
    }
  });

  return null;
}
