"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";
export type Preset = "normal" | "glossy" | "colorful";

const THEME_STORAGE_KEY = "abm-theme";
const PRESET_STORAGE_KEY = "abm-preset";

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

const PRESET_IDS: readonly Preset[] = ["normal", "glossy", "colorful"];

function isPreset(value: string | null): value is Preset {
  return value !== null && (PRESET_IDS as readonly string[]).includes(value);
}

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  preset: Preset;
  setPreset: (preset: Preset) => void;
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
  // Double-rAF so the browser applies the transition class before token swap.
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

/** Inline bootstrap — run before paint to avoid a light / wrong-preset flash. */
export const themeBootstrapScript = `(function(){try{var tk=${JSON.stringify(THEME_STORAGE_KEY)};var pk=${JSON.stringify(PRESET_STORAGE_KEY)};var t=localStorage.getItem(tk)||"system";var p=localStorage.getItem(pk)||"normal";if(p!=="normal"&&p!=="glossy"&&p!=="colorful")p="normal";var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var r=t==="dark"||(t!=="light"&&d);var e=document.documentElement;e.classList.toggle("dark",r);e.style.colorScheme=r?"dark":"light";e.setAttribute("data-preset",p);}catch(e){}})();`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] =
    React.useState<ResolvedTheme>("light");
  const [preset, setPresetState] = React.useState<Preset>("normal");
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
    const resolved = resolveTheme(nextTheme);
    setThemeState(nextTheme);
    setResolvedTheme(resolved);
    setPresetState(nextPreset);
    applyTheme(resolved);
    applyPreset(nextPreset);
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
    }),
    [theme, resolvedTheme, setTheme, toggleTheme, preset, setPreset]
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
