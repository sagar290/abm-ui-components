import { cn } from "@/lib/utils";

export interface DetailToolbarProps {
  children: React.ReactNode;
  /** Visually separated trailing actions (e.g. Erase) */
  destructiveSlot?: React.ReactNode;
  className?: string;
}

export function DetailToolbar({
  children,
  destructiveSlot,
  className,
}: DetailToolbarProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-1", className)}
      role="toolbar"
      aria-label="Device actions"
    >
      <div className="flex flex-wrap items-center gap-1">{children}</div>
      {destructiveSlot && (
        <>
          <div
            className="mx-2 hidden h-6 w-px bg-border sm:block"
            aria-hidden
          />
          <div className="flex items-center gap-1">{destructiveSlot}</div>
        </>
      )}
    </div>
  );
}
