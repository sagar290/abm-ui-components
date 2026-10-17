"use client";

import * as React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { Info } from "lucide-react";
import { cn } from "../../lib/utils";

const formFieldVariants = cva("", {
  variants: {
    layout: {
      stacked: "flex flex-col gap-1.5",
      /** Apple Business Manager style: label left, control right */
      horizontal:
        "grid grid-cols-1 gap-1.5 sm:grid-cols-[minmax(140px,180px)_1fr] sm:items-center sm:gap-4",
    },
  },
  defaultVariants: {
    layout: "stacked",
  },
});

export interface FormFieldProps extends VariantProps<typeof formFieldVariants> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  info?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  id,
  label,
  hint,
  error,
  info,
  required,
  layout = "stacked",
  className,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const isHorizontal = layout === "horizontal";

  const labelBlock = (
    <div
      className={cn(
        "flex items-center gap-1.5",
        isHorizontal && "sm:justify-end sm:text-right"
      )}
    >
      <label
        htmlFor={id}
        className="text-sm text-foreground-secondary"
      >
        {label}
        {required && (
          <span className="text-danger ml-0.5" aria-hidden>
            *
          </span>
        )}
      </label>
      {info && (
        <Tooltip.Provider delayDuration={200}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span
                tabIndex={0}
                className="inline-flex text-foreground-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                aria-label={info}
              >
                <Info className="h-3.5 w-3.5" />
              </span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                className="z-50 max-w-xs rounded-lg bg-foreground px-3 py-2 text-xs text-foreground-inverse shadow-md"
              >
                {info}
                <Tooltip.Arrow className="fill-foreground" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>
  );

  const control = (
    <div className="min-w-0 space-y-1">
      {React.isValidElement(children)
        ? React.cloneElement(
            children as React.ReactElement<{
              id?: string;
              "aria-describedby"?: string;
              invalid?: boolean;
            }>,
            {
              id,
              invalid: Boolean(error),
              "aria-describedby":
                [hintId, errorId].filter(Boolean).join(" ") || undefined,
            }
          )
        : children}
      {hint && !error && (
        <p id={hintId} className="text-xs text-foreground-secondary">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );

  return (
    <div className={cn(formFieldVariants({ layout }), className)}>
      {labelBlock}
      {control}
    </div>
  );
}
