import { cn } from "../../lib/utils";
import { IconWell } from "./icon-well";

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  icon,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-start gap-4", className)}>
      {icon && <IconWell size="lg">{icon}</IconWell>}
      <div className="min-w-0 flex-1 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-foreground-secondary max-w-xl">
            {description}
          </p>
        )}
      </div>
      {actions}
    </div>
  );
}
