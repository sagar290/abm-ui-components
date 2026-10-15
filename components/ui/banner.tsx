import { Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";
import { Badge } from "./badge";

export interface BannerProps {
  title: string;
  description?: string;
  /** Small badge above the title (e.g. "Get started") */
  eyebrow?: string;
  action?: React.ReactNode;
  className?: string;
}

export function Banner({
  title,
  description,
  eyebrow,
  action,
  className,
}: BannerProps) {
  return (
    <aside
      className={cn(
        "flex flex-col gap-3 rounded-2xl bg-banner px-5 py-5 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      role="note"
    >
      <div className="space-y-2">
        {eyebrow && (
          <Badge variant="neutral" size="sm" className="gap-1 bg-surface">
            <Sparkles className="h-3 w-3 text-accent" aria-hidden />
            {eyebrow}
          </Badge>
        )}
        <p className="text-lg font-semibold text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-foreground-secondary max-w-xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action}
    </aside>
  );
}
