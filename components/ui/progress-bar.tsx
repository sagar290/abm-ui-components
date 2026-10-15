import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const progressVariants = cva("h-2 w-full overflow-hidden rounded-full bg-surface-secondary", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface ProgressBarProps extends VariantProps<typeof progressVariants> {
  value: number;
  max?: number;
  label?: string;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showLabel = true,
  size,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const tone =
    pct >= 90 ? "bg-danger" : pct >= 75 ? "bg-warning" : "bg-accent";

  return (
    <div className={cn("space-y-1.5", className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs text-foreground-secondary">
          <span>{label ?? "Storage"}</span>
          <span className="tabular-nums">
            {value} / {max} GB ({Math.round(pct)}%)
          </span>
        </div>
      )}
      <div
        className={progressVariants({ size })}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? "Storage usage"}
      >
        <div
          className={cn("h-full rounded-full transition-all", tone)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
