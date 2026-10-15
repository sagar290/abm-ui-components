"use client";

import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";

const listItemVariants = cva(
  "flex w-full items-start gap-3 rounded-lg px-2.5 py-2 text-left h-auto font-normal",
  {
    variants: {
      selected: {
        true: "bg-accent text-foreground-inverse hover:bg-accent hover:text-foreground-inverse dark:bg-accent/25 dark:text-foreground dark:hover:bg-accent/30 dark:hover:text-foreground",
        false: "hover:bg-surface-secondary text-foreground",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);

export interface ListItemProps extends VariantProps<typeof listItemVariants> {
  title: string;
  subtitle?: string;
  href?: string;
  selected?: boolean;
  onSelect?: () => void;
  statusLabel?: string;
  statusVariant?: "neutral" | "info" | "warning" | "error" | "success";
  leading?: React.ReactNode;
  className?: string;
}

function ListItemContent({
  title,
  subtitle,
  statusLabel,
  statusVariant,
  leading,
  selected,
}: Pick<
  ListItemProps,
  "title" | "subtitle" | "statusLabel" | "statusVariant" | "leading" | "selected"
>) {
  return (
    <>
      {leading}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">{title}</p>
          {statusLabel && (
            <Badge
              variant={selected ? "neutral" : statusVariant}
              size="sm"
              className={cn(
                "shrink-0",
                selected &&
                  "bg-foreground-inverse/20 text-foreground-inverse dark:bg-accent/20 dark:text-accent"
              )}
            >
              {statusLabel}
            </Badge>
          )}
        </div>
        {subtitle && (
          <p
            className={cn(
              "mt-0.5 truncate text-xs",
              selected
                ? "text-foreground-inverse/80 dark:text-foreground-secondary"
                : "text-foreground-secondary"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    </>
  );
}

export function ListItem({
  title,
  subtitle,
  href,
  selected,
  onSelect,
  statusLabel,
  statusVariant = "neutral",
  leading,
  className,
}: ListItemProps) {
  const classes = cn(listItemVariants({ selected }), className);
  const content = (
    <ListItemContent
      title={title}
      subtitle={subtitle}
      statusLabel={statusLabel}
      statusVariant={statusVariant}
      leading={leading}
      selected={selected}
    />
  );

  if (href) {
    return (
      <Button
        variant="ghost"
        asChild
        className={classes}
        aria-current={selected ? "page" : undefined}
      >
        <Link href={href} role="listitem" onClick={onSelect}>
          {content}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      role="listitem"
      className={classes}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {content}
    </Button>
  );
}
