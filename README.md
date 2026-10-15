# Business Manager Admin Console (POC)

Reusable admin-console UI kit and demo app inspired by Apple Business Manager’s device and user management UX.

## Screenshots

### Users

![Users — light mode](docs/screenshots/users-light.png)

![Users — dark mode](docs/screenshots/users-dark.png)

### Devices

![Devices — light mode](docs/screenshots/devices-light.png)

### Settings

![Settings — light mode](docs/screenshots/settings-light.png)

![Settings — dark mode](docs/screenshots/settings-dark.png)

### Apps

![Apps — light mode](docs/screenshots/apps-light.png)

## Stack

- **Next.js** (App Router) + TypeScript (strict)
- **Tailwind CSS v4** design tokens (`app/globals.css` + `tailwind.config.ts`)
- **Radix UI** (dialog, select, tabs, checkbox, toast, tooltip, popover)
- **lucide-react**, **class-variance-authority**, **clsx**, **tailwind-merge** (`cn()` in `lib/utils.ts`)
- Mock data only — no backend

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/users`).

| Script        | Description              |
|---------------|--------------------------|
| `npm run dev` | Development server       |
| `npm run build` | Production build       |
| `npm run start` | Start production server|
| `npm run lint`  | ESLint                 |

## Architecture

```
/app                    Routes (compose only — no raw controls)
/components/ui          Reusable primitives & shell chrome
/components/features    Screen-level compositions (Users, Devices, Settings)
/lib                    utils, mock-data, console-store
/types                  Shared TypeScript types
```

**Component reuse rules** are enforced in `AGENTS.md`. Pages and features may only compose `/components/ui` components.

### Three-pane shell

`AppShell` + `Sidebar` + `ListPane` + `DetailPane`:

1. Left nav (with alert badges, Get Started checklist, org switcher)
2. Middle searchable list
3. Right detail (toolbar, header, tabs, sections)

On small screens, panes collapse with a menu / back button.

### Client state

`ConsoleProvider` (`lib/console-store.tsx`) holds users, devices, configured settings, checklist, and org. Adding a setting that remediates an issue clears matching device issues (e.g. Firewall → device “Firewall Off”).

## Key routes

| Route | Description |
|-------|-------------|
| `/users`, `/users/[id]` | User list, add account modal, enroll devices |
| `/devices`, `/devices/[id]` | Device list with issue badges, erase confirm, status Fix links |
| `/settings` | Settings catalog + configured list; remediates device issues |
| `/design-system` | Living catalog of every UI component/variant |
| Other nav items | Placeholder “coming soon” pages |

## How to add a new resource page (e.g. Groups)

1. **Types & mock data** — add `Group` to `types/index.ts` and seed data in `lib/mock-data.ts`. Add a nav item if needed.
2. **Feature console** — create `components/features/groups-console.tsx` that composes only UI kit pieces:
   - `ConsoleLayout` + `ListPane` / `ListItem` for the middle pane
   - `DetailPane` + `Tabs` / `SectionCard` / `EmptyState` for detail
   - `Dialog` + `FormField` + `Input` / `Select` for create/edit
   - `ConfirmDialog` for destructive actions
3. **Routes** — add `app/groups/page.tsx` and `app/groups/[id]/page.tsx` that render the feature.
4. **Do not** add raw `<button>` / `<input>` / card markup in the feature. If something is missing, extend an existing UI component or add one to `/components/ui`, export it from `index.ts`, and document it on `/design-system`.
5. Finish with a **Reuse report** (used / extended / new).

## Design tokens

Colors, radius, shadows, and fonts live as CSS variables in `app/globals.css` and are documented in `tailwind.config.ts`. Components use token utilities (`bg-surface`, `text-accent`, `rounded-xl`, `shadow-md`) — never hard-coded hex in UI code. Dark mode is class-based (`html.dark`) with CSS variable tokens. Preference is stored in `localStorage` (`abm-theme`: `light` | `dark` | `system`) and applied before paint to avoid a flash. Toggle from the floating control on desktop, the mobile header, or the segmented control on `/design-system`.

## Accessibility

- Keyboard focus rings via `:focus-visible` and Radix primitives
- Dialogs trap focus and close on ESC
- Destructive actions are visually separated and confirmed
- Badges and toolbar actions expose accessible names
