"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const toolbarActionVariants = cva("", {
  variants: {
    tone: {
      default: "",
      destructive: "",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

export interface ToolbarActionProps
  extends VariantProps<typeof toolbarActionVariants> {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  className?: string;
}

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
      variant={destructive ? "ghost" : "ghost"}
      size="sm"
      disabled={disabled}
      onClick={onClick}
      leftIcon={icon}
      className={cn(
        toolbarActionVariants({ tone: destructive ? "destructive" : "default" }),
        destructive
          ? "text-danger hover:bg-danger-muted hover:text-danger"
          : "text-foreground-secondary hover:text-foreground",
        className
      )}
      aria-label={label}
    >
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
}
