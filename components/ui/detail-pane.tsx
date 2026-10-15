import { cn } from "@/lib/utils";

export interface DetailPaneProps {
  toolbar?: React.ReactNode;
  header?: React.ReactNode;
  tabs?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  empty?: React.ReactNode;
}

export function DetailPane({
  toolbar,
  header,
  tabs,
  children,
  className,
  empty,
}: DetailPaneProps) {
  if (empty) {
    return (
      <section
        className={cn(
          "flex h-full min-h-0 flex-1 flex-col items-center justify-center bg-canvas p-6",
          className
        )}
      >
        {empty}
      </section>
    );
  }

  const hasBody = children != null && children !== false;

  return (
    <section
      className={cn(
        "flex h-full min-h-0 flex-1 flex-col bg-canvas",
        className
      )}
      aria-label="Details"
    >
      {toolbar && (
        <div className="shrink-0 border-b border-border-subtle bg-surface px-4 py-2">
          {toolbar}
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {header && (
          <div className="border-b border-border-subtle bg-surface px-6 py-5">
            {header}
          </div>
        )}
        {/* Tab list stays on the surface; TabPanel paints its own padded canvas body */}
        {tabs && <div className="bg-surface">{tabs}</div>}
        {hasBody && <div className="space-y-4 p-6">{children}</div>}
      </div>
    </section>
  );
}
