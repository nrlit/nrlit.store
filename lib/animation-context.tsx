"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

type AnimationContextType = {
  isAnimationEnabled: boolean;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  useEffect(() => {
    setIsAnimationEnabled(!isMobile);
  }, [isMobile]);

  return (
    <AnimationContext.Provider value={{ isAnimationEnabled }}>
      {children}
    </AnimationContext.Provider>
  );
};
