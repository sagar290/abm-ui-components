import { cn } from "@/lib/utils";

export interface BrandMarkProps {
  className?: string;
  /** Show wordmark "Business" next to the mark */
  withWordmark?: boolean;
}

/** Stylized mark + "Business" wordmark matching Apple Business Manager chrome. */
export function BrandMark({ className, withWordmark = true }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0 text-foreground"
        aria-hidden
        fill="currentColor"
      >
        <path d="M16.7 7.4c-.9.1-2-.6-2.6-1.3-.6-.8-1.1-2-1-3.1-1.1.1-2.2.7-2.9 1.5-.7.8-1.3 2-1.2 3.1 1.1.1 2.1-.5 2.8-1.2.7-.7 1.3-1.9 1.2-3z" />
        <path d="M18.9 12.2c-.1-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.8.9-3.5 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1-.1 1.5-.7 2.8-.7s1.6.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.1-2.3 1.1-2.4-.1 0-2.2-.8-2.5-3.7z" />
      </svg>
      {withWordmark && (
        <span className="text-[17px] font-semibold tracking-tight text-foreground">
          Business
        </span>
      )}
      <span className="sr-only">Apple Business</span>
    </div>
  );
}
