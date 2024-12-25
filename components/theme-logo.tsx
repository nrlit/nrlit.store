"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import darkLogo from "@/assets/logos/dark.png";
import lightLogo from "@/assets/logos/light.png";
import primaryLogo from "@/assets/logos/primary.png";

interface ThemeLogoProps {
  className?: string;
  variant?: "primary" | "theme";
}

export function ThemeLogo({ className, variant = "theme" }: ThemeLogoProps) {
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(
    undefined
  );

  const logos = {
    primary: primaryLogo,
    dark: darkLogo,
    light: lightLogo,
  };

  useEffect(() => {
    setCurrentTheme(theme === "system" ? systemTheme : theme);
  }, [theme, systemTheme]);

  const logoSrc =
    variant === "primary"
      ? logos.primary
      : currentTheme === "dark"
      ? logos.dark
      : logos.light;

  if (currentTheme === undefined) {
    return null; // or a loading placeholder
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image
        src={logoSrc}
        alt="NRLIT Store Logo"
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain"
        loading="eager"
      />
    </div>
  );
}
