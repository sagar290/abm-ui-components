"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import {
  Banner,
  EmptyState,
  ListItem,
  ListPane,
  PageHeader,
  PromoCard,
  SettingCard,
  Tabs,
  TabPanel,
  useToast,
} from "@/components/ui";
import { settingsCatalog } from "@/lib/mock-data";
import { useConsole } from "@/lib/console-store";
import { ConsoleLayout } from "./console-layout";

const categoryTabs = [
  { value: "Recommended", label: "Recommended" },
  { value: "Security", label: "Security" },
  { value: "Network", label: "Network" },
  { value: "Personalization", label: "Personalization" },
  { value: "All", label: "All Settings" },
] as const;

function SettingsConsoleBody() {
  const { configuredSettingIds, configureSetting } = useConsole();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const highlight = searchParams.get("highlight");

  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState<string>(
    highlight ? "Security" : "Recommended"
  );

  React.useEffect(() => {
    if (highlight) setCategory("Security");
  }, [highlight]);

  const configured = settingsCatalog.filter((s) =>
    configuredSettingIds.includes(s.id)
  );

  const available = settingsCatalog.filter((s) => {
    if (configuredSettingIds.includes(s.id)) return false;
    const q = search.toLowerCase();
    if (
      q &&
      !s.title.toLowerCase().includes(q) &&
      !s.description.toLowerCase().includes(q)
    ) {
      return false;
    }
    if (category === "All") return true;
    return s.category === category || s.category === "All";
  });

  const listPane = (
    <ListPane
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search"
      onAdd={() =>
        toast({ title: "Add setting", description: "Pick a setting from the catalog." })
      }
      title="Configured Settings"
      onFilter={() => toast({ title: "Filters" })}
      onSort={() => toast({ title: "Sort" })}
      preamble={
        <PromoCard
          title="All Settings"
          icon={<SlidersHorizontal className="h-4 w-4" />}
          selected
        />
      }
    >
      {configured.length === 0 ? (
        <p className="px-2 py-6 text-center text-sm text-foreground-muted">
          No configured settings added.
        </p>
      ) : (
        configured.map((s) => (
          <ListItem
            key={s.id}
            title={s.title}
            subtitle={s.platform}
            selected={false}
          />
        ))
      )}
    </ListPane>
  );

  const addSetting = (id: string) => {
    const setting = settingsCatalog.find((s) => s.id === id);
    if (!setting) return;
    configureSetting(setting.id, setting.remediatesIssueId);
    toast({
      title: `${setting.title} added`,
      description: setting.remediatesIssueId
        ? "Matching device issues were cleared."
        : "Setting is now configured.",
      variant: "success",
    });
  };

  return (
    <ConsoleLayout listPane={listPane} detailOpen mobileTitle="Settings">
      <div className="flex h-full min-h-0 flex-col overflow-y-auto bg-canvas p-6 md:p-8">
        <PageHeader
          title="All Settings"
          icon={<SlidersHorizontal className="h-7 w-7" />}
          className="mb-6"
        />

        <Banner
          eyebrow="Get started"
          title="Configure your first setting"
          description="Settings let you manage security, network, and personalization across enrolled devices. Add a recommended setting to get started."
          className="mb-6"
        />

        <Tabs
          items={[...categoryTabs]}
          value={category}
          onValueChange={setCategory}
        >
          {categoryTabs.map((tab) => (
            <TabPanel key={tab.value} value={tab.value}>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {available.length === 0 ? (
                  <EmptyState
                    message="All settings in this category are configured."
                    className="sm:col-span-2 xl:col-span-3 rounded-xl border border-dashed border-border"
                  />
                ) : (
                  available.map((s) => (
                    <SettingCard
                      key={s.id}
                      setting={s}
                      onAdd={addSetting}
                      highlighted={highlight === s.id}
                    />
                  ))
                )}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </ConsoleLayout>
  );
}

export function SettingsConsole() {
  return (
    <React.Suspense
      fallback={
        <ConsoleLayout mobileTitle="Settings">
          <EmptyState message="Loading settings…" />
        </ConsoleLayout>
      }
    >
      <SettingsConsoleBody />
    </React.Suspense>
  );
}
