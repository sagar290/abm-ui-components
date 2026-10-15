"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import {
  KeyRound,
  Pencil,
  Smartphone,
  UserCog,
} from "lucide-react";
import {
  ActionMenu,
  Avatar,
  Badge,
  DefinitionList,
  DetailPane,
  DetailToolbar,
  EmptyState,
  ListItem,
  ListPane,
  SectionCard,
  Tabs,
  TabPanel,
  ToolbarAction,
  useToast,
} from "@/components/ui";
import { useConsole } from "@/lib/console-store";
import { AddUserDialog } from "./add-user-dialog";
import { EnrollDevicesDialog } from "./enroll-devices-dialog";
import { ConsoleLayout } from "./console-layout";

function statusVariant(
  status: string
): "success" | "info" | "neutral" | "error" {
  if (status === "Active") return "success";
  if (status === "Invited") return "info";
  if (status === "Disabled") return "error";
  return "neutral";
}

function UsersConsoleBody() {
  const { users } = useConsole();
  const params = useParams<{ id?: string }>();
  const { toast } = useToast();
  const selectedId = params?.id;
  const selected = users.find((u) => u.id === selectedId);

  const [search, setSearch] = React.useState("");
  const [addOpen, setAddOpen] = React.useState(false);
  const [enrollOpen, setEnrollOpen] = React.useState(false);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      u.firstName.toLowerCase().includes(q) ||
      u.lastName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      `${u.managedAppleId}@${u.domain}`.toLowerCase().includes(q)
    );
  });

  const listPane = (
    <ListPane
      title="Your Users"
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search"
      onFilter={() =>
        toast({ title: "Filters", description: "Demo filter panel." })
      }
      onSort={() =>
        toast({ title: "Sort", description: "Sorted by name (demo)." })
      }
      onAdd={() => setAddOpen(true)}
      addLabel="Add"
    >
      {filtered.length === 0 ? (
        <EmptyState message="No users match your search." density="compact" />
      ) : (
        filtered.map((u) => (
          <ListItem
            key={u.id}
            href={`/users/${u.id}`}
            selected={u.id === selectedId}
            title={`${u.firstName} ${u.lastName}`}
            subtitle={`${u.role} · ${u.location}`}
            leading={<Avatar initials={u.avatarInitials} size="sm" />}
          />
        ))
      )}
    </ListPane>
  );

  return (
    <ConsoleLayout
      listPane={listPane}
      detailOpen={Boolean(selectedId)}
      backHref="/users"
      mobileTitle={
        selected ? `${selected.firstName} ${selected.lastName}` : "Users"
      }
    >
      <DetailPane
        empty={
          !selected ? (
            <EmptyState
              message="Select a user to view details, or add a new account."
            />
          ) : undefined
        }
        toolbar={
          selected ? (
            <DetailToolbar
              moreSlot={
                <ActionMenu
                  label="More user actions"
                  items={[
                    {
                      id: "edit-info",
                      label: "Edit Info",
                      icon: <UserCog className="h-4 w-4" />,
                      onSelect: () =>
                        toast({
                          title: "Edit Info",
                          description: "Edit form would open (demo).",
                        }),
                    },
                    {
                      id: "deactivate",
                      label: "Deactivate User",
                      destructive: true,
                      onSelect: () =>
                        toast({
                          title: "Deactivate",
                          description: "User would be deactivated (demo).",
                          variant: "warning",
                        }),
                    },
                  ]}
                />
              }
            >
              <ToolbarAction
                label="Edit"
                icon={<Pencil className="h-4 w-4" />}
                onClick={() =>
                  toast({
                    title: "Edit",
                    description: "User edit sheet would open (demo).",
                  })
                }
              />
              <ToolbarAction
                label="Enroll Devices"
                icon={<Smartphone className="h-4 w-4" />}
                onClick={() => setEnrollOpen(true)}
              />
              <ToolbarAction
                label="Create Sign-In"
                icon={<KeyRound className="h-4 w-4" />}
                onClick={() =>
                  toast({
                    title: "Create Sign-In",
                    description: "Sign-in token generated (demo).",
                    variant: "success",
                  })
                }
              />
            </DetailToolbar>
          ) : undefined
        }
        header={
          selected ? (
            <div className="flex flex-wrap items-center gap-4">
              <Avatar initials={selected.avatarInitials} size="lg" />
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold text-foreground">
                    {selected.firstName}{" "}
                    {selected.middleName ? `${selected.middleName} ` : ""}
                    {selected.lastName}
                  </h1>
                  <Badge variant={statusVariant(selected.status)} size="sm">
                    {selected.status}
                  </Badge>
                </div>
                <p className="text-sm text-foreground-secondary">
                  {selected.managedAppleId}@{selected.domain} · {selected.role}
                </p>
              </div>
            </div>
          ) : undefined
        }
        tabs={
          selected ? (
            <Tabs
              variant="pane"
              items={[
                { value: "overview", label: "Overview" },
                { value: "devices", label: "Devices" },
                { value: "info", label: "Info" },
              ]}
              defaultValue="overview"
            >
              <TabPanel value="overview">
                <div className="space-y-4">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <SectionCard title="Account">
                      <DefinitionList
                        items={[
                          {
                            label: "Email",
                            value: selected.email,
                            copyValue: selected.email,
                          },
                          { label: "Location", value: selected.location },
                          { label: "Role", value: selected.role },
                        ]}
                      />
                    </SectionCard>
                    <SectionCard title="Organization">
                      <DefinitionList
                        items={[
                          {
                            label: "Person number",
                            value: selected.personNumber ?? "—",
                          },
                          {
                            label: "Cost center",
                            value: selected.costCenter ?? "—",
                          },
                          {
                            label: "Division",
                            value: selected.division ?? "—",
                          },
                          {
                            label: "Department",
                            value: selected.department ?? "—",
                          },
                        ]}
                      />
                    </SectionCard>
                  </div>

                  <SectionCard
                    title="Devices"
                    density="compact"
                    empty={
                      <EmptyState
                        density="compact"
                        message="No devices assigned."
                      />
                    }
                  />
                  <SectionCard
                    title="User Groups"
                    density="compact"
                    empty={
                      <EmptyState
                        density="compact"
                        message="No User Groups"
                      />
                    }
                  />
                  <SectionCard
                    title="Settings"
                    density="compact"
                    href="/settings"
                    empty={
                      <EmptyState
                        density="compact"
                        message="No Settings Added"
                        linkHref="/settings"
                        linkLabel="Go to Settings"
                      />
                    }
                  />
                  <SectionCard
                    title="Activity"
                    density="compact"
                    empty={
                      <EmptyState
                        density="compact"
                        message="No recent activity."
                      />
                    }
                  />
                </div>
              </TabPanel>
              <TabPanel value="devices">
                <SectionCard
                  title="Assigned devices"
                  density="compact"
                  empty={
                    <EmptyState
                      density="compact"
                      message="No devices assigned yet."
                    />
                  }
                />
                <div className="mt-3">
                  <ToolbarAction
                    label="Enroll Devices"
                    icon={<Smartphone className="h-4 w-4" />}
                    onClick={() => setEnrollOpen(true)}
                  />
                </div>
              </TabPanel>
              <TabPanel value="info">
                <SectionCard title="Managed Apple ID">
                  <DefinitionList
                    items={[
                      {
                        label: "Managed Apple ID",
                        value: `${selected.managedAppleId}@${selected.domain}`,
                        copyValue: `${selected.managedAppleId}@${selected.domain}`,
                      },
                      { label: "Status", value: selected.status },
                    ]}
                  />
                </SectionCard>
              </TabPanel>
            </Tabs>
          ) : undefined
        }
      />

      <AddUserDialog open={addOpen} onOpenChange={setAddOpen} />
      {selected && (
        <EnrollDevicesDialog
          open={enrollOpen}
          onOpenChange={setEnrollOpen}
          userName={`${selected.firstName} ${selected.lastName}`}
        />
      )}
    </ConsoleLayout>
  );
}

export function UsersConsole() {
  return <UsersConsoleBody />;
}
