"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const toolbarActionVariants = cva(
  "flex-col sm:flex-row h-auto gap-1 sm:gap-2 px-2.5 py-1.5",
  {
    variants: {
      tone: {
        default: "text-foreground-secondary hover:text-foreground",
        destructive: "text-danger hover:bg-danger-muted hover:text-danger",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
);

export interface ToolbarActionProps
  extends VariantProps<typeof toolbarActionVariants> {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  className?: string;
}

/** Icon-above-label on mobile, icon+label inline on sm+ — ABM detail chrome. */
export function ToolbarAction({
  label,
  icon,
  onClick,
  disabled,
  destructive,
  className,
}: ToolbarActionProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        toolbarActionVariants({
          tone: destructive ? "destructive" : "default",
        }),
        className
      )}
      aria-label={label}
    >
      <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
      <span className="text-xs font-medium sm:text-sm">{label}</span>
    </Button>
  );
}
