"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface ActionMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: () => void;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  label?: string;
  trigger?: React.ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
}

export function ActionMenu({
  items,
  label = "More actions",
  trigger,
  align = "end",
  className,
}: ActionMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger ?? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={label}
            className={cn(
              "text-foreground-secondary hover:text-foreground",
              className
            )}
            leftIcon={<MoreHorizontal className="h-4 w-4" />}
          >
            <span className="hidden sm:inline">More</span>
          </Button>
        )}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          sideOffset={6}
          className={cn(
            "z-50 min-w-[180px] overflow-hidden rounded-xl border border-border bg-surface p-1 shadow-lg"
          )}
        >
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.id}
              disabled={item.disabled}
              onSelect={() => item.onSelect?.()}
              className={cn(
                "flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none",
                "focus:bg-accent-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                item.destructive
                  ? "text-danger focus:bg-danger-muted focus:text-danger"
                  : "text-foreground"
              )}
            >
              {item.icon && (
                <span className="shrink-0 text-foreground-muted">
                  {item.icon}
                </span>
              )}
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
