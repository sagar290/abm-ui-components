import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inlineAlertVariants = cva(
  "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm",
  {
    variants: {
      tone: {
        info: "border-info/30 bg-info-muted text-foreground",
        success: "border-success/30 bg-success-muted text-foreground",
        warning: "border-warning/30 bg-warning-muted text-foreground",
        error: "border-danger/30 bg-danger-muted text-foreground",
      },
    },
    defaultVariants: {
      tone: "info",
    },
  }
);

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
} as const;

const iconTone = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-danger",
} as const;

export interface InlineAlertProps
  extends VariantProps<typeof inlineAlertVariants> {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function InlineAlert({
  tone = "info",
  title,
  children,
  action,
  className,
}: InlineAlertProps) {
  const Icon = iconMap[tone ?? "info"];

  return (
    <div
      role="status"
      className={cn(inlineAlertVariants({ tone }), className)}
    >
      <Icon
        className={cn("mt-0.5 h-4 w-4 shrink-0", iconTone[tone ?? "info"])}
        aria-hidden
      />
      <div className="min-w-0 flex-1 space-y-1">
        {title && (
          <p className="font-semibold text-foreground">{title}</p>
        )}
        <div className="text-foreground-secondary">{children}</div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
