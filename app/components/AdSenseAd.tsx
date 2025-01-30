"use client";

import type React from "react";
import { useEffect, useRef } from "react";

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: string;
  style?: React.CSSProperties;
}

// Define the shape of the adsbygoogle array
interface AdsbyGoogle extends Array<object> {
  push(obj: object): number;
}

// Extend the Window interface to include adsbygoogle
declare global {
  interface Window {
    adsbygoogle: AdsbyGoogle;
  }
}

export default function AdSenseAd({
  adSlot,
  adFormat = "auto",
  style,
}: AdSenseAdProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style || { display: "block" }}
      data-ad-client="ca-pub-8544770399231501"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
      ref={adRef}
    />
  );
}
