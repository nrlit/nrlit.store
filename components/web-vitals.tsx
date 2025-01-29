"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    const { id, name, label, value } = metric;

    // GA4 Measurement Protocol
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", name, {
        // GA4 automatically receives these parameters
        value: Math.round(name === "CLS" ? value * 1000 : value),
        metric_id: id,
        metric_value: value,
        metric_delta: value,
        metric_label: label,
        // Custom dimensions
        store: "nrlit.store",
        secure: window.location.protocol === "https:",
        page_path: window.location.pathname,
      });
    }
  });

  return null;
}
