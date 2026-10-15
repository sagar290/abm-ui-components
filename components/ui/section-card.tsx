import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface SectionCardProps {
  title: string;
  href?: string;
  linkLabel?: string;
  empty?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function SectionCard({
  title,
  href,
  linkLabel,
  empty,
  children,
  className,
  action,
}: SectionCardProps) {
  const hasContent = Boolean(children) && !empty;

  return (
    <section
      className={cn(
        "rounded-xl border border-border-subtle bg-surface shadow-sm",
        className
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-border-subtle px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          {action}
          {href && (
            <Button variant="ghost" size="sm" asChild>
              <Link
                href={href}
                className="gap-1 text-foreground-secondary"
                aria-label={linkLabel ?? `Open ${title}`}
              >
                {linkLabel}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </header>
      <div className="p-4">{hasContent ? children : empty}</div>
    </section>
  );
}
