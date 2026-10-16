"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, Copy, Pipette, RotateCcw, Settings2 } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  buildThemeExportCode,
  COLOR_PICKER_SWATCHES,
  CUSTOM_COLOR_FIELDS,
  DEFAULT_CUSTOM_COLORS,
  isHexColor,
  useTheme,
  type CustomColorKey,
  type CustomColors,
} from "../../lib/theme";
import { Button } from "./button";
import { FormField } from "./form-field";
import { Input } from "./input";
import { useToast } from "./toast";

export interface ThemeCustomizerProps {
  className?: string;
  size?: "icon" | "icon-sm";
}

const GROUP_LABELS = {
  brand: "Brand",
  status: "Status",
  surface: "Surfaces",
} as const;

function normalizeHex(hex: string): string | null {
  let next = hex.trim();
  if (!next.startsWith("#")) next = `#${next}`;
  if (next.length === 4) {
    next = `#${next[1]}${next[1]}${next[2]}${next[2]}${next[3]}${next[3]}`;
  }
  return isHexColor(next) ? next.toUpperCase() : null;
}

/** Large color picker box: native spectrum + quick swatches + hex. */
function ColorPickerBox({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  const [draft, setDraft] = React.useState(value);
  const safe = isHexColor(value) ? value : DEFAULT_CUSTOM_COLORS.primary;

  React.useEffect(() => {
    setDraft(value);
  }, [value]);

  const commit = (raw: string) => {
    const normalized = normalizeHex(raw);
    if (normalized) {
      setDraft(normalized);
      onChange(normalized);
    } else {
      setDraft(value);
    }
  };

  return (
    <div className="space-y-2 rounded-xl border border-border bg-surface-secondary/50 p-2.5">
      <label
        htmlFor={`${id}-picker`}
        className="relative block h-24 w-full cursor-pointer overflow-hidden rounded-lg border border-border shadow-sm"
        style={{ backgroundColor: safe }}
      >
        <input
          id={`${id}-picker`}
          type="color"
          value={safe}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          aria-label={`${label} color picker`}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-overlay px-2 py-1.5 text-xs font-medium text-foreground-inverse">
          <Pipette className="h-3.5 w-3.5" aria-hidden />
          Open color picker
        </span>
      </label>

      <div
        role="listbox"
        aria-label={`${label} quick colors`}
        className="grid grid-cols-8 gap-1"
      >
        {COLOR_PICKER_SWATCHES.map((swatch) => {
          const selected = safe.toUpperCase() === swatch.toUpperCase();
          return (
            <button
              key={swatch}
              type="button"
              role="option"
              aria-selected={selected}
              aria-label={swatch}
              title={swatch}
              onClick={() => onChange(swatch)}
              className={cn(
                "h-6 w-full rounded-md border border-border shadow-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected && "ring-2 ring-ring ring-offset-1 ring-offset-surface"
              )}
              style={{ backgroundColor: swatch }}
            />
          );
        })}
      </div>

      <Input
        id={id}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => commit(draft)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        spellCheck={false}
        autoComplete="off"
        inputSize="sm"
        className="font-mono uppercase"
        aria-label={`${label} hex`}
        placeholder="#000000"
      />
    </div>
  );
}

function ColorRow({
  colorKey,
  label,
  description,
  value,
  onChange,
}: {
  colorKey: CustomColorKey;
  label: string;
  description: string;
  value: string;
  onChange: (key: CustomColorKey, hex: string) => void;
}) {
  const id = `custom-color-${colorKey}`;

  return (
    <FormField id={id} label={label} hint={description} layout="stacked">
      <ColorPickerBox
        id={id}
        label={label}
        value={value}
        onChange={(hex) => onChange(colorKey, hex)}
      />
    </FormField>
  );
}

export function ThemeCustomizer({
  className,
  size = "icon",
}: ThemeCustomizerProps) {
  const {
    theme,
    preset,
    customColors,
    setCustomColor,
    setCustomColors,
    resetCustomColors,
    hasCustomColors,
  } = useTheme();
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const values: CustomColors = customColors ?? DEFAULT_CUSTOM_COLORS;

  const ensureDraftStarted = (key: CustomColorKey, hex: string) => {
    if (!customColors) {
      setCustomColors({ ...DEFAULT_CUSTOM_COLORS, [key]: hex });
      return;
    }
    setCustomColor(key, hex);
  };

  const copyPresetCode = async () => {
    const code = buildThemeExportCode({
      appearance: theme,
      preset,
      colors: values,
    });
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Preset code copied",
        description: "Paste it into your workplace theme config or CSS.",
      });
    } catch {
      toast({
        title: "Could not copy",
        description: "Clipboard permission was denied.",
        variant: "error",
      });
    }
  };

  const groups = (["brand", "status", "surface"] as const).map((group) => ({
    group,
    fields: CUSTOM_COLOR_FIELDS.filter((f) => f.group === group),
  }));

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button
          type="button"
          variant="secondary"
          size={size}
          aria-label="Customize colors"
          title="Customize colors"
          className={cn(
            "relative shadow-md",
            hasCustomColors &&
              "ring-2 ring-ring ring-offset-2 ring-offset-canvas",
            className
          )}
          leftIcon={<Settings2 className="h-4 w-4" />}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          data-chrome="popover"
          align="end"
          side="top"
          sideOffset={8}
          className={cn(
            "z-50 max-h-[min(80vh,36rem)] w-[min(100vw-2rem,22rem)] overflow-y-auto rounded-2xl border border-border bg-popover p-3 shadow-lg"
          )}
        >
          <div className="mb-3 flex items-start justify-between gap-2 px-0.5">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Custom colors
              </p>
              <p className="text-xs text-foreground-secondary">
                Pick from the spectrum, quick swatches, or enter a hex value.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={copyPresetCode}
                aria-label="Copy preset code"
                leftIcon={
                  copied ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )
                }
              >
                {copied ? "Copied" : "Copy"}
              </Button>
              {hasCustomColors && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetCustomColors}
                  aria-label="Reset custom colors"
                  leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
                >
                  Reset
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {groups.map(({ group, fields }) => (
              <div key={group} className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground-muted">
                  {GROUP_LABELS[group]}
                </p>
                {fields.map((field) => (
                  <ColorRow
                    key={field.key}
                    colorKey={field.key}
                    label={field.label}
                    description={field.description}
                    value={values[field.key]}
                    onChange={ensureDraftStarted}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-4 gap-1.5 rounded-xl border border-border-subtle bg-surface-secondary/60 p-2.5">
            {(
              [
                "primary",
                "secondary",
                "highlight",
                "success",
                "danger",
                "warning",
                "canvas",
                "surface",
              ] as const
            ).map((key) => (
              <span
                key={key}
                className="h-7 rounded-md border border-border shadow-sm"
                style={{ backgroundColor: values[key] }}
                title={key}
              />
            ))}
          </div>

          <Popover.Arrow className="fill-popover" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
