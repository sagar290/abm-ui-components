"use client";

import * as React from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import {
  Button,
  EmptyState,
  IconWell,
  ListItem,
  ListPane,
  PromoCard,
  useToast,
} from "@/components/ui";
import { appsCatalog } from "@/lib/mock-data";
import { ConsoleLayout } from "./console-layout";

const iconColorClass = {
  blue: "bg-accent text-foreground-inverse",
  orange: "bg-warning text-foreground-inverse",
  green: "bg-success text-foreground-inverse",
  purple: "bg-info text-foreground-inverse",
  gray: "bg-surface-secondary text-foreground",
} as const;

function AppsConsoleBody() {
  const { toast } = useToast();
  const [search, setSearch] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const filtered = appsCatalog.filter((app) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      app.name.toLowerCase().includes(q) ||
      app.platforms.toLowerCase().includes(q)
    );
  });

  const listPane = (
    <ListPane
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search"
      onAdd={() => toast({ title: "Add app", description: "Open the Store to get apps." })}
      title="Your Apps"
      onFilter={() => toast({ title: "Filters" })}
      onSort={() => toast({ title: "Sort" })}
      preamble={
        <div className="space-y-2">
          <PromoCard
            title="Store"
            subtitle="Get Apps and Custom Apps"
            icon={
              <span className="text-sm font-bold" aria-hidden>
                A
              </span>
            }
            onClick={() =>
              toast({
                title: "Store",
                description: "Demo store — connect Apps and Books in production.",
              })
            }
          />
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-accent"
            leftIcon={<Plus className="h-3.5 w-3.5" />}
            onClick={() => toast({ title: "New Package" })}
          >
            New Package
          </Button>
        </div>
      }
    >
      {filtered.map((app) => (
        <ListItem
          key={app.id}
          title={app.name}
          subtitle={app.platforms}
          selected={selectedId === app.id}
          onSelect={() => setSelectedId(app.id)}
          leading={
            <IconWell
              size="sm"
              className={`rounded-lg text-[11px] font-semibold ${iconColorClass[app.iconColor]}`}
            >
              {app.initials}
            </IconWell>
          }
        />
      ))}
    </ListPane>
  );

  return (
    <ConsoleLayout listPane={listPane} detailOpen mobileTitle="Apps">
      <div className="flex h-full min-h-0 flex-col items-center justify-center bg-canvas p-8">
        <EmptyState
          title="Get Apps and Custom Apps"
          message="To manage licenses for Apps and Custom Apps, go to the Store."
          icon={
            <IconWell
              size="lg"
              className="mb-2 h-20 w-20 rounded-2xl bg-success-muted text-success"
            >
              <span className="text-3xl font-semibold" aria-hidden>
                A
              </span>
            </IconWell>
          }
          action={
            <Button
              variant="primary"
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
              onClick={() =>
                toast({
                  title: "Store",
                  description: "Demo store — connect Apps and Books in production.",
                })
              }
            >
              View Store
            </Button>
          }
        />
      </div>
    </ConsoleLayout>
  );
}

export function AppsConsole() {
  return <AppsConsoleBody />;
}
