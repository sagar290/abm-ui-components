<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Apple Business Admin Console — Agent Rules

## Component reuse rules (STRICT)

1. **Single source of truth:** all UI elements live in `/components/ui`. Pages and features may only COMPOSE these components. Never write raw `<button>`, `<input>`, `<select>`, modal markup or styled `<div>` cards inside a page or feature file.
2. **Every button is the shared `<Button>`.** Variants (primary, secondary, ghost, destructive), sizes, icons, loading and disabled states are handled by props, never by copying the component or adding ad-hoc Tailwind classes on a page.
3. **Before creating anything new, check `/components/ui` and `/components/features`.** If a component exists, import and reuse it. If it almost fits, extend it with a new prop or variant instead of creating a near-duplicate.
4. **Create a new component only if no existing one can cover the need.** When you do: put it in `/components/ui`, give it typed props and variants, export it from `/components/ui/index.ts`, and add it to the `/design-system` page. External apps install this kit from GitHub as `@abm/ui` — see `CONSUMING.md`.
5. **No inline styling and no repeated Tailwind class strings.** Shared styles live in the component (via class-variance-authority) or in design tokens in `tailwind.config.ts` / `app/globals.css`.
6. **Colors, spacing, radius and shadows come only from design tokens** in `styles/tokens.css`. No hard-coded hex values in components or pages.
7. **Naming:** one component per concept (one Modal, one Badge, one Input). Never create variants like CustomButton, NewButton or ButtonV2.
8. **After every screen you add or change, finish with a short "Reuse report":** which existing components were used, which were extended, and which new ones were added (with a reason for each).
9. **If a request would require breaking these rules, stop and ask first.**

## Tech stack

- Next.js App Router, TypeScript strict
- Tailwind CSS design tokens + `dark:` mode
- `cn()` from `lib/utils.ts` (clsx + tailwind-merge)
- class-variance-authority for variants
- Radix UI for dialogs, dropdowns, tabs, tooltips
- lucide-react icons
- Mock data in `/lib/mock-data.ts`

## Folder structure

```
/app                  routes (compose only)
/components/ui        reusable primitives & layout chrome
/components/features  screen-level compositions
/lib                  utils, mock data, store
/types                shared TypeScript types
```
