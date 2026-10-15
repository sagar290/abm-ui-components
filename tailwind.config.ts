import type { Config } from "tailwindcss";

/**
 * Design tokens for the Apple Business–style admin console.
 * Consumed via CSS variables in app/globals.css (@theme).
 * Components must use Tailwind token utilities (bg-surface, text-accent, etc.)
 * — never hard-coded hex values.
 */
export const designTokens = {
  colors: {
    // Surfaces
    canvas: { light: "#F5F5F7", dark: "#1C1C1E" },
    surface: { light: "#FFFFFF", dark: "#2C2C2E" },
    "surface-secondary": { light: "#F2F2F7", dark: "#3A3A3C" },
    sidebar: { light: "#E8E8ED", dark: "#161618" },
    "sidebar-hover": { light: "#DEDEE3", dark: "#2C2C2E" },
    "sidebar-active": { light: "#FFFFFF", dark: "#3A3A3C" },

    // Borders & rings
    border: { light: "#D2D2D7", dark: "#48484A" },
    "border-subtle": { light: "#E5E5EA", dark: "#3A3A3C" },
    ring: { light: "#0071E3", dark: "#0A84FF" },

    // Text
    foreground: { light: "#1D1D1F", dark: "#F5F5F7" },
    "foreground-secondary": { light: "#6E6E73", dark: "#98989D" },
    "foreground-muted": { light: "#8E8E93", dark: "#636366" },
    "foreground-inverse": { light: "#FFFFFF", dark: "#1D1D1F" },

    // Accent (primary actions / selected)
    accent: { light: "#0071E3", dark: "#0A84FF" },
    "accent-hover": { light: "#0077ED", dark: "#409CFF" },
    "accent-muted": { light: "#E8F2FC", dark: "#0A84FF33" },

    // Semantic
    danger: { light: "#FF3B30", dark: "#FF453A" },
    "danger-hover": { light: "#E0342B", dark: "#FF6961" },
    "danger-muted": { light: "#FFEBEA", dark: "#FF453A33" },
    warning: { light: "#FF9500", dark: "#FF9F0A" },
    "warning-muted": { light: "#FFF4E5", dark: "#FF9F0A33" },
    success: { light: "#34C759", dark: "#30D158" },
    "success-muted": { light: "#E8F8ED", dark: "#30D15833" },
    info: { light: "#007AFF", dark: "#0A84FF" },
    "info-muted": { light: "#E5F1FF", dark: "#0A84FF33" },

    // Overlay
    overlay: { light: "rgba(0,0,0,0.4)", dark: "rgba(0,0,0,0.6)" },
  },
  radius: {
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "20px",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.04)",
    md: "0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    lg: "0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
    focus: "0 0 0 3px rgba(0,113,227,0.35)",
  },
  fonts: {
    sans: [
      "-apple-system",
      "BlinkMacSystemFont",
      "SF Pro Text",
      "SF Pro Display",
      "Inter",
      "Segoe UI",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ],
  },
} as const;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        "surface-secondary": "var(--color-surface-secondary)",
        sidebar: "var(--color-sidebar)",
        "sidebar-hover": "var(--color-sidebar-hover)",
        "sidebar-active": "var(--color-sidebar-active)",
        border: "var(--color-border)",
        "border-subtle": "var(--color-border-subtle)",
        ring: "var(--color-ring)",
        foreground: "var(--color-foreground)",
        "foreground-secondary": "var(--color-foreground-secondary)",
        "foreground-muted": "var(--color-foreground-muted)",
        "foreground-inverse": "var(--color-foreground-inverse)",
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          muted: "var(--color-accent-muted)",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          hover: "var(--color-danger-hover)",
          muted: "var(--color-danger-muted)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          muted: "var(--color-warning-muted)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          muted: "var(--color-success-muted)",
        },
        info: {
          DEFAULT: "var(--color-info)",
          muted: "var(--color-info-muted)",
        },
        overlay: "var(--color-overlay)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        focus: "var(--shadow-focus)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
      },
    },
  },
};

export default config;
