"use client";

import { Filter, Plus, ArrowUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";

export interface ListPaneProps {
  title?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  onFilter?: () => void;
  onSort?: () => void;
  onAdd?: () => void;
  addLabel?: string;
  children: React.ReactNode;
  className?: string;
  /** Content between search row and list (e.g. PromoCard, New Package) */
  preamble?: React.ReactNode;
  headerExtra?: React.ReactNode;
}

export function ListPane({
  title,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  onFilter,
  onSort,
  onAdd,
  addLabel = "Add",
  children,
  className,
  preamble,
  headerExtra,
}: ListPaneProps) {
  return (
    <aside
      className={cn(
        "flex h-full min-h-0 w-full flex-col border-r border-border-subtle bg-surface",
        className
      )}
      aria-label={title ?? "List"}
    >
      <div className="shrink-0 space-y-3 p-3">
        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground-muted"
              aria-hidden
            />
            <Input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              inputSize="sm"
              className="pl-8 bg-surface-secondary border-transparent focus-visible:bg-surface"
            />
          </div>
          {onAdd && (
            <Button
              variant="secondary"
              size="icon-sm"
              onClick={onAdd}
              aria-label={addLabel}
              className="rounded-full shrink-0"
              leftIcon={<Plus className="h-4 w-4" />}
            />
          )}
          {headerExtra}
        </div>

        {preamble}

        {(title || onFilter || onSort) && (
          <div className="flex items-center gap-2 px-0.5">
            {title && (
              <h2 className="flex-1 text-[13px] font-semibold text-foreground">
                {title}
              </h2>
            )}
            {onFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onFilter}
                className="h-7 gap-1 px-1.5 text-xs text-foreground-secondary"
                leftIcon={<Filter className="h-3.5 w-3.5" />}
              >
                Filter
              </Button>
            )}
            {onSort && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSort}
                className="h-7 gap-1 px-1.5 text-xs text-foreground-secondary"
                leftIcon={<ArrowUpDown className="h-3.5 w-3.5" />}
              >
                Sort
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2" role="list">
        {children}
      </div>
    </aside>
  );
}
