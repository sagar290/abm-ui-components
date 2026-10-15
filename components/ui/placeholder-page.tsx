import { EmptyState } from "./empty-state";
import { SectionCard } from "./section-card";

export interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <SectionCard title={title}>
        <EmptyState
          message={`${title} is not part of this demo yet. Explore Users, Devices, and Settings.`}
          linkHref="/users"
          linkLabel="Go to Users"
        />
      </SectionCard>
    </div>
  );
}
