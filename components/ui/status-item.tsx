import Link from "next/link";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import type { StatusTone } from "../../types";

const statusItemVariants = cva(
  "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5",
  {
    variants: {
      tone: {
        ok: "bg-success-muted/40",
        warning: "bg-warning-muted/50",
        error: "bg-danger-muted/60",
        neutral: "bg-surface-secondary",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  }
);

const iconMap = {
  ok: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  neutral: CheckCircle2,
} as const;

const iconClass = {
  ok: "text-success",
  warning: "text-warning",
  error: "text-danger",
  neutral: "text-foreground-muted",
} as const;

export interface StatusItemProps extends VariantProps<typeof statusItemVariants> {
  label: string;
  value: string;
  tone?: StatusTone;
  fixHref?: string;
  fixLabel?: string;
  className?: string;
}

export function StatusItem({
  label,
  value,
  tone = "neutral",
  fixHref,
  fixLabel = "Fix",
  className,
}: StatusItemProps) {
  const Icon = iconMap[tone];
  const showFix = Boolean(fixHref) && (tone === "error" || tone === "warning");

  return (
    <div className={cn(statusItemVariants({ tone }), className)}>
      <div className="flex min-w-0 items-center gap-2.5">
        <Icon
          className={cn("h-4 w-4 shrink-0", iconClass[tone])}
          aria-hidden
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-foreground-secondary truncate">{value}</p>
        </div>
      </div>
      {showFix && fixHref && (
        <Button variant="link" size="sm" asChild>
          <Link href={fixHref}>{fixLabel}</Link>
        </Button>
      )}
    </div>
  );
}
