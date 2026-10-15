"use client";

import { useRouter } from "next/navigation";
import { AppShell } from "@/components/ui";
import { organizations, navItems } from "@/lib/mock-data";
import { useConsole } from "@/lib/console-store";

interface ConsoleLayoutProps {
  listPane?: React.ReactNode;
  children: React.ReactNode;
  detailOpen?: boolean;
  backHref?: string;
  mobileTitle?: string;
}

export function ConsoleLayout({
  listPane,
  children,
  detailOpen,
  backHref,
  mobileTitle,
}: ConsoleLayoutProps) {
  const { organization, checklist, issueCount, setOrganizationId } =
    useConsole();
  const router = useRouter();

  return (
    <AppShell
      navItems={navItems}
      organization={organization}
      organizations={organizations}
      onOrganizationChange={setOrganizationId}
      checklist={checklist}
      deviceAlertCount={issueCount}
      listPane={listPane}
      detailOpen={detailOpen}
      onBack={backHref ? () => router.push(backHref) : undefined}
      mobileTitle={mobileTitle}
    >
      {children}
    </AppShell>
  );
}
