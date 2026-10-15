"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface OverlayProps {
  onClose: () => void;
  className?: string;
  label?: string;
}

/** Full-screen dismissible backdrop (uses shared Button for the hit target). */
export function Overlay({
  onClose,
  className,
  label = "Close",
}: OverlayProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      aria-label={label}
      onClick={onClose}
      className={cn(
        "absolute inset-0 h-full w-full rounded-none bg-overlay opacity-100 hover:bg-overlay hover:opacity-100",
        className
      )}
    />
  );
}
