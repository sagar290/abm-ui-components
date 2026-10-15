import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      density: {
        default: "gap-3 px-6 py-10",
        /** Compact for nesting inside SectionCard */
        compact: "gap-1.5 px-2 py-4",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
);

export interface EmptyStateProps
  extends VariantProps<typeof emptyStateVariants> {
  message: string;
  title?: string;
  icon?: React.ReactNode;
  linkHref?: string;
  linkLabel?: string;
  action?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({
  message,
  title,
  icon,
  linkHref,
  linkLabel,
  action,
  density = "default",
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      className={cn(emptyStateVariants({ density }), className)}
      role="status"
    >
      {icon}
      {title && (
        <h2
          className={cn(
            "font-semibold text-foreground",
            density === "compact" ? "text-sm" : "text-xl"
          )}
        >
          {title}
        </h2>
      )}
      <p
        className={cn(
          "max-w-sm text-foreground-secondary",
          density === "compact" ? "text-xs" : "text-sm"
        )}
      >
        {message}
      </p>
      {linkHref && linkLabel && (
        <Button
          variant={density === "compact" ? "link" : "primary"}
          size={density === "compact" ? "sm" : "md"}
          asChild
          className="mt-1"
        >
          <Link href={linkHref}>{linkLabel}</Link>
        </Button>
      )}
      {action}
      {children}
    </div>
  );
}
