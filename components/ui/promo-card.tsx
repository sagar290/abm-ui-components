"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const promoCardVariants = cva(
  "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
  {
    variants: {
      variant: {
        accent:
          "bg-accent text-foreground-inverse hover:bg-accent-hover shadow-sm",
        subtle:
          "bg-surface-secondary text-foreground hover:bg-sidebar-hover",
      },
      selected: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "accent",
      selected: false,
    },
  }
);

export interface PromoCardProps extends VariantProps<typeof promoCardVariants> {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

/** High-contrast middle-pane card (Store, All Settings). */
export function PromoCard({
  title,
  subtitle,
  icon,
  onClick,
  variant = "accent",
  selected,
  className,
}: PromoCardProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        promoCardVariants({ variant, selected }),
        selected && variant === "accent" && "ring-2 ring-ring ring-offset-2",
        "h-auto font-normal",
        className
      )}
    >
      {icon && (
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            variant === "accent"
              ? "bg-foreground-inverse/15 text-foreground-inverse"
              : "bg-surface text-foreground-secondary"
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        {subtitle && (
          <span
            className={cn(
              "block text-xs",
              variant === "accent"
                ? "text-foreground-inverse/80"
                : "text-foreground-secondary"
            )}
          >
            {subtitle}
          </span>
        )}
      </span>
    </Button>
  );
}
