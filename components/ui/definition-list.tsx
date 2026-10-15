"use client";

import { Copy, Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import * as React from "react";

const definitionListVariants = cva("text-sm", {
  variants: {
    layout: {
      stacked: "space-y-2",
      grid: "grid gap-3 sm:grid-cols-2",
    },
  },
  defaultVariants: {
    layout: "stacked",
  },
});

export interface DefinitionItem {
  label: string;
  value: React.ReactNode;
  /** Enable copy-to-clipboard for string values */
  copyValue?: string;
}

export interface DefinitionListProps
  extends VariantProps<typeof definitionListVariants> {
  items: DefinitionItem[];
  className?: string;
}

function CopyValueButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={copied ? "Copied" : "Copy value"}
      onClick={copy}
      className="h-6 w-6 shrink-0 text-foreground-muted"
      leftIcon={
        copied ? (
          <Check className="h-3 w-3 text-success" />
        ) : (
          <Copy className="h-3 w-3" />
        )
      }
    />
  );
}

export function DefinitionList({
  items,
  layout = "stacked",
  className,
}: DefinitionListProps) {
  return (
    <dl className={cn(definitionListVariants({ layout }), className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            layout === "stacked" && "flex items-start justify-between gap-4",
            layout === "grid" && "min-w-0"
          )}
        >
          <dt className="shrink-0 text-foreground-secondary">{item.label}</dt>
          <dd
            className={cn(
              "min-w-0 font-medium text-foreground",
              layout === "stacked" && "flex items-center gap-1 text-right"
            )}
          >
            <span className="truncate">{item.value ?? "—"}</span>
            {item.copyValue && <CopyValueButton value={item.copyValue} />}
          </dd>
        </div>
      ))}
    </dl>
  );
}
