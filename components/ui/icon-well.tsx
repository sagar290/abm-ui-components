import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconWellVariants = cva(
  "inline-flex items-center justify-center rounded-xl bg-surface-secondary text-foreground-muted",
  {
    variants: {
      size: {
        sm: "h-8 w-8 rounded-lg",
        md: "h-10 w-10",
        lg: "h-14 w-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface IconWellProps extends VariantProps<typeof iconWellVariants> {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export function IconWell({ children, size, className, label }: IconWellProps) {
  return (
    <span
      className={cn(iconWellVariants({ size }), className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </span>
  );
}
