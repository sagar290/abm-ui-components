"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

export interface ActionMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: () => void;
  /** Nested submenu entries */
  children?: ActionMenuItem[];
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  label?: string;
  trigger?: React.ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
}

const itemClassName = (destructive?: boolean) =>
  cn(
    "flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-sm outline-none",
    "focus:bg-accent-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "data-[highlighted]:bg-accent-muted",
    destructive
      ? "text-danger focus:bg-danger-muted focus:text-danger data-[highlighted]:bg-danger-muted data-[highlighted]:text-danger"
      : "text-foreground"
  );

function ActionMenuEntries({ items }: { items: ActionMenuItem[] }) {
  return (
    <>
      {items.map((item) =>
        item.children && item.children.length > 0 ? (
          <DropdownMenu.Sub key={item.id}>
            <DropdownMenu.SubTrigger
              disabled={item.disabled}
              className={cn(itemClassName(item.destructive), "justify-between")}
            >
              <span className="flex min-w-0 items-center gap-2">
                {item.icon && (
                  <span className="shrink-0 text-foreground-muted">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </span>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-foreground-muted" />
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                data-chrome="popover"
                sideOffset={6}
                className="z-50 min-w-[180px] overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg"
              >
                <ActionMenuEntries items={item.children} />
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
        ) : (
          <DropdownMenu.Item
            key={item.id}
            disabled={item.disabled}
            onSelect={() => item.onSelect?.()}
            className={itemClassName(item.destructive)}
          >
            {item.icon && (
              <span className="shrink-0 text-foreground-muted">{item.icon}</span>
            )}
            {item.label}
          </DropdownMenu.Item>
        )
      )}
    </>
  );
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
          data-chrome="popover"
          align={align}
          sideOffset={6}
          className="z-50 min-w-[180px] overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg"
        >
          <ActionMenuEntries items={items} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
