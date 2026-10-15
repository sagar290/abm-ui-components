"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
}

const tabListVariants = cva(
  "inline-flex w-full gap-1 overflow-x-auto border-b border-border-subtle pb-px",
  {
    variants: {
      variant: {
        plain: "",
        /** Detail-pane chrome: aligns with header padding */
        pane: "px-6 pt-2",
      },
    },
    defaultVariants: {
      variant: "plain",
    },
  }
);

const tabPanelVariants = cva("focus-visible:outline-none", {
  variants: {
    variant: {
      plain: "mt-4",
      pane: "bg-canvas px-6 py-6",
    },
  },
  defaultVariants: {
    variant: "plain",
  },
});

const TabsVariantContext = React.createContext<"plain" | "pane">("plain");

export interface TabsProps extends VariantProps<typeof tabListVariants> {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
  listClassName?: string;
}

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  children,
  className,
  listClassName,
  variant = "plain",
}: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant ?? "plain"}>
      <TabsPrimitive.Root
        value={value}
        defaultValue={defaultValue ?? items[0]?.value}
        onValueChange={onValueChange}
        className={cn("w-full", className)}
      >
        <TabsPrimitive.List
          className={cn(tabListVariants({ variant }), listClassName)}
          aria-label="Sections"
        >
          {items.map((item) => (
            <TabsPrimitive.Trigger
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={cn(
                "shrink-0 rounded-t-lg px-3 py-2 text-sm font-medium text-foreground-secondary",
                "hover:text-foreground hover:bg-surface-secondary/60",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-foreground",
                "disabled:opacity-50 disabled:pointer-events-none"
              )}
            >
              {item.label}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
        {children}
      </TabsPrimitive.Root>
    </TabsVariantContext.Provider>
  );
}

export interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabPanel({ value, children, className }: TabPanelProps) {
  const variant = React.useContext(TabsVariantContext);

  return (
    <TabsPrimitive.Content
      value={value}
      className={cn(tabPanelVariants({ variant }), className)}
    >
      {children}
    </TabsPrimitive.Content>
  );
}
