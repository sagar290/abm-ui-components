# Consuming `@abm/ui` from GitHub

This kit is maintained **only on GitHub** — no private npm registry and no always-on design-system server. Install a tagged commit; upgrade by bumping the tag.

**Repository:** [trainsprint/ui-components](https://github.com/trainsprint/ui-components)

## Install (git dependency)

```bash
npm install git+https://github.com/trainsprint/ui-components.git#1.1.0
```

This repo already versions with **semver git tags** (`1.0.0`, `1.1.0`, …). Pin the tag you want.

Or in `package.json`:

```json
{
  "dependencies": {
    "@abm/ui": "git+https://github.com/trainsprint/ui-components.git#1.1.0"
  }
}
```

SSH alternative:

```json
"@abm/ui": "git+ssh://git@github.com/trainsprint/ui-components.git#1.1.0"
```

### Upgrade

1. Kit maintainers cut a new semver tag (`1.2.0`, …) on this repo.
2. Consumers change the `#1.x.x` pin and run `npm install`.

### Optional: GitHub Packages

If you later prefer `npm install @org/ui` semver installs, publish the same package to **GitHub Packages** (`npm.pkg.github.com`). Still no server you operate. Git tags remain the default.

## Peer stack

Your app must provide:

| Peer | Notes |
|------|--------|
| `react` / `react-dom` | ^19 |
| `next` | ≥15 (App Router; used by `Link` in a few components) |
| `tailwindcss` | ^4 |

Radix, CVA, `clsx`, `tailwind-merge`, and `lucide-react` install with the kit.

## Wire-up in a Next.js app

### 1. Transpile the package

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@abm/ui"],
};

export default nextConfig;
```

### 2. Import tokens + scan kit sources (Tailwind v4)

```css
/* app/globals.css */
@import "tailwindcss";
@import "@abm/ui/styles.css";

/* Ensure utilities used inside the kit are generated */
@source "../node_modules/@abm/ui/components";
```

### 3. Theme + toast providers

```tsx
// app/layout.tsx
import {
  ThemeProvider,
  ToastProvider,
  themeBootstrapScript,
} from "@abm/ui";
import "@abm/ui/styles.css"; // if not already via globals
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 4. Compose screens — never fork components

```tsx
import { Button, SectionCard, DefinitionList, EmptyState } from "@abm/ui";
```

Copy the reuse rules from [`AGENTS.md`](./AGENTS.md) into the consuming repo (or point Cursor rules at them). Pages and features may **only compose** kit components.

## Package exports

| Import | Contents |
|--------|----------|
| `@abm/ui` | All UI primitives + `ThemeProvider` / `useTheme` / `cn` |
| `@abm/ui/styles.css` | Design tokens (`styles/tokens.css`) |
| `@abm/ui/theme` | Theme helpers only |
| `@abm/ui/utils` | `cn()` |
| `@abm/ui/types` | Shared TypeScript types used by shell props |

## Design catalog (no server required)

| How | Where |
|-----|--------|
| In-repo | [`/design-system`](./app/design-system/page.tsx) — review in PRs |
| Local | `npm run dev` → http://localhost:3000/design-system |
| Optional Pages | Push a semver tag (`*.*.*`) or run **Deploy design catalog to GitHub Pages**; enable Pages → Source = GitHub Actions. URL: `https://trainsprint.github.io/ui-components/design-system/` |

You do **not** need a separate Storybook host.

## Principle checklist (UI PRs)

Use this in the kit repo **and** in every consuming app:

- [ ] Change lives in `@abm/ui` / this kit (or tokens), not as a page-level one-off
- [ ] Prefer a new prop/variant on an existing component over a near-duplicate
- [ ] New/extended components are exported from `components/ui/index.ts`
- [ ] Catalog updated on `/design-system`
- [ ] No raw `<button>` / `<input>` / `<select>` / ad-hoc card markup in features
- [ ] No hard-coded hex; use token utilities (`bg-surface`, `text-accent`, …)
- [ ] Reuse report: **used** / **extended** / **added** (+ why)

## Releasing a new kit version (maintainers)

```bash
# After merging kit changes to main (follow existing 1.0.0, 1.1.0, … scheme):
git tag -a 1.2.0 -m "1.2.0: short summary"
git push origin 1.2.0   # also triggers optional Pages deploy
```

Announce the tag in consumer apps and bump their `#1.x.x` pin.

## What not to do

- Do not copy `components/ui` into another repo (drift).
- Do not stand up Verdaccio / a private registry just for this kit.
- Do not create `CustomButton` / `ButtonV2` — extend `Button`.
