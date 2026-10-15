"use client";

import { PlaceholderPage } from "@/components/ui";
import { ConsoleLayout } from "./console-layout";

export function PlaceholderRoute({ title }: { title: string }) {
  return (
    <ConsoleLayout mobileTitle={title} detailOpen>
      <PlaceholderPage title={title} />
    </ConsoleLayout>
  );
}
