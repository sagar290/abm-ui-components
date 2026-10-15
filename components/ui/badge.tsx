import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
  {
    variants: {
      variant: {
        neutral: "bg-surface-secondary text-foreground-secondary",
        info: "bg-info-muted text-info",
        warning: "bg-warning-muted text-warning",
        error: "bg-danger text-foreground-inverse",
        success: "bg-success-muted text-success",
      },
      size: {
        sm: "min-w-5 h-5 px-1.5",
        md: "min-w-6 h-6 px-2",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
