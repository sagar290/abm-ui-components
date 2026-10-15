"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  /** Accessible name when title is visually hidden — always provide title */
  size?: "md" | "lg" | "xl";
}

const sizeClass = {
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
} as const;

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  size = "lg",
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border border-border bg-surface p-6 shadow-lg",
            "focus:outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            sizeClass[size],
            className
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-1">
              <DialogPrimitive.Title className="text-lg font-semibold text-foreground">
                {title}
              </DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description className="text-sm text-foreground-secondary">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogPrimitive.Close>
          </div>
          <div className="max-h-[min(70vh,560px)] overflow-y-auto">
            {children}
          </div>
          {footer && (
            <div className="mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-border-subtle pt-4">
              {footer}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/** Alias matching the product brief */
export const Modal = Dialog;
