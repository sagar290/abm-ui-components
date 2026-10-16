"use client";

import { Check } from "lucide-react";
import { cn } from "../../lib/utils";
import { PRESETS, useTheme, type Preset } from "../../lib/theme";

export interface ThemePickerProps {
  className?: string;
  /** Compact grid for popovers; stacked for catalog pages */
  layout?: "grid" | "stack";
}

function PresetPreview({ preset }: { preset: Preset }) {
  const isGlass = preset === "glossy" || preset === "colorful";

  return (
    <div
      data-preset={preset}
      className={cn(
        "flex h-14 w-full overflow-hidden border bg-canvas",
        isGlass ? "rounded-xl border-border shadow-sm" : "rounded-lg border-border"
      )}
      aria-hidden
    >
      <div
        className={cn(
          "w-1/3 border-r border-border-subtle bg-sidebar",
          isGlass && "backdrop-blur-sm"
        )}
      />
      <div className="flex flex-1 flex-col gap-1.5 bg-surface/60 p-2">
        <div className="h-2 w-3/4 rounded-sm bg-surface-secondary" />
        <div className="h-2 w-1/2 rounded-sm bg-surface-secondary" />
        <div
          className={cn(
            "mt-auto h-4 w-10 shadow-sm",
            isGlass ? "rounded-lg" : "rounded-md",
            preset === "colorful"
              ? "[background-image:var(--button-primary-image)]"
              : "bg-accent"
          )}
        />
      </div>
    </div>
  );
}

export function ThemePicker({ className, layout = "grid" }: ThemePickerProps) {
  const { preset, setPreset } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Style preset"
      className={cn(
        layout === "grid"
          ? "grid gap-2 sm:grid-cols-3"
          : "flex flex-col gap-2",
        className
      )}
    >
      {PRESETS.map((option) => {
        const selected = preset === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setPreset(option.id)}
            className={cn(
              "group relative flex flex-col gap-2 rounded-xl border p-3 text-left transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              selected
                ? "border-accent bg-accent-muted/40 shadow-sm"
                : "border-border bg-surface hover:border-foreground-muted hover:bg-surface-secondary/40"
            )}
          >
            <PresetPreview preset={option.id} />
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {option.label}
                </p>
                <p className="text-xs text-foreground-secondary">
                  {option.description}
                </p>
              </div>
              {selected && (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-foreground-inverse">
                  <Check className="h-3 w-3" aria-hidden />
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
