import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "./button";

const sectionCardVariants = cva(
  "rounded-xl border border-border-subtle bg-surface",
  {
    variants: {
      density: {
        default: "shadow-sm",
        /** Tighter chrome for nested empty groups */
        compact: "shadow-none",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
);

export interface SectionCardProps
  extends VariantProps<typeof sectionCardVariants> {
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
  density = "default",
}: SectionCardProps) {
  const hasContent = Boolean(children) && !empty;
  const compact = density === "compact";

  return (
    <section className={cn(sectionCardVariants({ density }), className)}>
      <header
        className={cn(
          "flex items-center justify-between gap-3 border-b border-border-subtle",
          compact ? "px-3 py-2" : "px-4 py-3"
        )}
      >
        <h3
          className={cn(
            "font-semibold text-foreground",
            compact ? "text-xs" : "text-sm"
          )}
        >
          {title}
        </h3>
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
      <div className={compact ? "p-2" : "p-4"}>
        {hasContent ? children : empty}
      </div>
    </section>
  );
}
