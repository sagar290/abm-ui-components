"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";

const sidebarItemVariants = cva(
  "flex w-full items-center gap-2.5 rounded-lg text-[13px] font-medium h-auto justify-start",
  {
    variants: {
      active: {
        // Light: gray pill · Dark: stronger accent tint so active state reads clearly
        true: "bg-sidebar-active text-foreground hover:bg-sidebar-active dark:bg-accent/35 dark:text-foreground dark:hover:bg-accent/40 dark:ring-1 dark:ring-accent/40",
        false: "text-foreground/90 hover:bg-sidebar-hover hover:text-foreground",
      },
      depth: {
        0: "px-2.5 py-1.5",
        1: "px-2.5 py-1.5 pl-3 font-normal text-foreground-secondary",
        2: "px-2.5 py-1.5 pl-3 font-normal text-foreground-secondary",
      },
    },
    defaultVariants: {
      active: false,
      depth: 0,
    },
  }
);

export interface SidebarSubItem {
  href: string;
  label: string;
  active?: boolean;
  alertCount?: number;
  onClick?: () => void;
  items?: SidebarSubItem[];
}

export interface SidebarItemProps
  extends VariantProps<typeof sidebarItemVariants> {
  href: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  alertCount?: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  /** Nested submenu links; expands when a child is active */
  items?: SidebarSubItem[];
  defaultOpen?: boolean;
}

export function SidebarItem({
  href,
  label,
  icon,
  badge,
  alertCount,
  active,
  onClick,
  className,
  items,
  defaultOpen,
  depth = 0,
}: SidebarItemProps) {
  const childActive = Boolean(
    items?.some((item) => item.active || itemHasActiveDescendant(item))
  );
  const [open, setOpen] = React.useState(
    () => defaultOpen ?? childActive ?? false
  );

  React.useEffect(() => {
    if (childActive) setOpen(true);
  }, [childActive]);

  const hasSubmenu = Boolean(items && items.length > 0);
  const resolvedDepth = depth ?? 0;

  return (
    <div className={cn(hasSubmenu && "space-y-0.5")}>
      <div className="flex items-stretch gap-0.5">
        <Button
          variant="ghost"
          asChild
          className={cn(
            sidebarItemVariants({ active, depth: resolvedDepth }),
            hasSubmenu && "flex-1",
            className
          )}
        >
          <Link
            href={href}
            onClick={onClick}
            aria-current={active ? "page" : undefined}
          >
            {icon && (
              <span className="shrink-0 text-accent" aria-hidden>
                {icon}
              </span>
            )}
            <span className="min-w-0 flex-1 truncate text-left">{label}</span>
            {badge}
            {typeof alertCount === "number" && alertCount > 0 && (
              <Badge
                variant="error"
                size="sm"
                aria-label={`${alertCount} alerts`}
              >
                {alertCount}
              </Badge>
            )}
          </Link>
        </Button>

        {hasSubmenu && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={open ? `Collapse ${label}` : `Expand ${label}`}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              "h-auto w-8 shrink-0 rounded-lg text-foreground-muted hover:text-foreground",
              (active || childActive) &&
                "bg-sidebar-active dark:bg-accent/25 dark:ring-1 dark:ring-accent/30"
            )}
            leftIcon={
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  open && "rotate-180"
                )}
              />
            }
          />
        )}
      </div>

      {hasSubmenu && open && (
        <ul
          className="ml-4 space-y-0.5 border-l border-border-subtle pl-1.5"
          role="list"
        >
          {items!.map((item) => (
            <li key={item.href + item.label}>
              <SidebarItem
                href={item.href}
                label={item.label}
                active={item.active}
                alertCount={item.alertCount}
                onClick={item.onClick}
                items={item.items}
                depth={Math.min(resolvedDepth + 1, 2) as 0 | 1 | 2}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function itemHasActiveDescendant(item: SidebarSubItem): boolean {
  return Boolean(
    item.items?.some((child) => child.active || itemHasActiveDescendant(child))
  );
}

export { sidebarItemVariants };
