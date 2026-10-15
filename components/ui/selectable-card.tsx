"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const selectableCardVariants = cva(
  "group relative flex w-full cursor-pointer flex-col gap-3 rounded-2xl border p-5 text-left transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-surface",
  {
    variants: {
      checked: {
        true: "border-accent bg-accent-muted/40 shadow-sm",
        false:
          "border-border bg-surface hover:border-foreground-muted hover:bg-surface-secondary/40",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  }
);

export interface SelectableCardProps
  extends VariantProps<typeof selectableCardVariants> {
  id: string;
  title: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function SelectableCard({
  id,
  title,
  description,
  checked,
  onCheckedChange,
  disabled,
  icon,
  children,
  className,
}: SelectableCardProps) {
  return (
    <label
      htmlFor={id}
      className={cn(selectableCardVariants({ checked, disabled }), className)}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center text-foreground-secondary">
            {icon}
          </span>
        )}
        <div className="min-w-0 flex-1 space-y-1 pr-8">
          <p className="text-base font-semibold text-foreground">{title}</p>
          {description && (
            <p className="text-sm leading-relaxed text-foreground-secondary">
              {description}
            </p>
          )}
        </div>
        <Checkbox.Root
          id={id}
          checked={checked}
          disabled={disabled}
          onCheckedChange={(v) => onCheckedChange(v === true)}
          className={cn(
            "absolute right-4 top-4 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            checked
              ? "border-accent bg-accent text-foreground-inverse"
              : "border-border bg-surface"
          )}
        >
          <Checkbox.Indicator>
            <Check className="h-3.5 w-3.5" />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      {children}
    </label>
  );
}
