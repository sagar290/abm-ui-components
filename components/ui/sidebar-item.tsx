"use client";

import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";

const sidebarItemVariants = cva(
  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium h-auto justify-start",
  {
    variants: {
      active: {
        // Light: gray pill · Dark: soft accent tint (not solid blue)
        true: "bg-sidebar-active text-foreground hover:bg-sidebar-active dark:bg-accent/25 dark:text-foreground dark:hover:bg-accent/30",
        false: "text-foreground hover:bg-sidebar-hover",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export interface SidebarItemProps extends VariantProps<typeof sidebarItemVariants> {
  href: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  alertCount?: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
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
}: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      asChild
      className={cn(sidebarItemVariants({ active }), className)}
    >
      <Link
        href={href}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
      >
        {icon && (
          <span
            className={cn(
              "shrink-0",
              active ? "text-accent" : "text-accent"
            )}
          >
            {icon}
          </span>
        )}
        <span className="min-w-0 flex-1 truncate text-left">{label}</span>
        {badge}
        {typeof alertCount === "number" && alertCount > 0 && (
          <Badge variant="error" size="sm" aria-label={`${alertCount} alerts`}>
            {alertCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
