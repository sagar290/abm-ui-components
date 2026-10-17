"use client";

import * as React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Heart } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Button } from "./button";

export const POLAR_SUPPORT_URL =
  "https://buy.polar.sh/polar_cl_0WgX5W8w1NAg4quzE0uckh8Ib4yN01PuoewKc2NL0ys";

const supportFabVariants = cva(
  "group h-11 w-11 overflow-hidden rounded-full shadow-lg transition-[width,transform,opacity,box-shadow] duration-300 ease-out hover:w-[7.25rem] motion-safe:data-[visible=true]:animate-support-float",
  {
    variants: {
      position: {
        fixed: "",
        inline: "",
      },
    },
    defaultVariants: {
      position: "fixed",
    },
  }
);

const supportFabShellVariants = cva("inline-flex", {
  variants: {
    position: {
      fixed: "pointer-events-none fixed bottom-4 right-4 z-30",
      inline: "relative",
    },
  },
  defaultVariants: {
    position: "fixed",
  },
});

export interface SupportFabProps
  extends VariantProps<typeof supportFabVariants> {
  href?: string;
  label?: string;
  className?: string;
  /** Delay before the FAB fades in (ms). Ignored for `inline`. */
  appearAfterMs?: number;
}

/** Cute floating Polar support button — heart pill that expands on hover. */
export function SupportFab({
  href = POLAR_SUPPORT_URL,
  label = "Support",
  position = "fixed",
  appearAfterMs = 800,
  className,
}: SupportFabProps) {
  const [visible, setVisible] = React.useState(position === "inline");

  React.useEffect(() => {
    if (position !== "fixed") return;
    const id = window.setTimeout(() => setVisible(true), appearAfterMs);
    return () => window.clearTimeout(id);
  }, [position, appearAfterMs]);

  return (
    <Tooltip.Provider delayDuration={400}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span
            className={cn(supportFabShellVariants({ position }))}
            data-visible={visible}
          >
            <Button
              asChild
              variant="primary"
              size="icon"
              data-visible={visible}
              data-chrome="popover"
              className={cn(
                supportFabVariants({ position }),
                "pointer-events-auto gap-0 hover:gap-1.5",
                position === "fixed" &&
                  "data-[visible=false]:pointer-events-none data-[visible=false]:translate-y-3 data-[visible=false]:scale-90 data-[visible=false]:opacity-0 data-[visible=true]:translate-y-0 data-[visible=true]:scale-100 data-[visible=true]:opacity-100",
                className
              )}
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} on Polar`}
              >
                <Heart
                  className="h-4 w-4 shrink-0 fill-foreground-inverse/25 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden
                />
                <span
                  className={cn(
                    "max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300",
                    "group-hover:max-w-[4.5rem] group-hover:opacity-100"
                  )}
                >
                  {label}
                </span>
              </a>
            </Button>
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="left"
            sideOffset={10}
            className="z-50 rounded-lg bg-foreground px-3 py-2 text-xs text-foreground-inverse shadow-md"
          >
            Support this project on Polar
            <Tooltip.Arrow className="fill-foreground" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
