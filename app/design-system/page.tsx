"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Copy,
  Eraser,
  Lock,
  Moon,
  Plus,
  Sun,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Banner,
  Button,
  ConfirmDialog,
  DetailToolbar,
  Dialog,
  DomainSelect,
  EmptyState,
  FormField,
  IconWell,
  Input,
  ListItem,
  ProgressBar,
  SectionCard,
  Select,
  SelectableCard,
  SettingCard,
  SidebarItem,
  StatusItem,
  Tabs,
  TabPanel,
  ToolbarAction,
  useToast,
} from "@/components/ui";
import { settingsCatalog } from "@/lib/mock-data";

function CatalogSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <SectionCard title={title}>
      {description && (
        <p className="mb-4 text-sm text-foreground-secondary">{description}</p>
      )}
      {children}
    </SectionCard>
  );
}

export default function DesignSystemPage() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [username, setUsername] = React.useState("jordan.lee");
  const [domain, setDomain] = React.useState("managed.acme.com");
  const [cardA, setCardA] = React.useState(true);
  const [cardB, setCardB] = React.useState(false);
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="sticky top-0 z-20 border-b border-border-subtle bg-surface/95 backdrop-blur px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Design System
            </h1>
            <p className="text-sm text-foreground-secondary">
              Living catalog of every `/components/ui` primitive and variant.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={
              dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
            }
            onClick={() => setDark((d) => !d)}
          >
            {dark ? "Light" : "Dark"}
          </Button>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
        <CatalogSection title="Button" description="primary · secondary · ghost · destructive · link · sizes · loading · icon">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button size="icon" aria-label="Add" leftIcon={<Plus className="h-4 w-4" />} />
          </div>
        </CatalogSection>

        <CatalogSection title="Badge">
          <div className="flex flex-wrap gap-2">
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">2</Badge>
            <Badge variant="success">Active</Badge>
          </div>
        </CatalogSection>

        <CatalogSection title="Avatar & IconWell">
          <div className="flex items-center gap-3">
            <Avatar initials="JL" size="sm" />
            <Avatar initials="SP" size="md" />
            <Avatar initials="AN" size="lg" />
            <IconWell size="sm">
              <Lock className="h-4 w-4" />
            </IconWell>
            <IconWell size="lg" label="Device">
              <AlertTriangle className="h-6 w-6" />
            </IconWell>
          </div>
        </CatalogSection>

        <CatalogSection title="FormField · Input · Select · DomainSelect">
          <div className="grid max-w-xl gap-4">
            <FormField id="ds-name" label="First name" required hint="As shown on ID">
              <Input placeholder="Jordan" />
            </FormField>
            <FormField id="ds-role" label="Role" error="Role is required">
              <Select
                placeholder="Select role"
                options={[
                  { value: "admin", label: "Administrator" },
                  { value: "staff", label: "Staff" },
                ]}
                invalid
              />
            </FormField>
            <FormField
              id="ds-maid"
              label="Managed Apple ID"
              info="Username plus organization domain"
            >
              <DomainSelect
                username={username}
                domain={domain}
                domains={["acme.com", "managed.acme.com"]}
                onUsernameChange={setUsername}
                onDomainChange={setDomain}
              />
            </FormField>
          </div>
        </CatalogSection>

        <CatalogSection title="SelectableCard">
          <div className="grid gap-3 max-w-xl">
            <SelectableCard
              id="card-a"
              title="Personal iPhone or iPad"
              description="User-owned device with Managed Apple ID."
              checked={cardA}
              onCheckedChange={setCardA}
            />
            <SelectableCard
              id="card-b"
              title="Company-owned Mac"
              description="Unique link expires in 30 days."
              checked={cardB}
              onCheckedChange={setCardB}
            />
          </div>
        </CatalogSection>

        <CatalogSection title="Tabs">
          <Tabs
            items={[
              { value: "one", label: "Overview" },
              { value: "two", label: "Details" },
              { value: "three", label: "Apps" },
            ]}
            defaultValue="one"
          >
            <TabPanel value="one">
              <p className="text-sm text-foreground-secondary">Overview panel</p>
            </TabPanel>
            <TabPanel value="two">
              <p className="text-sm text-foreground-secondary">Details panel</p>
            </TabPanel>
            <TabPanel value="three">
              <p className="text-sm text-foreground-secondary">Apps panel</p>
            </TabPanel>
          </Tabs>
        </CatalogSection>

        <CatalogSection title="StatusItem · ProgressBar">
          <div className="max-w-xl space-y-2">
            <StatusItem label="Last Seen" value="2 minutes ago" tone="ok" />
            <StatusItem
              label="Firewall"
              value="Off"
              tone="error"
              fixHref="/settings?highlight=set-firewall"
            />
            <StatusItem label="FileVault" value="Not enforced" tone="warning" fixHref="/settings" />
            <ProgressBar value={312} max={512} label="Storage" />
          </div>
        </CatalogSection>

        <CatalogSection title="EmptyState · Banner · SectionCard">
          <div className="space-y-4">
            <Banner
              title="Get started"
              description="Configure recommended settings for your fleet."
              action={<Button size="sm">View recommended</Button>}
            />
            <EmptyState
              message="Nothing configured yet."
              linkHref="/settings"
              linkLabel="Go to Settings"
            />
          </div>
        </CatalogSection>

        <CatalogSection title="ListItem · SidebarItem">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1 rounded-xl border border-border-subtle p-2">
              <ListItem
                title="Jordan Lee"
                subtitle="jordan.lee@managed.acme.com"
                selected
                statusLabel="Active"
                statusVariant="success"
                leading={<Avatar initials="JL" size="sm" />}
              />
              <ListItem
                title="Sam Patel"
                subtitle="sam.patel@managed.acme.com"
                statusLabel="Invited"
                statusVariant="info"
                leading={<Avatar initials="SP" size="sm" />}
              />
            </div>
            <div className="space-y-1 rounded-xl bg-sidebar p-2">
              <SidebarItem href="/users" label="Users" active />
              <SidebarItem href="/devices" label="Devices" alertCount={2} />
              <SidebarItem href="/settings" label="Settings" />
            </div>
          </div>
        </CatalogSection>

        <CatalogSection title="DetailToolbar · ToolbarAction">
          <DetailToolbar
            destructiveSlot={
              <ToolbarAction
                label="Erase"
                destructive
                icon={<Eraser className="h-4 w-4" />}
                onClick={() => setConfirmOpen(true)}
              />
            }
          >
            <ToolbarAction
              label="Lock Device"
              icon={<Lock className="h-4 w-4" />}
              onClick={() => toast({ title: "Locked (demo)" })}
            />
            <ToolbarAction
              label="Copy"
              icon={<Copy className="h-4 w-4" />}
              onClick={() => toast({ title: "Copied", variant: "success" })}
            />
          </DetailToolbar>
        </CatalogSection>

        <CatalogSection title="Dialog · ConfirmDialog · Toast">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
            <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
              Open Confirm
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast({
                  title: "Saved",
                  description: "Changes were applied.",
                  variant: "success",
                })
              }
            >
              Show Toast
            </Button>
          </div>
        </CatalogSection>

        <CatalogSection title="SettingCard">
          <div className="grid gap-4 sm:grid-cols-2">
            <SettingCard
              setting={settingsCatalog[0]}
              onAdd={() => toast({ title: "Added Firewall", variant: "success" })}
              highlighted
            />
            <SettingCard setting={settingsCatalog[1]} configured />
          </div>
        </CatalogSection>

        <p className="pb-8 text-center text-xs text-foreground-muted">
          Shell components (AppShell, Sidebar, ListPane, DetailPane) are demonstrated on{" "}
          <Button variant="link" asChild>
            <Link href="/users">/users</Link>
          </Button>
          .
        </p>
      </main>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Example dialog"
        description="Focus trap, ESC to close, and backdrop dismiss."
        footer={
          <>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setDialogOpen(false)}>Save</Button>
          </>
        }
      >
        <p className="text-sm text-foreground-secondary">
          Dialog content goes here. Nested form fields remain scrollable.
        </p>
      </Dialog>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Erase this device?"
        description="All content and settings will be erased."
        confirmLabel="Erase Device"
        onConfirm={() => {
          setConfirmOpen(false);
          toast({ title: "Erase sent", variant: "warning" });
        }}
      />
    </div>
  );
}
