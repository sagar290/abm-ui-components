"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ArrowLeft, Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Overlay } from "./overlay";
import { Sidebar } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";
import type { ChecklistItem, NavItem, Organization } from "../../types";

export interface AppShellProps {
  navItems: NavItem[];
  organization: Organization;
  organizations: Organization[];
  onOrganizationChange?: (id: string) => void;
  checklist: ChecklistItem[];
  deviceAlertCount?: number;
  listPane?: React.ReactNode;
  children: React.ReactNode;
  /** Show back control on mobile when a detail is open */
  detailOpen?: boolean;
  onBack?: () => void;
  mobileTitle?: string;
  className?: string;
}

export function AppShell({
  navItems,
  organization,
  organizations,
  onOrganizationChange,
  checklist,
  deviceAlertCount,
  listPane,
  children,
  detailOpen,
  onBack,
  mobileTitle = "Business Manager",
  className,
}: AppShellProps) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = React.useState(false);

  const mobilePane: "nav" | "list" | "detail" = navOpen
    ? "nav"
    : detailOpen
      ? "detail"
      : "list";

  return (
    <div className={cn("flex h-dvh w-full overflow-hidden bg-canvas", className)}>
      <div className="hidden w-60 shrink-0 lg:block">
        <Sidebar
          items={navItems}
          activeHref={pathname}
          organization={organization}
          organizations={organizations}
          onOrganizationChange={onOrganizationChange}
          checklist={checklist}
          deviceAlertCount={deviceAlertCount}
        />
      </div>

      {navOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <Overlay onClose={() => setNavOpen(false)} label="Close navigation" />
          <div className="absolute inset-y-0 left-0 w-[min(100%,16rem)] shadow-lg">
            <Sidebar
              items={navItems}
              activeHref={pathname}
              organization={organization}
              organizations={organizations}
              onOrganizationChange={onOrganizationChange}
              checklist={checklist}
              deviceAlertCount={deviceAlertCount}
              onNavigate={() => setNavOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border-subtle bg-surface px-3 lg:hidden">
          {mobilePane === "detail" && onBack ? (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onBack}
              aria-label="Back to list"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            />
          ) : (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setNavOpen((v) => !v)}
              aria-label={navOpen ? "Close menu" : "Open menu"}
              leftIcon={
                navOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />
              }
            />
          )}
          <p className="flex-1 truncate text-sm font-semibold">{mobileTitle}</p>
          <ThemeToggle className="h-8 w-8 shadow-none" />
        </header>

        <div className="flex min-h-0 flex-1">
          {listPane && (
            <div
              className={cn(
                "w-full shrink-0 border-r border-border-subtle md:w-80 lg:w-96",
                detailOpen ? "hidden md:flex md:flex-col" : "flex flex-col"
              )}
            >
              {listPane}
            </div>
          )}
          <div
            className={cn(
              "min-w-0 flex-1",
              listPane && !detailOpen
                ? "hidden md:flex md:flex-col"
                : "flex flex-col"
            )}
          >
            {children}
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-4 right-4 z-30 hidden lg:block">
        <ThemeToggle className="pointer-events-auto" />
      </div>
    </div>
  );
}
