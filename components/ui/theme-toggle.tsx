"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useTheme, type Theme } from "@/lib/theme";
import { Button } from "./button";

const themeToggleVariants = cva("", {
  variants: {
    appearance: {
      /** Single button that cycles light ↔ dark */
      icon: "",
      /** Segmented light / dark / system control */
      segmented: "",
    },
  },
  defaultVariants: {
    appearance: "icon",
  },
});

export interface ThemeToggleProps
  extends VariantProps<typeof themeToggleVariants> {
  className?: string;
}

const cycle: Theme[] = ["light", "dark", "system"];

export function ThemeToggle({
  appearance = "icon",
  className,
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  if (appearance === "segmented") {
    return (
      <div
        role="group"
        aria-label="Color theme"
        className={cn(
          "inline-flex rounded-lg border border-border bg-surface-secondary p-0.5",
          themeToggleVariants({ appearance }),
          className
        )}
      >
        {(
          [
            { value: "light" as const, label: "Light", icon: Sun },
            { value: "dark" as const, label: "Dark", icon: Moon },
            { value: "system" as const, label: "System", icon: Monitor },
          ] as const
        ).map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            type="button"
            variant="ghost"
            size="sm"
            aria-pressed={theme === value}
            aria-label={label}
            onClick={() => setTheme(value)}
            className={cn(
              "h-7 gap-1.5 rounded-md px-2.5 text-xs",
              theme === value
                ? "bg-surface text-foreground shadow-sm"
                : "text-foreground-secondary"
            )}
            leftIcon={<Icon className="h-3.5 w-3.5" />}
          >
            <span className="hidden sm:inline">{label}</span>
          </Button>
        ))}
      </div>
    );
  }

  const nextLabel =
    resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      aria-label={nextLabel}
      title={nextLabel}
      onClick={toggleTheme}
      onContextMenu={(e) => {
        // Right-click cycles light → dark → system
        e.preventDefault();
        const idx = cycle.indexOf(theme);
        setTheme(cycle[(idx + 1) % cycle.length]);
      }}
      className={cn(
        "shadow-md",
        themeToggleVariants({ appearance }),
        className
      )}
      leftIcon={
        resolvedTheme === "dark" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )
      }
    />
  );
}
