"use client";

import Link from "next/link";
import {
  Activity,
  AppWindow,
  CheckSquare2,
  ChevronsUpDown,
  CreditCard,
  FolderOpen,
  History,
  LayoutGrid,
  LogIn,
  MapPin,
  MonitorSmartphone,
  Settings,
  Shield,
  Users,
  UsersRound,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Avatar } from "./avatar";
import { BrandMark } from "./brand-mark";
import { Button } from "./button";
import { Select } from "./select";
import { SidebarItem, type SidebarSubItem } from "./sidebar-item";
import type {
  ChecklistItem,
  NavGroup,
  NavItem,
  NavSubItem,
  Organization,
} from "../../types";

const iconById: Record<string, React.ReactNode> = {
  login: <LogIn className="h-4 w-4" strokeWidth={1.75} />,
  subscription: <CreditCard className="h-4 w-4" strokeWidth={1.75} />,
  activity: <Activity className="h-4 w-4" strokeWidth={1.75} />,
  locations: <MapPin className="h-4 w-4" strokeWidth={1.75} />,
  users: <Users className="h-4 w-4" strokeWidth={1.75} />,
  "user-groups": <UsersRound className="h-4 w-4" strokeWidth={1.75} />,
  access: <Shield className="h-4 w-4" strokeWidth={1.75} />,
  devices: <MonitorSmartphone className="h-4 w-4" strokeWidth={1.75} />,
  "assignment-history": <History className="h-4 w-4" strokeWidth={1.75} />,
  collections: <FolderOpen className="h-4 w-4" strokeWidth={1.75} />,
  settings: <Settings className="h-4 w-4" strokeWidth={1.75} />,
  apps: <AppWindow className="h-4 w-4" strokeWidth={1.75} />,
};

const groupOrder: NavGroup[] = [
  "deployment",
  "accounts",
  "assets",
  "content",
];

export interface SidebarProps {
  items: NavItem[];
  activeHref: string;
  organization: Organization;
  organizations?: Organization[];
  onOrganizationChange?: (id: string) => void;
  checklist: ChecklistItem[];
  deviceAlertCount?: number;
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({
  items,
  activeHref,
  organization,
  organizations = [],
  onOrganizationChange,
  checklist,
  deviceAlertCount,
  className,
  onNavigate,
}: SidebarProps) {
  const doneCount = checklist.filter((c) => c.done).length;
  const progress = checklist.length
    ? Math.round((doneCount / checklist.length) * 100)
    : 0;

  const grouped = groupOrder
    .map((group) => ({
      group,
      items: items.filter((i) => i.group === group),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <nav
      data-chrome="sidebar"
      className={cn(
        "flex h-full min-h-0 w-full flex-col bg-sidebar border-r border-border-subtle",
        className
      )}
      aria-label="Primary"
    >
      <div className="px-4 py-4">
        <BrandMark />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
        {grouped.map((section, idx) => (
          <div key={section.group} className={cn(idx > 0 && "mt-3")}>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const alert =
                  item.id === "devices" && deviceAlertCount !== undefined
                    ? deviceAlertCount
                    : item.alertCount;
                return (
                  <li key={item.id}>
                    <SidebarItem
                      href={item.href}
                      label={item.label}
                      icon={
                        iconById[item.id] ?? (
                          <LayoutGrid className="h-4 w-4" strokeWidth={1.75} />
                        )
                      }
                      active={isNavActive(activeHref, item.href)}
                      alertCount={alert}
                      onClick={onNavigate}
                      items={mapSubItems(item.children, activeHref, onNavigate)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="shrink-0 space-y-2 border-t border-border-subtle p-3">
        <Button
          variant="ghost"
          asChild
          className="h-auto w-full justify-start gap-2.5 rounded-lg px-2 py-2"
        >
          <Link href="/settings" onClick={onNavigate}>
            <span
              className="relative flex h-5 w-5 shrink-0 items-center justify-center"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 -rotate-90">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  fill="none"
                  className="stroke-border"
                  strokeWidth="2.5"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  fill="none"
                  className="stroke-accent"
                  strokeWidth="2.5"
                  strokeDasharray={`${(progress / 100) * 56.5} 56.5`}
                  strokeLinecap="round"
                />
              </svg>
              <CheckSquare2 className="absolute h-2.5 w-2.5 text-accent" />
            </span>
            <span className="text-[13px] font-medium text-foreground">
              Get Started
            </span>
          </Link>
        </Button>

        <div className="flex items-center gap-2 rounded-lg px-1 py-1">
          <Avatar initials="IT" size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-foreground">
              IT
            </p>
            <Select
              id="org-switcher"
              aria-label="Organization"
              value={organization.id}
              onValueChange={(id) => onOrganizationChange?.(id)}
              options={(organizations.length
                ? organizations
                : [organization]
              ).map((org) => ({ value: org.id, label: org.name }))}
              className="h-7 border-0 bg-transparent px-0 text-xs text-foreground-secondary shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <ChevronsUpDown
            className="h-3.5 w-3.5 shrink-0 text-foreground-muted"
            aria-hidden
          />
        </div>
      </div>
    </nav>
  );
}

function isNavActive(activeHref: string, href: string) {
  return activeHref === href || activeHref.startsWith(`${href}/`);
}

function mapSubItems(
  children: NavSubItem[] | undefined,
  activeHref: string,
  onNavigate?: () => void
): SidebarSubItem[] | undefined {
  if (!children?.length) return undefined;
  return children.map((child) => ({
    href: child.href,
    label: child.label,
    active: isNavActive(activeHref, child.href),
    alertCount: child.alertCount,
    onClick: onNavigate,
    items: mapSubItems(child.children, activeHref, onNavigate),
  }));
}
