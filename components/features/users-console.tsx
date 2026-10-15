"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import {
  Avatar,
  Badge,
  Button,
  DetailPane,
  EmptyState,
  ListItem,
  ListPane,
  SectionCard,
  Tabs,
  TabPanel,
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
        <EmptyState message="No users match your search." />
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
              <div className="ml-auto">
                <Button variant="primary" onClick={() => setEnrollOpen(true)}>
                  Enroll devices
                </Button>
              </div>
            </div>
          ) : undefined
        }
        tabs={
          selected ? (
            <Tabs
              items={[
                { value: "overview", label: "Overview" },
                { value: "devices", label: "Devices" },
                { value: "info", label: "Info" },
              ]}
              defaultValue="overview"
            >
              <TabPanel value="overview">
                <div className="grid gap-4 lg:grid-cols-2">
                  <SectionCard title="Account">
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-foreground-secondary">Email</dt>
                        <dd>{selected.email}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-foreground-secondary">Location</dt>
                        <dd>{selected.location}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-foreground-secondary">Role</dt>
                        <dd>{selected.role}</dd>
                      </div>
                    </dl>
                  </SectionCard>
                  <SectionCard title="Organization">
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-foreground-secondary">
                          Person number
                        </dt>
                        <dd>{selected.personNumber ?? "—"}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-foreground-secondary">
                          Cost center
                        </dt>
                        <dd>{selected.costCenter ?? "—"}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-foreground-secondary">Division</dt>
                        <dd>{selected.division ?? "—"}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-foreground-secondary">
                          Department
                        </dt>
                        <dd>{selected.department ?? "—"}</dd>
                      </div>
                    </dl>
                  </SectionCard>
                </div>
              </TabPanel>
              <TabPanel value="devices">
                <SectionCard title="Assigned devices">
                  <EmptyState message="No devices assigned yet." />
                </SectionCard>
                <div className="mt-3">
                  <Button
                    variant="secondary"
                    onClick={() => setEnrollOpen(true)}
                  >
                    Enroll devices
                  </Button>
                </div>
              </TabPanel>
              <TabPanel value="info">
                <SectionCard title="Managed Apple ID">
                  <p className="text-sm text-foreground-secondary">
                    {selected.managedAppleId}@{selected.domain}
                  </p>
                </SectionCard>
              </TabPanel>
            </Tabs>
          ) : undefined
        }
      >
        {null}
      </DetailPane>

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
