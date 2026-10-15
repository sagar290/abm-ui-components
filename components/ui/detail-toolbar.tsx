import { cn } from "@/lib/utils";

export interface DetailToolbarProps {
  children: React.ReactNode;
  /** Visually separated trailing actions (e.g. Erase) */
  destructiveSlot?: React.ReactNode;
  /** Overflow / More menu (typically ActionMenu) */
  moreSlot?: React.ReactNode;
  className?: string;
  /** Accessible name for the toolbar */
  label?: string;
}

export function DetailToolbar({
  children,
  destructiveSlot,
  moreSlot,
  className,
  label = "Actions",
}: DetailToolbarProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-1", className)}
      role="toolbar"
      aria-label={label}
    >
      <div className="flex flex-wrap items-center gap-1">{children}</div>
      {moreSlot && (
        <div className="flex items-center gap-1">{moreSlot}</div>
      )}
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
