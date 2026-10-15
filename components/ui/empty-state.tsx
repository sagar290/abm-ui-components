import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface EmptyStateProps {
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
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-10 text-center",
        className
      )}
      role="status"
    >
      {icon}
      {title && (
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      )}
      <p className="text-sm text-foreground-secondary max-w-sm">{message}</p>
      {linkHref && linkLabel && (
        <Button variant="primary" size="md" asChild className="mt-1">
          <Link href={linkHref}>{linkLabel}</Link>
        </Button>
      )}
      {action}
      {children}
    </div>
  );
}
