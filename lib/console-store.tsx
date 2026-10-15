"use client";

import * as React from "react";
import {
  checklistItems as initialChecklist,
  devices as initialDevices,
  organizations,
  users as initialUsers,
} from "@/lib/mock-data";
import type {
  ChecklistItem,
  Device,
  Organization,
  User,
} from "@/types";

interface ConsoleState {
  users: User[];
  devices: Device[];
  configuredSettingIds: string[];
  organizationId: string;
  checklist: ChecklistItem[];
  addUser: (user: User) => void;
  configureSetting: (settingId: string, remediatesIssueId?: string) => void;
  setOrganizationId: (id: string) => void;
  organization: Organization;
  issueCount: number;
}

const ConsoleContext = React.createContext<ConsoleState | null>(null);

export function ConsoleProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = React.useState(initialUsers);
  const [devices, setDevices] = React.useState(initialDevices);
  const [configuredSettingIds, setConfigured] = React.useState<string[]>([]);
  const [organizationId, setOrganizationId] = React.useState(
    organizations[0].id
  );
  const [checklist, setChecklist] = React.useState(initialChecklist);

  const addUser = React.useCallback((user: User) => {
    setUsers((prev) => [user, ...prev]);
    setChecklist((prev) =>
      prev.map((c) => (c.id === "c1" ? { ...c, done: true } : c))
    );
  }, []);

  const configureSetting = React.useCallback(
    (settingId: string, remediatesIssueId?: string) => {
      setConfigured((prev) =>
        prev.includes(settingId) ? prev : [...prev, settingId]
      );
      if (remediatesIssueId) {
        setDevices((prev) =>
          prev.map((d) => {
            const nextIssues = d.issues.filter(
              (i) => i.id !== remediatesIssueId
            );
            if (nextIssues.length === d.issues.length) return d;
            const next = { ...d, issues: nextIssues };
            if (remediatesIssueId === "issue-firewall") next.firewall = "ok";
            if (remediatesIssueId === "issue-filevault") next.fileVault = "ok";
            if (nextIssues.length === 0 && next.status === "Needs Attention") {
              next.status = "Online";
            }
            return next;
          })
        );
      }
      setChecklist((prev) =>
        prev.map((c) => (c.id === "c3" ? { ...c, done: true } : c))
      );
    },
    []
  );

  const organization =
    organizations.find((o) => o.id === organizationId) ?? organizations[0];

  const issueCount = devices.reduce((sum, d) => sum + d.issues.length, 0);

  const value: ConsoleState = {
    users,
    devices,
    configuredSettingIds,
    organizationId,
    checklist,
    addUser,
    configureSetting,
    setOrganizationId,
    organization,
    issueCount,
  };

  return (
    <ConsoleContext.Provider value={value}>{children}</ConsoleContext.Provider>
  );
}

export function useConsole() {
  const ctx = React.useContext(ConsoleContext);
  if (!ctx) {
    throw new Error("useConsole must be used within ConsoleProvider");
  }
  return ctx;
}
