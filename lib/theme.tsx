"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";
export type Preset = "normal" | "glossy" | "colorful";

export interface CustomColors {
  /** Brand / primary actions (maps to accent) */
  primary: string;
  /** Supporting brand (maps to info) */
  secondary: string;
  /** Focus / selection highlight (maps to ring + muted accents) */
  highlight: string;
  /** Success / positive states */
  success: string;
  /** Danger / destructive actions */
  danger: string;
  /** Warning / caution states */
  warning: string;
  /** Page / shell background */
  canvas: string;
  /** Cards and elevated panels */
  surface: string;
}

export type CustomColorKey = keyof CustomColors;

export const DEFAULT_CUSTOM_COLORS: CustomColors = {
  primary: "#0071E3",
  secondary: "#5AC8FA",
  highlight: "#A855F7",
  success: "#34C759",
  danger: "#FF3B30",
  warning: "#FF9500",
  canvas: "#F5F5F7",
  surface: "#FFFFFF",
};

const THEME_STORAGE_KEY = "abm-theme";
const PRESET_STORAGE_KEY = "abm-preset";
const CUSTOM_COLORS_STORAGE_KEY = "abm-custom-colors";

export const PRESETS: readonly {
  id: Preset;
  label: string;
  description: string;
}[] = [
  {
    id: "normal",
    label: "Normal",
    description: "Flat, clean admin chrome",
  },
  {
    id: "glossy",
    label: "Glossy",
    description: "Frosted glass and soft depth",
  },
  {
    id: "colorful",
    label: "Colorful Glossy",
    description: "Glass plus iridescent accents",
  },
] as const;

export const CUSTOM_COLOR_FIELDS: readonly {
  key: CustomColorKey;
  label: string;
  description: string;
  group: "brand" | "status" | "surface";
}[] = [
  {
    key: "primary",
    label: "Primary",
    description: "Buttons, links, and active accents",
    group: "brand",
  },
  {
    key: "secondary",
    label: "Secondary",
    description: "Supporting info and badges",
    group: "brand",
  },
  {
    key: "highlight",
    label: "Highlight",
    description: "Focus rings and selection tint",
    group: "brand",
  },
  {
    key: "success",
    label: "Success",
    description: "Positive status and confirmations",
    group: "status",
  },
  {
    key: "danger",
    label: "Danger",
    description: "Errors and destructive actions",
    group: "status",
  },
  {
    key: "warning",
    label: "Warning",
    description: "Caution and attention states",
    group: "status",
  },
  {
    key: "canvas",
    label: "Canvas",
    description: "Page and shell background",
    group: "surface",
  },
  {
    key: "surface",
    label: "Surface",
    description: "Cards, panels, and popovers",
    group: "surface",
  },
] as const;

/** Quick picks shown in the color picker box */
export const COLOR_PICKER_SWATCHES = [
  "#0071E3",
  "#0A84FF",
  "#5AC8FA",
  "#14B8A6",
  "#34C759",
  "#A855F7",
  "#C084FC",
  "#FF2D9A",
  "#FF3B30",
  "#FF9500",
  "#FB923C",
  "#1D1D1F",
  "#FFFFFF",
  "#F5F5F7",
  "#12101A",
  "#1C1826",
] as const;

const PRESET_IDS: readonly Preset[] = ["normal", "glossy", "colorful"];

const CUSTOM_CSS_VARS = [
  "--color-accent",
  "--color-accent-hover",
  "--color-accent-muted",
  "--color-ring",
  "--color-info",
  "--color-info-muted",
  "--color-success",
  "--color-success-muted",
  "--color-danger",
  "--color-danger-hover",
  "--color-danger-muted",
  "--color-warning",
  "--color-warning-muted",
  "--color-canvas",
  "--color-surface",
  "--color-surface-secondary",
  "--color-sidebar",
  "--color-banner",
  "--shadow-focus",
  "--button-primary-image",
  "--button-primary-image-hover",
] as const;

const HEX_RE = /^#([0-9a-fA-F]{6})$/;

function isPreset(value: string | null): value is Preset {
  return value !== null && (PRESET_IDS as readonly string[]).includes(value);
}

export function isHexColor(value: string): boolean {
  return HEX_RE.test(value);
}

export interface ThemeExportPayload {
  version: 1;
  appearance: Theme;
  preset: Preset;
  colors: CustomColors;
}

/** Pasteable theme pack for other workplaces (JSON + CSS token overrides). */
export function buildThemeExportCode(input: {
  appearance: Theme;
  preset: Preset;
  colors: CustomColors;
}): string {
  const payload: ThemeExportPayload = {
    version: 1,
    appearance: input.appearance,
    preset: input.preset,
    colors: input.colors,
  };

  const c = input.colors;
  const css = `/* ABM theme tokens — paste into your app globals / tokens.css */
:root {
  --color-accent: ${c.primary};
  --color-ring: ${c.highlight};
  --color-info: ${c.secondary};
  --color-success: ${c.success};
  --color-danger: ${c.danger};
  --color-warning: ${c.warning};
  --color-canvas: ${c.canvas};
  --color-surface: ${c.surface};
  --color-sidebar: ${c.canvas};
}

/* Also set on <html>: data-preset="${input.preset}" and appearance "${input.appearance}" */`;

  return `/**
 * ABM UI theme export
 * 1) Paste the JSON into your workplace theme config / localStorage (abm-custom-colors + abm-preset + abm-theme)
 * 2) Or paste the CSS token overrides into your app styles
 */
${JSON.stringify(payload, null, 2)}

/* --- CSS overrides --- */
${css}
`;
}

function clampByte(n: number) {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  if (!isHexColor(hex)) return null;
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((n) => clampByte(n).toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Darken hex for hover states */
export function darkenHex(hex: string, amount = 0.14): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return rgbToHex(rgb.r * (1 - amount), rgb.g * (1 - amount), rgb.b * (1 - amount));
}

function rgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(0,0,0,${alpha})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function parseCustomColors(raw: string | null): CustomColors | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<CustomColors>;
    // Require the original brand trio; fill newer keys from defaults for migration.
    if (
      typeof parsed.primary !== "string" ||
      !isHexColor(parsed.primary) ||
      typeof parsed.secondary !== "string" ||
      !isHexColor(parsed.secondary) ||
      typeof parsed.highlight !== "string" ||
      !isHexColor(parsed.highlight)
    ) {
      return null;
    }

    const merged: CustomColors = { ...DEFAULT_CUSTOM_COLORS };
    for (const key of Object.keys(DEFAULT_CUSTOM_COLORS) as CustomColorKey[]) {
      const value = parsed[key];
      if (typeof value === "string" && isHexColor(value)) {
        merged[key] = value;
      }
    }
    return merged;
  } catch {
    /* ignore */
  }
  return null;
}

function clearCustomColorStyles(root: HTMLElement) {
  for (const key of CUSTOM_CSS_VARS) {
    root.style.removeProperty(key);
  }
}

function applyCustomColorStyles(root: HTMLElement, colors: CustomColors | null) {
  if (!colors) {
    clearCustomColorStyles(root);
    return;
  }

  const {
    primary,
    secondary,
    highlight,
    success,
    danger,
    warning,
    canvas,
    surface,
  } = colors;

  root.style.setProperty("--color-accent", primary);
  root.style.setProperty("--color-accent-hover", darkenHex(primary));
  root.style.setProperty("--color-accent-muted", rgba(highlight, 0.22));
  root.style.setProperty("--color-ring", highlight);
  root.style.setProperty("--color-info", secondary);
  root.style.setProperty("--color-info-muted", rgba(secondary, 0.2));
  root.style.setProperty("--color-success", success);
  root.style.setProperty("--color-success-muted", rgba(success, 0.2));
  root.style.setProperty("--color-danger", danger);
  root.style.setProperty("--color-danger-hover", darkenHex(danger));
  root.style.setProperty("--color-danger-muted", rgba(danger, 0.2));
  root.style.setProperty("--color-warning", warning);
  root.style.setProperty("--color-warning-muted", rgba(warning, 0.2));
  root.style.setProperty("--color-canvas", canvas);
  root.style.setProperty("--color-surface", surface);
  root.style.setProperty(
    "--color-surface-secondary",
    rgba(highlight, 0.08)
  );
  root.style.setProperty("--color-sidebar", canvas);
  root.style.setProperty("--color-banner", rgba(highlight, 0.1));
  root.style.setProperty("--shadow-focus", `0 0 0 3px ${rgba(highlight, 0.4)}`);
  // Solid primary so custom color wins over colorful preset gradients
  root.style.setProperty("--button-primary-image", "none");
  root.style.setProperty("--button-primary-image-hover", "none");
}

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  preset: Preset;
  setPreset: (preset: Preset) => void;
  customColors: CustomColors | null;
  setCustomColors: (colors: CustomColors | null) => void;
  setCustomColor: (key: CustomColorKey, value: string) => void;
  resetCustomColors: () => void;
  hasCustomColors: boolean;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme;
}

const TRANSITION_MS = 320;
let transitionTimer: ReturnType<typeof setTimeout> | number | undefined;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Enable color transitions only for user-initiated switches (not first paint). */
function withThemeTransition(apply: () => void) {
  const root = document.documentElement;
  if (prefersReducedMotion()) {
    apply();
    return;
  }

  root.classList.add("theme-transition");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      apply();
      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(() => {
        root.classList.remove("theme-transition");
      }, TRANSITION_MS);
    });
  });
}

function applyTheme(resolved: ResolvedTheme, { animate = false } = {}) {
  const run = () => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolved === "dark");
    root.style.colorScheme = resolved;
  };

  if (animate) withThemeTransition(run);
  else run();
}

function applyPreset(preset: Preset, { animate = false } = {}) {
  const run = () => {
    document.documentElement.setAttribute("data-preset", preset);
  };

  if (animate) withThemeTransition(run);
  else run();
}

function applyCustomColors(
  colors: CustomColors | null,
  { animate = false } = {}
) {
  const run = () => {
    applyCustomColorStyles(document.documentElement, colors);
  };

  if (animate) withThemeTransition(run);
  else run();
}

/** Inline bootstrap — run before paint to avoid a light / wrong-preset flash. */
export const themeBootstrapScript = `(function(){try{var tk=${JSON.stringify(THEME_STORAGE_KEY)};var pk=${JSON.stringify(PRESET_STORAGE_KEY)};var ck=${JSON.stringify(CUSTOM_COLORS_STORAGE_KEY)};var t=localStorage.getItem(tk)||"system";var p=localStorage.getItem(pk)||"normal";if(p!=="normal"&&p!=="glossy"&&p!=="colorful")p="normal";var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var r=t==="dark"||(t!=="light"&&d);var e=document.documentElement;e.classList.toggle("dark",r);e.style.colorScheme=r?"dark":"light";e.setAttribute("data-preset",p);var raw=localStorage.getItem(ck);if(raw){var c=JSON.parse(raw);var hex=/^#[0-9a-fA-F]{6}$/;if(c&&hex.test(c.primary)&&hex.test(c.secondary)&&hex.test(c.highlight)){var def=${JSON.stringify(DEFAULT_CUSTOM_COLORS)};function pick(k){return hex.test(c[k])?c[k]:def[k];}function darken(h,a){var n=parseInt(h.slice(1),16);var R=(n>>16)&255,G=(n>>8)&255,B=n&255;R=Math.max(0,Math.min(255,Math.round(R*(1-a))));G=Math.max(0,Math.min(255,Math.round(G*(1-a))));B=Math.max(0,Math.min(255,Math.round(B*(1-a))));return"#"+((1<<24)|(R<<16)|(G<<8)|B).toString(16).slice(1);}function rgba(h,a){var n=parseInt(h.slice(1),16);return"rgba("+((n>>16)&255)+","+((n>>8)&255)+","+(n&255)+","+a+")";}var primary=pick("primary"),secondary=pick("secondary"),highlight=pick("highlight"),success=pick("success"),danger=pick("danger"),warning=pick("warning"),canvas=pick("canvas"),surface=pick("surface");e.style.setProperty("--color-accent",primary);e.style.setProperty("--color-accent-hover",darken(primary,0.14));e.style.setProperty("--color-accent-muted",rgba(highlight,0.22));e.style.setProperty("--color-ring",highlight);e.style.setProperty("--color-info",secondary);e.style.setProperty("--color-info-muted",rgba(secondary,0.2));e.style.setProperty("--color-success",success);e.style.setProperty("--color-success-muted",rgba(success,0.2));e.style.setProperty("--color-danger",danger);e.style.setProperty("--color-danger-hover",darken(danger,0.14));e.style.setProperty("--color-danger-muted",rgba(danger,0.2));e.style.setProperty("--color-warning",warning);e.style.setProperty("--color-warning-muted",rgba(warning,0.2));e.style.setProperty("--color-canvas",canvas);e.style.setProperty("--color-surface",surface);e.style.setProperty("--color-surface-secondary",rgba(highlight,0.08));e.style.setProperty("--color-sidebar",canvas);e.style.setProperty("--color-banner",rgba(highlight,0.1));e.style.setProperty("--shadow-focus","0 0 0 3px "+rgba(highlight,0.4));e.style.setProperty("--button-primary-image","none");e.style.setProperty("--button-primary-image-hover","none");}}}catch(err){}})();`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] =
    React.useState<ResolvedTheme>("light");
  const [preset, setPresetState] = React.useState<Preset>("normal");
  const [customColors, setCustomColorsState] =
    React.useState<CustomColors | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const nextTheme: Theme =
      storedTheme === "light" ||
      storedTheme === "dark" ||
      storedTheme === "system"
        ? storedTheme
        : "system";
    const storedPreset = localStorage.getItem(PRESET_STORAGE_KEY);
    const nextPreset: Preset = isPreset(storedPreset)
      ? storedPreset
      : "normal";
    const nextCustom = parseCustomColors(
      localStorage.getItem(CUSTOM_COLORS_STORAGE_KEY)
    );
    const resolved = resolveTheme(nextTheme);
    setThemeState(nextTheme);
    setResolvedTheme(resolved);
    setPresetState(nextPreset);
    setCustomColorsState(nextCustom);
    applyTheme(resolved);
    applyPreset(nextPreset);
    applyCustomColors(nextCustom);
    setReady(true);
  }, []);

  React.useEffect(() => {
    if (!ready) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme !== "system") return;
      const resolved = getSystemTheme();
      setResolvedTheme(resolved);
      applyTheme(resolved, { animate: true });
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme, ready]);

  const setTheme = React.useCallback((next: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    const resolved = resolveTheme(next);
    setThemeState(next);
    setResolvedTheme(resolved);
    applyTheme(resolved, { animate: true });
  }, []);

  const setPreset = React.useCallback((next: Preset) => {
    localStorage.setItem(PRESET_STORAGE_KEY, next);
    setPresetState(next);
    applyPreset(next, { animate: true });
  }, []);

  const setCustomColors = React.useCallback((next: CustomColors | null) => {
    if (next) {
      localStorage.setItem(CUSTOM_COLORS_STORAGE_KEY, JSON.stringify(next));
    } else {
      localStorage.removeItem(CUSTOM_COLORS_STORAGE_KEY);
    }
    setCustomColorsState(next);
    applyCustomColors(next, { animate: true });
  }, []);

  const setCustomColor = React.useCallback(
    (key: CustomColorKey, value: string) => {
      if (!isHexColor(value)) return;
      setCustomColorsState((prev) => {
        const base = prev ?? DEFAULT_CUSTOM_COLORS;
        const next = { ...base, [key]: value };
        localStorage.setItem(CUSTOM_COLORS_STORAGE_KEY, JSON.stringify(next));
        applyCustomColors(next, { animate: true });
        return next;
      });
    },
    []
  );

  const resetCustomColors = React.useCallback(() => {
    setCustomColors(null);
  }, [setCustomColors]);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      preset,
      setPreset,
      customColors,
      setCustomColors,
      setCustomColor,
      resetCustomColors,
      hasCustomColors: customColors !== null,
    }),
    [
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
      preset,
      setPreset,
      customColors,
      setCustomColors,
      setCustomColor,
      resetCustomColors,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
