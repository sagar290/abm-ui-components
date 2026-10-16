"use client";

import * as Popover from "@radix-ui/react-popover";
import { Palette } from "lucide-react";
import { cn } from "../../lib/utils";
import { PRESETS, useTheme } from "../../lib/theme";
import { Button } from "./button";
import { ThemePicker } from "./theme-picker";

export interface ThemePresetMenuProps {
  className?: string;
  /** Match ThemeToggle icon sizing in the shell */
  size?: "icon" | "icon-sm";
}

export function ThemePresetMenu({
  className,
  size = "icon",
}: ThemePresetMenuProps) {
  const { preset } = useTheme();
  const current = PRESETS.find((p) => p.id === preset);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          type="button"
          variant="secondary"
          size={size}
          aria-label={`Style preset: ${current?.label ?? preset}`}
          title={`Style: ${current?.label ?? preset}`}
          className={cn("shadow-md", className)}
          leftIcon={<Palette className="h-4 w-4" />}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          side="top"
          sideOffset={8}
          className={cn(
            "z-50 w-[min(100vw-2rem,22rem)] rounded-2xl border border-border bg-surface p-3 shadow-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
          )}
        >
          <div className="mb-2 px-0.5">
            <p className="text-sm font-semibold text-foreground">Style</p>
            <p className="text-xs text-foreground-secondary">
              Light and dark work with every preset.
            </p>
          </div>
          <ThemePicker layout="stack" />
          <Popover.Arrow className="fill-surface" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
