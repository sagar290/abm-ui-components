"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import {
  Eraser,
  Info,
  Lock,
  LogOut,
  MonitorSmartphone,
  RefreshCw,
} from "lucide-react";
import {
  ActionMenu,
  Badge,
  ConfirmDialog,
  DefinitionList,
  DetailPane,
  DetailToolbar,
  EmptyState,
  IconWell,
  InlineAlert,
  ListItem,
  ListPane,
  ProgressBar,
  SectionCard,
  StatusItem,
  Tabs,
  TabPanel,
  ToolbarAction,
  useToast,
} from "@/components/ui";
import { useConsole } from "@/lib/console-store";
import { ConsoleLayout } from "./console-layout";
import type { Device } from "@/types";

function deviceStatusVariant(
  status: Device["status"]
): "success" | "warning" | "error" | "neutral" {
  if (status === "Online") return "success";
  if (status === "Needs Attention") return "error";
  if (status === "Offline") return "neutral";
  return "neutral";
}

function DevicesConsoleBody() {
  const { devices } = useConsole();
  const params = useParams<{ id?: string }>();
  const { toast } = useToast();
  const selectedId = params?.id;
  const selected = devices.find((d) => d.id === selectedId);

  const [search, setSearch] = React.useState("");
  const [eraseOpen, setEraseOpen] = React.useState(false);

  const filtered = devices.filter((d) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      d.name.toLowerCase().includes(q) ||
      d.model.toLowerCase().includes(q) ||
      d.serialNumber.toLowerCase().includes(q)
    );
  });

  const listPane = (
    <ListPane
      title="Your Devices"
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search"
      onFilter={() =>
        toast({ title: "Filters", description: "Demo filter panel." })
      }
      onSort={() =>
        toast({ title: "Sort", description: "Sorted by last seen (demo)." })
      }
      onAdd={() =>
        toast({
          title: "Add device",
          description: "Use a user profile to enroll devices.",
        })
      }
      addLabel="Add"
    >
      {filtered.length === 0 ? (
        <EmptyState message="No devices match your search." density="compact" />
      ) : (
        filtered.map((d) => (
          <ListItem
            key={d.id}
            href={`/devices/${d.id}`}
            selected={d.id === selectedId}
            title={d.name}
            subtitle={d.model}
            statusLabel={
              d.issues.length > 0 ? `${d.issues.length}` : d.status
            }
            statusVariant={
              d.issues.length > 0 ? "error" : deviceStatusVariant(d.status)
            }
            leading={
              <IconWell size="sm">
                <MonitorSmartphone className="h-4 w-4" />
              </IconWell>
            }
          />
        ))
      )}
    </ListPane>
  );

  return (
    <ConsoleLayout
      listPane={listPane}
      detailOpen={Boolean(selectedId)}
      backHref="/devices"
      mobileTitle={selected?.name ?? "Devices"}
    >
      <DetailPane
        empty={
          !selected ? (
            <EmptyState message="Select a device to view details and remediate issues." />
          ) : undefined
        }
        toolbar={
          selected ? (
            <DetailToolbar
              moreSlot={
                <ActionMenu
                  label="More device actions"
                  items={[
                    {
                      id: "refresh",
                      label: "Refresh Inventory",
                      icon: <RefreshCw className="h-4 w-4" />,
                      onSelect: () =>
                        toast({
                          title: "Refreshing",
                          description: "Inventory refresh queued (demo).",
                        }),
                    },
                    {
                      id: "about",
                      label: "About This Device",
                      icon: <Info className="h-4 w-4" />,
                      onSelect: () =>
                        toast({
                          title: selected.name,
                          description: selected.serialNumber,
                        }),
                    },
                  ]}
                />
              }
              destructiveSlot={
                <ToolbarAction
                  label="Erase"
                  destructive
                  icon={<Eraser className="h-4 w-4" />}
                  onClick={() => setEraseOpen(true)}
                />
              }
            >
              <ToolbarAction
                label="Sign Out User"
                icon={<LogOut className="h-4 w-4" />}
                onClick={() =>
                  toast({
                    title: "Signed out",
                    description: "User session ended on device (demo).",
                  })
                }
              />
              <ToolbarAction
                label="Lock Device"
                icon={<Lock className="h-4 w-4" />}
                onClick={() =>
                  toast({
                    title: "Device locked",
                    description: "Lock command sent (demo).",
                  })
                }
              />
            </DetailToolbar>
          ) : undefined
        }
        header={
          selected ? (
            <div className="flex flex-wrap items-center gap-4">
              <IconWell size="lg" label="Device">
                <MonitorSmartphone className="h-7 w-7" />
              </IconWell>
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold">{selected.name}</h1>
                  <Badge
                    variant={deviceStatusVariant(selected.status)}
                    size="sm"
                  >
                    {selected.status}
                  </Badge>
                  {selected.issues.length > 0 && (
                    <Badge variant="error" size="sm">
                      {selected.issues.length} issue
                      {selected.issues.length > 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-foreground-secondary">
                  {selected.model} · {selected.osVersion}
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
                { value: "details", label: "Details" },
                { value: "apps", label: "Apps" },
                { value: "settings", label: "Settings" },
              ]}
              defaultValue="overview"
            >
              <TabPanel value="overview">
                <div className="space-y-4">
                  {selected.issues.length > 0 && (
                    <InlineAlert
                      tone="warning"
                      title={`${selected.issues.length} issue${selected.issues.length > 1 ? "s" : ""} need attention`}
                    >
                      Review status below and apply recommended settings.
                    </InlineAlert>
                  )}

                  <SectionCard title="Details">
                    <DefinitionList
                      layout="grid"
                      items={[
                        {
                          label: "Serial",
                          value: selected.serialNumber,
                          copyValue: selected.serialNumber,
                        },
                        {
                          label: "Assigned user",
                          value: selected.assignedUserName ?? "Unassigned",
                        },
                        { label: "Platform", value: selected.platform },
                        { label: "OS", value: selected.osVersion },
                      ]}
                    />
                  </SectionCard>

                  <SectionCard title="Status">
                    <div className="space-y-2">
                      <StatusItem
                        label="Last Seen"
                        value={selected.lastSeen}
                        tone="ok"
                      />
                      <StatusItem
                        label="Firewall"
                        value={
                          selected.firewall === "ok"
                            ? "On"
                            : selected.firewall === "error"
                              ? "Off"
                              : "Check required"
                        }
                        tone={selected.firewall}
                        fixHref={
                          selected.firewall !== "ok"
                            ? "/settings?highlight=set-firewall"
                            : undefined
                        }
                      />
                      <StatusItem
                        label="FileVault"
                        value={
                          selected.fileVault === "ok"
                            ? "On"
                            : selected.fileVault === "error"
                              ? "Off"
                              : "Not enforced"
                        }
                        tone={selected.fileVault}
                        fixHref={
                          selected.fileVault !== "ok"
                            ? "/settings?highlight=set-filevault"
                            : undefined
                        }
                      />
                    </div>
                  </SectionCard>

                  <SectionCard
                    title="Assigned Apps"
                    href="/apps"
                    linkLabel="Manage"
                    density="compact"
                    empty={
                      <EmptyState
                        density="compact"
                        message="No apps assigned to this device."
                        linkHref="/apps"
                        linkLabel="Go to Apps"
                      />
                    }
                  />

                  <SectionCard
                    title="Assigned Settings"
                    href="/settings"
                    linkLabel="Manage"
                    density="compact"
                    empty={
                      <EmptyState
                        density="compact"
                        message="No settings assigned yet."
                        linkHref="/settings"
                        linkLabel="Go to Settings"
                      />
                    }
                  />

                  <SectionCard title="Device Storage">
                    <ProgressBar
                      value={selected.storage.usedGb}
                      max={selected.storage.totalGb}
                      label="Used storage"
                    />
                  </SectionCard>
                </div>
              </TabPanel>
              <TabPanel value="details">
                <SectionCard title="Hardware">
                  <DefinitionList
                    items={[
                      { label: "Model", value: selected.model },
                      {
                        label: "Serial",
                        value: selected.serialNumber,
                        copyValue: selected.serialNumber,
                      },
                      { label: "Platform", value: selected.platform },
                      { label: "OS version", value: selected.osVersion },
                    ]}
                  />
                </SectionCard>
              </TabPanel>
              <TabPanel value="apps">
                <SectionCard
                  title="Apps"
                  density="compact"
                  empty={
                    <EmptyState
                      density="compact"
                      message="No apps assigned."
                      linkHref="/apps"
                      linkLabel="Go to Apps"
                    />
                  }
                />
              </TabPanel>
              <TabPanel value="settings">
                <SectionCard
                  title="Settings"
                  density="compact"
                  empty={
                    <EmptyState
                      density="compact"
                      message="No settings assigned."
                      linkHref="/settings"
                      linkLabel="Go to Settings"
                    />
                  }
                />
              </TabPanel>
            </Tabs>
          ) : undefined
        }
      />

      <ConfirmDialog
        open={eraseOpen}
        onOpenChange={setEraseOpen}
        title="Erase this device?"
        description="All content and settings will be erased. This cannot be undone."
        confirmLabel="Erase Device"
        onConfirm={() => {
          setEraseOpen(false);
          toast({
            title: "Erase command sent",
            description: selected?.name,
            variant: "warning",
          });
        }}
      />
    </ConsoleLayout>
  );
}

export function DevicesConsole() {
  return <DevicesConsoleBody />;
}
