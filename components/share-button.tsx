"use client";

import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

interface Props {
  name: string;
  description: string;
}

export function ShareButton({ name, description }: Props) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator
          .share({
            title: name,
            text: description,
            url: window.location.href,
          })
          .then(() => {
            toast({
              title: "Shared successfully",
              description: "Thank you for sharing this product",
            });
          });
      } else {
        toast({
          title: "Sharing not supported",
          description: "Your browser does not support sharing",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to share",
        description: `An error occurred while sharing: ${error}`,
        variant: "destructive",
      });
    }
  };
  return (
    <Button variant="outline" size="icon" onClick={handleShare}>
      <Share2 className="h-4 w-4" />
    </Button>
  );
}
