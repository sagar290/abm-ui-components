"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "./button";

const toastVariants = cva(
  /* Always opaque popover fill — never rely on translucent *-muted alone */
  "pointer-events-auto relative flex w-full items-start gap-3 rounded-xl border border-border bg-popover p-4 shadow-lg",
  {
    variants: {
      variant: {
        default: "",
        success: "border-l-4 border-l-success",
        error: "border-l-4 border-l-danger",
        warning: "border-l-4 border-l-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type ToastVariant = NonNullable<
  VariantProps<typeof toastVariants>["variant"]
>;

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastContextValue {
  toast: (msg: Omit<ToastMessage, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const toast = React.useCallback((msg: Omit<ToastMessage, "id">) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { ...msg, id }]);
  }, []);

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitive.Provider swipeDirection="right" duration={4000}>
        {children}
        {toasts.map((t) => (
          <ToastPrimitive.Root
            key={t.id}
            data-chrome="popover"
            className={cn(toastVariants({ variant: t.variant }))}
            onOpenChange={(open) => {
              if (!open) dismiss(t.id);
            }}
          >
            <div className="min-w-0 flex-1">
              <ToastPrimitive.Title className="text-sm font-semibold text-foreground">
                {t.title}
              </ToastPrimitive.Title>
              {t.description && (
                <ToastPrimitive.Description className="mt-0.5 text-sm text-foreground-secondary">
                  {t.description}
                </ToastPrimitive.Description>
              )}
            </div>
            <ToastPrimitive.Close asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Dismiss">
                <X className="h-4 w-4" />
              </Button>
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        {/* Sit above the shell theme FABs (bottom-4) so icons don’t show through */}
        <ToastPrimitive.Viewport className="fixed bottom-16 right-4 z-[110] flex w-[min(100vw-2rem,380px)] flex-col gap-2 outline-none lg:bottom-16" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}
